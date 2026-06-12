"use client";

import { useEffect } from "react";
import { Mail, Phone, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactPage() {

  useEffect(() => {
    // Next.js SPA: Sender's universal.js runs once on initial page load and
    // won't re-scan the DOM automatically on client-side navigation.
    // Fix: call senderForms.render() for the explicit API, AND call sender()
    // directly as a fallback (triggers a re-scan for the div now in the DOM).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const FORM_ID = "b4xjAk";
    const ACCOUNT_ID = "1a295a76183580";

    function renderForm() {
      if (w.senderForms?.render) {
        w.senderForms.render(FORM_ID);
      }
    }

    if (w.senderFormsLoaded) {
      // Sender SDK already ready — render immediately
      renderForm();
    } else {
      // Listen for SDK ready event
      window.addEventListener("onSenderFormsLoaded", renderForm);
      // Also call sender() directly — re-triggers a DOM scan and catches cases
      // where senderFormsLoaded is never set (e.g. universal.js already loaded)
      if (typeof w.sender === "function") {
        w.sender(ACCOUNT_ID);
      }
    }

    return () => {
      window.removeEventListener("onSenderFormsLoaded", renderForm);
      w.senderForms?.destroy?.(FORM_ID);
    };
  }, []);

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

          {/* Sender embedded form */}
          <div className="lg:col-span-3 bg-white rounded-card shadow-card p-8 border border-ivory-dark/40 min-h-[400px]">
            <div
              style={{ textAlign: "left" }}
              className="sender-form-field"
              data-sender-form-id="b4xjAk"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
