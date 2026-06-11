import { NextRequest } from "next/server";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Planet {
  name: string; symbol: string; sign: string;
  signIndex: number; house: number; isRetrograde: boolean;
}

// ─── Constants ─────────────────────────────────────────────────────────────
const SIGN_NAMES = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const SIGN_INDEX: Record<string,number> = Object.fromEntries(SIGN_NAMES.map((s,i) => [s,i]));

const PLANET_SYMBOLS: Record<string,string> = {
  Sun:"☉", Moon:"☽", Mars:"♂", Mercury:"☿", Jupiter:"♃",
  Venus:"♀", Saturn:"♄", Rahu:"☊", Ketu:"☋",
};

const TRAITS = {
  love:    ["direct & passionate","devoted & sensual","playful & curious","deeply nurturing","generous & dramatic","attentive & devoted","romantic & idealistic","intense & all-in","adventurous & free","loyal but guarded","unconventional & free","boundless & empathic"],
  work:    ["pioneering & bold","methodical & steady","versatile & quick","intuitive & protective","creative & commanding","analytical & precise","collaborative & fair","strategic & thorough","visionary & restless","disciplined & ambitious","innovative & independent","imaginative & flowing"],
  self:    ["bold & assertive","grounded & determined","adaptable & curious","sensitive & protective","confident & expressive","humble & discerning","charming & balanced","intense & private","optimistic & direct","serious & composed","independent & idealistic","fluid & receptive"],
  emotions:["reactive & immediate","slow to feel, deep","changeable & expressive","absorbs everything","warm, needs recognition","processes through analysis","seeks harmony always","feels in extremes","philosophical & detached","controlled & self-reliant","observes before feeling","boundaryless & absorptive"],
  health:  ["head & high energy","throat & steady pace","nervous system & lungs","stomach & emotional","heart & circulation","digestion & nervous tension","kidneys & hormonal","reproductive & detox","hips & liver","bones & joints","circulation & ankles","feet & lymphatic"],
  spirit:  ["acts first, reflects later","ritual & earthly roots","explores many paths","devotional & family-rooted","self-expression as service","service as devotion","beauty as practice","transformation as path","philosophy & seeking","duty as devotion","breaks convention","dissolves into the whole"],
};

const TRANSIT_MSGS: Record<string, string[]> = {
  Saturn: ["restructuring your identity","testing financial foundations","demanding clarity in speech","deepening roots and home","slowing creative expression","disciplining work and health","challenging key relationships","transforming shared resources","limiting then expanding vision","restructuring your career","testing social commitments","calling for inner solitude"],
  Jupiter: ["expanding your sense of self","opening financial doors","blessing communication","growing home & family","amplifying creative gifts","improving work & wellness","expanding key relationships","growing through shared depth","broadening your philosophy","lifting career prospects","expanding your social vision","deepening inner peace"],
  Mars: ["energizing drive & ambition","activating financial action","intensifying communication","stirring home dynamics","fueling creative fire","driving daily productivity","activating relationship energy","intensifying shared power","pushing toward adventure","driving career ambitions","energizing social goals","activating hidden strength"],
};

function computeTraits(planets: Planet[], ascendant: string, moonSign: string) {
  const idx = (s: string) => SIGN_INDEX[s] ?? 0;
  const venus   = planets.find(p => p.name === "Venus");
  const saturn  = planets.find(p => p.name === "Saturn");
  const jupiter = planets.find(p => p.name === "Jupiter");
  const sun     = planets.find(p => p.name === "Sun");
  return {
    love:     TRAITS.love[idx(venus?.sign ?? moonSign)],
    work:     TRAITS.work[idx(saturn?.sign ?? (sun?.sign ?? ascendant))],
    self:     TRAITS.self[idx(ascendant)],
    emotions: TRAITS.emotions[idx(moonSign)],
    health:   TRAITS.health[idx(ascendant)],
    spirit:   TRAITS.spirit[idx(jupiter?.sign ?? ascendant)],
  };
}

async function geocode(location: string): Promise<{ lat: number; lng: number }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
      { headers: { "User-Agent": "Setu-Spiritual/1.0" } }
    );
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch { /* fallback */ }
  return { lat: 43.65, lng: -79.38 };
}

