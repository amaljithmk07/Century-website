import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { getGalleryImages } from "@/lib/db";

export const revalidate = 0; // Ensure live database images are fetched on request

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our gallery of weddings, corporate events, and venue photos at Century Convention Center.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A glimpse into our world of elegance"
        image="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80"
      />

      <section className="section-padding surface-ivory">
        <div className="container-custom">
          <SectionHeader
            label="Portfolio"
            title="Moments Captured"
            description="Explore our collection of stunning events and beautifully appointed spaces."
          />
          <MasonryGallery images={images} />
        </div>
      </section>
    </>
  );
}
