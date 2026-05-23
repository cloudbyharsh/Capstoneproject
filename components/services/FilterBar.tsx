"use client";

import { CATEGORIES } from "@/lib/utils";

interface FilterBarProps {
  active: string;
  onSelect: (cat: string) => void;
}

export default function FilterBar({ active, onSelect }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`font-label text-label-md px-5 py-2 rounded-pill border transition-all duration-300 ${
            active === cat
              ? "bg-maroon text-ivory border-maroon"
              : "bg-white text-charcoal-muted border-ivory-dark hover:border-saffron/40 hover:text-charcoal"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
