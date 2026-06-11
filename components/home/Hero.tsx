"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const STATS = [
  { value: "50+",   label: "VERIFIED PANDITS" },
  { value: "2K+",   label: "CEREMONIES" },
  { value: "4.9★",  label: "AVERAGE RATING" },
];

// Lightweight star field — pure SVG, no canvas
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    cx: (((i * 1237) % 100) / 100) * 100,
    cy: (((i * 941) % 100) / 100) * 100,
    r: i % 7 === 0 ? 1.2 : i % 3 === 0 ? 0.8 : 0.4,
    opacity: 0.1 + ((i * 17) % 40) / 100,
  }));
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
      {stars.map((s, i) => (
        <circle key={i} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill="#C4922A" opacity={s.opacity} />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section style={{ background:"#000", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <StarField />

      {/* Subtle radial glow */}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 50% 50%, rgba(196,146,42,0.04) 0%, transparent 70%)", pointerEvents:"none" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ textAlign:"center", width:"100%", maxWidth:"680px", margin:"0 auto", padding:"80px 24px", position:"relative", zIndex:1 }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ fontFamily:"Times New Roman, serif", fontSize:"11px", letterSpacing:"4px", color:"#444", marginBottom:"35px", textTransform:"uppercase" }}
        >
          ✦ &nbsp; sacred services for the south asian diaspora &nbsp; ✦
        </motion.p>

        {/* Headline */}
        <h1 style={{ fontFamily:"Times New Roman, serif", fontSize:"clamp(28px, 5vw, 40px)", fontWeight:"normal", color:"#ffffff", lineHeight:1.15, marginBottom:"20px" }}>
          Authentic Vedic Rituals<br />for Modern Families
        </h1>

        {/* Tagline */}
        <p style={{ fontFamily:"Times New Roman, serif", fontSize:"16px", color:"#575657", fontStyle:"italic", marginBottom:"40px", lineHeight:1.6 }}>
          Sacred moments deserve better than a WhatsApp chain.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap", marginBottom:"60px" }}
        >
          <Link href="/kundli" style={{
            padding:"14px 35px", background:"#ffffff", color:"#000000",
            fontFamily:"Times New Roman, serif", fontSize:"12px", letterSpacing:"3px",
            textDecoration:"none", textTransform:"uppercase", display:"inline-block",
            transition:"opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity="0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity="1")}
          >
            Free Kundli
          </Link>
          <Link href="/services" style={{
            padding:"14px 35px", border:"0.5px solid #2a2a2a", color:"#575657",
            fontFamily:"Times New Roman, serif", fontSize:"12px", letterSpacing:"3px",
            textDecoration:"none", textTransform:"uppercase", display:"inline-block",
            transition:"border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="#555"; e.currentTarget.style.color="#aaa"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="#2a2a2a"; e.currentTarget.style.color="#575657"; }}
          >
            Browse Services
          </Link>
        </motion.div>

        {/* Divider */}
        <div style={{ width:"40px", height:"0.5px", background:"#C4922A", margin:"0 auto 40px", opacity:0.4 }} />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ display:"flex", justifyContent:"center", gap:"40px", flexWrap:"wrap" }}
        >
          {STATS.map(stat => (
            <div key={stat.label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"Times New Roman, serif", fontSize:"23px", color:"#C4922A" }}>{stat.value}</div>
              <div style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"3px", color:"#333", marginTop:"6px" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"120px", background:"linear-gradient(transparent, #000)", pointerEvents:"none" }} />
    </section>
  );
}
