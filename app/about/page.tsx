import Button from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen py-20 px-4">
      <div className="layout-container max-w-3xl mx-auto bg-white rounded-card shadow-card p-8 md:p-12 border border-ivory-dark/40 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="font-devanagari text-maroon/[0.02] text-[180px] absolute -top-8 -right-8 select-none pointer-events-none font-bold">सेतु</div>

        <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-6">
          <span className="text-gold">✦</span>
          <span className="font-label text-label-sm text-saffron">Our Story & Mission</span>
        </div>

        <h1 className="font-headline font-bold text-heading-lg md:text-hero-mobile text-charcoal mb-6">
          About Setu
        </h1>

        <div className="space-y-6 font-body text-body-md text-charcoal-muted leading-relaxed">
          <p>
            Welcome to <strong>Setu</strong> (सेतु), which means bridge in Sanskrit. Setu is a sacred connector built to bridge the Indian diaspora across Canada with the authentic spiritual traditions they carry in their hearts.
          </p>
          <p>
            Living far from home often makes it challenging to find verified, knowledgeable spiritual practitioners. Setu solves this by bringing verified Pandit Jis, Jyotish astrologers, and Vastu consultants onto a single, trusted digital platform.
          </p>
          <p>
            Our brand philosophy stands for <em>warmth over minimalism</em>. We believe spiritual interfaces should feel alive, reverent, and abundant. We strictly avoid clinical, sterile designs and pure black (which is inauspicious in ceremony), relying on natural hues of Turmeric Gold, Kesari Saffron, and Sandalwood Brown.
          </p>
          <div className="bg-ivory rounded-btn p-6 border border-gold/15 my-6">
            <h3 className="font-headline font-semibold text-charcoal mb-2">Roots in Motion</h3>
            <p className="font-body text-label-md text-charcoal-subtle">
              Spiritual traditions are not static historical relics; they are fluid, living paths. We help you maintain these roots, no matter where your journey in Canada takes you.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-ivory-dark flex items-center gap-4">
          <Button href="/services">Browse Services</Button>
          <Button href="/" variant="ghost">Return Home</Button>
        </div>
      </div>
    </div>
  );
}
