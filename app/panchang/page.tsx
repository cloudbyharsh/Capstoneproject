import { getPanchang } from "@/lib/panchang";
import Link from "next/link";
import { Calendar, Sun, Moon, Clock, AlertTriangle } from "lucide-react";

export const revalidate = 3600;

export default function PanchangPage() {
  const p = getPanchang();

  const primaryItems = [
    { label: "Tithi",    value: p.tithi,    sub: `${p.paksha} Paksha · ${p.tithiNumber}/15`, icon: "🌓" },
    { label: "Nakshatra",value: p.nakshatra,sub: `#${p.nakshatraNumber} of 27`,              icon: "⭐" },
    { label: "Yoga",     value: p.yoga,     sub: "Daily yoga",                               icon: "🔮" },
    { label: "Karana",   value: p.karana,   sub: "Half-tithi",                               icon: "🌺" },
    { label: "Vara",     value: p.vara,     sub: `Lord: ${p.varaLord} ${p.varaIcon}`,        icon: "📅" },
  ];

  const timeItems = [
    { label: "Sunrise",  value: p.sunrise,  icon: <Sun  size={16} className="text-gold" /> },
    { label: "Sunset",   value: p.sunset,   icon: <Sun  size={16} className="text-saffron" /> },
    { label: "Moonrise", value: p.moonrise, icon: <Moon size={16} className="text-charcoal-muted" /> },
    { label: "Moonset",  value: p.moonset,  icon: <Moon size={16} className="text-charcoal-subtle" /> },
  ];

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-white border-b border-ivory-dark py-12">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout text-center">
          <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-4">
            <Calendar size={13} className="text-saffron" />
            <span className="font-label text-label-sm text-saffron">Updated daily · Toronto timezone</span>
          </div>
          <h1 className="font-headline font-bold text-heading-lg md:text-hero-mobile text-charcoal mb-2">
            Aaj ka Panchang
          </h1>
          <p className="font-body text-body-md text-charcoal-muted">{p.date}</p>
        </div>
      </div>

      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-10">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {primaryItems.map((item) => (
            <div key={item.label} className="bg-white rounded-card shadow-card p-5 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-label text-label-sm text-charcoal-subtle uppercase tracking-widest mb-1">{item.label}</div>
              <div className="font-headline font-bold text-label-md text-charcoal mb-0.5">{item.value}</div>
              <div className="font-label text-label-sm text-charcoal-subtle">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-card shadow-card p-6">
            <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-5 flex items-center gap-2">
              <Clock size={18} className="text-gold" /> Timings
            </h2>
            <div className="space-y-3">
              {timeItems.map((t) => (
                <div key={t.label} className="flex items-center justify-between py-2 border-b border-ivory-dark last:border-0">
                  <div className="flex items-center gap-2">
                    {t.icon}
                    <span className="font-label text-label-md text-charcoal-muted">{t.label}</span>
                  </div>
                  <span className="font-headline font-semibold text-label-md text-charcoal">{t.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-card shadow-card p-6">
            <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-5 flex items-center gap-2">
              ✨ Auspicious Timings
            </h2>
            <div className="space-y-4">
              <div className="bg-gold/10 border border-gold/20 rounded-btn p-4">
                <div className="font-label text-label-sm text-gold uppercase tracking-widest mb-1">Abhijit Muhurta</div>
                <div className="font-headline font-bold text-heading-md text-charcoal">{p.abhijitMuhurta}</div>
                <div className="font-label text-label-sm text-charcoal-subtle mt-1">
                  Most auspicious daily window -- ideal for new beginnings
                </div>
              </div>
              <div className="bg-error/5 border border-error/15 rounded-btn p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertTriangle size={13} className="text-error" />
                  <div className="font-label text-label-sm text-error uppercase tracking-widest">Rahu Kalam</div>
                </div>
                <div className="font-headline font-bold text-heading-md text-charcoal">{p.rahuKalam}</div>
                <div className="font-label text-label-sm text-charcoal-subtle mt-1">
                  Avoid starting new work during this period
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-6 mb-8">
          <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-4">Planetary Positions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between bg-ivory rounded-btn px-4 py-3">
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-gold" />
                <span className="font-label text-label-md text-charcoal-muted">Sun (Surya)</span>
              </div>
              <span className="font-headline font-semibold text-label-md text-charcoal">{p.sunLongitude}deg</span>
            </div>
            <div className="flex items-center justify-between bg-ivory rounded-btn px-4 py-3">
              <div className="flex items-center gap-2">
                <Moon size={16} className="text-charcoal-muted" />
                <span className="font-label text-label-md text-charcoal-muted">Moon (Chandra)</span>
              </div>
              <span className="font-headline font-semibold text-label-md text-charcoal">{p.moonLongitude}deg</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-maroon to-maroon-light rounded-card p-6 text-center text-ivory">
          <p className="font-headline font-semibold text-heading-md mb-2">Want a Personalised Reading?</p>
          <p className="font-body text-label-md text-ivory/80 mb-4">
            Your birth Nakshatra interacts uniquely with today&apos;s Panchang. Find out what it means for you.
          </p>
          <Link
            href="/kundli"
            className="inline-flex items-center gap-2 bg-gold text-charcoal font-label text-label-md px-6 py-2.5 rounded-pill hover:bg-gold/90 transition-all duration-300"
          >
            Get Your Free AI Kundli
          </Link>
        </div>

        <p className="font-label text-label-sm text-charcoal-subtle text-center mt-6">
          Calculations based on astronomical data for Toronto (43.65 N, 79.38 W).
        </p>
      </div>
    </div>
  );
}
