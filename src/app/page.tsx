import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Catalogue } from "@/components/catalogue";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { QuoteCart } from "@/components/quote-cart";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Catalogue />
      <Contact />
      <Footer />
      <QuoteCart />
    </main>
  );
}
