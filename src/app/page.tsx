import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import VantagePoints from "@/components/VantagePoints";
import TrustBadges from "@/components/TrustBadges";
import Destinations from "@/components/Destinations";
import TourPackages from "@/components/TourPackages";
import Experiences from "@/components/Experiences";
import FounderStory from "@/components/FounderStory";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <VantagePoints />
      </Reveal>
      <Reveal>
        <TrustBadges />
      </Reveal>
      <Reveal>
        <Destinations />
      </Reveal>
      <Reveal>
        <TourPackages />
      </Reveal>
      <Reveal>
        <Experiences />
      </Reveal>
      <Reveal>
        <FounderStory />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
      <Footer />
    </main>
  );
}