"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles, ChevronRight, ArrowLeft,
  Mail, Lock, AlertCircle, CheckCircle2,
} from "lucide-react";
import BirthChartWheel from "@/components/kundli/BirthChartWheel";
import TraitCards from "@/components/kundli/TraitCards";
import TodaysTransits from "@/components/kundli/TodaysTransits";

type Step = "intro" | "form" | "preview" | "email" | "report";

interface FormFields {
  name: string; birthDate: string; birthTime: string; birthLocation: string;
}

interface ChartData {
  ascendant: string; moonSign: string; sunSign: string;
  nakshatra: { name: string; pada: number };
  dasha: { name: string; end: string };
  planets: Array<{ name: string; symbol: string; sign: string; signIndex: number; house: number; isRetrograde: boolean }>;
  traits: { love: string; work: string; self: string; emotions: string; health: string; spirit: string };
  transits: Array<{ planet: string; symbol: string; sign: string; natalHouse: number; message: string; isRetrograde: boolean }>;
}

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'DM Sans', Arial, sans-serif";
const GOLD  = "#C4922A";
const CSS_SPIN = "@keyframes kundli-spin { to { transform: rotate(360deg); } }";

const S: Record<string, React.CSSProperties> = {
  page:        { background: "#000", minHeight: "100vh", padding: "44px 24px 80px" },
  centeredWrap:{ maxWidth: "540px", margin: "0 auto", width: "100%" },
  wideWrap:    { maxWidth: "680px", margin: "0 auto", width: "100%" },
  label: { fontFamily: SANS, fontSize: "10px", color: "#555", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "8px" },
  input: { width: "100%", background: "#080808", border: "0.5px solid #1e1e1e", borderRadius: "6px", padding: "12px 14px", color: "#e0e0e0", fontFamily: SERIF, fontSize: "15px", outline: "none", boxSizing: "border-box" },
  btnGold: { background: GOLD, color: "#000", border: "none", borderRadius: "6px", padding: "14px 22px", fontFamily: SANS, fontSize: "14px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.5px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%" },
  btnGhost: { background: "transparent", color: "#555", border: "0.5px solid #1a1a1a", borderRadius: "6px", padding: "12px 22px", fontFamily: SANS, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%" },
  sectionLabel: { fontFamily: SANS, fontSize: "9px", color: "#3a3a3a", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" },
  divider: { height: "0.5px", background: "#111", margin: "28px 0" },
  spinnerGold: { width: "14px", height: "14px", border: "2px solid #1a1a1a", borderTop: "2px solid " + GOLD, borderRadius: "50%", display: "inline-block", animation: "kundli-spin 1s linear infinite", flexShrink: 0 },
  spinnerDark: { width: "14px", height: "14px", border: "2px solid rgba(0,0,0,0.2)", borderTop: "2px solid #000", borderRadius: "50%", display: "inline-block", animation: "kundli-spin 1s linear infinite", flexShrink: 0 },
};

function track(event: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const h = (window as any).heap;
  if (h?.track) h.track(event, props);
}

const STEP_LABELS = ["Birth Details", "Preview", "Email", "Full Report"];
const STEP_IDX: Partial<Record<Step, number>> = { form: 0, preview: 1, email: 2, report: 3 };

function ProgressBar({ step }: { step: Step }) {
  const idx = STEP_IDX[step] ?? -1;
  if (idx < 0) return null;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", marginBottom: "40px" }}>
      {STEP_LABELS.map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: i <= idx ? GOLD : "#080808", border: "1px solid " + (i <= idx ? GOLD : "#1e1e1e"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: i <= idx ? "#000" : "#2a2a2a", fontWeight: 700, fontFamily: SANS, transition: "all 0.3s" }}>
              {i < idx ? "✓" : i + 1}
            </div>
            <span style={{ fontSize: "8px", letterSpacing: "1.5px", color: i <= idx ? GOLD : "#2a2a2a", whiteSpace: "nowrap", fontFamily: SANS, textTransform: "uppercase" }}>
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div style={{ width: "50px", height: "1px", background: i < idx ? GOLD : "#0e0e0e", margin: "13px 0 0", flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

function MarkdownText({ text }: { text: string }) {
  return (
    <div style={{ fontFamily: SERIF }}>
      {text.split("\n").map((line, i) => {
        if (line.startsWith("## "))   return <h2 key={i} style={{ fontSize: "18px", color: "#e8e8e8", margin: "24px 0 6px", fontWeight: "normal" }}>{line.slice(3)}</h2>;
        if (line.startsWith("### "))  return <h3 key={i} style={{ fontSize: "14px", color: GOLD, margin: "18px 0 4px", letterSpacing: "1px", fontFamily: SANS }}>{line.slice(4)}</h3>;
        if (line.startsWith("- "))   return <p key={i} style={{ fontSize: "13px", color: "#666", paddingLeft: "14px", marginBottom: "6px" }}>· {line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
        if (line === "---")           return <div key={i} style={{ height: "0.5px", background: "#111", margin: "16px 0" }} />;
        if (!line.trim())             return <div key={i} style={{ height: "8px" }} />;
        return <p key={i} style={{ fontSize: "14px", color: "#888", lineHeight: "1.9", marginBottom: "12px" }}>{line.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1")}</p>;
      })}
    </div>
  );
}

export default function KundliClient() {
  const [step, setStep]           = useState<Step>("intro");
  const [form, setForm]           = useState<FormFields>({ name: "", birthDate: "", birthTime: "", birthLocation: "" });
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [reading, setReading]     = useState("");
  const [email, setEmail]         = useState("");
  const [loadingChart, setLoadingChart]     = useState(false);
  const [loadingReading, setLoadingReading] = useState(false);
  const [sendingEmail, setSendingEmail]     = useState(false);
  const [error, setError]         = useState("");
  const [emailError, setEmailError] = useState("");
  const readingRef = useRef("");

  const canSubmit  = !!(form.birthDate && form.birthTime && form.birthLocation.trim().length > 2);
  const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  useEffect(() => {
    const map: Partial<Record<Step, string>> = {
      intro: "kundli_intro_viewed", form: "kundli_birth_details_viewed",
      preview: "kundli_preview_viewed", email: "kundli_email_capture_viewed",
      report: "kundli_full_report_viewed",
    };
    if (map[step]) track(map[step]!);
  }, [step]);

  async function startStream(name: string, birthDate: string, birthTime: string, birthLocation: string) {
    setLoadingReading(true);
    try {
      const res = await fetch("/api/kundli", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "the seeker", birthDate, birthTime, birthLocation, previewMode: true }),
      });
      if (!res.ok || !res.body) return;
      const reader = res.body.getReader();
      const dec    = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        readingRef.current += chunk;
        setReading(prev => prev + chunk);
      }
    } catch { /* silent */ }
    finally { setLoadingReading(false); }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loadingChart) return;
    track("kundli_birth_details_submitted", { hasName: !!form.name });
    setError(""); setChartData(null); setReading(""); readingRef.current = ""; setLoadingChart(true);
    startStream(form.name, form.birthDate, form.birthTime, form.birthLocation);
    try {
      const res = await fetch("/api/kundli/chart-data", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate: form.birthDate, birthTime: form.birthTime, birthLocation: form.birthLocation }),
      });
      if (res.ok) setChartData(await res.json());
    } catch {
      track("kundli_birth_details_error");
      setError("Could not calculate chart positions. Please check your birth details and try again.");
      setLoadingChart(false); return;
    }
    setLoadingChart(false);
    setStep("preview");
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validEmail(email)) {
      setEmailError("Please enter a valid email address.");
      track("kundli_email_submission_error", { reason: "invalid_email" }); return;
    }
    track("kundli_email_submitted", { emailDomain: email.split("@")[1] ?? "" });
    setSendingEmail(true); setEmailError("");
    try {
      await fetch("/api/kundli/send-report", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: form.name || "Seeker", reading: readingRef.current || reading, birthDate: form.birthDate, birthTime: form.birthTime, birthLocation: form.birthLocation }),
      });
    } catch { /* non-fatal */ }
    setSendingEmail(false);
    setStep("report");
  }

  if (step === "intro") return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 24px 80px", textAlign: "center" }}>
      <div style={{ fontSize: "40px", marginBottom: "18px", opacity: 0.7 }}>ॐ</div>
      <p style={{ fontFamily: SANS, fontSize: "10px", color: GOLD, letterSpacing: "3px", marginBottom: "14px", textTransform: "uppercase" }}>Free Vedic Kundli</p>
      <h1 style={{ fontFamily: SERIF, fontSize: "clamp(26px,5.5vw,46px)", color: "#FAF7F0", maxWidth: "640px", lineHeight: "1.22", marginBottom: "18px", fontWeight: 400 }}>
        Unlock the Secrets Hidden in Your Birth Chart
      </h1>
      <p style={{ fontFamily: SERIF, fontSize: "16px", color: "#555", maxWidth: "500px", lineHeight: "1.9", marginBottom: "52px" }}>
        Your Kundli is a cosmic blueprint created from your exact birth moment. It reveals hidden personality patterns, relationship tendencies, career timing, and major life phases.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", maxWidth: "580px", width: "100%", marginBottom: "52px" }}>
        {[{icon:"♈",label:"Lagna & Personality"},{icon:"🌙",label:"Moon Sign (Rashi)"},{icon:"⏳",label:"Active Mahadasha"},{icon:"❤️",label:"Love & Relationships"},{icon:"💼",label:"Career Path"},{icon:"✦",label:"12-Month Timing"}].map(b => (
          <div key={b.label} style={{ background: "#060606", border: "0.5px solid #111", borderRadius: "8px", padding: "16px 10px" }}>
            <div style={{ fontSize: "20px", marginBottom: "7px" }}>{b.icon}</div>
            <p style={{ fontFamily: SANS, fontSize: "10px", color: "#555", letterSpacing: "0.5px", lineHeight: "1.4" }}>{b.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "300px" }}>
        <button onClick={() => { track("kundli_intro_cta_clicked"); setStep("form"); }} style={{ ...S.btnGold }}>
          <Sparkles size={15} /> Check My Kundli
        </button>
        <button onClick={() => track("kundli_intro_later_clicked")} style={{ ...S.btnGhost }}>Maybe Later</button>
      </div>
      <style>{CSS_SPIN}</style>
    </div>
  );

  if (step === "form") return (
    <div style={{ ...S.page, display: "flex", justifyContent: "center" }}>
      <div style={{ ...S.centeredWrap }}>
        <ProgressBar step="form" />
        <h2 style={{ fontFamily: SERIF, fontSize: "28px", color: "#FAF7F0", fontWeight: 400, marginBottom: "6px", textAlign: "center" }}>Enter Your Birth Details</h2>
        <p style={{ fontFamily: SERIF, fontSize: "14px", color: "#3a3a3a", textAlign: "center", marginBottom: "36px" }}>Accurate details produce the most precise reading</p>
        <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div>
            <label style={{ ...S.label }}>Full Name <span style={{ color: "#2a2a2a", textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
            <input type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Priya Sharma" style={{ ...S.input }} />
          </div>
          <div>
            <label style={{ ...S.label }}>Date of Birth <span style={{ color: GOLD }}>*</span></label>
            <input type="date" value={form.birthDate} onChange={e => setForm({...form,birthDate:e.target.value})} style={{ ...S.input }} max={new Date().toISOString().split("T")[0]} />
          </div>
          <div>
            <label style={{ ...S.label }}>Time of Birth <span style={{ color: GOLD }}>*</span></label>
            <input type="time" value={form.birthTime} onChange={e => setForm({...form,birthTime:e.target.value})} style={{ ...S.input }} />
            <p style={{ fontFamily: SANS, fontSize: "11px", color: "#2a2a2a", marginTop: "5px" }}>Approximate time (±30 min) still gives accurate results</p>
          </div>
          <div>
            <label style={{ ...S.label }}>Place of Birth <span style={{ color: GOLD }}>*</span></label>
            <input type="text" value={form.birthLocation} onChange={e => setForm({...form,birthLocation:e.target.value})} placeholder="Mumbai, India" style={{ ...S.input }} />
          </div>
          {error && (
            <div style={{ background: "#0e0000", border: "0.5px solid #3a0000", borderRadius: "6px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <AlertCircle size={14} style={{ color: "#ff6b6b", flexShrink: 0, marginTop: "2px" }} />
              <p style={{ fontFamily: SANS, fontSize: "12px", color: "#ff6b6b" }}>{error}</p>
            </div>
          )}
          <button type="submit" disabled={!canSubmit || loadingChart} style={{ ...S.btnGold, opacity: (!canSubmit||loadingChart)?0.45:1, cursor: (!canSubmit||loadingChart)?"not-allowed":"pointer", marginTop: "4px" }}>
            {loadingChart ? <><span style={{...S.spinnerDark}} /> Generating chart...</> : <><Sparkles size={15} /> Generate My Kundli</>}
          </button>
          <p style={{ fontFamily: SANS, fontSize: "11px", color: "#222", textAlign: "center", marginTop: "-8px" }}>Free &middot; No sign-up &middot; ~15 seconds</p>
        </form>
      </div>
      <style>{CSS_SPIN}</style>
    </div>
  );

  if (step === "preview") {
    const previewText = reading.split("\n\n").filter(p=>p.trim()).slice(0,3).join("\n\n");
    return (
      <div style={{ ...S.page }}>
        <div style={{ ...S.wideWrap }}>
          <ProgressBar step="preview" />
          {!chartData && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ width: "44px", height: "44px", border: "1.5px solid #0a0a0a", borderTop: "1.5px solid " + GOLD, borderRadius: "50%", animation: "kundli-spin 1s linear infinite", margin: "0 auto 20px" }} />
              <p style={{ fontFamily: SERIF, fontSize: "13px", color: "#3a3a3a", letterSpacing: "2px" }}>Reading the celestial map...</p>
            </div>
          )}
          {chartData && (<>
            <p style={{ fontFamily: SANS, fontSize: "9px", color: "#2a2a2a", letterSpacing: "3px", textAlign: "center", marginBottom: "8px", textTransform: "uppercase" }}>
              {form.name||"Your Kundli"} &middot; {form.birthDate} &middot; {form.birthLocation}
            </p>
            <BirthChartWheel planets={chartData.planets} ascendant={chartData.ascendant} moonSign={chartData.moonSign} size={300} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1px", background: "#0a0a0a", margin: "20px 0 36px", borderRadius: "8px", overflow: "hidden" }}>
              {[["LAGNA",chartData.ascendant],["MOON",chartData.moonSign],["NAKSHATRA",chartData.nakshatra.name],["DASHA",chartData.dasha.name]].map(([label,value]) => (
                <div key={label} style={{ background: "#000", padding: "14px 6px", textAlign: "center" }}>
                  <p style={{ fontFamily: SANS, fontSize: "7px", color: "#2a2a2a", letterSpacing: "2px", marginBottom: "5px", textTransform: "uppercase" }}>{label}</p>
                  <p style={{ fontFamily: SERIF, fontSize: "13px", color: GOLD }}>{value}</p>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "32px" }}>
              <p style={{ ...S.sectionLabel }}>Reading Preview</p>
              {loadingReading && !reading && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 0" }}>
                  <span style={{ ...S.spinnerGold }} />
                  <span style={{ fontFamily: SANS, fontSize: "12px", color: "#2a2a2a" }}>Interpreting your chart...</span>
                </div>
              )}
              {previewText && <MarkdownText text={previewText} />}
            </div>
            <div style={{ position: "relative", background: "#040404", border: "0.5px solid #111", borderRadius: "10px", padding: "28px 24px", marginBottom: "32px", overflow: "hidden" }}>
              <div style={{ filter: "blur(4px)", userSelect: "none", pointerEvents: "none" }}>
                <p style={{ fontFamily: SERIF, fontSize: "14px", color: "#666", lineHeight: "1.9", marginBottom: "12px" }}>Your strongest planetary influence creates a specific tension between what you present to the world and what you need internally. This pattern intensifies during significant transitions.</p>
                <p style={{ fontFamily: SERIF, fontSize: "14px", color: "#666", lineHeight: "1.9", marginBottom: "12px" }}>One placement in your chart explains why certain emotional and career patterns repeat with more intensity than they do for most people.</p>
                <p style={{ fontFamily: SERIF, fontSize: "14px", color: "#666", lineHeight: "1.9" }}>Your current {chartData.dasha.name} Mahadasha is creating specific timing windows — including what may shift in the next 12 months.</p>
              </div>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom,#040404,transparent)", zIndex: 1 }} />
              <div style={{ position: "relative", zIndex: 2, textAlign: "center", borderTop: "0.5px solid #111", paddingTop: "20px", marginTop: "4px" }}>
                <Lock size={18} style={{ color: GOLD, display: "block", margin: "0 auto 8px" }} />
                <p style={{ fontFamily: SANS, fontSize: "11px", color: "#3a3a3a", marginBottom: "3px" }}>7 more sections in your complete reading</p>
                <p style={{ fontFamily: SANS, fontSize: "10px", color: "#222" }}>Career &middot; Relationships &middot; Timing windows &middot; Remedies</p>
              </div>
            </div>
            <button onClick={() => { track("kundli_unlock_report_clicked"); setStep("email"); }} style={{ ...S.btnGold, marginBottom: "10px" }}>
              Unlock Full Report <ChevronRight size={16} />
            </button>
            <p style={{ fontFamily: SANS, fontSize: "11px", color: "#222", textAlign: "center" }}>Free &middot; Sent to your inbox instantly</p>
          </>)}
        </div>
        <style>{CSS_SPIN}</style>
      </div>
    );
  }

  if (step === "email") return (
    <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...S.centeredWrap }}>
        <ProgressBar step="email" />
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "26px", marginBottom: "14px", color: GOLD }}>✦</div>
          <h2 style={{ fontFamily: SERIF, fontSize: "30px", color: "#FAF7F0", fontWeight: 400, marginBottom: "12px" }}>Get Your Complete Report</h2>
          <p style={{ fontFamily: SERIF, fontSize: "15px", color: "#555", lineHeight: "1.85" }}>Enter your email to unlock the full reading — free, delivered instantly.</p>
        </div>
        <div style={{ background: "#040404", border: "0.5px solid #111", borderRadius: "8px", padding: "22px 20px", marginBottom: "28px" }}>
          <p style={{ ...S.sectionLabel }}>What is Inside</p>
          {["Complete personality and emotional analysis","Career and financial path insights","Love, relationships, and compatibility",`Your ${chartData?.dasha.name||"Mahadasha"} period — what is shifting now`,"Planetary remedies and mantra guidance","12-month timing windows"].map(item => (
            <div key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
              <span style={{ color: GOLD, fontSize: "11px", flexShrink: 0, marginTop: "2px" }}>✓</span>
              <span style={{ fontFamily: SERIF, fontSize: "14px", color: "#666" }}>{item}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ ...S.label }}>Email Address <span style={{ color: GOLD }}>*</span></label>
            <div style={{ position: "relative" }}>
              <Mail size={14} style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", color: "#3a3a3a" }} />
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailError(""); }} placeholder="priya@example.com" style={{ ...S.input, paddingLeft: "36px" }} autoFocus />
            </div>
            {emailError && <p style={{ fontFamily: SANS, fontSize: "11px", color: "#ff6b6b", marginTop: "4px" }}>{emailError}</p>}
          </div>
          <button type="submit" disabled={sendingEmail} style={{ ...S.btnGold, opacity: sendingEmail?0.7:1, cursor: sendingEmail?"not-allowed":"pointer" }}>
            {sendingEmail ? <><span style={{...S.spinnerDark}} /> Sending...</> : <>Send My Full Report <ChevronRight size={16} /></>}
          </button>
          <p style={{ fontFamily: SANS, fontSize: "11px", color: "#222", textAlign: "center", lineHeight: "1.6" }}>No spam. Unsubscribe anytime. We never share your data.</p>
        </form>
        <button onClick={() => setStep("preview")} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#2a2a2a", fontSize: "12px", fontFamily: SANS, cursor: "pointer", margin: "20px auto 0", padding: "8px" }}>
          <ArrowLeft size={13} /> Back to preview
        </button>
      </div>
      <style>{CSS_SPIN}</style>
    </div>
  );

  if (step === "report") return (
    <div style={{ ...S.page }}>
      <div style={{ ...S.wideWrap }}>
        <ProgressBar step="report" />
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#030f03", border: "0.5px solid #0a280a", borderRadius: "7px", padding: "12px 16px", marginBottom: "32px" }}>
          <CheckCircle2 size={15} style={{ color: "#2a5a2a", flexShrink: 0 }} />
          <p style={{ fontFamily: SANS, fontSize: "12px", color: "#2a5a2a" }}>Your complete reading has been sent to <strong>{email}</strong></p>
        </div>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <p style={{ fontFamily: SANS, fontSize: "9px", color: "#2a2a2a", letterSpacing: "3px", marginBottom: "6px", textTransform: "uppercase" }}>{form.name||"Your Kundli"} &middot; {form.birthDate} &middot; {form.birthLocation}</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "26px", color: "#FAF7F0", fontWeight: 400 }}>Your Complete Reading</h2>
        </div>
        {chartData && (<>
          <BirthChartWheel planets={chartData.planets} ascendant={chartData.ascendant} moonSign={chartData.moonSign} size={320} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1px", background: "#0a0a0a", margin: "20px 0 28px", borderRadius: "8px", overflow: "hidden" }}>
            {[["LAGNA",chartData.ascendant],["MOON",chartData.moonSign],["NAKSHATRA",chartData.nakshatra.name],["DASHA",chartData.dasha.name]].map(([l,v]) => (
              <div key={l} style={{ background: "#000", padding: "14px 6px", textAlign: "center" }}>
                <p style={{ fontFamily: SANS, fontSize: "7px", color: "#2a2a2a", letterSpacing: "2px", marginBottom: "5px", textTransform: "uppercase" }}>{l}</p>
                <p style={{ fontFamily: SERIF, fontSize: "13px", color: GOLD }}>{v}</p>
              </div>
            ))}
          </div>
          <TraitCards traits={chartData.traits} />
          <TodaysTransits transits={chartData.transits} />
        </>)}
        <div style={{ ...S.divider, margin: "36px 0" }} />
        <p style={{ ...S.sectionLabel }}>Your Reading</p>
        {loadingReading && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span style={{ ...S.spinnerGold }} /> <span style={{ fontFamily: SANS, fontSize: "12px", color: "#2a2a2a" }}>Finalizing your reading...</span>
          </div>
        )}
        <MarkdownText text={reading} />
        <div style={{ background: "#040404", border: "0.5px solid #111", borderRadius: "12px", padding: "36px 28px", marginTop: "52px", textAlign: "center" }}>
          <p style={{ fontFamily: SANS, fontSize: "9px", color: "#2a2a2a", letterSpacing: "3px", marginBottom: "16px", textTransform: "uppercase" }}>Want a Deeper Reading?</p>
          <h3 style={{ fontFamily: SERIF, fontSize: "26px", color: "#FAF7F0", fontWeight: 400, marginBottom: "12px" }}>Consult a Verified Astrologer</h3>
          <p style={{ fontFamily: SERIF, fontSize: "15px", color: "#555", lineHeight: "1.85", maxWidth: "420px", margin: "0 auto 28px" }}>Our experienced astrologers provide personalized guidance based on your complete birth chart and current planetary influences.</p>
          <a href="/services?category=astrology" onClick={() => track("kundli_consult_astrologer_clicked")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: GOLD, color: "#000", textDecoration: "none", borderRadius: "6px", padding: "14px 28px", fontFamily: SANS, fontSize: "14px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "14px" }}>
            Consult an Astrologer <ChevronRight size={15} />
          </a>
          <br />
          <a href="/services?category=astrology" style={{ fontFamily: SANS, fontSize: "11px", color: "#333", textDecoration: "none", letterSpacing: "1px" }}>Book a Free Discovery Call</a>
        </div>
        <p style={{ fontFamily: SANS, fontSize: "10px", color: "#1a1a1a", lineHeight: "1.6", textAlign: "center", margin: "32px auto 0", maxWidth: "460px" }}>
          Setu AI readings are for guidance and reflection only. Not a substitute for professional medical, financial, or legal advice.
        </p>
      </div>
      <style>{CSS_SPIN}</style>
    </div>
  );

  return null;
}
