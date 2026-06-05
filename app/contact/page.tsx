"use client";

import { useState } from "react";
import { Mail, Phone, User, MessageSquare, FileText, AlertCircle, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[\d\s\-+().]{7,}$/.test(phone);
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const canSubmit =
    form.name.trim() &&
    isValidEmail(form.email) &&
    isValidPhone(form.phone) &&
    form.subject.trim() &&
    form.message.trim().length >= 10;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(form.email)) { setError("Please enter a valid email address."); return; }
    if (!isValidPhone(form.phone)) { setError("Please enter a valid phone number."); return; }
    if (form.message.trim().length < 10) { setError("Please write a message of at least 10 characters."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Could not send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-ivory-dark py-12">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout text-center">
          <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-4">
            <span className="text-gold">&#10022;</span>
            <span className="font-label text-label-sm text-saffron">We&apos;d love to hear from you</span>
          </div>
          <h1 className="font-headline font-bold text-heading-lg md:text-hero-mobile text-charcoal mb-3">
            Contact Us
          </h1>
          <p className="font-body text-body-lg text-charcoal-muted max-w-xl mx-auto">
            Have a question, a ceremony to plan, or just want to connect? Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-12">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Info panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-card shadow-card p-6 border border-ivory-dark/40">
              <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-saffron-tint rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-label text-label-sm text-charcoal-subtle mb-0.5">Email</p>
                    <a href="mailto:support@setu.app" className="font-label text-label-md text-maroon hover:underline">
                      support@setu.app
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-saffron-tint rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-label text-label-sm text-charcoal-subtle mb-0.5">Response Time</p>
                    <p className="font-label text-label-md text-charcoal">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-maroon to-maroon-light rounded-card p-6 text-ivory">
              <Sparkles size={20} className="text-gold mb-3" />
              <h3 className="font-headline font-bold text-heading-md mb-2">Want a Free Kundli?</h3>
              <p className="font-body text-label-md text-ivory/80 mb-4">
                Get your free AI-powered Vedic birth chart in under 15 seconds.
              </p>
              <Button href="/kundli" variant="gold" size="sm">
                Try Free Kundli
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-card shadow-card p-10 border border-ivory-dark/40 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-saffron-tint rounded-full flex items-center justify-center text-3xl mb-5">
                  &#128591;
                </div>
                <h2 className="font-headline font-bold text-heading-lg text-charcoal mb-3 tracking-wide uppercase">
                  Thank You for Connecting
                </h2>
                <p className="font-body text-body-md text-charcoal-muted max-w-sm">
                  We&apos;ve received your message and will get back to you within 24 hours. A confirmation has been sent to <span className="text-maroon font-semibold">{form.email}</span>.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-card shadow-card p-8 border border-ivory-dark/40">
                <h2 className="font-headline font-semibold text-heading-md text-charcoal mb-6">Send a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-subtle" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Priya Sharma"
                        className="w-full pl-9 pr-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email + Phone row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                        Email Address <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-subtle" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="priya@example.com"
                          className="w-full pl-9 pr-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                        Phone Number <span className="text-error">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-subtle" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+1 416 555 0123"
                          className="w-full pl-9 pr-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                      Subject <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <FileText size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-subtle" />
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        placeholder="Booking a Griha Pravesh ceremony"
                        className="w-full pl-9 pr-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-label text-label-md text-charcoal-muted mb-1.5">
                      Message <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-charcoal-subtle" />
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us how we can help you..."
                        className="w-full pl-9 pr-4 py-2.5 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300 resize-none"
                        required
                      />
                    </div>
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
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
