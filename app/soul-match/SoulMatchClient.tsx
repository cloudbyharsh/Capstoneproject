"use client";

import { useState, useEffect } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import { track } from "@/lib/track";

// ── NUMEROLOGY HELPERS ──

function reduce(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return n;
}

function lifePathNum(dob: string): number {
  return reduce(
    dob
      .replace(/-/g, "")
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0)
  );
}

const chaldean: Record<string, number> = {
  a:1,b:2,c:3,d:4,e:5,f:8,g:3,h:5,i:1,j:1,k:2,l:3,m:4,
  n:5,o:7,p:8,q:1,r:2,s:3,t:4,u:6,v:6,w:6,x:5,y:1,z:7,
};

function nameNum(name: string): number {
  const digits = name
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .map((c) => chaldean[c] || 0)
    .filter((v) => v > 0);
  if (!digits.length) return 5;
  return reduce(digits.reduce((a, b) => a + b, 0));
}

// ── COMPATIBILITY TABLES ──

const lpTable: Record<string, number> = {
  "1-1":72,"1-2":68,"1-3":85,"1-4":58,"1-5":90,"1-6":63,"1-7":80,"1-8":70,"1-9":74,
  "2-2":82,"2-3":70,"2-4":88,"2-5":60,"2-6":92,"2-7":76,"2-8":64,"2-9":82,
  "3-3":86,"3-4":58,"3-5":80,"3-6":74,"3-7":68,"3-8":62,"3-9":90,
  "4-4":78,"4-5":64,"4-6":86,"4-7":82,"4-8":92,"4-9":58,
  "5-5":70,"5-6":62,"5-7":76,"5-8":80,"5-9":72,
  "6-6":92,"6-7":68,"6-8":74,"6-9":88,
  "7-7":82,"7-8":68,"7-9":76,
  "8-8":74,"8-9":68,
  "9-9":90,
  "11-2":90,"11-4":84,"11-11":96,"22-4":92,"22-8":88,"22-22":94,
};
function getLPCompat(a: number, b: number): number {
  const key = [Math.min(a, b), Math.max(a, b)].join("-");
  return lpTable[key] !== undefined ? lpTable[key] : 70;
}

const nnTable: Record<string, number> = {
  "1-1":74,"1-3":88,"1-5":86,"1-9":78,"2-4":90,"2-6":94,"2-9":84,
  "3-9":92,"4-8":90,"5-7":80,"6-6":94,"6-9":86,"7-7":82,"8-8":72,"9-9":88,
};
function getNNCompat(a: number, b: number): number {
  const key = [Math.min(a, b), Math.max(a, b)].join("-");
  if (nnTable[key] !== undefined) return nnTable[key];
  return a === b ? 80 : 70;
}

function getDBScore(db: number): number {
  return [2, 3, 6, 9, 11, 22].includes(db) ? 88 : db === 1 || db === 5 ? 76 : 64;
}

// ── ARCHETYPES ──

interface Archetype {
  name: string;
  dev: string;
  desc: string;
  color: string;
}

function getArchetype(s: number): Archetype {
  if (s >= 88)
    return {
      name: "Twin Flames",
      dev: "युगल ज्योति · Yugal Jyoti",
      desc: "Two flames born from the same sacred fire. The Vedas call this ātmīya sambandha — the bond of self to self. You do not complete each other; you awaken each other.",
      color: "text-gold",
    };
  if (s >= 75)
    return {
      name: "Complementary Souls",
      dev: "पूरक आत्मा · Pūrak Ātmā",
      desc: "Where one soul reaches inward, the other reaches outward. Your differences are the sacred geometry of two halves finding their whole. Together, you build what neither could alone.",
      color: "text-teal",
    };
  if (s >= 60)
    return {
      name: "Karmic Bond",
      dev: "कर्म बंधन · Karma Bandhan",
      desc: "This meeting was written before this lifetime. A karmic connection brings growth through challenge and love through learning. Your souls have unfinished stories — this chapter matters.",
      color: "text-saffron",
    };
  return {
    name: "Divergent Paths",
    dev: "भिन्न मार्ग · Bhinn Mārg",
    desc: "Every soul teaches us something. This pairing invites both of you to look inward — to understand what you seek and where your truest path leads. Divergence is not rejection; it is redirection.",
    color: "text-lotus",
  };
}

