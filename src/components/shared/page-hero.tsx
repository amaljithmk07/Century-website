"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export function PageHero({
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80",
}: PageHeroProps) {
  return (
    <section className="relative flex h-[40vh] min-h-[300px] sm:h-[55vh] sm:min-h-[440px] items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-transparent" />
      <div className="relative z-10 container-custom px-5 pt-16 sm:pt-20 text-center sm:px-8 lg:px-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="label-luxury mb-4 sm:mb-6 block text-gold"
          style={{ color: 'white' }}

        >
          Century Convention Center
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-display text-white font-title"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="body-luxury heading-display italic mx-auto mt-4 sm:mt-6 max-w-lg text-white"
            style={{ color: 'white' }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="divider-gold mx-auto mt-6 sm:mt-10"
        />
      </div>
    </section>
  );
}
