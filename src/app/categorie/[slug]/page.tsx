import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { TopBar } from "@/components/top-bar";
import { Header } from "@/components/header";
import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/footer";
import { Cart } from "@/components/cart";
import { DevisModal } from "@/components/devis-modal";
import { CategoryPageContent } from "@/components/category-page-content";
import { slugify } from "@/lib/slugify";
import { BRAND } from "@/lib/branding";

const SITE_URL = "https://q2m-site.vercel.app";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface Props {
  params: { slug: string };
}

async function findCategoryBySlug(slug: string) {
  const { data: cats } = await supabase
    .from("categories")
    .select("id, name, parent_id");
  return (cats || []).find((c) => slugify(c.name) === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await findCategoryBySlug(params.slug);

  if (!cat) {
    return { title: "Catégorie introuvable" };
  }

  const title = `${cat.name} · Catalogue ${BRAND.name}`;
  const description = `Découvrez notre sélection de ${cat.name.toLowerCase()} chez ${BRAND.name} Quincaillerie à ${BRAND.city}. Livraison Dakar. Paiement Wave/Orange Money.`;
  const url = `${SITE_URL}/categorie/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${cat.name} · ${BRAND.name}`,
      description,
      images: [{ url: `${SITE_URL}${BRAND.logoUrl}`, alt: cat.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const cat = await findCategoryBySlug(params.slug);
  if (!cat) notFound();

  // Récupérer toutes les catégories pour les sous-cat
  const { data: allCats } = await supabase
    .from("categories")
    .select("id, name, parent_id");

  // JSON-LD ItemList (groupage produits)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.name,
    description: `Catalogue ${cat.name} chez ${BRAND.fullName}`,
    url: `${SITE_URL}/categorie/${params.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: BRAND.name,
      url: SITE_URL,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sticky top-0 z-40 shadow-sm">
        <TopBar />
        <Header />
        <MegaMenu />
      </div>
      <CategoryPageContent
        category={cat}
        allCategories={allCats || []}
      />
      <Footer />
      <Cart />
      <DevisModal />
    </main>
  );
}
