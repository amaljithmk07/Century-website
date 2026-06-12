import { HeroSection } from "@/components/home/hero-section";
import { IntroSection } from "@/components/home/intro-section";
import { FacilitiesHighlight } from "@/components/home/facilities-highlight";
import { ServicesOverview } from "@/components/home/services-overview";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FacilitiesHighlight />
      <ServicesOverview />
      <GalleryPreview />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
  