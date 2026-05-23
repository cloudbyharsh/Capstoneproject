/**
 * /api/muhurta
 *
 * Returns auspicious time windows for a given ceremony type using Prokerala.
 * Used by the booking flow to surface lucky timings to customers.
 *
 * Query params:
 *   date        — ISO date string, e.g. "2025-06-01" (defaults to today)
 *   lat / lng   — coordinates (defaults to Toronto)
 *   type        — ceremony type (see CEREMONY_TYPES below)
 *
 * Ceremony types supported by Prokerala:
 *   marriage | griha-pravesh | naming-ceremony | thread-ceremony |
 *   travel | vehicle | education | business
 */

import { NextRequest, NextResponse } from "next/server";

// Human-friendly labels for each ceremony type
const CEREMONY_LABELS: Record<string, string> = {
  "marriage":         "Vivah (Marriage)",
  "griha-pravesh":    "Griha Pravesh (Housewarming)",
  "naming-ceremony":  "Naamkaran (Naming Ceremony)",
  "thread-ceremony":  "Upanayana (Thread Ceremony)",
  "travel":           "Yatra (Travel)",
  "vehicle":          "Vahan Puja (Vehicle Blessing)",
  "education":        "Vidyarambha (Education Start)",
  "business":         "Vyapar Aarambh (Business Launch)",
};

async function getProkeralaToken(): Promise<string> {
  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "client_credentials",
      client_id:     process.env.PROKERALA_CLIENT_ID!,
      client_secret: process.env.PROKERALA_CLIENT_SECRET!,
    }),
  });
  if (!res.ok) throw new Error(`Prokerala auth failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

function toISOWithOffset(date: Date, offsetMinutes = -240): string {
  // Default to Toronto EDT (UTC-4). Adjust for EST (UTC-5) in winter if needed.
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs  = Math.abs(offsetMinutes);
  const hh   = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm   = String(abs % 60).padStart(2, "0");
  const local = new Date(date.getTime() + offsetMinutes * 60_000);
  return local.toISOString().slice(0, 19) + `${sign}${hh}:${mm}`;
}

function fmtISO(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleTimeString("en-CA", {
      hour: "2-digit", minute: "2-digit", hour12: true,
      timeZone: "America/Toronto",
    });
  } catch { return "—"; }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat      = parseFloat(searchParams.get("lat")  ?? "43.65");
  const lng      = parseFloat(searchParams.get("lng")  ?? "-79.38");
  const dateStr  = searchParams.get("date");
  const type     = searchParams.get("type") ?? "griha-pravesh";
  const date     = dateStr ? new Date(dateStr) : new Date();

  if (!process.env.PROKERALA_CLIENT_ID || !process.env.PROKERALA_CLIENT_SECRET) {
    return NextResponse.json({ error: "Prokerala credentials not configured" }, { status: 503 });
  }

  if (!CEREMONY_LABELS[type]) {
    return NextResponse.json(
      { error: `Unknown ceremony type. Valid types: ${Object.keys(CEREMONY_LABELS).join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const token = await getProkeralaToken();
    const url   = new URL("https://api.prokerala.com/v2/astrology/auspicious-period");
    url.searchParams.set("datetime",    toISOWithOffset(date));
    url.searchParams.set("coordinates", `${lat},${lng}`);
    url.searchParams.set("type",        type);
    url.searchParams.set("ayanamsa",    "1"); // Lahiri

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 86400 }, // cache for 24 hours (muhurta doesn't change intraday)
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Prokerala muhurta failed: ${res.status} — ${err}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await res.json();
    const d = raw?.data ?? raw;

    // Normalise the auspicious periods into a clean response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periods = (d.auspicious_periods ?? d.periods ?? []).map((p: any) => ({
      start:       fmtISO(p.start),
      end:         fmtISO(p.end),
      startISO:    p.start,
      endISO:      p.end,
      quality:     p.quality ?? p.type ?? "Auspicious",
    }));

    return NextResponse.json({
      date:          date.toLocaleDateString("en-CA", {
                       weekday: "long", year: "numeric", month: "long", day: "numeric",
                       timeZone: "America/Toronto",
                     }),
      type,
      ceremonyLabel: CEREMONY_LABELS[type],
      coordinates:   { lat, lng },
      periods,
      source:        "prokerala",
    });
  } catch (err) {
    console.error("[muhurta] API error:", err);
    return NextResponse.json(
      { error: "Could not fetch muhurta data. Please try again later." },
      { status: 502 }
    );
  }
}
