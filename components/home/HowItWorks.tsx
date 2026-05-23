const steps = [
  {
    icon: "🔍",
    number: "01",
    title: "Browse & Discover",
    description: "Search curated spiritual services by category, occasion, or location. Every provider is verified and reviewed.",
  },
  {
    icon: "📅",
    number: "02",
    title: "Book Instantly",
    description: "Select your date, time, and preferred provider. Provide your address and we handle the rest.",
  },
  {
    icon: "✨",
    number: "03",
    title: "Experience the Sacred",
    description: "Your practitioner arrives prepared. Immerse in tradition with confidence — every ceremony is backed by our quality guarantee.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-white">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="text-center mb-14">
          <p className="font-label text-label-sm text-saffron uppercase tracking-widest mb-2">Simple. Trusted. Sacred.</p>
          <h2 className="font-headline font-bold text-heading-lg text-charcoal mb-4">How Setu Works</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-saffron-tint rounded-full text-2xl mb-5 mx-auto">
                {step.icon}
              </div>
              <div className="font-label text-label-sm text-gold uppercase tracking-widest mb-2">{step.number}</div>
              <h3 className="font-headline font-semibold text-heading-md text-charcoal mb-3">{step.title}</h3>
              <p className="font-body text-body-md text-charcoal-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
