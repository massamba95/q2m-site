import type { Metadata } from "next";
import { TopBar } from "@/components/top-bar";
import { Header } from "@/components/header";
import { MegaMenu } from "@/components/mega-menu";
import { Catalogue } from "@/components/catalogue";
import { Footer } from "@/components/footer";
import { Cart } from "@/components/cart";
import { DevisModal } from "@/components/devis-modal";

export const metadata: Metadata = {
  title: "Catalogue · 400+ produits quincaillerie",
  description: "Catalogue complet Q2M Quincaillerie : ciment, fer à béton, plomberie, électricité, outillage, peinture. 9 catégories, plus de 400 produits en stock à Lac Rose, Dakar.",
  alternates: { canonical: "/catalogue" },
  openGraph: {
    title: "Catalogue Q2M · 400+ produits",
    description: "Tous nos produits BTP, plomberie, électricité, outillage. Livraison Dakar.",
  },
};

export default function CataloguePage() {
  return (
    <main>
      <div className="sticky top-0 z-40 shadow-sm">
        <TopBar />
        <Header />
        <MegaMenu />
      </div>
      <Catalogue />
      <Footer />
      <Cart />
      <DevisModal />
    </main>
  );
}
