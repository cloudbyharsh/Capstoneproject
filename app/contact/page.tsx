"use client";

import Button from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="bg-ivory min-h-screen py-20 px-4">
      <div className="layout-container max-w-xl mx-auto bg-white rounded-card shadow-card p-8 md:p-10 border border-ivory-dark/40 relative overflow-hidden">
        <div className="font-devanagari text-maroon/[0.02] text-[180px] absolute -top-8 -right-8 select-none pointer-events-none font-bold">संपर्क</div>

        <div className="inline-flex items-center gap-2 bg-saffron-tint border border-saffron/20 rounded-pill px-4 py-1.5 mb-6">
          <span className="text-gold">✦</span>
          <span className="font-label text-label-sm text-saffron">Connect with us</span>
        </div>

        <h1 className="font-headline font-bold text-heading-lg md:text-hero-mobile text-charcoal mb-4">
          Contact Setu
        </h1>
        <p className="font-body text-body-md text-charcoal-muted mb-6">
          Have questions about booking a puja, finding an astrologer, or joining as a spiritual practitioner? Send us a message!
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-label text-label-md text-charcoal-muted mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Rahul Sharma"
              className="w-full px-4 py-2 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block font-label text-label-md text-charcoal-muted mb-1">Email Address</label>
            <input
              type="email"
              placeholder="rahul@domain.ca"
              className="w-full px-4 py-2 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block font-label text-label-md text-charcoal-muted mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="How can we help you coordinate your upcoming ceremony?"
              className="w-full px-4 py-2 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              required
            />
          </div>

          <Button type="button" className="w-full mt-4">Send Message</Button>
        </form>

        <div className="mt-8 pt-6 border-t border-ivory-dark text-center">
          <p className="font-label text-label-sm text-charcoal-subtle">
            Or reach out directly at: <a href="mailto:support@setu.app" className="text-maroon underline">support@setu.app</a>
          </p>
        </div>
      </div>
    </div>
  );
}
