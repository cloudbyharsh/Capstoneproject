const steps = [
  { number: "01", title: "Browse & Discover",  description: "Search curated spiritual services by category, occasion, or location. Every provider is verified and reviewed." },
  { number: "02", title: "Book Instantly",      description: "Select your date, time, and preferred provider. Provide your address and we handle the rest." },
  { number: "03", title: "Experience Sacred",   description: "Your practitioner arrives prepared. Immerse in tradition — every ceremony is backed by our guarantee." },
];

export default function HowItWorks() {
  return (
    <section style={{ background:"#000", borderTop:"0.5px solid #141414", padding:"80px 0" }}>
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div style={{ textAlign:"center", marginBottom:"60px" }}>
          <p style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"4px", color:"#333", marginBottom:"16px" }}>HOW SETU WORKS</p>
          <h2 style={{ fontFamily:"Times New Roman, serif", fontSize:"23px", fontWeight:"normal", color:"#e0e0e0" }}>Simple. Trusted. Sacred.</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1px", background:"#141414" }}
          className="!grid-cols-1 sm:!grid-cols-3"
        >
          {steps.map((step, i) => (
            <div key={i} style={{ background:"#000", padding:"40px 30px" }}>
              <p style={{ fontFamily:"Times New Roman, serif", fontSize:"40px", fontWeight:"normal", color:"#1a1a1a", lineHeight:1, marginBottom:"20px" }}>{step.number}</p>
              <p style={{ fontFamily:"Times New Roman, serif", fontSize:"16px", color:"#C4922A", marginBottom:"12px", letterSpacing:"0.5px" }}>{step.title}</p>
              <p style={{ fontFamily:"Times New Roman, serif", fontSize:"13px", color:"#575657", lineHeight:"1.7" }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
