import { CheckCircle2, Calendar, Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; service?: string; date?: string; time?: string; name?: string; price?: string }>;
}) {
  const { ref, service, date, time, name, price } = await searchParams;

  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center py-20">
      <div className="layout-container px-4 mx-auto max-w-layout">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-saffron-tint rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-gold" />
          </div>

          <h1 className="font-headline font-bold text-heading-lg text-charcoal mb-2">Booking Confirmed!</h1>
          <p className="font-body text-body-md text-charcoal-muted mb-8">
            Thank you{name ? `, ${name}` : ""}. Your spiritual experience has been booked.
          </p>

          <div className="bg-white rounded-card shadow-card p-6 text-left mb-6">
            <div className="text-center mb-5 pb-5 border-b border-ivory-dark">
              <div className="font-label text-label-sm text-charcoal-subtle uppercase tracking-widest mb-1">Booking Reference</div>
              <div className="font-headline font-bold text-heading-lg text-maroon">{ref ?? "DEV-XXXXXX"}</div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Service", value: service ?? "—" },
                { label: "Date", value: date ?? "—" },
                { label: "Time", value: time ?? "—" },
                { label: "Total", value: price ? `$${price}` : "—" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center font-label text-label-md">
                  <span className="text-charcoal-subtle">{row.label}</span>
                  <span className="text-charcoal font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-saffron-tint border border-saffron/20 rounded-card p-4 mb-8 text-left">
            <p className="font-label text-label-md text-saffron">
              📧 A confirmation email has been sent. Your practitioner will contact you 24 hours before the ceremony with any preparation details.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/" variant="secondary" size="lg">
              <Home size={17} />
              Back to Home
            </Button>
            <Button href="/services" size="lg">
              <Calendar size={17} />
              Book Another Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
