import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BRAND } from "@/lib/branding";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `${BRAND.name} - ${BRAND.fullName} | ${BRAND.city}`,
  description: `${BRAND.fullName} (${BRAND.name}) - Votre ${BRAND.tagline.toLowerCase()} de confiance au ${BRAND.city}. Matériaux de construction, outillage, plomberie, électricité et plus.`,
  keywords: `quincaillerie, ${BRAND.city}, Sénégal, matériaux construction, outillage, ${BRAND.name}`,
  openGraph: {
    title: `${BRAND.name} - ${BRAND.fullName}`,
    description: `Votre ${BRAND.tagline.toLowerCase()} de confiance au ${BRAND.city}`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
