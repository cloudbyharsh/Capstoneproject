"use client";
import Link from "next/link";

const categories = [
  { label: "Puja",       devanagari: "पूजा",   icon: "🪔",  slug: "puja" },
  { label: "Astrology",  devanagari: "ज्योतिष", icon: "🌙",  slug: "astrology" },
  { label: "Vastu",      devanagari: "वास्तु",  icon: "🏡",  slug: "vastu" },
  { label: "Meditation", devanagari: "ध्यान",   icon: "🧘",  slug: "meditation" },
  { label: "Havan",      devanagari: "हवन",    icon: "🔥",  slug: "havan" },
];

export default function CategoryRow() {
  return (
    <section style={{ background:"#000", borderTop:"0.5px solid #141414", borderBottom:"0.5px solid #141414", padding:"60px 0" }}>
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <p style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"4px", color:"#333", textAlign:"center", marginBottom:"40px", textTransform:"uppercase" }}>
          Sacred Pathways
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:"1px", background:"#141414" }}
          className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/services?category=${cat.slug}`}
              style={{
                background:"#000", padding:"30px 20px", textAlign:"center",
                textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
                transition:"background 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#0a0a0a"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#000"; }}
            >
              <span style={{ fontSize:"20px" }}>{cat.icon}</span>
              <span style={{ fontFamily:"Times New Roman, serif", fontSize:"14px", color:"#e0e0e0", letterSpacing:"1px" }}>
                {cat.label}
              </span>
              <span style={{ fontFamily:"serif", fontSize:"11px", color:"#333" }}>{cat.devanagari}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
