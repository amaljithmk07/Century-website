import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { facilities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Explore Century Convention Center facilities — grand hall, seating capacity, air-conditioning, parking, dining, stage, AV systems, and more.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="Our Facilities"
        subtitle="Worl -class amenities for flawless events"
        image="https://images.unsplash.com/photo-1505236858219-8359eb2e4c0b?w=1920&q=80"
      />

      <section className="section-padding surface-ivory">
        <div className="container-custom">
          <SectionHeader
            label="Amenities"
            title="Everything You Need"
            description="Our venue is equipped with premium facilities to ensure your event runs seamlessly from start to finish."
          />

          <div className="space-y-20">
            {facilities.map((facility, index) => (
              <FadeIn key={facility.title} delay={index * 0.04}>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                    index % 2 === 1 ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div className={`relative ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full border border-gold-300/30" />
                  </div>
                  <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                    <div className="icon-frame mb-6 h-14 w-14">
                      <facility.icon className="h-6 w-6 text-gold-600" strokeWidth={1.25} />
                    </div>
                    <h3 className="heading-sub mb-5 text-luxury-dark">{facility.title}</h3>
                    <p className="body-luxury">{facility.description}</p>
                    <div className="divider-gold mt-8 !mx-0 !w-12" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-24 text-center">
            <Button variant="gold" size="lg" asChild>
              <Link href="/contact">Schedule a Venue Tour</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
