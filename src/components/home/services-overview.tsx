"use client";

import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerChildren, StaggerItem } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";

export function ServicesOverview() {
  const featured = services.slice(0, 4);

  return (
    <section className="section-padding surface-dark relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,165,106,0.07)_0%,transparent_55%)]" />

      <div className="container-custom relative">
        <SectionHeader
          label="Services"
          title="Curated Event Experiences"
          description="From intimate gatherings to grand celebrations, we provide the perfect setting for every occasion."
          light
        />

        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => (
            <StaggerItem key={service.slug}>
              <div className="group relative overflow-hidden rounded-2xl">
                <div className="luxury-card-image relative aspect-[3/4]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/30 to-transparent transition-opacity duration-700 group-hover:via-luxury-dark/20" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <service.icon className="mb-4 h-5 w-5 text-gold" strokeWidth={1.25} />
                    <h3
                      className="text-2xl font-normal text-white"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {service.title}
                    </h3>
                    <div className="mt-4 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-16 text-center">
          <Button variant="gold" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
