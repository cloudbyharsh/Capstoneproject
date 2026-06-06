import Link from "next/link";
import Image from "next/image";
import { MapPin, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { providers } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";

export default function ProvidersPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-ivory-dark py-12">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout text-center">
          <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-4">
            <span className="text-gold">✦</span>
            <span className="font-label text-label-sm text-saffron">All verified by our ops team</span>
          </div>
          <h1 className="font-headline font-bold text-heading-lg md:text-hero-mobile text-charcoal mb-3">
            Our Verified Practitioners
          </h1>
          <p className="font-body text-body-lg text-charcoal-muted max-w-xl mx-auto">
            Every pandit, astrologer, and spiritual guide on Setu has been personally vetted — credentials checked, references confirmed, and ritual knowledge verified.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-maroon">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
          <div className="grid grid-cols-3 divide-x divide-ivory/10 py-5">
            {[
              { number: `${providers.length}+`, label: "Verified Providers" },
              { number: "4.8★", label: "Average Rating" },
              { number: "500+", label: "Ceremonies Completed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <div className="font-headline font-bold text-heading-md text-gold">{stat.number}</div>
                <div className="font-label text-label-sm text-ivory/70 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Provider grid */}
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Link key={provider.id} href={`/providers/${provider.id}`} className="block group">
              <div className="bg-white rounded-card shadow-card hover:shadow-card-hover border border-ivory-dark hover:border-saffron/30 transition-all duration-300 overflow-hidden h-full flex flex-col">

                {/* Photo header */}
                <div className="relative h-52 bg-ivory-dark overflow-hidden">
                  <Image
                    src={provider.photo}
                    alt={provider.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {provider.verified && (
                    <div className="absolute top-3 right-3 bg-white/95 rounded-pill px-2.5 py-1 flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-gold" />
                      <span className="font-label text-label-sm text-charcoal font-semibold">Verified</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-headline font-bold text-heading-md text-charcoal mb-1 group-hover:text-maroon transition-colors duration-300">
                    {provider.name}
                  </h2>

                  <StarRating rating={provider.rating} count={provider.reviewCount} />

                  <div className="flex flex-wrap gap-3 mt-3 text-charcoal-muted">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      <span className="font-label text-label-sm">{provider.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe size={13} />
                      <span className="font-label text-label-sm">{provider.languages.slice(0, 2).join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 flex-1">
                    {provider.specialties.slice(0, 3).map((spec) => (
                      <span key={spec} className="bg-ivory border border-ivory-dark font-label text-label-sm text-charcoal-muted px-2.5 py-0.5 rounded-pill">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p className="font-body text-label-md text-charcoal-muted mt-3 line-clamp-2 leading-relaxed">
                    {provider.bio}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-ivory-dark">
                    <span className="font-label text-label-sm text-charcoal-subtle">
                      {provider.yearsExperience}+ yrs experience
                    </span>
                    <span className="font-label text-label-sm font-semibold text-saffron bg-saffron-tint px-3 py-1.5 rounded-btn flex items-center gap-1.5 group-hover:bg-saffron group-hover:text-white transition-colors duration-300">
                      View Profile <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="bg-white border-t border-ivory-dark py-14 mt-4">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout text-center">
          <h2 className="font-headline font-bold text-heading-lg text-charcoal mb-3">
            Are you a Pandit or Spiritual Practitioner?
          </h2>
          <p className="font-body text-body-md text-charcoal-muted max-w-md mx-auto mb-6">
            Join Setu&apos;s verified network and connect with families across the GTA who are actively searching for practitioners like you.
          </p>
          <Link
            href="/providers/join"
            className="inline-flex items-center gap-2 bg-maroon text-ivory font-label text-label-md px-7 py-3 rounded-pill hover:bg-maroon-hover transition-all duration-300 hover:shadow-gold-glow"
          >
            Apply to Join <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
