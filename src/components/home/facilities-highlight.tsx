"use client";

import Image from "next/image";
import Link from "next/link";
import { facilities } from "@/lib/data";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerChildren, StaggerItem } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";

export function FacilitiesHighlight() {
  const highlights = facilities.slice(0, 6);

  return (
    <section className="section-padding surface-cream">
      <div className="container-custom">
        <SectionHeader
          label="Facilities"
          title="World-Class Amenities"
          description="Every detail thoughtfully designed to ensure your event is executed with precision and elegance."
        />

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((facility) => (
            <StaggerItem key={facility.title}>
              <div className="luxury-card group h-full overflow-hidden rounded-2xl bg-white">
                <div className="luxury-card-image relative aspect-[4/3]">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <facility.icon className="h-5 w-5 text-gold" strokeWidth={1.25} />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="heading-sub mb-3 text-text-primary">{facility.title}</h3>
                  <p className="body-luxury text-sm leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-16 text-center">
          <Button variant="gold" asChild>
            <Link href="/facilities">Explore All Facilities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
