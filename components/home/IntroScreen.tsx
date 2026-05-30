"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { sanskrit: "ॐ भूर्भुवः स्वः",       roman: "Om Bhūr Bhuvaḥ Svaḥ" },
  { sanskrit: "तत्सवितुर्वरेण्यम्",     roman: "Tat Saviturvareṇyam" },
  { sanskrit: "भर्गो देवस्य धीमहि",    roman: "Bhargo Devasya Dhīmahi" },
  { sanskrit: "धियो यो नः प्रचोदयात्", roman: "Dhiyo Yo Naḥ Pracodayāt" },
];

const STAGGER_S = 0.45;    // seconds between each line appearing
const HOLD_MS   = 1600;    // ms to hold after last line visible
const EXIT_MS   = 750;     // fade-out duration

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("setu-intro-seen")) {
      // Already seen — skip instantly, no flash
      setVisible(false);
      onComplete();
      return;
    }

    // Time when last line finishes fading in: delay + fade duration
    const lastLineDelay = (0.3 + (LINES.length - 1) * STAGGER_S) * 1000;
    const fadeDuration  = 600;
    const exitAt = lastLineDelay + fadeDuration + HOLD_MS;

    const t = setTimeout(triggerExit, exitAt);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function triggerExit() {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false); // AnimatePresence picks up removal → plays exit animation
    setTimeout(() => {
      sessionStorage.setItem("setu-intro-seen", "1");
      onComplete();
    }, EXIT_MS + 50);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal overflow-hidden"
        >
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,146,42,0.08)_0%,_transparent_65%)] pointer-events-none" />

          {/* Slowly rotating mandala watermark */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 400 400" className="w-[68vmin] h-[68vmin] opacity-[0.04] text-gold" fill="none" stroke="currentColor">
              {Array.from({ length: 24 }).map((_, i) => (
                <line key={i} x1="200" y1="200"
                  x2={200 + 190 * Math.cos((i * Math.PI) / 12)}
                  y2={200 + 190 * Math.sin((i * Math.PI) / 12)}
                  strokeWidth="0.5" />
              ))}
              {[40, 80, 120, 160, 190].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} strokeWidth="0.4" />
              ))}
            </svg>
          </motion.div>

          {/* Om glyph */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-devanagari text-gold text-[56px] leading-none mb-10 select-none"
          >
            ॐ
          </motion.div>

          {/* Gayatri Mantra — four lines staggered in */}
          <div className="flex flex-col items-center gap-6 px-6 max-w-lg text-center">
            {LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * STAGGER_S, ease: "easeOut" }}
                className="flex flex-col items-center gap-1"
              >
                <span className="font-devanagari text-ivory text-2xl md:text-[28px] leading-relaxed tracking-wide">
                  {line.sanskrit}
                </span>
                <span className="font-label text-label-sm text-gold/55 tracking-widest italic">
                  {line.roman}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Thin gold divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="w-20 h-px bg-gold/25 mt-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
