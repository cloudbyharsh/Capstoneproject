'use client';
import Button from "@/components/ui/Button";

export default function TermsPage() {
  return (
    <div className="bg-ivory min-h-screen py-20 px-4">
      <div className="layout-container max-w-3xl mx-auto bg-white rounded-card shadow-card p-8 md:p-12 border border-ivory-dark/40 relative overflow-hidden">
        <h1 className="font-headline font-bold text-heading-lg text-charcoal mb-6">Terms of Service</h1>
        <div className="space-y-6 font-body text-body-md text-charcoal-muted leading-relaxed">
          <p>Last updated: May 30, 2026</p>
          <p>
            By accessing or using the Setu platform, you agree to comply with and be bound by these Terms of Service.
          </p>
          <h3 className="font-headline font-semibold text-charcoal text-heading-md mt-4">1. Marketplace Platform</h3>
          <p>
            Setu acts as a booking connector between customers and independent spiritual practitioners (Pandits, Astrologers, Vastu Consultants). Practitioners are responsible for the execution of their rituals.
          </p>
          <h3 className="font-headline font-semibold text-charcoal text-heading-md mt-4">2. AI Calculations</h3>
          <p>
            AI-based reports (such as Kundli predictions) are provided for guidance and entertainment purposes only, and do not constitute legal, medical, or financial advice.
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-ivory-dark">
          <Button href="/" variant="ghost">Return Home</Button>
        </div>
      </div>
    </div>
  );
}
