import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BRAND } from "@/lib/branding";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const SITE_URL = "https://q2m-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} · ${BRAND.fullName} — Quincaillerie ${BRAND.city}`,
    template: `%s | ${BRAND.name} Quincaillerie`,
  },
  description: `${BRAND.fullName} (${BRAND.name}) — Quincaillerie de référence à ${BRAND.city}. Plus de 400 produits : ciment, fer à béton, plomberie, électricité, outillage, peinture. Livraison Dakar, paiement Wave/Orange Money.`,
  keywords: [
    "quincaillerie",
    "Dakar",
    "Lac Rose",
    "Sénégal",
    "ciment",
    "fer à béton",
    "plomberie",
    "électricité",
    "matériaux construction",
    "outillage",
    "Q2M",
    "quincaillerie Lac Rose",
    "quincaillerie Dakar",
    "BTP Sénégal",
  ],
  authors: [{ name: BRAND.fullName }],
  creator: BRAND.name,
  publisher: BRAND.name,
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: BRAND.name,
    title: `${BRAND.name} · ${BRAND.fullName}`,
    description: `Quincaillerie de référence à ${BRAND.city}. 400+ produits BTP, plomberie, électricité, outillage. Livraison Dakar.`,
    images: [
      {
        url: BRAND.logoUrl,
        width: 1024,
        height: 1024,
        alt: `Logo ${BRAND.name} ${BRAND.fullName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} · ${BRAND.fullName}`,
    description: `Quincaillerie à ${BRAND.city}. 400+ produits. Livraison Dakar.`,
    images: [BRAND.logoUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: BRAND.logoUrl,
    apple: BRAND.logoUrl,
  },
};

// JSON-LD : Organisation locale (LocalBusiness) pour Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  name: BRAND.fullName,
  alternateName: BRAND.name,
  url: SITE_URL,
  logo: `${SITE_URL}${BRAND.logoUrl}`,
  image: `${SITE_URL}${BRAND.logoUrl}`,
  description: `Quincaillerie de référence à ${BRAND.city}. Matériaux de construction, plomberie, électricité, outillage.`,
  telephone: BRAND.primaryTelDial,
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.city,
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "19:00",
  },
  priceRange: "1000 - 100000 FCFA",
  paymentAccepted: ["Cash", "Mobile Money (Wave, Orange Money)"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
