"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import { Service, Provider } from "@/lib/types";

const CATEGORY_ICONS: Record<string, string> = {
  Puja: "🪔",
  Astrology: "🌙",
  Vastu: "🏡",
  Meditation: "🧘",
  Havan: "🔥",
};

const CATEGORY_COLORS: Record<string, string> = {
  Puja:       "bg-saffron-tint text-saffron",
  Astrology:  "bg-teal-light text-teal",
  Vastu:      "bg-ivory-dark text-charcoal-muted",
  Meditation: "bg-teal-light text-teal",
  Havan:      "bg-lotus-light text-lotus",
};

interface ServiceCardProps {
  service: Service;
  provider?: Provider;
}

export default function ServiceCard({ service, provider }: ServiceCardProps) {
  const icon = CATEGORY_ICONS[service.category] ?? "🕉️";
  const catColor = CATEGORY_COLORS[service.category] ?? "bg-ivory-dark text-charcoal-muted";

  return (
    <Link href={`/services/${service.id}`} className="block group">
      <div className="bg-white rounded-card border border-ivory-dark hover:border-saffron/30 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden h-full flex flex-col">

        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-ivory-dark">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category pill — bottom left */}
          <div className={`absolute bottom-3 left-3 font-label text-label-sm font-semibold px-3 py-1 rounded-pill ${catColor}`}>
            {service.category}
          </div>
          {/* Price — top right */}
          <div className="absolute top-3 right-3 bg-white/95 rounded-pill px-3 py-1">
            <span className="font-headline font-bold text-label-md text-charcoal">
              ${service.price}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-headline font-semibold text-heading-sm text-charcoal mb-2 group-hover:text-maroon transition-colors duration-300 line-clamp-2">
            {service.title}
          </h3>
          <p className="font-body text-label-md text-charcoal-muted line-clamp-2 mb-4 flex-1 leading-relaxed">
            {service.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={service.rating} count={service.reviewCount} />
            <div className="flex items-center gap-1 text-charcoal-subtle">
              <Clock size={12} />
              <span className="font-label text-label-sm">{service.duration}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-ivory-dark">
            {provider ? (
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-ivory-dark flex-shrink-0">
                  <Image
                    src={provider.photo}
                    alt={provider.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <span className="font-label text-label-sm text-charcoal-muted truncate">
                  {provider.name}
                </span>
              </div>
            ) : (
              <div />
            )}
            <span className="font-label text-label-sm font-semibold text-saffron bg-saffron-tint px-3 py-1.5 rounded-btn flex-shrink-0 group-hover:bg-saffron group-hover:text-white transition-colors duration-300">
              Book →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
