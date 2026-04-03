import Nav from "@/components/marketing/Nav";
import Hero from "@/components/marketing/Hero";
import Pricing from "@/components/marketing/Pricing";
import {
  SocialProof,
  HowItWorks,
  MarqueeTicker,
  Testimonials,
  FAQ,
  CTASection,
  Footer,
} from "@/components/marketing/Sections";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Pricing />
      <MarqueeTicker />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
