import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ceylonvantage.com"),
  title: {
    default: "Ceylon Vantage — See Sri Lanka from where we stand",
    template: "%s — Ceylon Vantage",
  },
  description:
    "A personal Sri Lanka travel company built on decades behind the wheel. Custom itineraries, private chauffeur travel, and local knowledge you won't find in a guidebook.",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ceylon Vantage",
    title: "Ceylon Vantage — See Sri Lanka from where we stand",
    description:
      "Custom itineraries, private chauffeur travel, and local knowledge you won't find in a guidebook.",
    images: [{ url: "/images/hero/hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceylon Vantage — See Sri Lanka from where we stand",
    description:
      "Custom itineraries, private chauffeur travel, and local knowledge you won't find in a guidebook.",
    images: ["/images/hero/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#13332e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Ceylon Vantage",
    description:
      "A personal Sri Lanka travel company designing custom itineraries and private chauffeur-guided trips across the island.",
    email: "ceylonvantage@gmail.com",
    telephone: "+94766110172",
    address: {
      "@type": "PostalAddress",
      streetAddress: "159/2E/1-1, Thalawathugoda Rd",
      addressLocality: "Pitakotte, Sri Jayewardenepura Kotte",
      addressCountry: "LK",
    },
    sameAs: [
      "https://www.instagram.com/ceylon_vantage/",
      "https://web.facebook.com/profile.php?id=61592832817349",
      "https://www.tripadvisor.com/Attraction_Review-g665217-d34554874-Reviews-Ceylon_Vantage-Sri_Jayawardenepura_Western_Province.html",
    ],
    areaServed: "Sri Lanka",
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this rule targets the Pages Router; App Router's documented pattern for CDN fonts is a <link> in the root layout */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}