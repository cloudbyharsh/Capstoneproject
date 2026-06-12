import Hero from "@/components/home/Hero";
import CategoryRow from "@/components/home/CategoryRow";
import FeaturedServices from "@/components/home/FeaturedServices";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import PanchangWidget from "@/components/home/PanchangWidget";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryRow />
      <FeaturedServices />
      <HowItWorks />
      <Testimonials />
      <section style={{ background: "#000", borderTop: "0.5px solid #141414", padding: "80px 0" }}>
        <div className="layout-container px-4 md:px-12 mx-auto" style={{ maxWidth: "560px" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Times New Roman, serif", fontSize: "9px", letterSpacing: "4px", color: "#333", marginBottom: "16px" }}>
              &#10022; STAY CONNECTED &#10022;
            </p>
            <h2 style={{ fontFamily: "Times New Roman, serif", fontSize: "23px", fontWeight: "normal", color: "#e0e0e0", marginBottom: "10px" }}>
              Sacred Guidance, Delivered.
            </h2>
            <p style={{ fontFamily: "Times New Roman, serif", fontSize: "14px", color: "#575657", fontStyle: "italic", marginBottom: "32px", lineHeight: "1.6" }}>
              Auspicious dates, ceremony guides, and Vedic insights delivered to your inbox.
            </p>
            <div style={{ textAlign: "left" }} className="sender-form-field" data-sender-form-id="b4xjAk" />
          </div>
        </div>
      </section>
      <PanchangWidget />
    </>
  );
}
