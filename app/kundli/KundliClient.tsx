"use client";

import { useState, useRef } from "react";
import { Sparkles, Lock, ChevronRight, AlertCircle, Download } from "lucide-react";
import Button from "@/components/ui/Button";

interface FormData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
}

function MarkdownText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (line.startsWith("### ")) {
          return <h3 key={i} className="font-headline font-bold text-heading-md text-charcoal mt-5 mb-1">{line.slice(4)}</h3>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="font-headline font-bold text-heading-lg text-charcoal mt-6 mb-2">{line.slice(3)}</h2>;
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-headline font-semibold text-body-md text-charcoal mt-4">{line.slice(2, -2)}</p>;
        }
        if (line === "---") {
          return <hr key={i} className="border-ivory-dark my-5" />;
        }
        if (line.startsWith("- ")) {
          return <li key={i} className="font-body text-body-md text-charcoal-muted ml-4 list-disc">{line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}</li>;
        }
        if (line.trim() === "") return <div key={i} className="h-1" />;
        return (
          <p key={i} className="font-body text-body-md text-charcoal-muted leading-relaxed">
            {line.replace(/\*\*(.*?)\*\*/g, (_, m) => m).replace(/\*(.*?)\*/g, (_, m) => m)}
          </p>
        );
      })}
    </div>
  );
}

export default function KundliClient() {
  const [form, setForm] = useState<FormData>({ name: "", birthDate: "", birthTime: "", birthLocation: "" });
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState("");
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  async function handleDownloadPDF() {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const name = form.name || "Kundli";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (html2pdf() as any)
        .set({
          margin: [12, 12, 12, 12],
          filename: `${name.replace(/\s+/g, "_")}_Setu_Kundli.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css"] },
        })
        .from(reportRef.current)
        .save();
    } finally {
      setDownloading(false);
    }
  }

  const canSubmit = form.birthDate && form.birthTime && form.birthLocation;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setReading("");
    setError("");

    try {
      const res = await fetch("/api/kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setReading((prev) => prev + decoder.decode(value));
      }
    } catch {
      setError("Could not connect to the AI. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-5 gap-10">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-saffron-tint rounded-full flex items-center justify-center text-base">🔯</div>
            <h2 className="font-headline font-semibold text-heading-md text-charcoal">Your Birth Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                Your Name <span className="text-charcoal-subtle font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Priya Sharma"
                className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                Date of Birth <span className="text-error">*</span>
              </label>
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                Time of Birth <span className="text-error">*</span>
              </label>
              <input
                type="time"
                value={form.birthTime}
                onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
                className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              />
              <p className="font-label text-label-sm text-charcoal-subtle mt-1">
                Approximate time is fine -- within 30 mins is sufficient for a basic reading
              </p>
            </div>

            <div>
              <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                Place of Birth <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={form.birthLocation}
                onChange={(e) => setForm({ ...form, birthLocation: e.target.value })}
                placeholder="Mumbai, India"
                className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-error/5 border border-error/20 rounded-btn p-3">
                <AlertCircle size={16} className="text-error flex-shrink-0 mt-0.5" />
                <p className="font-label text-label-sm text-error">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className={`w-full ${!canSubmit ? "opacity-40 cursor-not-allowed" : ""}`}
              disabled={!canSubmit || loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-ivory/40 border-t-ivory rounded-full animate-spin" />
                  Generating your chart...
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  Generate Free Reading
                </>
              )}
            </Button>

            <p className="font-label text-label-sm text-charcoal-subtle text-center">
              Free · No account required · Takes ~15 seconds
            </p>
          </form>
        </div>
      </div>

      {/* Reading output */}
      <div className="lg:col-span-3">
        {!reading && !loading && (
          <div className="bg-white rounded-card shadow-card p-8 text-center h-full flex flex-col items-center justify-center min-h-[420px]">
            <div className="w-20 h-20 bg-saffron-tint rounded-full flex items-center justify-center text-3xl mb-5">
              🌙
            </div>
            <h3 className="font-headline font-bold text-heading-md text-charcoal mb-2">Your Reading Awaits</h3>
            <p className="font-body text-body-md text-charcoal-muted max-w-sm">
              Enter your birth details on the left and our AI -- trained on classical Vedic Jyotish principles -- will generate your free chart summary.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-sm">
              {[
                { icon: "\u2648", label: "Ascendant (Lagna)" },
                { icon: "🌙", label: "Moon Sign (Rashi)" },
                { icon: "\u2600\ufe0f", label: "Mahadasha Period" },
              ].map((item) => (
                <div key={item.label} className="bg-ivory rounded-btn p-3 text-center">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="font-label text-label-sm text-charcoal-muted">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && !reading && (
          <div className="bg-white rounded-card shadow-card p-8 flex flex-col items-center justify-center min-h-[420px]">
            <div className="w-16 h-16 border-4 border-saffron-light border-t-gold rounded-full animate-spin mb-6" />
            <p className="font-headline font-semibold text-heading-md text-charcoal mb-1">Reading the celestial map...</p>
            <p className="font-body text-body-md text-charcoal-muted">Calculating planetary positions for your birth moment</p>
          </div>
        )}

        {reading && (
          <div className="space-y-4">
            <div className="bg-white rounded-card shadow-card p-8" ref={reportRef}>
              <div className="flex items-center gap-2 mb-6 pb-5 border-b border-ivory-dark">
                <Sparkles size={18} className="text-gold" />
                <span className="font-headline font-semibold text-heading-md text-charcoal">
                  {form.name ? `${form.name}'s` : "Your"} Free Kundli Reading
                </span>
                <span className="ml-auto bg-saffron-tint text-saffron font-label text-label-sm px-3 py-1 rounded-pill border border-saffron/20">
                  Free Summary
                </span>
              </div>
              <MarkdownText text={reading} />
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 font-label text-label-md text-charcoal-muted hover:text-charcoal border border-ivory-dark hover:border-charcoal/30 bg-white rounded-btn px-4 py-2.5 transition-all duration-200 disabled:opacity-50"
            >
              {downloading ? (
                <span className="w-4 h-4 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
              ) : (
                <Download size={16} />
              )}
              {downloading ? "Preparing PDF..." : "Download PDF"}
            </button>

            <div className="bg-gradient-to-br from-maroon to-maroon-light rounded-card p-6 text-ivory">
              <div className="flex items-start gap-3 mb-4">
                <Lock size={20} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-headline font-bold text-heading-md mb-1">Unlock Your Full AI Report</h3>
                  <p className="font-body text-label-md text-ivory/80">
                    This free reading shows only the outline. A full Setu AI report goes 10x deeper.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mb-5">
                {[
                  "5-page career & life path analysis",
                  "Marriage compatibility indicators",
                  "12-month auspicious timing (Muhurta)",
                  "Personalized gemstone recommendations",
                  "Health tendency analysis",
                  "Remedy & mantra suggestions",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 font-label text-label-sm text-ivory/90">
                    <span className="text-gold">✓</span> {item}
                  </div>
                ))}
              </div>
              <Button href="/services?category=astrology" variant="gold" size="lg">
                Book a Full AI Reading
                <ChevronRight size={17} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