// ── COMPONENT ──

interface Soul {
  name: string;
  dob: string;
}

interface Result {
  total: number;
  lpScore: number;
  nnScore: number;
  dbScore: number;
  lp1: number;
  lp2: number;
  nn1: number;
  nn2: number;
  db: number;
  archetype: Archetype;
  soul1Name: string;
  soul2Name: string;
}

export default function SoulMatchClient() {
  const [soul1, setSoul1] = useState<Soul>({ name: "", dob: "" });
  const [soul2, setSoul2] = useState<Soul>({ name: "", dob: "" });
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    track("soul_match_viewed");
  }, []);

  function handleCalculate() {
    setError("");
    if (!soul1.name || !soul2.name) {
      setError("Please enter both souls' names.");
      return;
    }
    if (!soul1.dob || !soul2.dob) {
      setError("Please enter both dates of birth.");
      return;
    }

    const lp1 = lifePathNum(soul1.dob);
    const lp2 = lifePathNum(soul2.dob);
    const nn1 = nameNum(soul1.name);
    const nn2 = nameNum(soul2.name);
    const db = reduce(lp1 + lp2);

    const lpScore = getLPCompat(lp1, lp2);
    const nnScore = getNNCompat(nn1, nn2);
    const dbScore = getDBScore(db);
    const total = Math.round(lpScore * 0.45 + nnScore * 0.35 + dbScore * 0.2);
    const archetype = getArchetype(total);

    track("soul_match_submitted", {
      score: total,
      archetype: archetype.name,
    });

    setResult({
      total,
      lpScore,
      nnScore,
      dbScore,
      lp1, lp2, nn1, nn2, db,
      archetype,
      soul1Name: soul1.name,
      soul2Name: soul2.name,
    });
  }

  function handleReset() {
    setSoul1({ name: "", dob: "" });
    setSoul2({ name: "", dob: "" });
    setResult(null);
    setError("");
  }

  const canSubmit = soul1.name && soul1.dob && soul2.name && soul2.dob;

  if (result) {
    const circumference = 2 * Math.PI * 52; // r=52
    const dashOffset = circumference * (1 - result.total / 100);

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Score card */}
        <div className="bg-gradient-to-br from-maroon to-maroon-light rounded-card p-8 text-center text-ivory shadow-card">
          <p className="font-label text-label-sm text-ivory/60 mb-6 tracking-widest uppercase">
            {result.soul1Name} &nbsp;✦&nbsp; {result.soul2Name}
          </p>

          {/* Ring */}
          <div className="relative w-36 h-36 mx-auto mb-6">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
              <circle
                cx="60" cy="60" r="52"
                stroke={result.total >= 88 ? "#C4922A" : result.total >= 75 ? "#1B6B5A" : result.total >= 60 ? "#E8621A" : "#C8789A"}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline font-bold text-4xl text-gold leading-none">{result.total}</span>
              <span className="font-label text-label-sm text-ivory/50 mt-0.5">%</span>
            </div>
          </div>

          <h2 className="font-headline font-bold text-heading-lg text-ivory mb-1">
            {result.archetype.name}
          </h2>
          <p className="font-body text-label-md text-gold mb-4" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
            {result.archetype.dev}
          </p>
          <p className="font-body text-body-md text-ivory/75 max-w-md mx-auto leading-relaxed">
            {result.archetype.desc}
          </p>
        </div>

        {/* Breakdown */}
        <div>
          <p className="font-label text-label-sm text-charcoal-subtle uppercase tracking-widest text-center mb-4">
            Cosmic Breakdown
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "🌀", label: "Life Path", value: result.lpScore, sub: `${result.lp1} & ${result.lp2}` },
              { icon: "✍️", label: "Name Number", value: result.nnScore, sub: `${result.nn1} & ${result.nn2}` },
              { icon: "🔮", label: "Destiny Bond", value: result.dbScore, sub: `Number ${result.db}` },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-card shadow-card p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-label text-label-sm text-charcoal-subtle uppercase tracking-wider mb-2">
                  {item.label}
                </div>
                <div className="font-headline font-bold text-heading-md text-maroon mb-1">
                  {item.value}%
                </div>
                <div className="font-label text-label-sm text-charcoal-subtle mb-2">{item.sub}</div>
                <div className="h-1.5 bg-ivory-dark rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-maroon to-gold transition-all duration-1000"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA upsell */}
        <div className="bg-white rounded-card shadow-card p-6 border border-ivory-dark">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-saffron-tint rounded-full flex items-center justify-center text-lg flex-shrink-0">🪬</div>
            <div>
              <h3 className="font-headline font-semibold text-heading-md text-charcoal mb-1">
                Want a deeper reading?
              </h3>
              <p className="font-body text-body-md text-charcoal-muted mb-4">
                Book a Vedic astrology consultation for a full Kundli compatibility analysis — including Guna Milan, Mangal Dosha check, and auspicious marriage timing.
              </p>
              <Button
                href="/services?category=astrology"
                size="md"
                onClick={() => track("soul_match_book_kundli_clicked", { score: result.total, archetype: result.archetype.name })}
              >
                Book Kundli Matching <span className="ml-1">→</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="text-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 font-label text-label-md text-charcoal-muted hover:text-charcoal border border-ivory-dark hover:border-charcoal/30 bg-white rounded-btn px-5 py-2.5 transition-all duration-200"
          >
            <RotateCcw size={15} />
            Start a New Reading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-card shadow-card overflow-hidden mb-6">
        {/* Top colour bar */}
        <div className="grid grid-cols-2 h-1">
          <div className="bg-gradient-to-r from-maroon to-gold" />
          <div className="bg-gradient-to-r from-gold to-teal" />
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ivory-dark">
          {/* Soul 1 */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-maroon flex-shrink-0" />
              <h2 className="font-headline font-semibold text-heading-md text-charcoal">Soul One</h2>
            </div>
            <p className="font-label text-label-sm text-gold mb-6 tracking-wider" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
              आत्मा एक
            </p>
            <div className="space-y-4">
              <div>
                <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={soul1.name}
                  onChange={(e) => setSoul1({ ...soul1, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={soul1.dob}
                  onChange={(e) => setSoul1({ ...soul1, dob: e.target.value })}
                  className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Soul 2 */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal flex-shrink-0" />
              <h2 className="font-headline font-semibold text-heading-md text-charcoal">Soul Two</h2>
            </div>
            <p className="font-label text-label-sm text-gold mb-6 tracking-wider" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
              आत्मा दो
            </p>
            <div className="space-y-4">
              <div>
                <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={soul2.name}
                  onChange={(e) => setSoul2({ ...soul2, name: e.target.value })}
                  placeholder="e.g. Arjun Mehta"
                  className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={soul2.dob}
                  onChange={(e) => setSoul2({ ...soul2, dob: e.target.value })}
                  className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-center font-label text-label-sm text-saffron mb-4">{error}</p>
      )}

      <div className="text-center">
        <Button
          size="lg"
          onClick={handleCalculate}
          className={!canSubmit ? "opacity-40 cursor-not-allowed" : ""}
          disabled={!canSubmit}
        >
          <Sparkles size={17} />
          Reveal Soul Compatibility
        </Button>
        <p className="font-label text-label-sm text-charcoal-subtle mt-3">
          Free · Instant · No sign-up needed
        </p>
      </div>
    </div>
  );
}
