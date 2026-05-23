import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { BRAND } from "@/lib/branding";

const SITE_URL = "https://q2m-site.vercel.app";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

function formatFCFA(n: number) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " FCFA";
}

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: product } = await supabase
    .from("v_product_stock")
    .select("id, ref_produit, designation, selling_price, unit, image_url, category_name")
    .eq("id", params.id)
    .maybeSingle();

  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Ce produit n'existe plus ou a été retiré du catalogue.",
    };
  }

  const title = product.designation;
  const description = `${product.designation} — ${formatFCFA(product.selling_price)} / ${product.unit}. Disponible chez ${BRAND.name} Quincaillerie à ${BRAND.city}. Livraison Dakar.`;
  const url = `${SITE_URL}/produit/${product.id}`;
  const ogImage = product.image_url || `${SITE_URL}${BRAND.logoUrl}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} · ${BRAND.name}`,
      description,
      images: [{ url: ogImage, alt: product.designation }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductLayout({ params, children }: Props) {
  const { data: product } = await supabase
    .from("v_product_stock")
    .select("id, ref_produit, designation, selling_price, unit, image_url, category_name, stock_actual")
    .eq("id", params.id)
    .maybeSingle();

  // JSON-LD Product pour Google Rich Snippets
  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.designation,
        sku: product.ref_produit,
        description: `${product.designation} — Quincaillerie ${BRAND.name}`,
        image: product.image_url ? [product.image_url] : [`${SITE_URL}${BRAND.logoUrl}`],
        category: product.category_name,
        brand: {
          "@type": "Brand",
          name: BRAND.name,
        },
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/produit/${product.id}`,
          priceCurrency: "XOF",
          price: product.selling_price,
          availability:
            product.stock_actual > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: BRAND.fullName,
          },
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
