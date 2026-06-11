"use client";

interface Transit {
  planet: string; symbol: string; sign: string;
  natalHouse: number; message: string; isRetrograde: boolean;
}

const ORDINALS = ["","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"];
const PLANET_COLORS: Record<string,string> = { Saturn:"#9988CC", Jupiter:"#FFA040", Mars:"#FF6666" };

export default function TodaysTransits({ transits }: { transits: Transit[] }) {
  if (!transits || transits.length === 0) return null;
  return (
    <div style={{ background: "#000", borderTop: "0.5px solid #1a1a1a", padding: "20px" }}>
      <p style={{ fontFamily: "Times New Roman, serif", fontSize: "9px", letterSpacing: "3px", color: "#555", marginBottom: "14px" }}>
        RIGHT NOW
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {transits.map(t => (
          <div key={t.planet} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
              background: "#0d0d0d", border: `0.5px solid ${PLANET_COLORS[t.planet] ?? "#555"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", color: PLANET_COLORS[t.planet] ?? "#aaa",
              fontFamily: "serif",
            }}>
              {t.symbol}
            </div>
            <div>
              <p style={{ fontFamily: "Times New Roman, serif", fontSize: "11px", color: "#888", margin: "0 0 2px" }}>
                {t.planet} in {t.sign}{t.isRetrograde ? " ℛ" : ""} · your {ORDINALS[t.natalHouse]} house
              </p>
              <p style={{ fontFamily: "Times New Roman, serif", fontSize: "12px", color: "#c8c8c8", margin: 0 }}>
                {t.message}.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