function buildIso(date: Date, location: string, lng: number): string {
  const isIndia = ["india","mumbai","delhi","bangalore","chennai","kolkata","hyderabad","pune","ahmedabad"].some(c => location.toLowerCase().includes(c));
  const offsetMin = isIndia ? 330 : Math.round(lng / 15) * 60;
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs  = Math.abs(offsetMin);
  const local = new Date(date.getTime() + offsetMin * 60_000);
  return local.toISOString().slice(0, 19) + `${sign}${String(Math.floor(abs/60)).padStart(2,"0")}:${String(abs%60).padStart(2,"0")}`;
}

async function prokeralaFetch(token: string, isoStr: string, lat: number, lng: number) {
  const url = new URL("https://api.prokerala.com/v2/astrology/kundli");
  url.searchParams.set("datetime", isoStr);
  url.searchParams.set("coordinates", `${lat},${lng}`);
  url.searchParams.set("ayanamsa", "1");
  const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return null;
  const raw = await res.json();
  return raw?.data ?? raw;
}

export async function POST(req: NextRequest) {
  const { birthDate, birthTime, birthLocation } = await req.json();
  if (!birthDate || !birthTime || !birthLocation) return Response.json({ error: "Missing fields" }, { status: 400 });

  const { lat, lng } = await geocode(birthLocation);

  // Get Prokerala token
  let token = "";
  try {
    const tr = await fetch("https://api.prokerala.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "client_credentials", client_id: process.env.PROKERALA_CLIENT_ID!, client_secret: process.env.PROKERALA_CLIENT_SECRET! }),
    });
    token = (await tr.json()).access_token ?? "";
  } catch { /* proceed without */ }

  // Birth chart + today transits in parallel
  const birthIso  = buildIso(new Date(`${birthDate}T${birthTime}`), birthLocation, lng);
  const todayNoon = new Date(); todayNoon.setHours(12, 0, 0, 0);
  const todayIso  = buildIso(todayNoon, birthLocation, lng);

  const [birthRaw, todayRaw] = await Promise.all([
    token ? prokeralaFetch(token, birthIso, lat, lng).catch(() => null) : Promise.resolve(null),
    token ? prokeralaFetch(token, todayIso, lat, lng).catch(() => null) : Promise.resolve(null),
  ]);

  // Parse birth data
  const getString = (v: unknown) => (typeof v === "string" ? v : (v as {name?:string})?.name ?? "Unknown");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsePlanets = (d: any): Planet[] =>
    Array.isArray(d?.planets)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? d.planets.map((p: any) => ({
          name: p.name ?? "", symbol: PLANET_SYMBOLS[p.name ?? ""] ?? "•",
          sign: p.rashi?.name ?? "--", signIndex: SIGN_INDEX[p.rashi?.name ?? ""] ?? 0,
          house: parseInt(p.house) || 1, isRetrograde: !!p.is_retrograde,
        }))
      : [];

  const ascendant = getString(birthRaw?.ascendant);
  const moonSign  = getString(birthRaw?.moon_sign);
  const sunSign   = getString(birthRaw?.sun_sign);
  const nakshatra = { name: birthRaw?.nakshatra?.name ?? "Unknown", pada: birthRaw?.nakshatra?.pada ?? 1 };
  const dasha     = { name: birthRaw?.dasha?.name ?? "Unknown", end: birthRaw?.dasha?.end ?? "--" };
  const planets   = parsePlanets(birthRaw);

  const traits = computeTraits(planets, ascendant, moonSign);

  // Transits: which natal houses are Saturn, Jupiter, Mars activating today?
  const ascIdx     = SIGN_INDEX[ascendant] ?? 0;
  const todayPlanets = parsePlanets(todayRaw);
  const transits = todayPlanets
    .filter(p => ["Saturn","Jupiter","Mars"].includes(p.name))
    .map(tp => {
      const natalHouse = ((tp.signIndex - ascIdx + 12) % 12) + 1;
      const msgs = TRANSIT_MSGS[tp.name] ?? [];
      return { planet: tp.name, symbol: tp.symbol, sign: tp.sign, natalHouse, message: msgs[natalHouse - 1] ?? "activating this house", isRetrograde: tp.isRetrograde };
    });

  return Response.json({ ascendant, moonSign, sunSign, nakshatra, dasha, planets, traits, transits });
}
