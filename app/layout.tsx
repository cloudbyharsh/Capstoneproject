import type { Metadata } from "next";
import Script from "next/script";
import {
  Cormorant_Garamond,
  Playfair_Display,
  DM_Sans,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Setu - Sacred Vedic Pujas, Astrology & Vastu in Canada",
  description: "Discover and book verified traditional Indian spiritual services across Canada. Book Pandit Jis for Puja, get expert Vedic Astrology readings, and Vastu consultations. Roots in Motion.",
  keywords: [
    "Vedic Puja Canada",
    "Book Pandit Ji Online",
    "Vedic Astrology Toronto",
    "Kundli Matching",
    "Home Vastu Assessment",
    "Indian Spiritual Services",
    "Griha Pravesh Puja Booking",
    "Diwali Havan Canada",
    "Setu Spiritual",
  ],
  authors: [{ name: "Setu Team" }],
  openGraph: {
    title: "Setu - Sacred Vedic Pujas, Astrology & Vastu in Canada",
    description: "Book verified pandit jis, astrologers, and Vastu practitioners for your family ceremonies. Purity and convenience combined.",
    url: "https://setu.app",
    siteName: "Setu",
    images: [
      {
        url: "https://setu.app/setu-logo.png",
        width: 1200,
        height: 630,
        alt: "Setu Sacred Geometry Logo",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Setu - Sacred Vedic Pujas & Astrology in Canada",
    description: "Discover and book traditional Indian spiritual services. Connecting the diaspora to sacred traditions.",
    images: ["https://setu.app/setu-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} ${devanagari.variable} antialiased bg-ivory text-charcoal`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Heap Analytics */}
        <Script id="heap-analytics" strategy="afterInteractive">
          {`window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},window.heap.clientConfig.shouldFetchServerConfig=!1;var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);var n=["init","startTracking","stopTracking","track","resetIdentity","identify","getSessionId","getUserId","getIdentity","addUserProperties","addEventProperties","removeEventProperty","clearEventProperties","addAccountProperties","addAdapter","addTransformer","addTransformerFn","onReady","addPageviewProperties","removePageviewProperty","clearPageviewProperties","trackPageview"],i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};heap.load("2565559675");`}
        </Script>
      </body>
    </html>
  );
}
