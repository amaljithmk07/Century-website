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

export default async function HomePage() {
  const images = await getGalleryImages();
  const settings = await getSettings();

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
  