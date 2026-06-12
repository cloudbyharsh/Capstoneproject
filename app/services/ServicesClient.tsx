"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import FilterBar from "@/components/services/FilterBar";
import ServiceCard from "@/components/services/ServiceCard";
import { Service, Provider } from "@/lib/types";
import { track } from "@/lib/track";

interface ServicesClientProps {
  services: Service[];
  providers: Provider[];
  initialCategory?: string;
}

export default function ServicesClient({ services, providers, initialCategory = "All" }: ServicesClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    track("services_page_viewed", { initialCategory });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    track("service_filter_applied", { category: cat });
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (val.trim().length >= 2) {
      searchTimeout.current = setTimeout(() => {
        track("service_searched", { query: val.trim() });
      }, 600);
    }
  }

  const filtered = services.filter((s) => {
    const matchCat = activeCategory === "All" || s.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = search === "" || s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-subtle" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
          />
        </div>
      </div>

      <FilterBar active={activeCategory} onSelect={handleCategoryChange} />

      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-headline text-heading-md text-charcoal-subtle mb-2">No services found</p>
            <p className="font-body text-body-md text-charcoal-muted">Try adjusting your filters or search.</p>
          </div>
        ) : (
          <>
            <p className="font-label text-label-sm text-charcoal-subtle mb-6">
              {filtered.length} service{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  provider={providers.find((p) => p.id === service.providerId)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
