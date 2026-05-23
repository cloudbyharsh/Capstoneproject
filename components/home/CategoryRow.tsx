import Link from "next/link";

const categories = [
  { label: "Puja", icon: "🪔", slug: "puja" },
  { label: "Astrology", icon: "🌙", slug: "astrology" },
  { label: "Vastu", icon: "🏡", slug: "vastu" },
  { label: "Meditation", icon: "🧘", slug: "meditation" },
  { label: "Havan", icon: "🔥", slug: "havan" },
];

export default function CategoryRow() {
  return (
    <section className="bg-white border-y border-ivory-dark py-10">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="flex items-center justify-between mb-6">
          <p className="font-label text-label-md text-charcoal-subtle uppercase tracking-widest">Browse by category</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/services?category=${cat.slug}`}
              className="flex items-center gap-2.5 bg-ivory hover:bg-saffron-tint border border-ivory-dark hover:border-saffron/30 rounded-pill px-5 py-2.5 transition-all duration-300 group"
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="font-label text-label-md text-charcoal group-hover:text-saffron transition-colors duration-300">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
