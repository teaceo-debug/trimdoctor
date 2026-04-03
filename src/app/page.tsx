import Nav from "@/components/marketing/Nav";
import Hero from "@/components/marketing/Hero";
import Pricing from "@/components/marketing/Pricing";
import { HowItWorks, FAQ, CTASection, Footer } from "@/components/marketing/Sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
