"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { Service, Provider } from "@/lib/types";

const CATEGORY_ICONS: Record<string, string> = {
  Puja: "🪔",
  Astrology: "🌙",
  Vastu: "🏡",
  Meditation: "🧘",
  Havan: "🔥",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  Puja: "from-amber-50 to-orange-100",
  Astrology: "from-indigo-50 to-purple-100",
  Vastu: "from-green-50 to-emerald-100",
  Meditation: "from-teal-50 to-cyan-100",
  Havan: "from-red-50 to-orange-100",
};

interface ServiceCardProps {
  service: Service;
  provider?: Provider;
}

export default function ServiceCard({ service, provider }: ServiceCardProps) {
  const icon = CATEGORY_ICONS[service.category] ?? "🕉️";
  const gradient = CATEGORY_GRADIENTS[service.category] ?? "from-amber-50 to-yellow-100";

  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const target = e.currentTarget;
    target.style.display = "none";
    const fallback = target.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = "flex";
  }

  function handleAvatarError(e: React.SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.style.display = "none";
  }

  return (
    <Link href={`/services/${service.id}`} className="block group">
      <div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden h-52">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImgError}
          />
          {/* Fallback shown when image fails to load */}
          <div
            style={{ display: "none" }}
            className={`w-full h-full items-center justify-center bg-gradient-to-br ${gradient} absolute inset-0`}
          >
            <span className="text-6xl">{icon}</span>
          </div>
          <div className="absolute top-3 left-3">
            <Badge category={service.category}>{service.category}</Badge>
          </div>
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-pill px-3 py-1">
            <span className="font-headline font-bold text-label-md text-charcoal">${service.price}</span>
          </div>
        </div>

        <div className="p-card-pad flex flex-col flex-1">
          <h3 className="font-headline font-semibold text-heading-md text-charcoal mb-2 group-hover:text-maroon transition-colors duration-300">
            {service.title}
          </h3>

          <p className="font-body text-label-md text-charcoal-muted line-clamp-2 mb-4 flex-1">
            {service.description}
          </p>

          <div className="flex items-center gap-4 mb-3">
            <StarRating rating={service.rating} count={service.reviewCount} />
            <div className="flex items-center gap-1 text-charcoal-subtle">
              <Clock size={13} />
              <span className="font-label text-label-sm">{service.duration}</span>
            </div>
          </div>

          {provider && (
            <div className="flex items-center gap-2 pt-3 border-t border-ivory-dark">
              <img
                src={provider.photo}
                alt={provider.name}
                className="w-7 h-7 rounded-full object-cover"
                onError={handleAvatarError}
              />
              <span className="font-label text-label-sm text-charcoal-muted">{provider.name}</span>
              {provider.verified && (
                <span className="ml-auto text-gold text-label-sm">✓ Verified</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
