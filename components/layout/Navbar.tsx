"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Browse Services" },
  { href: "/kundli", label: "Free Kundli" },
  { href: "/soul-match", label: "Soul Match" },
  { href: "/panchang", label: "Panchang" },
  { href: "/providers", label: "Providers" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-ivory-dark">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/setu-logo.png"
                alt="Setu logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-headline font-bold text-xl text-maroon tracking-tight">
              Setu
            </span>
            <span className="hidden sm:inline text-charcoal-subtle text-sm font-label">
              Roots in Motion
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-label text-label-md text-charcoal-muted hover:text-charcoal transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="font-label text-label-md text-charcoal-muted hover:text-charcoal transition-colors duration-300"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="bg-maroon text-ivory text-label-md font-label px-5 py-2 rounded-pill hover:bg-maroon-hover transition-all duration-300 hover:shadow-gold-glow"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-charcoal"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-ivory-dark py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-label text-body-md text-charcoal-muted"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-ivory-dark">
              <Link href="/auth/login" className="font-label text-body-md text-charcoal-muted">
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="bg-maroon text-ivory text-label-md font-label px-5 py-2.5 rounded-pill text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
