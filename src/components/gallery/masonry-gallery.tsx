"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { galleryImages, type GalleryImage } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type Category = "all" | GalleryImage["category"];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "events", label: "Events" },
  { value: "venue", label: "Venue" },
  { value: "facilities", label: "Facilities" },
];

export function MasonryGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    const next =
      direction === "next"
        ? (lightboxIndex + 1) % filtered.length
        : (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(next);
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-14 sm:gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "rounded-xl px-6 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-500",
              activeCategory === cat.value
                ? "bg-burgundy text-white shadow-[0_4px_20px_rgba(74,16,42,0.3)]"
                : "bg-cream text-text-secondary hover:bg-gold/15 hover:text-burgundy"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((image, index) => (
            <motion.button
              key={`${image.src}-${activeCategory}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              onClick={() => openLightbox(index)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-luxury-dark/0 transition-all duration-500 group-hover:bg-luxury-dark/50">
                <ZoomIn className="h-6 w-6 text-white opacity-0 transition-all duration-500 group-hover:opacity-100" strokeWidth={1.25} />
                <p className="px-6 text-center text-sm text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {image.alt}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          {lightboxIndex !== null && (
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                width={1200}
                height={800}
                className="max-h-[85vh] w-full rounded-2xl object-contain"
              />
              <p className="mt-4 text-center text-sm text-white/70">
                {filtered[lightboxIndex].alt}
              </p>
              <button
                onClick={() => navigate("prev")}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl bg-luxury-dark/70 p-3 text-white backdrop-blur-sm transition-colors hover:bg-luxury-dark"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate("next")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-luxury-dark/70 p-3 text-white backdrop-blur-sm transition-colors hover:bg-luxury-dark"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
