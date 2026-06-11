"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

export function IntroSection() {
  return (
    <section id="about" className="section-padding surface-ivory">
      <div className="container-custom">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn direction="left">
            <div className="luxury-card-image relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
                alt="Elegant event setup at Century Convention Center"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <SectionHeader
              label="About Us"
              title="A Legacy of Elegance & Grandeur"
              align="left"
            />
            <p className="body-luxury mb-6">
              Century Convention Center stands as the premier destination for those who
              demand nothing less than perfection. Our meticulously designed spaces blend
              timeless elegance with modern amenities — the perfect backdrop for weddings,
              corporate events, and celebrations of every kind.
            </p>
            <p className="body-luxury mb-10">
              With over 15 years of excellence in hospitality, our dedicated team ensures
              every detail is executed flawlessly, from the first consultation to the
              final farewell.
            </p>
            <Button variant="outline" asChild>
              <Link href="/about">Discover Our Story</Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
