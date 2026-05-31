import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const INCLUDES = [
  "Lakshmi–Ganesh puja",
  "Full havan ceremony",
  "Aarti & prasad",
  "All samagri provided",
];

export default function DiwaliFeatureCard() {
  return (
    <div className="bg-white rounded-card border border-ivory-dark overflow-hidden grid md:grid-cols-2 mb-10 shadow-card">
      {/* Image side */}
      <div className="relative min-h-[260px] md:min-h-[320px]">
        <Image
          src="https://images.unsplash.com/photo-1514454206-a6c1db1aaef8?w=800&h=640&fit=crop"
          alt="Diwali Lakshmi Puja ceremony with diyas, marigold flowers and family gathering"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Diwali badge */}
        <div className="absolute top-4 left-4 bg-marigold text-charcoal text-label-sm font-label font-bold px-3 py-1 rounded-pill">
          🪔 Diwali Special
        </div>
      </div>

      {/* Content side */}
      <div className="p-8 flex flex-col justify-center">
        <p className="font-label text-label-sm text-saffron uppercase tracking-widest mb-2">
          Havan · Festival
        </p>

        <h2 className="font-headline font-bold text-heading-lg text-charcoal leading-snug mb-3">
          Diwali Lakshmi Puja &amp; Havan
        </h2>

        <p className="font-body text-body-md text-charcoal-muted leading-relaxed mb-5">
          Welcome prosperity and light into your home with a traditional Diwali
          Lakshmi puja followed by a purifying havan fire ceremony. Perfect for
          families seeking an authentic celebration.
        </p>

        <ul className="flex flex-col gap-2 mb-6">
          {INCLUDES.map((item) => (
            <li key={item} className="flex items-center gap-2.5 font-label text-label-md text-charcoal-muted">
              <CheckCircle2 size={15} className="text-gold flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-headline font-bold text-heading-lg text-maroon">
              $425
              <span className="font-label text-label-sm text-charcoal-subtle font-normal ml-1">
                / ceremony
              </span>
            </div>
            <div className="font-label text-label-sm text-charcoal-subtle mt-0.5">
              <span className="text-gold">★★★★★</span> 4.9 · 58 reviews · 3 hrs
            </div>
          </div>

          <Link
            href="/book/s9"
            className="bg-maroon text-ivory font-label text-label-md font-medium px-6 py-2.5 rounded-btn hover:bg-maroon-hover transition-colors duration-300"
          >
            Book Puja
          </Link>
        </div>
      </div>
    </div>
  );
}
