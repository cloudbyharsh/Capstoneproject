"use client";

interface Planet {
  name: string; symbol: string; sign: string;
  signIndex: number; house: number; isRetrograde: boolean;
}
interface Props {
  planets: Planet[]; ascendant: string; moonSign: string; size?: number;
}

const ZODIAC_SYMS  = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
const SIGN_INDEX: Record<string,number> = {Aries:0,Taurus:1,Gemini:2,Cancer:3,Leo:4,Virgo:5,Libra:6,Scorpio:7,Sagittarius:8,Capricorn:9,Aquarius:10,Pisces:11};
const PLANET_COLORS: Record<string,string> = {Sun:"#FFD700",Moon:"#C8C8D0",Mars:"#FF6666",Mercury:"#88AAFF",Jupiter:"#FFA040",Venus:"#FF88BB",Saturn:"#9988CC",Rahu:"#888899",Ketu:"#AAAA66"};

// Brand guide: no pure black — use Sandalwood Brown (#2C1608) family for dark UI
// Chart uses warm dark brown tones to evoke night sky while remaining brand-compliant
const NIGHT_DEEP  = "#0D0400"; // deepest warm dark — replaces #000
const NIGHT_MID   = "#1A0800"; // mid dark — replaces #111
const NIGHT_RING1 = "#180600"; // zodiac ring odd — warm very dark
const NIGHT_RING2 = "#100400"; // zodiac ring even — warmer very dark
const HOUSE_ODD   = "#130500"; // house ring odd
const HOUSE_EVEN  = "#0C0300"; // house ring even
const BORDER_RING = "#3A2010"; // ring borders
const BORDER_SOFT = "#2A1208"; // soft ring border
const HOUSE_NUM   = "#7A5040"; // house number text
const GOLD        = "#C4922A";
const IVORY       = "#FAF7F0";

const CX = 200, CY = 200;

function pol(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY - r * Math.sin(rad) };
}
function f(n: number) { return n.toFixed(2); }
function houseStartDeg(h: number) { return 180 - (h - 1) * 30; }
function houseCenterDeg(h: number) { return 180 - (h - 1) * 30 - 15; }

function wedge(h: number, iR: number, oR: number) {
  const s = houseStartDeg(h), e = s - 30;
  const p1 = pol(s, iR), p2 = pol(s, oR), p3 = pol(e, oR), p4 = pol(e, iR);
  return `M${f(p1.x)} ${f(p1.y)} L${f(p2.x)} ${f(p2.y)} A${oR} ${oR} 0 0 0 ${f(p3.x)} ${f(p3.y)} L${f(p4.x)} ${f(p4.y)} A${iR} ${iR} 0 0 1 ${f(p1.x)} ${f(p1.y)}Z`;
}

