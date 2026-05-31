import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, MapPin, CheckCircle2, ArrowLeft } from "lucide-react";
import { getService, getProvider } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getService(id);
  if (!service) notFound();

  const provider = getProvider(service.providerId);

  return (
    <div className="bg-ivory min-h-screen">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-8">
        <Link href="/services" className="inline-flex items-center gap-2 font-label text-label-md text-charcoal-muted hover:text-charcoal mb-8 transition-colors duration-300">
          <ArrowLeft size={16} />
          Back to Services
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="relative rounded-card overflow-hidden mb-8">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-72 md:h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge category={service.category}>{service.category}</Badge>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="font-headline font-bold text-heading-lg text-charcoal mb-3">{service.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <StarRating rating={service.rating} count={service.reviewCount} size="md" />
                <div className="flex items-center gap-1.5 text-charcoal-muted">
                  <Clock size={15} />
                  <span className="font-label text-label-md">{service.duration}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-card p-6 shadow-card mb-6">
              <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-3">About this service</h2>
              <p className="font-body text-body-md text-charcoal-muted leading-relaxed">{service.description}</p>
            </div>

            <div className="bg-white rounded-card p-6 shadow-card mb-6">
              <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-4">What&apos;s included</h2>
              <ul className="space-y-3">
                {service.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={17} className="text-gold flex-shrink-0" />
                    <span className="font-body text-body-md text-charcoal-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {provider && (
              <div className="bg-white rounded-card p-6 shadow-card">
                <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-4">Your Provider</h2>
                <div className="flex gap-4">
                  <img
                    src={provider.photo}
                    alt={provider.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-headline font-semibold text-heading-md text-charcoal">{provider.name}</span>
                      {provider.verified && (
                        <span className="bg-gold/10 text-gold font-label text-label-sm px-2 py-0.5 rounded-pill border border-gold/20">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <StarRating rating={provider.rating} count={provider.reviewCount} />
                    <div className="flex items-center gap-1.5 mt-1.5 text-charcoal-subtle">
                      <MapPin size={13} />
                      <span className="font-label text-label-sm">{provider.location}</span>
                    </div>
                    <p className="font-body text-label-md text-charcoal-muted mt-3 line-clamp-3">{provider.bio}</p>
                    <Link href={`/providers/${provider.id}`} className="inline-block mt-2 font-label text-label-sm text-maroon hover:underline">
                      View full profile →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-card shadow-card p-6 mb-4">
                <div className="text-center mb-6">
                  <div className="font-headline font-bold text-[40px] text-charcoal mb-1">${service.price}</div>
                  <div className="font-label text-label-sm text-charcoal-subtle">per ceremony</div>
                </div>

                <Button href={`/book/${service.id}`} size="lg" className="w-full mb-3">
                  Book Now
                </Button>
                <p className="font-label text-label-sm text-charcoal-subtle text-center">
                  Free cancellation up to 48 hours before
                </p>

                <div className="border-t border-ivory-dark mt-5 pt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-md text-charcoal-muted">Duration</span>
                    <span className="font-label text-label-md text-charcoal font-medium">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-md text-charcoal-muted">Rating</span>
                    <span className="font-label text-label-md text-charcoal font-medium">{service.rating} ★</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-md text-charcoal-muted">Reviews</span>
                    <span className="font-label text-label-md text-charcoal font-medium">{service.reviewCount}</span>
                  </div>
                </div>
              </div>

              <div className="bg-saffron-tint border border-saffron/20 rounded-card p-4 text-center">
                <p className="font-label text-label-sm text-saffron">
                  🛡️ All providers are background-checked & verified by our team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
