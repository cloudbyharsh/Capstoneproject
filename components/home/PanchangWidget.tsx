import Link from "next/link";
import { getPanchang } from "@/lib/panchang";
import { ArrowRight } from "lucide-react";

export default function PanchangWidget() {
  const p = getPanchang();

  const panchangItems = [
    { label: "Tithi", devanagari: "तिथि", value: `${p.tithi} · ${p.paksha} Paksha` },
    { label: "Nakshatra", devanagari: "नक्षत्र", value: p.nakshatra },
    { label: "Yoga", devanagari: "योग", value: p.yoga },
    { label: "Sunrise", devanagari: "सूर्योदय", value: p.sunrise },
    { label: "Rahu Kalam", devanagari: "राहुकाल", value: p.rahuKalam },
  ];

  return (
    <section className="bg-charcoal py-8 relative overflow-hidden border-y border-gold/25">
      {/* Background Subtle Mandala Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.03] text-gold pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50,5 L50,95 M5,50 L95,50" stroke="currentColor" strokeWidth="0.25" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx="50" cy="50" r={10 + i * 5} fill="none" stroke="currentColor" strokeWidth="0.2" />
          ))}
        </svg>
      </div>

      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="bg-white/[0.03] backdrop-blur-sm border border-gold/15 rounded-card p-6 md:py-5 md:px-8 flex flex-col lg:flex-row lg:items-center gap-6 shadow-2xl">
          {/* Calendar Header with Sunrise/Sunset graphic */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-saffron flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 animate-pulse">
                <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                <path d="M14 8.5a4 4 0 0 1-3.5 3.5" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className="font-devanagari text-[10px] text-gold uppercase tracking-wider">आज का पंचांग</div>
              <div className="font-label text-label-xs text-ivory/50 uppercase tracking-widest">Aaj Ka Panchang</div>
              <div className="font-headline font-semibold text-ivory text-body-md md:text-label-md mt-0.5">{p.date}</div>
            </div>
          </div>

          <div className="w-full lg:w-px bg-gold/15 h-px lg:h-12 self-stretch" />

          {/* Panchang values with Devanagari descriptors */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap gap-x-8 gap-y-4 flex-1">
            {panchangItems.map((item) => (
              <div key={item.label} className="group hover:translate-y-[-1px] transition-transform duration-300">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-devanagari text-[12px] text-gold/80">{item.devanagari}</span>
                  <span className="font-label text-[10px] text-ivory/40 uppercase tracking-wider">({item.label})</span>
                </div>
                <div className="font-label text-label-md text-ivory font-medium group-hover:text-gold transition-colors duration-300">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-px bg-gold/15 h-px lg:h-12 self-stretch" />

          {/* Quick link button */}
          <Link
            href="/panchang"
            className="flex-shrink-0 inline-flex items-center gap-1.5 font-label text-label-md text-gold hover:text-saffron hover:gap-2.5 transition-all duration-300 self-start lg:self-center"
          >
            Full Panchang
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
