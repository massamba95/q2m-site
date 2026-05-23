import { TopBar } from "@/components/top-bar";
import { Header } from "@/components/header";
import { MegaMenu } from "@/components/mega-menu";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { CategoriesVisual } from "@/components/categories-visual";
import { TopProductsCarousel } from "@/components/top-products-carousel";
import { CtaDevis } from "@/components/cta-devis";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Cart } from "@/components/cart";
import { DevisModal } from "@/components/devis-modal";

export default function Home() {
  return (
    <main>
      <div className="sticky top-0 z-40 shadow-sm">
        <TopBar />
        <Header />
        <MegaMenu />
      </div>
      <Hero />
      <TrustBar />
      <CategoriesVisual />
      <TopProductsCarousel />
      <CtaDevis />
      <Services />
      <Contact />
      <Footer />
      <Cart />
      <DevisModal />
    </main>
  );
}