export default function BirthChartWheel({ planets, ascendant, moonSign, size = 360 }: Props) {
  const ascIdx = SIGN_INDEX[ascendant] ?? 0;

  // Group planets by house — max 2 shown per house
  const byHouse: Record<number, Planet[]> = {};
  for (const p of planets) {
    if (!byHouse[p.house]) byHouse[p.house] = [];
    if (byHouse[p.house].length < 3) byHouse[p.house].push(p);
  }

  return (
    <div style={{ width: size, height: size, margin: "0 auto" }}>
      <svg viewBox="0 0 400 400" width={size} height={size}>
        {/* Outer glow bg — warm dark brown, evokes sacred night sky */}
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A1000" stopOpacity="0.8" />
            <stop offset="100%" stopColor={NIGHT_DEEP} stopOpacity="1" />
          </radialGradient>
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A0800" stopOpacity="0.9" />
            <stop offset="100%" stopColor={NIGHT_DEEP} stopOpacity="1" />
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r={196} fill="url(#bgGlow)" />
        <circle cx={CX} cy={CY} r={196} fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.5" />

        {/* Zodiac ring r=158–190 */}
        {Array.from({ length: 12 }, (_, i) => {
          const h = i + 1, signIdx = (ascIdx + i) % 12;
          const c = pol(houseCenterDeg(h), 174);
          return (
            <g key={`z${i}`}>
              <path d={wedge(h, 158, 190)} fill={i % 2 ? NIGHT_RING1 : NIGHT_RING2} stroke={GOLD} strokeWidth="0.5" opacity="0.9" />
              <text x={f(c.x)} y={f(c.y)} textAnchor="middle" dominantBaseline="middle" fill={GOLD} fontSize="13" fontFamily="serif">{ZODIAC_SYMS[signIdx]}</text>
            </g>
          );
        })}

        {/* House ring r=118–158 */}
        {Array.from({ length: 12 }, (_, i) => {
          const h = i + 1;
          const c = pol(houseCenterDeg(h), 138);
          return (
            <g key={`h${i}`}>
              <path d={wedge(h, 118, 158)} fill={i % 2 ? HOUSE_ODD : HOUSE_EVEN} stroke={BORDER_SOFT} strokeWidth="0.4" />
              <text x={f(c.x)} y={f(c.y)} textAnchor="middle" dominantBaseline="middle" fill={HOUSE_NUM} fontSize="9" fontFamily="Times New Roman, serif">{h}</text>
            </g>
          );
        })}

        {/* Radial dividers */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = houseStartDeg(i + 1);
          const inner = pol(a, 50), outer = pol(a, 190);
          return <line key={`d${i}`} x1={f(inner.x)} y1={f(inner.y)} x2={f(outer.x)} y2={f(outer.y)} stroke={GOLD} strokeWidth="0.4" opacity="0.3" />;
        })}

        {/* Ring borders */}
        <circle cx={CX} cy={CY} r={158} fill="none" stroke={BORDER_RING} strokeWidth="0.6" />
        <circle cx={CX} cy={CY} r={118} fill="none" stroke={BORDER_SOFT} strokeWidth="0.6" />

        {/* Planet zone */}
        <circle cx={CX} cy={CY} r={118} fill="url(#innerGlow)" />

        {/* Planets */}
        {Object.entries(byHouse).map(([hs, hPlanets]) => {
          const house = parseInt(hs);
          const center = houseCenterDeg(house);
          return hPlanets.map((planet, pIdx) => {
            const offset = hPlanets.length === 1 ? 0 : (pIdx === 0 ? 8 : -8);
            const pos = pol(center + offset, 85);
            const col = PLANET_COLORS[planet.name] ?? GOLD;
            return (
              <g key={`pl-${planet.name}`}>
                <circle cx={f(pos.x)} cy={f(pos.y)} r="12" fill={NIGHT_MID} stroke={col} strokeWidth="0.8" opacity="0.85" />
                <text x={f(pos.x)} y={f(pos.y)} textAnchor="middle" dominantBaseline="middle" fill={col} fontSize="12" fontFamily="serif">{planet.symbol}</text>
                {planet.isRetrograde && (
                  <text x={f(pos.x + 8)} y={f(pos.y - 7)} fill={col} fontSize="6" fontFamily="serif" opacity="0.8">R</text>
                )}
              </g>
            );
          });
        })}

        {/* Center */}
        <circle cx={CX} cy={CY} r={50} fill={HOUSE_EVEN} stroke={GOLD} strokeWidth="0.5" opacity="0.6" />
        {/* Inner mandala decoration */}
        {[40, 30, 20].map(r => (
          <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke={GOLD} strokeWidth="0.2" opacity={0.15 + (40-r)*0.01} />
        ))}
        <text x={CX} y={CY - 10} textAnchor="middle" fill={GOLD} fontSize="7" fontFamily="Times New Roman, serif" letterSpacing="2">LAGNA</text>
        <text x={CX} y={CY + 4}  textAnchor="middle" fill={IVORY} fontSize="11" fontFamily="Times New Roman, serif" fontWeight="bold">{ascendant.slice(0,3).toUpperCase()}</text>
        <text x={CX} y={CY + 17} textAnchor="middle" fill={HOUSE_NUM} fontSize="7" fontFamily="Times New Roman, serif">☽ {moonSign.slice(0,3).toUpperCase()}</text>
      </svg>
    </div>
  );
}
