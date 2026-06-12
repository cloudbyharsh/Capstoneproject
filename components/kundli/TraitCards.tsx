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

// Brand palette — Setu Brand Style Guide
const IVORY      = "#FAF7F0";
const WARM_IVORY = "#FCFAF5";
const BORDER     = "#E8D5B0";
const BROWN      = "#2C1608";
const BROWN_MID  = "#7A5C3A";
const GOLD       = "#C4922A";

export default function TraitCards({ traits }: { traits: Traits }) {
  return (
    <div style={{ background: IVORY, padding: "24px 20px 20px" }}>
      <p style={{ fontFamily: "'DM Sans', Arial, sans-serif", fontSize: "9px", letterSpacing: "3px", color: BROWN_MID, marginBottom: "16px", textAlign: "center", textTransform: "uppercase" }}>
        YOUR NATURE
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        {AREAS.map(({ key, label, icon }) => (
          <div
            key={key}
            style={{
              background: WARM_IVORY,
              border: "0.5px solid " + BORDER,
              borderRadius: "6px",
              padding: "14px 10px 12px",
              display: "flex", flexDirection: "column", gap: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ color: GOLD, fontSize: "11px", fontFamily: "serif" }}>{icon}</span>
              <span style={{ fontFamily: "'DM Sans', Arial, sans-serif", fontSize: "8px", letterSpacing: "2px", color: BROWN_MID, textTransform: "uppercase" }}>{label}</span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "11px", color: BROWN, lineHeight: "1.4", margin: 0 }}>
              {traits[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
