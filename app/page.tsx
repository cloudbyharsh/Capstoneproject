'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { track } from "@/lib/track";
import Hero from "@/components/home/Hero";
import CategoryRow from "@/components/home/CategoryRow";
import FeaturedServices from "@/components/home/FeaturedServices";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import PanchangWidget from "@/components/home/PanchangWidget";

// Load intro screen only client-side to avoid SSR flash
const IntroScreen = dynamic(() => import("@/components/home/IntroScreen"), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    track("homepage_viewed");
  }, []);

  return (
    <>
      {/* Intro experience — only shown once per session */}
      <IntroScreen onComplete={() => setIntroComplete(true)} />

      {/* Main site fades in after intro */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: introComplete ? "auto" : "none",
        }}
      >
        <Hero />
        <CategoryRow />
        <FeaturedServices />
        <HowItWorks />
        <Testimonials />
        <PanchangWidget />
      </div>
    </>
  );
}
