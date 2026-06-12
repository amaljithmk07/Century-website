"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/site-config";

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-luxury-dark/85" />
      </div>

      <div className="section-padding relative">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-luxury mb-8 block text-gold">Begin Your Journey</span>
            <h2 className="heading-section mx-auto max-w-3xl text-white">
              Ready to Create an Unforgettable Celebration
            </h2>
            <div className="divider-ornate mx-auto mt-10 mb-10 max-w-xs justify-center">
              <span className="divider-ornate-center" />
            </div>
            <p className="body-luxury mx-auto mb-14 max-w-lg text-white/60">
              Let our experienced team craft a bespoke experience for your special occasion.
              Reach out today for a personalized consultation.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Button variant="gold" size="lg" asChild>
                <Link href="/contact">Send an Inquiry</Link>
              </Button>
              <Button variant="outlineLight" size="lg" asChild>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
