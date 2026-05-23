import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/slugify";

const SITE_URL = "https://q2m-site.vercel.app";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/catalogue`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Pages catégories : URLs propres /categorie/[slug]
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, parent_id");

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map((c) => ({
    url: `${SITE_URL}/categorie/${slugify(c.name)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: c.parent_id ? 0.6 : 0.7,
  }));

  // Pages produits
  const { data: products } = await supabase
    .from("v_product_stock")
    .select("id")
    .eq("is_active", true)
    .gt("selling_price", 0)
    .limit(1000);

  const productPages: MetadataRoute.Sitemap = (products || []).map((p) => ({
    url: `${SITE_URL}/produit/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
