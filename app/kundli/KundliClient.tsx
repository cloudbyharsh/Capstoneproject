"use client";

import { useState, useRef } from "react";
import { Sparkles, Lock, ChevronRight, AlertCircle, Mail, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import BirthChartWheel from "@/components/kundli/BirthChartWheel";
import TraitCards from "@/components/kundli/TraitCards";
import TodaysTransits from "@/components/kundli/TodaysTransits";
import ShareCard from "@/components/kundli/ShareCard";

interface FormData {
  name: string; birthDate: string; birthTime: string;
  birthLocation: string; email: string; consent: boolean;
}

interface ChartData {
  ascendant: string; moonSign: string; sunSign: string;
  nakshatra: { name: string; pada: number };
  dasha: { name: string; end: string };
  planets: Array<{ name: string; symbol: string; sign: string; signIndex: number; house: number; isRetrograde: boolean }>;
  traits: { love: string; work: string; self: string; emotions: string; health: string; spirit: string };
  transits: Array<{ planet: string; symbol: string; sign: string; natalHouse: number; message: string; isRetrograde: boolean }>;
}

function MarkdownText({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {text.split("\n").map((line, i) => {
        if (line.startsWith("## "))
          return <h2 key={i} style={{ fontFamily:"Times New Roman, serif", fontWeight:"bold", fontSize:"18px", color:"#e8e8e8", marginTop:"20px", marginBottom:"4px" }}>{line.slice(3)}</h2>;
        if (line.startsWith("### "))
          return <h3 key={i} style={{ fontFamily:"Times New Roman, serif", fontWeight:"bold", fontSize:"15px", color:"#C4922A", marginTop:"14px", marginBottom:"2px" }}>{line.slice(4)}</h3>;
        if (line.startsWith("**") && line.endsWith("**"))
          return <p key={i} style={{ fontFamily:"Times New Roman, serif", fontWeight:"600", fontSize:"14px", color:"#ccc", marginTop:"10px" }}>{line.slice(2,-2)}</p>;
        if (line.startsWith("- "))
          return <p key={i} style={{ fontFamily:"Times New Roman, serif", fontSize:"13px", color:"#888", paddingLeft:"14px" }}>· {line.slice(2).replace(/\*\*(.*?)\*\*/g,"$1")}</p>;
        if (line === "---")
          return <div key={i} style={{ height:"0.5px", background:"#1a1a1a", margin:"12px 0" }} />;
        if (line.trim() === "")
          return <div key={i} style={{ height:"6px" }} />;
        return (
          <p key={i} style={{ fontFamily:"Times New Roman, serif", fontSize:"14px", color:"#888", lineHeight:"1.75" }}>
            {line.replace(/\*\*(.*?)\*\*/g,"$1").replace(/\*(.*?)\*/g,"$1")}
          </p>
        );
      })}
    </div>
  );
}

export default function KundliClient() {
  const [form, setForm] = useState<FormData>({ name:"", birthDate:"", birthTime:"", birthLocation:"", email:"", consent:false });
  const [loading, setLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [reading, setReading] = useState("");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  function isValidEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  const canSubmit = form.birthDate && form.birthTime && form.birthLocation && form.email && isValidEmail(form.email) && form.consent;
  const hasResults = !!chartData || !!reading;

  async function sendReportEmail(fullReading: string) {
    setSendingEmail(true);
    try {
      await fetch("/api/kundli/send-report", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email:form.email, name:form.name||"Seeker", reading:fullReading, birthDate:form.birthDate, birthTime:form.birthTime, birthLocation:form.birthLocation }),
      });
      setEmailSent(true);
    } catch { /* silent */ }
    finally { setSendingEmail(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) { setError("Please accept the consent checkbox."); return; }
    if (!isValidEmail(form.email)) { setError("Please enter a valid email."); return; }

    setLoading(true);
    setChartLoading(true);
    setReading("");
    setChartData(null);
    setError("");
    setEmailSent(false);

    const body = JSON.stringify(form);

    // Fire chart-data and streaming in parallel
    fetch("/api/kundli/chart-data", { method:"POST", headers:{"Content-Type":"application/json"}, body })
      .then(r => r.json())
      .then((data: ChartData) => setChartData(data))
      .catch(err => console.error("[chart-data]", err))
      .finally(() => setChartLoading(false));

    // Streaming reading
    try {
      const res = await fetch("/api/kundli", { method:"POST", headers:{"Content-Type":"application/json"}, body });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullText += chunk;
        setReading(prev => prev + chunk);
      }
      await sendReportEmail(fullText);
    } catch {
      setError("Could not connect to the AI. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* ── Form (Setu brand, sticky) ── */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-saffron-tint rounded-full flex items-center justify-center text-base">&#128303;</div>
            <h2 className="font-headline font-semibold text-heading-md text-charcoal">Your Birth Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label:"Your Name", key:"name", type:"text", placeholder:"Priya Sharma", required:false },
              { label:"Date of Birth", key:"birthDate", type:"date", placeholder:"", required:true },
              { label:"Time of Birth", key:"birthTime", type:"time", placeholder:"", required:true },
              { label:"Place of Birth", key:"birthLocation", type:"text", placeholder:"Mumbai, India", required:true },
            ].map(field => (
              <div key={field.key}>
                <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                  {field.label} {field.required ? <span className="text-error">*</span> : <span className="text-charcoal-subtle font-normal">(optional)</span>}
                </label>
                <input
                  type={field.type}
                  value={(form as unknown as Record<string,string>)[field.key]}
                  onChange={ev => setForm({...form, [field.key]: ev.target.value})}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                />
                {field.key === "birthTime" && (
                  <p className="font-label text-label-sm text-charcoal-subtle mt-1">Approximate time is fine — within 30 mins</p>
                )}
              </div>
            ))}

            {/* Email */}
            <div className="pt-1">
              <div className="h-px bg-ivory-dark mb-4" />
              <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                Email Address <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-subtle" />
                <input
                  type="email"
                  value={form.email}
                  onChange={ev => setForm({...form, email:ev.target.value})}
                  placeholder="priya@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all"
                />
              </div>
              <p className="font-label text-label-sm text-charcoal-subtle mt-1">Your full report will be sent here</p>
            </div>

            {/* Consent */}
            <div className="bg-ivory rounded-btn p-3 border border-ivory-dark">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input type="checkbox" checked={form.consent} onChange={ev => setForm({...form, consent:ev.target.checked})} className="sr-only" />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${form.consent ? "bg-maroon border-maroon" : "bg-white border-charcoal-subtle"}`}>
                    {form.consent && <svg className="w-2.5 h-2.5 text-ivory" fill="none" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
                <span className="font-label text-label-sm text-charcoal-muted leading-relaxed">I agree to receive my Kundli report and occasional astrology updates via email. Unsubscribe anytime.</span>
              </label>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-error/5 border border-error/20 rounded-btn p-3">
                <AlertCircle size={16} className="text-error flex-shrink-0 mt-0.5" />
                <p className="font-label text-label-sm text-error">{error}</p>
              </div>
            )}

            <Button type="submit" size="lg" className={`w-full ${!canSubmit ? "opacity-40 cursor-not-allowed" : ""}`} disabled={!canSubmit || loading}>
              {loading ? (
                <><span className="w-4 h-4 border-2 border-ivory/40 border-t-ivory rounded-full animate-spin" />Generating...</>
              ) : (
                <><Sparkles size={17} />Generate Free Reading</>
              )}
            </Button>
            <p className="font-label text-label-sm text-charcoal-subtle text-center">Free &middot; No credit card &middot; ~15 seconds</p>
          </form>
        </div>
      </div>

      {/* ── Results (Co-Star dark aesthetic) ── */}
      <div className="lg:col-span-3 min-h-[500px]">

        {/* Empty state */}
        {!hasResults && !loading && !chartLoading && (
          <div className="bg-white rounded-card shadow-card p-8 text-center flex flex-col items-center justify-center min-h-[500px]">
            <div className="w-20 h-20 bg-saffron-tint rounded-full flex items-center justify-center text-3xl mb-5">&#127771;</div>
            <h3 className="font-headline font-bold text-heading-md text-charcoal mb-2">Your Reading Awaits</h3>
            <p className="font-body text-body-md text-charcoal-muted max-w-sm">Enter your birth details and receive your Vedic chart — Ascendant, Moon sign, active Mahadasha, trait breakdown, and today&apos;s planetary influences.</p>
            <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-sm">
              {[{icon:"♈",label:"Ascendant (Lagna)"},{icon:"🌙",label:"Moon Sign (Rashi)"},{icon:"☀️",label:"Mahadasha Period"}].map(item => (
                <div key={item.label} className="bg-ivory rounded-btn p-3 text-center">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="font-label text-label-sm text-charcoal-muted">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading spinner */}
        {(loading || chartLoading) && !hasResults && (
          <div style={{ background:"#050505", border:"0.5px solid #1a1a1a" }} className="rounded-card p-8 flex flex-col items-center justify-center min-h-[500px]">
            <div className="w-16 h-16 border-2 border-[#1a1a1a] border-t-[#C4922A] rounded-full animate-spin mb-6" />
            <p style={{ fontFamily:"Times New Roman, serif", fontSize:"15px", color:"#888", letterSpacing:"1px" }}>reading the celestial map...</p>
          </div>
        )}

        {/* Results panel */}
        {hasResults && (
          <div style={{ background:"#000", border:"0.5px solid #1a1a1a" }} className="rounded-card overflow-hidden">

            {/* Chart header */}
            {(chartData || chartLoading) && (
              <div style={{ borderBottom:"0.5px solid #1a1a1a", padding:"20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <p style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"3px", color:"#555" }}>
                    {form.name ? form.name.toUpperCase() : "YOUR CHART"}
                  </p>
                  <p style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"2px", color:"#333" }}>
                    {form.birthDate} · {form.birthLocation}
                  </p>
                </div>
              </div>
            )}

            {/* Chart loading state */}
            {chartLoading && !chartData && (
              <div style={{ padding:"40px", textAlign:"center" }}>
                <div className="w-10 h-10 border border-[#1a1a1a] border-t-[#C4922A] rounded-full animate-spin mx-auto mb-4" />
                <p style={{ fontFamily:"Times New Roman, serif", fontSize:"11px", color:"#444", letterSpacing:"2px" }}>calculating planetary positions...</p>
              </div>
            )}

            {/* Birth Chart Wheel + key placements */}
            {chartData && (
              <>
                {/* Wheel */}
                <div style={{ padding:"24px 0 16px", background:"#000" }}>
                  <BirthChartWheel planets={chartData.planets} ascendant={chartData.ascendant} moonSign={chartData.moonSign} size={320} />
                  {/* Key stats below wheel */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"1px", background:"#1a1a1a", marginTop:"20px" }}>
                    {[
                      ["LAGNA", chartData.ascendant],
                      ["MOON",  chartData.moonSign],
                      ["☽ PADA", `${chartData.nakshatra.name} ${chartData.nakshatra.pada}`],
                      ["DASHA",  chartData.dasha.name],
                    ].map(([label, value]) => (
                      <div key={label} style={{ background:"#000", padding:"12px 8px", textAlign:"center" }}>
                        <p style={{ fontFamily:"Times New Roman, serif", fontSize:"8px", letterSpacing:"2px", color:"#444", marginBottom:"4px" }}>{label}</p>
                        <p style={{ fontFamily:"Times New Roman, serif", fontSize:"11px", color:"#ccc" }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trait cards */}
                <TraitCards traits={chartData.traits} />

                {/* Transits */}
                <TodaysTransits transits={chartData.transits} />
              </>
            )}

            {/* AI Reading stream */}
            {(reading || loading) && (
              <div style={{ borderTop:"0.5px solid #1a1a1a" }}>
                {/* Email status */}
                {(emailSent || sendingEmail) && (
                  <div style={{ padding:"12px 20px", background:"#050505", display:"flex", alignItems:"center", gap:"8px" }}>
                    {sendingEmail
                      ? <span className="w-3 h-3 border border-[#333] border-t-[#C4922A] rounded-full animate-spin flex-shrink-0" />
                      : <CheckCircle2 size={14} style={{ color:"#4a7a4a" }} />}
                    <p style={{ fontFamily:"Times New Roman, serif", fontSize:"11px", color:"#444" }}>
                      {sendingEmail ? `sending report to ${form.email}...` : `report sent to ${form.email}`}
                    </p>
                  </div>
                )}

                {/* Section label */}
                <div style={{ padding:"20px 20px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <p style={{ fontFamily:"Times New Roman, serif", fontSize:"9px", letterSpacing:"3px", color:"#555" }}>YOUR READING</p>
                  {loading && <span className="w-3 h-3 border border-[#333] border-t-[#C4922A] rounded-full animate-spin" />}
                </div>

                {/* Reading text */}
                <div ref={reportRef} style={{ padding:"16px 20px 24px" }}>
                  <MarkdownText text={reading} />
                </div>
              </div>
            )}

            {/* Upsell CTA */}
            {reading && !loading && (
              <div style={{ borderTop:"0.5px solid #1a1a1a", background:"#050505", padding:"24px 20px" }}>
                <div style={{ display:"flex", gap:"12px", marginBottom:"16px" }}>
                  <Lock size={18} style={{ color:"#C4922A", flexShrink:0, marginTop:"2px" }} />
                  <div>
                    <p style={{ fontFamily:"Times New Roman, serif", fontSize:"14px", color:"#e8e8e8", marginBottom:"6px", fontWeight:"bold" }}>Unlock Your Full AI Report</p>
                    <p style={{ fontFamily:"Times New Roman, serif", fontSize:"12px", color:"#555" }}>This free reading shows the outline. A full Setu reading goes 10× deeper.</p>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px", marginBottom:"16px" }}>
                  {["5-page career & life path","Marriage compatibility analysis","12-month muhurta timing","Personalized gemstone guidance","Health tendency analysis","Remedy & mantra suggestions"].map(item => (
                    <div key={item} style={{ display:"flex", gap:"6px", alignItems:"flex-start" }}>
                      <span style={{ color:"#C4922A", fontSize:"11px", flexShrink:0 }}>✓</span>
                      <span style={{ fontFamily:"Times New Roman, serif", fontSize:"11px", color:"#666" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <Button href="/services?category=astrology" variant="gold" size="lg" className="w-full">
                  Book a Full AI Reading <ChevronRight size={17} />
                </Button>
              </div>
            )}

            {/* Share card */}
            {chartData && reading && !loading && (
              <div style={{ borderTop:"0.5px solid #1a1a1a" }}>
                <ShareCard name={form.name} chartData={chartData} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
