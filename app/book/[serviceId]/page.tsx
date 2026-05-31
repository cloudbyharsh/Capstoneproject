import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getService, getProvider } from "@/lib/utils";
import BookingClient from "./BookingClient";

export default async function BookingPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const service = getService(serviceId);
  if (!service) notFound();

  const provider = getProvider(service.providerId);

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-white border-b border-ivory-dark py-6">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
          <h1 className="font-headline font-bold text-heading-lg text-charcoal">Book Your Service</h1>
          <p className="font-body text-body-md text-charcoal-muted mt-1">Complete the steps below to confirm your booking.</p>
        </div>
      </div>
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-10">
        <Link href={`/services/${service.id}`} className="inline-flex items-center gap-2 font-label text-label-md text-charcoal-muted hover:text-charcoal mb-8 transition-colors duration-300">
          <ArrowLeft size={16} />
          Back to service
        </Link>
        <BookingClient service={service} provider={provider} />
      </div>
    </div>
  );
}
