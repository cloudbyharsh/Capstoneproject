"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="bg-ivory min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="bg-white rounded-card shadow-card p-8 w-full max-w-md border border-ivory-dark/40 relative overflow-hidden">
        <div className="font-devanagari text-maroon/[0.02] text-[180px] absolute -top-8 -right-8 select-none pointer-events-none font-bold">स्वागतम्</div>

        <h1 className="font-headline font-bold text-heading-lg text-charcoal mb-2">Sign in to Setu</h1>
        <p className="font-body text-body-sm text-charcoal-muted mb-6">Manage your bookings, Kundli profiles, and ceremonies.</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-label text-label-md text-charcoal-muted mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@domain.ca"
              className="w-full px-4 py-2 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block font-label text-label-md text-charcoal-muted mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-ivory border border-ivory-dark rounded-btn font-label text-label-md text-charcoal placeholder:text-charcoal-subtle focus:outline-none focus:border-saffron/60 focus:ring-2 focus:ring-saffron/10 transition-all duration-300"
              required
            />
          </div>

          <Button type="button" className="w-full mt-4">Sign In</Button>
        </form>

        <div className="mt-6 text-center font-label text-label-sm text-charcoal-muted">
          Don&apos;t have an account? <Link href="/auth/signup" className="text-maroon underline font-semibold">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
