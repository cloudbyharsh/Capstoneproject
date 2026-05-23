/**
 * Normalizes Prokerala API panchang response → PanchangData
 * (the shape consumed by all panchang UI components)
 */
import type { PanchangData } from "./panchang";

// Sanskrit vara names + lords + icons, keyed by English weekday name from Prokerala
const VARA_MAP: Record<string, { vara: string; lord: string; icon: string }> = {
  Sunday:    { vara: "Ravivara",    lord: "Sun",     icon: "☀️" },
  Monday:    { vara: "Somavara",    lord: "Moon",    icon: "🌙" },
  Tuesday:   { vara: "Mangalavara", lord: "Mars",    icon: "♂️" },
  Wednesday: { vara: "Budhavara",   lord: "Mercury", icon: "☿"  },
  Thursday:  { vara: "Guruvara",    lord: "Jupiter", icon: "♃"  },
  Friday:    { vara: "Shukravara",  lord: "Venus",   icon: "♀"  },
  Saturday:  { vara: "Shanivara",   lord: "Saturn",  icon: "♄"  },
};

// ─── Helpers ──────────────────────────────────────────────────────

function fmtISO(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleTimeString("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Toronto",
    });
  } catch {
    return "—";
  }
}

function fmtRange(start?: string | null, end?: string | null): string {
  if (!start || !end) return "—";
  return `${fmtISO(start)} – ${fmtISO(end)}`;
}

// Approximate sun longitude (display only — same math as lib/panchang.ts)
function calcSunLongitude(date: Date): number {
  const J2000 = 2451545.0;
  const jd = date.getTime() / 86400000 + 2440587.5;
  const n = jd - J2000;
  const L = (280.46 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * (Math.PI / 180);
  const lambda = L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g);
  return Math.round(((lambda % 360) + 360) % 360 * 10) / 10;
}

// Approximate moon longitude (display only)
function calcMoonLongitude(date: Date): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const L0 = 218.316 + 13.176396 * (jd - 2451545.0);
  const M = (134.963 + 13.064993 * (jd - 2451545.0)) * (Math.PI / 180);
  const F = (93.272 + 13.229350 * (jd - 2451545.0)) * (Math.PI / 180);
  const lambda = L0 + 6.289 * Math.sin(M) - 1.274 * Math.sin(2 * F - M) + 0.658 * Math.sin(2 * F);
  return Math.round(((lambda % 360) + 360) % 360 * 10) / 10;
}

// ─── Main normalizer ──────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizePanchang(raw: any, date: Date): PanchangData {
  // Prokerala wraps everything under `.data`
  const d = raw?.data ?? raw;

  // Vara (weekday)
  const vaaraName: string = d.vaara?.name ?? d.vara?.name ?? "Sunday";
  const { vara, lord: varaLord, icon: varaIcon } =
    VARA_MAP[vaaraName] ?? VARA_MAP.Sunday;

  // Tithi
  const tithiDetails = d.tithi?.details ?? {};
  const tithiNumber: number = tithiDetails.id ?? 1;
  const pakshaRaw: string = tithiDetails.paksha ?? "Shukla";
  const paksha: "Shukla" | "Krishna" = pakshaRaw.toLowerCase().includes("krishna")
    ? "Krishna"
    : "Shukla";
  let tithiName: string = tithiDetails.name ?? "—";
  // Prokerala uses "Purnima" / "Amavasya" but just in case:
  if (tithiNumber === 15) {
    tithiName = paksha === "Shukla" ? "Purnima" : "Amavasya";
  }

  // Nakshatra
  const nakshatraDetails = d.nakshatra?.details ?? {};

  // Yoga
  const yogaDetails = d.yoga?.details ?? {};

  // Karana
  const karanaDetails = d.karana?.details ?? {};

  return {
    date: date.toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Toronto",
    }),
    vara,
    varaLord,
    varaIcon,
    tithi: tithiName,
    tithiNumber,
    paksha,
    nakshatra: nakshatraDetails.name ?? "—",
    nakshatraNumber: nakshatraDetails.id ?? 1,
    yoga: yogaDetails.name ?? "—",
    karana: karanaDetails.name ?? "—",
    sunrise: fmtISO(d.sunrise),
    sunset: fmtISO(d.sunset),
    moonrise: fmtISO(d.moonrise),
    moonset: fmtISO(d.moonset),
    rahuKalam: fmtRange(d.rahu_kalam?.start, d.rahu_kalam?.end),
    abhijitMuhurta: fmtRange(d.abhijit_muhurta?.start, d.abhijit_muhurta?.end),
    // Sun/moon longitude: use local calculation (Prokerala needs a separate endpoint)
    sunLongitude: calcSunLongitude(date),
    moonLongitude: calcMoonLongitude(date),
  };
}
