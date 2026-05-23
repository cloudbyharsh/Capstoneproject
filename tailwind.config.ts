import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#610000",
          light: "#8e0000",
          hover: "#7a0000",
        },
        saffron: {
          DEFAULT: "#E8621A",
          light: "#FAD5BC",
          tint: "#FEF0E7",
        },
        gold: {
          DEFAULT: "#C4922A",
          light: "#F0D8A0",
        },
        ivory: {
          DEFAULT: "#FAF7F0",
          dark: "#F0E8DC",
        },
        charcoal: {
          DEFAULT: "#2C1608",
          muted: "#6B4423",
          subtle: "#9B7A5A",
        },
        teal: {
          DEFAULT: "#1B6B5A",
          light: "#D4EDE8",
        },
        lotus: {
          DEFAULT: "#C8789A",
          light: "#F5E0EB",
        },
        marigold: {
          DEFAULT: "#F4A020",
          light: "#FDE8C0",
        },
        error: {
          DEFAULT: "#ba1a1a",
        },
      },
      fontFamily: {
        display:    ["var(--font-cormorant)", "Georgia", "serif"],
        headline:   ["var(--font-playfair)", "Georgia", "serif"],
        body:       ["var(--font-dm-sans)", "Arial", "sans-serif"],
        label:      ["var(--font-dm-sans)", "Arial", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "serif"],
      },
      spacing: {
        section: "80px",
        "card-pad": "24px",
      },
      borderRadius: {
        card: "16px",
        pill: "9999px",
        btn: "8px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(44, 22, 8, 0.06), 0 1px 3px rgba(44, 22, 8, 0.04)",
        "card-hover": "0 8px 32px rgba(44, 22, 8, 0.1), 0 2px 8px rgba(44, 22, 8, 0.06)",
        "gold-glow": "0 0 0 3px rgba(196, 146, 42, 0.28)",
        "maroon-focus": "0 0 0 3px rgba(97, 0, 0, 0.15)",
      },
      maxWidth: {
        layout: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
