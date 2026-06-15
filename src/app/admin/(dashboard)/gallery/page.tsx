import { getGalleryImages } from "@/lib/db";
import { AdminGalleryContainer } from "./admin-gallery-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery Management | Century Admin",
  description: "Upload, categorize, and delete photos dynamically.",
};

export const revalidate = 0; // Disable cache so the admin always sees real-time uploads

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="lg:h-full flex flex-col space-y-6">
      {/* Header section */}
      <div className="shrink-0">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-1">Visual Catalog</span>
        <h2 
          className="text-4xl font-light text-neutral-800 tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Gallery Management
        </h2>
        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
          Add new photos to showcase the venue, facilities, and events, or remove outdated images.
        </p>
      </div>

      {/* Main client component containing the interactive interface */}
      <div className="lg:flex-1 min-h-0">
        <AdminGalleryContainer initialImages={images} />
      </div>
    </div>
  );
}
