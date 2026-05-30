import Button from "@/components/ui/Button";

export default function JoinProviderPage() {
  return (
    <div className="bg-ivory min-h-screen py-20 px-4">
      <div className="layout-container max-w-2xl mx-auto bg-white rounded-card shadow-card p-8 md:p-12 border border-ivory-dark/40 relative overflow-hidden">
        <div className="font-devanagari text-maroon/[0.02] text-[180px] absolute -top-8 -right-8 select-none pointer-events-none font-bold">आचार्य</div>

        <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-6">
          <span className="text-gold">✦</span>
          <span className="font-label text-label-sm text-saffron">Become a Setu Partner</span>
        </div>

        <h1 className="font-headline font-bold text-heading-lg md:text-hero-mobile text-charcoal mb-4">
          Join Setu as a Practitioner
        </h1>
        <p className="font-body text-body-md text-charcoal-muted leading-relaxed mb-6">
          Are you an experienced Pandit Ji, Jyotish practitioner, or Vastu consultant living in Canada? Join Setu to connect with Hindu families seeking your spiritual expertise. We manage the scheduling, booking, and administrative work so you can focus on carrying forward sacred traditions.
        </p>

        <div className="space-y-4 my-8 bg-ivory/50 rounded-btn p-6 border border-gold/10">
          <h3 className="font-headline font-semibold text-charcoal text-body-lg">Why partner with Setu?</h3>
          <ul className="space-y-2 font-body text-body-md text-charcoal-muted list-disc ml-5">
            <li><strong>Verified Trust</strong>: Establish authority with a verified profile.</li>
            <li><strong>Seamless Bookings</strong>: Customers book according to your exact calendar availability.</li>
            <li><strong>Administrative Ease</strong>: Automatic invoicing, details management, and local directions.</li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Button href="/contact">Apply to Join</Button>
          <Button href="/" variant="ghost">Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
