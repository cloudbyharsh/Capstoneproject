"use client";
import { useRef, useState } from "react";
import { Download, MessageCircle, Copy, Check } from "lucide-react";

interface ChartData {
  ascendant: string; moonSign: string; sunSign: string;
  nakshatra: { name: string; pada: number };
  dasha: { name: string; end: string };
  traits: { love: string; work: string; self: string };
}

interface Props { name: string; chartData: ChartData; }

// Brand palette — Setu Brand Style Guide
const IVORY      = "#FAF7F0";
const WARM_IVORY = "#FCFAF5";
const BORDER     = "#E8D5B0";
const BROWN      = "#2C1608";
const BROWN_MID  = "#7A5C3A";
const GOLD       = "#C4922A";
const TEAL       = "#1B6B5A";
// Shareable card uses very dark warm brown (not pure black) to evoke sacred night sky
const CARD_BG    = "#1A0800";
const CARD_MID   = "#2A1000";
const CARD_LINE  = "#3A1800";

export default function ShareCard({ name, chartData }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { ascendant, moonSign, nakshatra, dasha, traits } = chartData;
  const displayName = name || "Seeker";

  async function downloadPNG() {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, backgroundColor: CARD_BG, useCORS: true,
        width: 400, height: 400,
      });
      const link = document.createElement("a");
      link.download = `${displayName.replace(/\s+/g, "_")}_setu_kundli.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) { console.error(e); }
    finally { setDownloading(false); }
  }

  const waText = encodeURIComponent(
    `I just got my free Vedic birth chart on Setu ✨\n\nMy Lagna is ${ascendant} · Moon in ${moonSign} · ${nakshatra.name} Nakshatra\n\nFind yours (and check if we're compatible) 👉 https://capstoneproject-gilt.vercel.app/kundli`
  );

  async function copyLink() {
    await navigator.clipboard.writeText("https://capstoneproject-gilt.vercel.app/kundli");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ background: IVORY, padding: "20px" }}>
      <p style={{ fontFamily: "'DM Sans', Arial, sans-serif", fontSize: "9px", letterSpacing: "3px", color: BROWN_MID, marginBottom: "16px", textTransform: "uppercase" }}>
        SHARE YOUR CHART
      </p>

      {/* The shareable card — dark warm background for sacred/celestial aesthetic */}
      <div ref={cardRef} style={{
        width: "100%", maxWidth: "400px", aspectRatio: "1/1",
        background: CARD_BG, border: "0.5px solid " + GOLD,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "32px", boxSizing: "border-box",
        position: "relative", margin: "0 auto",
      }}>
        {/* Corner ornaments */}
        {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", top: pos.includes("top") ? 8 : "auto", bottom: pos.includes("bottom") ? 8 : "auto",
            left: pos.includes("left") ? 8 : "auto", right: pos.includes("right") ? 8 : "auto",
            width: 12, height: 12,
            borderTop: pos.includes("top") ? "0.5px solid " + GOLD : "none",
            borderBottom: pos.includes("bottom") ? "0.5px solid " + GOLD : "none",
            borderLeft: pos.includes("left") ? "0.5px solid " + GOLD : "none",
            borderRight: pos.includes("right") ? "0.5px solid " + GOLD : "none",
          }} />
        ))}

        {/* Header */}
        <p style={{ fontFamily: "Times New Roman, serif", fontSize: "9px", letterSpacing: "4px", color: GOLD, marginBottom: "24px" }}>
          ✦ S E T U ✦
        </p>

        {/* Name */}
        <p style={{ fontFamily: "Times New Roman, serif", fontSize: "22px", color: IVORY, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "24px", textAlign: "center" }}>
          {displayName}
        </p>

        {/* Divider */}
        <div style={{ width: "60px", height: "0.5px", background: GOLD, opacity: 0.4, marginBottom: "20px" }} />

        {/* Key placements */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", marginBottom: "20px" }}>
          {[
            ["LAGNA", ascendant],
            ["MOON",  moonSign],
            ["NAKSHATRA", nakshatra.name],
            ["MAHADASHA", dasha.name],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid " + CARD_LINE }}>
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "9px", letterSpacing: "2px", color: BROWN_MID }}>{label}</span>
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "11px", color: BORDER }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Trait line */}
        <p style={{ fontFamily: "Times New Roman, serif", fontSize: "11px", color: BROWN_MID, fontStyle: "italic", textAlign: "center", lineHeight: "1.5", marginBottom: "24px" }}>
          &ldquo;{traits.love}. {traits.self}.&rdquo;
        </p>

        {/* Footer */}
        <p style={{ fontFamily: "Times New Roman, serif", fontSize: "8px", letterSpacing: "3px", color: BROWN_MID }}>
          SETU.APP
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "8px", marginTop: "14px", flexWrap: "wrap" }}>
        <button onClick={downloadPNG} disabled={downloading} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          background: WARM_IVORY, border: "0.5px solid " + BORDER, color: BROWN,
          padding: "10px 16px", cursor: "pointer", fontFamily: "'DM Sans', Arial, sans-serif", fontSize: "11px",
          letterSpacing: "1px", minWidth: "120px", borderRadius: "6px",
        }}>
          <Download size={13} />
          {downloading ? "saving..." : "save image"}
        </button>

        <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noopener noreferrer" style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          background: "#F0FAF5", border: "0.5px solid " + TEAL + "40", color: TEAL,
          padding: "10px 16px", textDecoration: "none", fontFamily: "'DM Sans', Arial, sans-serif", fontSize: "11px",
          letterSpacing: "1px", minWidth: "120px", borderRadius: "6px",
        }}>
          <MessageCircle size={13} />
          share on whatsapp
        </a>

        <button onClick={copyLink} style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          background: WARM_IVORY, border: "0.5px solid " + (copied ? GOLD : BORDER), color: copied ? GOLD : BROWN_MID,
          padding: "10px 16px", cursor: "pointer", fontFamily: "'DM Sans', Arial, sans-serif", fontSize: "11px",
          letterSpacing: "1px", minWidth: "120px", borderRadius: "6px",
        }}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "copied!" : "copy link"}
        </button>
      </div>

      {/* Compatibility hook */}
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "11px", color: BROWN_MID, marginTop: "12px", textAlign: "center", fontStyle: "italic" }}>
        share with someone to find out if you&apos;re cosmically compatible →
      </p>
    </div>
  );
}
