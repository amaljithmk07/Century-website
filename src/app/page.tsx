import { HeroSection } from "@/components/home/hero-section";
import { IntroSection } from "@/components/home/intro-section";
import { FacilitiesHighlight } from "@/components/home/facilities-highlight";
import { ServicesOverview } from "@/components/home/services-overview";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import { getGalleryImages, getSettings } from "@/lib/db";

export const revalidate = 0; // Ensure live database data is fetched on request

export default function HomePage() {
  const images = getGalleryImages();
  const settings = getSettings();

  return (
    <>
      <HeroSection settings={settings} />
      <IntroSection />
      <FacilitiesHighlight />
      <ServicesOverview />
      <GalleryPreview images={images} />
      <WhyChooseSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
  