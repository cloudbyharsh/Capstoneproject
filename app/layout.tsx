import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
                <head>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                        <link
                                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:wght@300;400;500&family=Noto+Serif+Devanagari:wght@400;500&display=swap"
                                    rel="stylesheet"
                                  />
                </head>
                <body className="antialiased bg-ivory text-charcoal">
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                  {/* Sender.net Email Capture */}
                        <Script
                                    id="sender-universal"
                                    strategy="afterInteractive"
                                    src="https://cdn.sender.net/accounts_resources/universal.js"
                                    onLoad={() => {
                                                  // @ts-expect-error sender is injected by the script
                                                  if (typeof window.sender === "function") window.sender("1a295a76183580");
                                    }}
                                  />
                  {/* Heap Analytics */}
                        <Script id="heap-analytics" strategy="afterInteractive">
                          {`window.heapReadyCb=window.heapReadyCb||[],window.heap=window.heap||[],heap.load=function(e,t){window.heap.envId=e,window.heap.clientConfig=t=t||{},window.heap.clientConfig.shouldFetchServerConfig=!1;var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.us.heap-api.com/config/"+e+"/heap_config.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r);var n=["init","startTracking","stopTracking","track","resetIdentity","identify","getSessionId","getUserId","getIdentity","addUserProperties","addEventProperties","removeEventProperty","clearEventProperties","addAccountProperties","addAdapter","addTransformer","addTransformerFn","onReady","addPageviewProperties","removePageviewProperty","clearPageviewProperties","trackPageview"],i=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);window.heapReadyCb.push({name:e,fn:function(){heap[e]&&heap[e].apply(heap,t)}})}};for(var p=0;p<n.length;p++)heap[n[p]]=i(n[p])};heap.load("2941083674");`}
                        </Script>
                </body>
          </html>
        );
}
