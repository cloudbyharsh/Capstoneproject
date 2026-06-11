import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedServices, getProvider } from "@/lib/utils";

function DarkServiceCard({ service, provider }: { service: ReturnType<typeof getFeaturedServices>[0]; provider: ReturnType<typeof getProvider> }) {
  const priceStr = `$${service.price}`;
  return (
    <Link href={`/services/${service.id}`} style={{
      background:"#141414", border:"0.5px solid #1e1e1e", padding:"24px",
      display:"flex", flexDirection:"column", gap:"12px", textDecoration:"none",
      transition:"border-color 0.2s",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#333"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1e1e1e"; }}
    >
      <p style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"3px", color:"#444", textTransform:"uppercase" }}>{service.category}</p>
      <h3 style={{ fontFamily:"Times New Roman, serif", fontSize:"16px", color:"#e0e0e0", lineHeight:"1.3" }}>{service.title}</h3>
      <p style={{ fontFamily:"Times New Roman, serif", fontSize:"12px", color:"#575657", lineHeight:"1.6", flexGrow:1 }}>{service.description.slice(0, 90)}...</p>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"12px", borderTop:"0.5px solid #1a1a1a" }}>
        <span style={{ fontFamily:"Times New Roman, serif", fontSize:"14px", color:"#C4922A" }}>{priceStr}</span>
        <span style={{ fontFamily:"Times New Roman, serif", fontSize:"11px", color:"#444", letterSpacing:"1px" }}>{service.duration}</span>
      </div>
      {provider && <p style={{ fontFamily:"Times New Roman, serif", fontSize:"10px", color:"#333", letterSpacing:"1px" }}>{provider.name}</p>}
    </Link>
  );
}

export default function FeaturedServices() {
  const featured = getFeaturedServices().slice(0, 6);
  return (
    <section style={{ background:"#000", borderTop:"0.5px solid #141414", padding:"80px 0" }}>
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"40px" }}>
          <div>
            <p style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"4px", color:"#333", marginBottom:"10px" }}>FEATURED THIS SEASON</p>
            <h2 style={{ fontFamily:"Times New Roman, serif", fontSize:"23px", fontWeight:"normal", color:"#e0e0e0" }}>Services We Love</h2>
          </div>
          <Link href="/services" style={{ fontFamily:"Times New Roman, serif", fontSize:"11px", letterSpacing:"2px", color:"#C4922A", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>
            VIEW ALL <ArrowRight size={13} />
          </Link>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1px", background:"#141414" }}
          className="!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3"
        >
          {featured.map(service => (
            <DarkServiceCard key={service.id} service={service} provider={getProvider(service.providerId)} />
          ))}
        </div>
      </div>
    </section>
  );
}
