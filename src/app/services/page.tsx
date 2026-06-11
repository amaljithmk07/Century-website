import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our event services — weddings, receptions, corporate events, conferences, seminars, exhibitions, and more at Century Convention Center.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Tailored experiences for every occasion"
        image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      />

      <section className="section-padding surface-ivory">
        <div className="container-custom">
          <SectionHeader
            label="What We Offer"
            title="Events We Host"
            description="From intimate celebrations to grand corporate gatherings, our versatile spaces and expert team bring your vision to life."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service, index) => (
              <FadeIn key={service.slug} delay={index * 0.06}>
                <div className="premium-card premium-card-hover group overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-maroon-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="icon-frame mb-4 h-11 w-11">
                        <service.icon className="h-5 w-5 text-gold-600" strokeWidth={1.25} />
                      </div>
                      <h3
                        className="text-2xl font-light text-ivory"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="body-luxury text-sm">{service.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-20 text-center">
            <p className="body-luxury mb-8">
              Ready to plan your event? Our team is here to help.
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
