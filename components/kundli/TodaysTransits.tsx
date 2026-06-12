"use client";

interface Transit {
  planet: string; symbol: string; sign: string;
  natalHouse: number; message: string; isRetrograde: boolean;
}

const ORDINALS = ["","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"];
const PLANET_COLORS: Record<string,string> = { Saturn:"#9988CC", Jupiter:"#FFA040", Mars:"#E8621A" };

// Brand palette — Setu Brand Style Guide
const IVORY      = "#FAF7F0";
const WARM_IVORY = "#FCFAF5";
const BORDER     = "#E8D5B0";
const BROWN      = "#2C1608";
const BROWN_MID  = "#7A5C3A";
const GOLD       = "#C4922A";

export default function TodaysTransits({ transits }: { transits: Transit[] }) {
  if (!transits || transits.length === 0) return null;
  return (
    <div style={{ background: IVORY, borderTop: "0.5px solid " + BORDER, padding: "20px" }}>
      <p style={{ fontFamily: "'DM Sans', Arial, sans-serif", fontSize: "9px", letterSpacing: "3px", color: BROWN_MID, marginBottom: "14px", textTransform: "uppercase" }}>
        RIGHT NOW
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {transits.map(t => (
          <div key={t.planet} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
              background: WARM_IVORY, border: `0.5px solid ${PLANET_COLORS[t.planet] ?? GOLD}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", color: PLANET_COLORS[t.planet] ?? GOLD,
              fontFamily: "serif",
            }}>
              {t.symbol}
            </div>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "11px", color: BROWN_MID, margin: "0 0 2px" }}>
                {t.planet} in {t.sign}{t.isRetrograde ? " ℛ" : ""} · your {ORDINALS[t.natalHouse]} house
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "12px", color: BROWN, margin: 0 }}>
                {t.message}.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
