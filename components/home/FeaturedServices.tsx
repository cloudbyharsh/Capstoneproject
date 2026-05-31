import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";
import DiwaliFeatureCard from "@/components/home/DiwaliFeatureCard";
import { getFeaturedServices, getProvider } from "@/lib/utils";

export default function FeaturedServices() {
  const featured = getFeaturedServices().slice(0, 6);

  return (
    <section className="section-pad bg-ivory">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-label text-label-sm text-saffron uppercase tracking-widest mb-2">
              Featured This Season
            </p>
            <h2 className="font-headline font-bold text-heading-lg text-charcoal">
              Services We Love
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden md:flex items-center gap-1.5 font-label text-label-md text-maroon hover:gap-2.5 transition-all duration-300"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Diwali hero card */}
        <DiwaliFeatureCard />

        {/* Featured service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              provider={getProvider(service.providerId)}
            />
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 font-label text-label-md text-maroon"
          >
            View all services
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
