import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/70 pt-16 pb-8">
      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/setu-logo.png"
                  alt="Setu logo"
                  fill
                  className="object-contain brightness-200 opacity-80"
                />
              </div>
              <span className="font-headline font-bold text-xl text-ivory tracking-tight">Setu</span>
              <span className="text-ivory/40 text-sm font-label">Roots in Motion</span>
            </div>
            <p className="font-body text-body-md text-ivory/60 max-w-xs leading-relaxed">
              A curated marketplace connecting the Indian diaspora with verified spiritual practitioners and sacred traditions — reimagined for modern life.
            </p>
          </div>

          <div>
            <h4 className="font-headline font-semibold text-ivory text-label-md uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/services", label: "Browse Services" },
                { href: "/providers", label: "Providers" },
                { href: "/services?category=puja", label: "Puja Ceremonies" },
                { href: "/services?category=astrology", label: "Astrology" },
                { href: "/services?category=vastu", label: "Vastu" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-label text-label-md text-ivory/60 hover:text-ivory transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-semibold text-ivory text-label-md uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/providers/join", label: "Become a Provider" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-label text-label-md text-ivory/60 hover:text-ivory transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-label text-label-sm text-ivory/40">
            © 2025 Setu. All rights reserved.
          </p>
          <p className="font-label text-label-sm text-ivory/40">
            Made with devotion for the diaspora.
          </p>
        </div>
      </div>
    </footer>
  );
}
