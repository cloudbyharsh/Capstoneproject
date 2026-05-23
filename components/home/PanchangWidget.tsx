import Link from "next/link";
import { getPanchang } from "@/lib/panchang";
import { ArrowRight } from "lucide-react";

export default function PanchangWidget() {
  const p = getPanchang();

  return (
    <section className="bg-charcoal py-8">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="font-label text-label-sm text-ivory/40 uppercase tracking-widest mb-0.5">Aaj ka Panchang</div>
            <div className="font-headline font-semibold text-ivory text-label-md">{p.date}</div>
          </div>

          <div className="w-px bg-ivory/10 hidden md:block self-stretch" />

          <div className="flex flex-wrap gap-x-8 gap-y-3 flex-1">
            {[
              { label: "Tithi", value: `${p.tithi} · ${p.paksha} Paksha` },
              { label: "Nakshatra", value: p.nakshatra },
              { label: "Yoga", value: p.yoga },
              { label: "Sunrise", value: p.sunrise },
              { label: "Rahu Kalam", value: p.rahuKalam },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-label text-label-sm text-ivory/40 uppercase tracking-widest">{item.label}</div>
                <div className="font-label text-label-md text-ivory font-medium">{item.value}</div>
              </div>
            ))}
          </div>

          <Link
            href="/panchang"
            className="flex-shrink-0 inline-flex items-center gap-1.5 font-label text-label-sm text-gold hover:gap-2.5 transition-all duration-300"
          >
            Full Panchang
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
