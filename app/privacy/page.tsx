import Button from "@/components/ui/Button";

export default function PrivacyPage() {
  return (
    <div className="bg-ivory min-h-screen py-20 px-4">
      <div className="layout-container max-w-3xl mx-auto bg-white rounded-card shadow-card p-8 md:p-12 border border-ivory-dark/40 relative overflow-hidden">
        <h1 className="font-headline font-bold text-heading-lg text-charcoal mb-6">Privacy Policy</h1>
        <div className="space-y-6 font-body text-body-md text-charcoal-muted leading-relaxed">
          <p>Last updated: May 30, 2026</p>
          <p>
            At Setu, we are committed to protecting your privacy. This policy outlines how we handle personal details (such as names, contact info, and birth date/time/location data used in Kundli calculations).
          </p>
          <h3 className="font-headline font-semibold text-charcoal text-heading-md mt-4">1. Data Collection</h3>
          <p>
            We collect the details you provide when booking spiritual services or calculating a horoscope reading. Birth charts are processed dynamically to generate astronomical summaries.
          </p>
          <h3 className="font-headline font-semibold text-charcoal text-heading-md mt-4">2. Usage</h3>
          <p>
            Your information is used solely to facilitate the booking of spiritual providers and the delivery of digital astrology content. We do not sell your personal data.
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-ivory-dark">
          <Button href="/" variant="ghost">Return Home</Button>
        </div>
      </div>
    </div>
  );
}
