import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Q2M - Quincaillerie Maman Marème | Lac Rose, Dakar",
  description: "Quincaillerie Maman Marème (Q2M) - Votre quincaillerie de confiance au Lac Rose, Dakar. Matériaux de construction, outillage, plomberie, électricité et plus.",
  keywords: "quincaillerie, Lac Rose, Dakar, Sénégal, matériaux construction, outillage, Q2M",
  openGraph: {
    title: "Q2M - Quincaillerie Maman Marème",
    description: "Votre quincaillerie de confiance au Lac Rose, Dakar",
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
