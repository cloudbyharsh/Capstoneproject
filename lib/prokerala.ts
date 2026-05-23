/**
 * Prokerala API Client
 * Handles OAuth2 token management and all API calls.
 * Docs: https://api.prokerala.com/docs
 */

const BASE_URL = "https://api.prokerala.com/v2/astrology";
const TOKEN_URL = "https://api.prokerala.com/token";

// ─── Token cache (server-side in-memory, refreshes on expiry) ───
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID!,
      client_secret: process.env.PROKERALA_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) throw new Error(`Prokerala auth failed: ${res.status}`);
  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;
  return cachedToken!;
}

async function prokeralaGet(endpoint: string, params: Record<string, string>) {
  const token = await getAccessToken();
  const url = new URL(`${BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("ayanamsa", "1"); // 1 = Lahiri (standard Vedic)

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Prokerala ${endpoint} failed: ${res.status} — ${err}`);
  }
  return res.json();
}

// ─── Date helpers ───
// Prokerala expects ISO 8601: 2025-05-19T00:00:00+05:30
function toISOWithOffset(date: Date, offsetMinutes = -300): string {
  // Default: Toronto = UTC-5 (EST), UTC-4 (EDT)
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  const local = new Date(date.getTime() + offsetMinutes * 60_000);
  return local.toISOString().replace("Z", `${sign}${hh}:${mm}`).slice(0, 19) + `${sign}${hh}:${mm}`;
}

// ─── API Methods ─────────────────────────────────────────────────

/**
 * Daily Panchang — tithi, nakshatra, yoga, karana, sunrise/sunset,
 * rahu kalam, gulika kalam, yamagandam, abhijit muhurta
 */
export async function getPanchang(date: Date, lat: number, lng: number) {
  return prokeralaGet("panchang", {
    datetime: toISOWithOffset(date),
    coordinates: `${lat},${lng}`,
  });
}

/**
 * Kundli (Birth Chart) — ascendant, planet positions, house cusps,
 * nakshatra, rashi, current dasha period
 */
export async function getKundli(
  birthDate: Date,
  lat: number,
  lng: number,
  options: { birthTimeUnknown?: boolean } = {}
) {
  return prokeralaGet("kundli", {
    datetime: toISOWithOffset(birthDate, 330), // IST offset for birth location
    coordinates: `${lat},${lng}`,
    ...(options.birthTimeUnknown ? { birth_time_unknown: "1" } : {}),
  });
}

/**
 * Planet Positions — current or natal planetary positions
 */
export async function getPlanetPositions(date: Date, lat: number, lng: number) {
  return prokeralaGet("planet-position", {
    datetime: toISOWithOffset(date),
    coordinates: `${lat},${lng}`,
  });
}

/**
 * Kundli Matching (Gun Milan) — compatibility score for two birth charts
 */
export async function getKundliMatching(
  bride: { datetime: Date; lat: number; lng: number },
  groom: { datetime: Date; lat: number; lng: number }
) {
  const token = await getAccessToken();
  const url = new URL(`${BASE_URL}/kundli-matching`);
  url.searchParams.set("girl_datetime", toISOWithOffset(bride.datetime, 330));
  url.searchParams.set("girl_coordinates", `${bride.lat},${bride.lng}`);
  url.searchParams.set("boy_datetime", toISOWithOffset(groom.datetime, 330));
  url.searchParams.set("boy_coordinates", `${groom.lat},${groom.lng}`);
  url.searchParams.set("ayanamsa", "1");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Kundli matching failed: ${res.status}`);
  return res.json();
}

/**
 * Auspicious Periods (Muhurta) — best timings for a specific event type
 * eventType: "marriage" | "griha-pravesh" | "naming-ceremony" | "thread-ceremony" | "travel" | "vehicle"
 */
export async function getMuhurta(
  date: Date,
  lat: number,
  lng: number,
  eventType: string
) {
  return prokeralaGet("auspicious-period", {
    datetime: toISOWithOffset(date),
    coordinates: `${lat},${lng}`,
    type: eventType,
  });
}

/**
 * Hindu Festival Calendar — festival list for a given year/month
 */
export async function getFestivals(year: number, lat: number, lng: number) {
  return prokeralaGet("festival", {
    year: String(year),
    coordinates: `${lat},${lng}`,
  });
}

/**
 * Horoscope — daily/weekly/monthly for a rashi (moon sign)
 * period: "daily" | "weekly" | "monthly" | "yearly"
 * rashi: 1 (Aries) to 12 (Pisces)
 */
export async function getHoroscope(rashi: number, period: string = "daily") {
  return prokeralaGet("horoscope", {
    rashi: String(rashi),
    period,
  });
}

/**
 * Numerology — life path, name number, personality number
 */
export async function getNumerology(name: string, birthDate: Date) {
  const token = await getAccessToken();
  const url = new URL("https://api.prokerala.com/v2/numerology/life-path-number");
  url.searchParams.set("name", name);
  url.searchParams.set("date_of_birth", birthDate.toISOString().slice(0, 10));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Numerology failed: ${res.status}`);
  return res.json();
}
