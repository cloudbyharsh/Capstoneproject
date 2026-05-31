"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Shield, MapPin } from "lucide-react";
import RotatingMandala from "./RotatingMandala";

const STATS = [
  { value: "50+", label: "Verified Pandits" },
  { value: "2K+", label: "Ceremonies Performed" },
  { value: "4.9★", label: "Average Rating" },
];

export default function Hero() {
  return (
    <section className="bg-white border-b border-ivory-dark overflow-hidden">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-6">
              <Star size={12} className="fill-gold text-gold" />
              <span className="font-label text-label-sm text-saffron">
                Trusted by 2,000+ Hindu families in Canada
              </span>
            </div>

            <h1 className="font-headline font-bold text-hero-mobile md:text-hero text-charcoal leading-tight mb-5 text-balance">
              Authentic Vedic Rituals for{" "}
              <span className="text-maroon">Modern Families</span>
            </h1>

            <p className="font-body text-body-lg text-charcoal-muted leading-relaxed mb-8 max-w-lg">
              Book verified Pandit Jis, astrologers, and Vastu consultants across Canada.
              Authentic ceremonies — at home or online.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-maroon text-ivory font-label text-label-md font-medium px-6 py-3 rounded-btn hover:bg-maroon-hover transition-colors duration-300"
              >
                Browse Services
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/providers"
                className="inline-flex items-center gap-2 bg-ivory border border-ivory-dark text-charcoal font-label text-label-md font-medium px-6 py-3 rounded-btn hover:border-charcoal/30 transition-colors duration-300"
              >
                Meet Our Pandits
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5 text-charcoal-subtle">
                <Shield size={14} className="text-teal" />
                <span className="font-label text-label-sm">Background-verified providers</span>
              </div>
              <div className="flex items-center gap-1.5 text-charcoal-subtle">
                <MapPin size={14} className="text-saffron" />
                <span className="font-label text-label-sm">GTA, Ottawa & Vancouver</span>
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-ivory-dark">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-headline font-bold text-heading-md text-charcoal">
                    {stat.value}
                  </div>
                  <div className="font-label text-label-sm text-charcoal-subtle">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — mandala visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="hidden md:flex flex-col items-center justify-center relative"
          >
            <RotatingMandala />

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-4 bg-white rounded-card shadow-card-hover border border-ivory-dark p-4 flex items-center gap-3"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.45 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 bg-saffron-tint rounded-full flex items-center justify-center text-lg">
                🪔
              </div>
              <div>
                <div className="font-headline font-semibold text-label-md text-charcoal">
                  Diwali Lakshmi Puja
                </div>
                <div className="font-label text-label-sm text-charcoal-subtle">
                  Available this season · $425
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
