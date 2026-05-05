import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/utils";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"]
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://perryroofers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} — Houston's Family-Run Roofer Since ${SITE.yearsFounded}`,
    template: `%s · ${SITE.name}`
  },
  description:
    "Roof replacement, storm damage repair, and free inspections across Humble, Kingwood, Atascocita and the greater Houston area. Family-owned. Same-day emergency tarping.",
  keywords: [
    "Humble roofer",
    "Houston roof replacement",
    "storm damage roof repair",
    "Kingwood roofing company",
    "Atascocita roofing",
    "free roof inspection Houston"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — Built for Houston Weather`,
    description:
      "Family-owned roofers serving Humble, Kingwood and the greater Houston area. Free inspections, insurance claim help, and 24-hour emergency tarping.",
    url: siteUrl,
    siteName: SITE.name,
    locale: "en_US",
    type: "website"
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" }
};

export const viewport: Viewport = {
  themeColor: "#0F1B2D",
  width: "device-width",
  initialScale: 1
};

const callRailTarget = process.env.NEXT_PUBLIC_CALLRAIL_SWAP_TARGET;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* JSON-LD: LocalBusiness for SEO */}
        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RoofingContractor",
              name: SITE.name,
              telephone: SITE.phoneFallbackTel,
              email: SITE.email,
              url: siteUrl,
              address: {
                "@type": "PostalAddress",
                streetAddress: "7156 FM 1960",
                addressLocality: "Humble",
                addressRegion: "TX",
                postalCode: "77346",
                addressCountry: "US"
              },
              areaServed: [
                "Humble, TX",
                "Houston, TX",
                "Kingwood, TX",
                "Atascocita, TX",
                "Spring, TX",
                "Porter, TX",
                "New Caney, TX",
                "The Woodlands, TX"
              ],
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "214"
              }
            })
          }}
        />
        {/* CallRail dynamic number swap (no-op without target id) */}
        {callRailTarget ? (
          <Script
            id="callrail"
            strategy="afterInteractive"
            src={`//cdn.callrail.com/companies/${callRailTarget}/swap.js`}
          />
        ) : null}
      </head>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
