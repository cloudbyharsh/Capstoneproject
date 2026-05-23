"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-ivory overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(196,146,42,0.08)_0%,_transparent_60%)]" />
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-6">
              <Star size={12} className="fill-gold text-gold" />
              <span className="font-label text-label-sm text-saffron">Trusted by 2,000+ families across Canada</span>
            </div>

            <h1 className="font-headline font-bold text-hero-mobile md:text-hero text-charcoal leading-tight mb-6">
              Discover Sacred{" "}
              <span className="text-maroon">Traditions,</span>{" "}
              Reimagined.
            </h1>

            <p className="font-body text-body-lg text-charcoal-muted leading-relaxed mb-8 max-w-lg">
              Book verified pandit jis, astrologers, and wellness practitioners for your most meaningful moments — from housewarming pujas to Diwali havans, all from one trusted platform.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button href="/services" size="lg">
                Browse Services
                <ArrowRight size={18} />
              </Button>
              <Button href="/providers" variant="ghost" size="lg" className="text-charcoal-muted">
                Meet our Providers
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-ivory-dark">
              {[
                { value: "50+", label: "Verified Providers" },
                { value: "2K+", label: "Ceremonies Performed" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-headline font-bold text-heading-md text-charcoal">{stat.value}</div>
                  <div className="font-label text-label-sm text-charcoal-subtle">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="relative w-[420px] h-[420px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,146,42,0.12)_0%,_transparent_70%)] rounded-full" />
              <Image
                src="/setu-logo.png"
                alt="Setu sacred geometry"
                fill
                className="object-contain drop-shadow-[0_4px_32px_rgba(196,146,42,0.25)]"
                priority
              />
            </div>
            <div className="absolute -bottom-2 left-4 bg-white rounded-card shadow-card p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-saffron-tint rounded-full flex items-center justify-center text-lg">🕉️</div>
              <div>
                <div className="font-headline font-semibold text-label-md text-charcoal">Griha Pravesh Puja</div>
                <div className="font-label text-label-sm text-charcoal-subtle">Next available: Tomorrow</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
