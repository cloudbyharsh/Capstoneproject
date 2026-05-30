const steps = [
  {
    icon: "🔍",
    number: "01",
    sanskrit: "१. अन्वेषण",
    title: "Browse & Discover",
    description: "Search curated spiritual services by category, occasion, or location. Every provider is verified and reviewed.",
  },
  {
    icon: "📅",
    number: "02",
    sanskrit: "२. आरक्षण",
    title: "Book Instantly",
    description: "Select your date, time, and preferred provider. Provide your address and we handle the rest.",
  },
  {
    icon: "✨",
    number: "03",
    sanskrit: "३. अनुभव",
    title: "Experience Sacred",
    description: "Your practitioner arrives prepared. Immerse in tradition with confidence — every ceremony is backed by our guarantee.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      {/* Background Mandala Watermark */}
      <div className="absolute left-0 bottom-0 w-64 h-64 opacity-[0.02] text-maroon pointer-events-none translate-x-[-30%] translate-y-[30%]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 40 * Math.cos((i * Math.PI) / 8)}
              y2={50 + 40 * Math.sin((i * Math.PI) / 8)}
              stroke="currentColor"
              strokeWidth="0.25"
            />
          ))}
        </svg>
      </div>

      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout relative z-10">
        <div className="text-center mb-16">
          <p className="font-label text-label-sm text-saffron uppercase tracking-widest mb-2">Simple. Trusted. Sacred.</p>
          <h2 className="font-headline font-bold text-heading-lg text-charcoal mb-4">How Setu Works</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting dashed line (horizontal on desktop) */}
          <div className="hidden md:block absolute top-[68px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10 border-t border-dashed border-gold/45 z-0" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative text-center p-8 bg-ivory/30 border border-ivory-dark/40 hover:border-gold/30 rounded-card transition-all duration-300 transform hover:-translate-y-1 hover:shadow-card-hover group z-10 bg-white"
            >
              {/* Step circle container */}
              <div className="relative w-20 h-20 bg-saffron-tint rounded-full flex items-center justify-center text-3xl mb-6 mx-auto border border-saffron/10 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {step.icon}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-maroon text-ivory text-[10px] font-label font-bold flex items-center justify-center border border-white">
                  {step.number}
                </div>
              </div>

              <div className="flex flex-col items-center mb-2">
                <span className="font-devanagari text-label-sm text-saffron tracking-wider font-semibold mb-0.5">{step.sanskrit}</span>
                <h3 className="font-headline font-semibold text-heading-md text-charcoal">{step.title}</h3>
              </div>

              <p className="font-body text-body-md text-charcoal-subtle leading-relaxed mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
