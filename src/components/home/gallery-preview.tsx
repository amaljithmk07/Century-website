"use client";

import Image from "next/image";
import Link from "next/link";
import { type DBGalleryImage } from "@/lib/db";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerChildren, StaggerItem } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";

interface GalleryPreviewProps {
  images: DBGalleryImage[];
}

export function GalleryPreview({ images }: GalleryPreviewProps) {
  const preview = images.slice(0, 6);

  return (
    <section className="section-padding surface-ivory">
      <div className="container-custom">
        <SectionHeader
          label="Gallery"
          title="Moments of Elegance"
          description="A curated glimpse into our world of refined celebrations and beautifully appointed spaces."
        />

        <StaggerChildren
          stagger={0.08}
          className="columns-1 gap-5 sm:columns-2 lg:columns-3"
        >
          {preview.map((image, index) => (
            <StaggerItem key={`${image.src}-${index}`}>
              <div className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-luxury-dark/80 via-luxury-dark/0 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-sm font-medium tracking-wide text-white/90">
                    {image.alt}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-14 text-center">
          <Button variant="outline" asChild>
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
