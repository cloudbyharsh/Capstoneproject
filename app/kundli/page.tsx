import KundliClient from "./KundliClient";

export default function KundliPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-white border-b border-ivory-dark py-12">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout text-center">
          <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-4">
            <span className="text-gold">✦</span>
            <span className="font-label text-label-sm text-saffron">Free AI Kundli — No sign-up needed</span>
          </div>
          <h1 className="font-headline font-bold text-heading-lg md:text-hero-mobile text-charcoal mb-3">
            Your Free AI Kundli Reading
          </h1>
          <p className="font-body text-body-lg text-charcoal-muted max-w-xl mx-auto">
            Enter your birth details and our AI — trained on classical Vedic Jyotish — will reveal your Ascendant, Moon sign, Mahadasha period, and core life themes in seconds.
          </p>
        </div>
      </div>

      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-10">
        <KundliClient />
      </div>

      <div className="bg-white border-t border-ivory-dark py-8 mt-10">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout text-center">
          <p className="font-label text-label-sm text-charcoal-subtle max-w-2xl mx-auto">
            ⚠️ Setu AI readings are for guidance and entertainment purposes only. They are not a substitute for professional medical, financial, or legal advice. Results are based on classical Vedic Jyotish principles interpreted by AI and should be taken as general indications, not guaranteed outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
