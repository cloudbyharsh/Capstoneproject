import SoulMatchClient from "./SoulMatchClient";

export const metadata = {
  title: "Soul Match · Setu",
  description:
    "Discover the cosmic compatibility between two souls using Vedic numerology. Enter two names and birth dates for an instant reading.",
};

export default function SoulMatchPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-ivory-dark py-12">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout text-center">
          <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-4">
            <span className="text-gold">✦</span>
            <span className="font-label text-label-sm text-saffron">
              आत्मा मिलन · Free Vedic Compatibility Reading
            </span>
          </div>
          <h1 className="font-headline font-bold text-heading-lg md:text-hero-mobile text-charcoal mb-3">
            Soul Match
          </h1>
          <p className="font-body text-body-lg text-charcoal-muted max-w-xl mx-auto">
            Two names. Two birthdates. Ancient Vedic numerology reveals the cosmic
            thread between two souls — instantly.
          </p>
        </div>
      </div>

      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-10">
        <SoulMatchClient />
      </div>

      <div className="bg-white border-t border-ivory-dark py-8 mt-10">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout text-center">
          <p className="font-label text-label-sm text-charcoal-subtle max-w-2xl mx-auto">
            ⚠️ Soul Match readings are for guidance and entertainment purposes only.
            Results are based on classical Vedic numerology principles and should be
            taken as general indications, not guaranteed outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
