const testimonials = [
  { quote: "Pandit Ravi performed our son's Namkaran with such devotion and clarity. Every detail was perfect. Setu made it effortless.", author: "Anita Sharma", role: "Namkaran Ceremony" },
  { quote: "I've been in Canada 15 years and always struggled to find authentic practitioners. The astrology session with Acharya Deepak was life-changing.", author: "Rahul Bhatia", role: "Vedic Astrology Consultation" },
  { quote: "Swami Prakash's Diwali havan brought our whole family together in a way we hadn't felt since moving here. This is exactly what the diaspora needs.", author: "Kavitha Menon", role: "Diwali Havan Ceremony" },
  { quote: "The Vastu consultation was incredibly practical. The changes we made really shifted the energy of the space.", author: "Vijay Nair", role: "Office Vastu Assessment" },
];

export default function Testimonials() {
  return (
    <section style={{ background:"#000", borderTop:"0.5px solid #141414", padding:"80px 0" }}>
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <p style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"4px", color:"#333", textAlign:"center", marginBottom:"60px" }}>
          WHAT FAMILIES SAY
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:"#141414" }}
          className="!grid-cols-1 md:!grid-cols-2"
        >
          {testimonials.map((t, i) => (
            <div key={i} style={{ background:"#000", padding:"40px 32px" }}>
              <blockquote style={{ fontFamily:"Times New Roman, serif", fontSize:"14px", color:"#888", lineHeight:"1.8", fontStyle:"italic", marginBottom:"24px" }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:"20px", height:"0.5px", background:"#C4922A", opacity:0.5 }} />
                <div>
                  <p style={{ fontFamily:"Times New Roman, serif", fontSize:"11px", color:"#e0e0e0", letterSpacing:"1px" }}>{t.author}</p>
                  <p style={{ fontFamily:"Times New Roman, serif", fontSize:"10px", color:"#333", marginTop:"2px" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
