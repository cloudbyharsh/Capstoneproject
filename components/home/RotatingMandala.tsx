"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function RotatingMandala() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Motion values for 3D mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Setup transforms for mouse tilt
  const rotateX = useTransform(mouseY, [-200, 200], [15, -15]);
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!mounted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  if (!mounted) {
    return (
      <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-saffron-tint/10 flex items-center justify-center">
        <span className="text-4xl">🕉️</span>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer w-[320px] h-[320px] sm:w-[440px] sm:h-[440px]"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {/* Glow Ring Backdrop (Z-depth -40px) */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(196,146,42,0.18)_0%,_transparent_70%)] rounded-full blur-2xl"
          style={{ transform: "translateZ(-40px)" }}
        />

        {/* Slow Rotating Decorative Arch Frame (Z-depth -20px) */}
        <motion.div
          className="absolute w-[95%] h-[95%] rounded-full border border-gold/15 border-dashed"
          style={{ transform: "translateZ(-20px)" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        />

        {/* Primary Sacred Geometry Arch/Mandala SVG (Z-depth 0px) */}
        <motion.div
          className="absolute w-[80%] h-[80%] drop-shadow-[0_12px_24px_rgba(44,22,8,0.12)]"
          style={{ transform: "translateZ(0px)" }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-gold">
            {/* Outer Circle Ring */}
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.75" />

            {/* Lotus Petals (12 radiating points) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <g key={i} transform={`rotate(${angle} 100 100)`}>
                  <path
                    d="M 100,15 C 115,40 120,60 100,100 C 80,60 85,40 100,15 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="currentColor"
                    fillOpacity="0.03"
                  />
                  <line x1="100" y1="15" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                </g>
              );
            })}

            {/* Inner Star Pattern */}
            <polygon points="100,45 148,127 52,127" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
            <polygon points="100,155 148,73 52,73" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </motion.div>

        {/* Floating Sacred Geometry Center (Z-depth 40px) */}
        <motion.div
          className="absolute w-[45%] h-[45%] drop-shadow-[0_8px_16px_rgba(97,0,0,0.15)]"
          style={{ transform: "translateZ(40px)" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-maroon">
            {/* Center Lotus */}
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" />
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <path
                  key={i}
                  d="M 50,20 C 58,35 58,45 50,50 C 42,45 42,35 50,20 Z"
                  transform={`rotate(${angle} 50 50)`}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="currentColor"
                  fillOpacity="0.1"
                />
              );
            })}
            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="1" fill="#C4922A" fillOpacity="0.2" />
          </svg>
        </motion.div>

        {/* Core Bindu Dot (Z-depth 60px) */}
        <motion.div
          className="absolute w-12 h-12 bg-maroon rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(97,0,0,0.4)]"
          style={{ transform: "translateZ(60px)" }}
          animate={{
            scale: hovered ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <span className="text-ivory font-semibold text-lg select-none">🕉️</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
