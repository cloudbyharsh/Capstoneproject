"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";
import RotatingMandala from "./RotatingMandala";

export default function Hero() {
  return (
    <section className="relative bg-ivory overflow-hidden min-h-[90vh] flex items-center">
      {/* Editorial Watermark (Devanagari script for 'Setu') */}
      <div className="font-devanagari text-maroon/[0.02] text-[180px] md:text-[340px] absolute -top-12 md:-top-20 -left-16 select-none pointer-events-none font-bold leading-none z-0">
        सेतु
      </div>

      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(196,146,42,0.1)_0%,_transparent_60%)] z-0" />

      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout pt-16 pb-20 md:pt-24 md:pb-28 relative z-10 w-full">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left Text Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-7 text-left"
          >
            {/* Sanskrit Motto tagline */}
            <div className="flex flex-col mb-4">
              <span className="font-devanagari text-maroon/60 text-label-md md:text-body-md tracking-widest font-medium mb-1">
                तमसो मा ज्योतिर्गमय
              </span>
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>

            <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-6">
              <Star size={12} className="fill-gold text-gold" />
              <span className="font-label text-label-sm text-saffron">Trusted by 2,000+ Hindu families in Canada</span>
            </div>

            <h1 className="font-headline font-bold text-hero-mobile md:text-hero text-charcoal leading-tight mb-6 text-balance">
              Discover Sacred <span className="text-maroon">Vedic Traditions,</span> Reimagined.
            </h1>

            <p className="font-body text-body-lg text-charcoal-muted leading-relaxed mb-8 max-w-lg text-balance">
              Book verified Pandit Jis, expert astrologers, and Vastu consultants across Canada. Plan authentic Griha Pravesh pujas, receive direct Kundli readings, and maintain sacred roots from one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button href="/services" size="lg" className="shadow-md hover:shadow-lg transition-shadow duration-300">
                Browse Services
                <ArrowRight size={18} />
              </Button>
              <Button href="/providers" variant="ghost" size="lg" className="text-charcoal-muted hover:text-charcoal hover:translate-x-1 transition-all duration-300">
                Meet our Providers
              </Button>
            </div>

            {/* Quick stats with gold dividers */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-ivory-dark/60">
              {[
                { value: "50+", label: "Verified Pandit Jis" },
                { value: "2K+", label: "Ceremonies Performed" },
                { value: "4.9★", label: "Diaspora Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-headline font-bold text-heading-md text-charcoal">{stat.value}</div>
                  <div className="font-label text-label-sm text-charcoal-subtle">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual 3D Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="md:col-span-5 flex flex-col items-center justify-center relative"
          >
            <RotatingMandala />

            {/* Float Card Indicator (Micro-interaction) */}
            <motion.div
              className="absolute -bottom-4 bg-white/95 backdrop-blur-md rounded-card shadow-card-hover border border-ivory-dark/40 p-4 flex items-center gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 12px 28px rgba(44, 22, 8, 0.15)" }}
            >
              <div className="w-10 h-10 bg-saffron-tint rounded-full flex items-center justify-center text-lg shadow-inner">🫏</div>
              <div>
                <div className="font-headline font-semibold text-label-md text-charcoal">Griha Pravesh Puja</div>
                <div className="font-label text-label-sm text-charcoal-subtle">Book with Verified Pandits</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
