"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";

const heroImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80", // Existing grand hall
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80", // Elegant wedding setup
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80", // Reception hall
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 scale-105">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ y: imageY }}
          >
            <Image
              src={heroImages[activeSlide]}
              alt="Century Convention Center grand hall"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="hero-overlay absolute inset-0 bg-black/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(27,27,29,0.5)_100%)]" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 container-custom px-5 pt-28 text-center sm:px-8 lg:px-12"
      >
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="label-luxury mb-6 inline-block text-gold-300"
        >
          Premium Event Destination
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className=" heading-display mx-auto max-w-5xl text-white font-title"
        >
          {siteConfig.headline}
        </motion.h1>

        {/* Premium luxury divider ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-4 my-8"
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold-300/40 to-gold" />
          <div className="h-1.5 w-1.5 rotate-45 border border-gold-300 bg-gold-300/20" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-gold-300/40 to-gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mx-auto max-w-2xl text-lg font-light tracking-wide text-white/90 leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <Button variant="gold" size="lg" asChild>
            <Link href="/contact">Plan Your Event</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/50">
          Scroll
        </span>
        <motion.div
          className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 pt-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <motion.div
            className="h-2 w-0.5 rounded-full bg-gold"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.a>
    </section>
  );
}
