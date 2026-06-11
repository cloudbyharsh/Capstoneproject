"use client";

interface Traits {
  love: string; work: string; self: string;
  emotions: string; health: string; spirit: string;
}

const AREAS = [
  { key: "love",     label: "IN LOVE",       icon: "♀" },
  { key: "work",     label: "IN WORK",        icon: "♄" },
  { key: "self",     label: "THE SELF",       icon: "☉" },
  { key: "emotions", label: "EMOTIONS",       icon: "☽" },
  { key: "health",   label: "HEALTH",         icon: "♂" },
  { key: "spirit",   label: "SPIRITUALITY",   icon: "♃" },
] as const;

export default function TraitCards({ traits }: { traits: Traits }) {
  return (
    <div style={{ background: "#000", padding: "24px 20px 20px" }}>
      <p style={{ fontFamily: "Times New Roman, serif", fontSize: "9px", letterSpacing: "3px", color: "#555", marginBottom: "16px", textAlign: "center" }}>
        YOUR NATURE
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        {AREAS.map(({ key, label, icon }) => (
          <div
            key={key}
            style={{
              background: "#0a0a0a",
              border: "0.5px solid #1e1e1e",
              padding: "14px 10px 12px",
              display: "flex", flexDirection: "column", gap: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ color: "#C4922A", fontSize: "11px", fontFamily: "serif" }}>{icon}</span>
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "8px", letterSpacing: "2px", color: "#444" }}>{label}</span>
            </div>
            <p style={{ fontFamily: "Times New Roman, serif", fontSize: "11px", color: "#d0d0d0", lineHeight: "1.4", margin: 0 }}>
              {traits[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
