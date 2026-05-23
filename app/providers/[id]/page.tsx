import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Globe, ArrowLeft, CheckCircle2 } from "lucide-react";
import { getProvider, getProviderServices } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import ServiceCard from "@/components/services/ServiceCard";

export default function ProviderProfilePage({ params }: { params: { id: string } }) {
  const provider = getProvider(params.id);
  if (!provider) notFound();

  const providerServices = getProviderServices(provider.id);

  return (
    <div className="bg-ivory min-h-screen">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-8">
        <Link href="/services" className="inline-flex items-center gap-2 font-label text-label-md text-charcoal-muted hover:text-charcoal mb-8 transition-colors duration-300">
          <ArrowLeft size={16} />
          Back to Services
        </Link>

        <div className="bg-white rounded-card shadow-card p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={provider.photo}
              alt={provider.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-headline font-bold text-heading-lg text-charcoal">{provider.name}</h1>
                {provider.verified && (
                  <span className="inline-flex items-center gap-1.5 bg-gold/10 text-gold font-label text-label-sm px-3 py-1 rounded-pill border border-gold/20">
                    <CheckCircle2 size={13} />
                    Verified Provider
                  </span>
                )}
              </div>

              <StarRating rating={provider.rating} count={provider.reviewCount} size="md" />

              <div className="flex flex-wrap gap-4 mt-3 text-charcoal-muted">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span className="font-label text-label-md">{provider.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={14} />
                  <span className="font-label text-label-md">{provider.languages.join(", ")}</span>
                </div>
                <div className="font-label text-label-md">
                  {provider.yearsExperience}+ years experience
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {provider.specialties.map((spec) => (
                  <span key={spec} className="bg-ivory border border-ivory-dark font-label text-label-sm text-charcoal-muted px-3 py-1 rounded-pill">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-ivory-dark">
            <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-3">About</h2>
            <p className="font-body text-body-md text-charcoal-muted leading-relaxed">{provider.bio}</p>
          </div>
        </div>

        {providerServices.length > 0 && (
          <div className="mb-10">
            <h2 className="font-headline font-bold text-heading-md text-charcoal mb-6">Services Offered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerServices.map((service) => (
                <ServiceCard key={service.id} service={service} provider={provider} />
              ))}
            </div>
          </div>
        )}

        {provider.reviews.length > 0 && (
          <div>
            <h2 className="font-headline font-bold text-heading-md text-charcoal mb-6">
              Reviews <span className="text-charcoal-subtle font-label text-label-md font-normal">({provider.reviewCount})</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {provider.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-card p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={review.avatar} alt={review.author} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="font-headline font-semibold text-label-md text-charcoal">{review.author}</div>
                      <div className="font-label text-label-sm text-charcoal-subtle">{review.date}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={s <= review.rating ? "text-gold" : "text-charcoal-subtle/20"}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="font-body text-label-md text-charcoal-muted leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
