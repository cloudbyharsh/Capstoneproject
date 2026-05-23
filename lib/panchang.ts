import SunCalc from "suncalc";

// Nakshatra (lunar mansion) names
const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

// Tithi (lunar day) names
const TITHIS = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya",
];

// Yoga names (27 yogas)
const YOGAS = [
  "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana",
  "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda",
  "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
  "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva",
  "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma",
  "Mahendra", "Vaidhriti",
];

// Karana names (half-tithi)
const KARANAS = [
  "Bava", "Balava", "Kaulava", "Taitila", "Gara",
  "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga", "Kimstughna",
];

// Vara (day of week) in Sanskrit
const VARAS = ["Ravivara", "Somavara", "Mangalavara", "Budhavara", "Guruvara", "Shukravara", "Shanivara"];
const VARA_LORDS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
const VARA_ICONS = ["☀️", "🌙", "♂️", "☿", "♃", "♀", "♄"];

// Approximate sun longitude using mean motion (good enough for Panchang UI)
function getSunLongitude(date: Date): number {
  const J2000 = 2451545.0;
  const jd = date.getTime() / 86400000 + 2440587.5;
  const n = jd - J2000;
  const L = (280.46 + 0.9856474 * n) % 360;
  const g = ((357.528 + 0.9856003 * n) % 360) * (Math.PI / 180);
  const lambda = L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g);
  return ((lambda % 360) + 360) % 360;
}

// Approximate moon longitude
function getMoonLongitude(date: Date): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const L0 = 218.316 + 13.176396 * (jd - 2451545.0);
  const M = (134.963 + 13.064993 * (jd - 2451545.0)) * (Math.PI / 180);
  const F = (93.272 + 13.229350 * (jd - 2451545.0)) * (Math.PI / 180);
  const lambda = L0 + 6.289 * Math.sin(M) - 1.274 * Math.sin(2 * F - M) + 0.658 * Math.sin(2 * F);
  return ((lambda % 360) + 360) % 360;
}

export interface PanchangData {
  date: string;
  vara: string;
  varaLord: string;
  varaIcon: string;
  tithi: string;
  tithiNumber: number;
  paksha: "Shukla" | "Krishna"; // waxing / waning
  nakshatra: string;
  nakshatraNumber: number;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKalam: string;
  abhijitMuhurta: string;
  sunLongitude: number;
  moonLongitude: number;
  isFestival?: string;
}

// Toronto coords as default (can be made dynamic)
const DEFAULT_LAT = 43.65;
const DEFAULT_LNG = -79.38;

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit", hour12: true });
}

// Rahu Kalam is 1.5 hours, varies by day of week
function getRahuKalam(sunrise: Date, weekday: number): string {
  // Rahu Kalam offsets in 1.5hr slots from sunrise: Sun=8, Mon=2, Tue=7, Wed=5, Thu=6, Fri=4, Sat=3
  const slots = [8, 2, 7, 5, 6, 4, 3];
  const offset = (slots[weekday] - 1) * 90; // minutes from sunrise
  const start = new Date(sunrise.getTime() + offset * 60000);
  const end = new Date(start.getTime() + 90 * 60000);
  return `${formatTime(start)} – ${formatTime(end)}`;
}

function getAbhijitMuhurta(sunrise: Date, sunset: Date): string {
  const dayMs = sunset.getTime() - sunrise.getTime();
  const midday = new Date(sunrise.getTime() + dayMs / 2);
  const start = new Date(midday.getTime() - 24 * 60000);
  const end = new Date(midday.getTime() + 24 * 60000);
  return `${formatTime(start)} – ${formatTime(end)}`;
}

export function getPanchang(date: Date = new Date(), lat = DEFAULT_LAT, lng = DEFAULT_LNG): PanchangData {
  const sunTimes = SunCalc.getTimes(date, lat, lng);
  const moonTimes = SunCalc.getMoonTimes(date, lat, lng);

  const sunLong = getSunLongitude(date);
  const moonLong = getMoonLongitude(date);

  // Tithi: each tithi = 12 degrees of moon-sun elongation
  const elongation = ((moonLong - sunLong) + 360) % 360;
  const tithiIndex = Math.floor(elongation / 12);
  const tithiNumber = (tithiIndex % 15) + 1;
  const paksha: "Shukla" | "Krishna" = tithiIndex < 15 ? "Shukla" : "Krishna";
  let tithiName = TITHIS[tithiNumber - 1];
  if (tithiNumber === 15) tithiName = paksha === "Shukla" ? "Purnima" : "Amavasya";

  // Nakshatra: each = 360/27 degrees of moon longitude
  const nakshatraIndex = Math.floor((moonLong / (360 / 27)));
  const nakshatra = NAKSHATRAS[nakshatraIndex % 27];

  // Yoga: (sun + moon longitude) / (360/27)
  const yogaIndex = Math.floor(((sunLong + moonLong) % 360) / (360 / 27));
  const yoga = YOGAS[yogaIndex % 27];

  // Karana: half-tithi
  const karanaIndex = Math.floor((elongation / 6)) % 11;
  const karana = KARANAS[karanaIndex];

  const weekday = date.getDay();
  const vara = VARAS[weekday];
  const varaLord = VARA_LORDS[weekday];
  const varaIcon = VARA_ICONS[weekday];

  const dateStr = date.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return {
    date: dateStr,
    vara,
    varaLord,
    varaIcon,
    tithi: tithiName,
    tithiNumber,
    paksha,
    nakshatra,
    nakshatraNumber: nakshatraIndex % 27 + 1,
    yoga,
    karana,
    sunrise: formatTime(sunTimes.sunrise),
    sunset: formatTime(sunTimes.sunset),
    moonrise: moonTimes.rise ? formatTime(moonTimes.rise) : "—",
    moonset: moonTimes.set ? formatTime(moonTimes.set) : "—",
    rahuKalam: getRahuKalam(sunTimes.sunrise, weekday),
    abhijitMuhurta: getAbhijitMuhurta(sunTimes.sunrise, sunTimes.sunset),
    sunLongitude: Math.round(sunLong * 10) / 10,
    moonLongitude: Math.round(moonLong * 10) / 10,
  };
}
