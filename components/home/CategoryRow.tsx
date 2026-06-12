import Link from "next/link";

const categories = [
  {
    label: "Puja",
    devanagari: "पूजा",
    icon: "🪔",
    slug: "puja",
    desc: "Sacred home & temple rituals",
    colorStyle: "bg-[#FDF8EE] hover:bg-[#FBEFD5] text-[#C4922A] border-[#C4922A]/20 hover:border-[#C4922A]"
  },
  {
    label: "Astrology",
    devanagari: "ज्योतिष",
    icon: "🌙",
    slug: "astrology",
    desc: "Vedic chart & dasha readings",
    colorStyle: "bg-saffron-tint hover:bg-saffron-light/25 text-saffron border-saffron/20 hover:border-saffron"
  },
  {
    label: "Vastu",
    devanagari: "वास्तु",
    icon: "🏡",
    slug: "vastu",
    desc: "Harmonizing home & workspace",
    colorStyle: "bg-[#FAF7F0] hover:bg-[#F0E8DC] text-charcoal border-charcoal/10 hover:border-charcoal/40"
  },
  {
    label: "Meditation",
    devanagari: "ध्यान",
    icon: "🧘",
    slug: "meditation",
    desc: "Guided mantra & breathwork",
    colorStyle: "bg-[#F3FAF8] hover:bg-[#D4EDE8]/40 text-teal border-teal/20 hover:border-teal"
  },
  {
    label: "Havan",
    devanagari: "हवन",
    icon: "🔥",
    slug: "havan",
    desc: "Purifying fire ceremonies",
    colorStyle: "bg-[#FCF5F8] hover:bg-[#F5E0EB]/40 text-lotus border-lotus/20 hover:border-lotus"
  },
];

export default function CategoryRow() {
  return (
    <section className="bg-white border-y border-ivory-dark py-16">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="text-center mb-10">
          <p className="font-label text-label-sm text-saffron uppercase tracking-widest mb-2">Sacred Pathways</p>
          <h2 className="font-headline font-bold text-heading-lg text-charcoal">Browse by Spiritual Path</h2>
          <div className="gold-divider mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/services?category=${cat.slug}`}
              className={`flex flex-col items-center text-center p-6 rounded-card border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-card-hover group ${cat.colorStyle}`}
            >
              {/* Animated Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>

              {/* Dual-language Title */}
              <span className="font-devanagari text-label-sm opacity-60 mb-0.5">{cat.devanagari}</span>
              <h3 className="font-headline font-semibold text-heading-sm text-charcoal group-hover:text-inherit transition-colors duration-300">
                {cat.label}
              </h3>

              <p className="font-body text-label-xs text-charcoal-subtle mt-2 line-clamp-2">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
