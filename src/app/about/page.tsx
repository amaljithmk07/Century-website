import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeIn } from "@/components/shared/fade-in";
import { stats } from "@/lib/data";
import { Award, Eye, Target, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Century Convention Center — our story, vision, mission, and why we are the premier choice for weddings, corporate events, and celebrations.",
};

const whyChoose = [
  "15+ years of event hosting excellence",
  "Capacity for up to 1,500 guests",
  "Dedicated event coordination team",
  "Premium in-house catering services",
  "State-of-the-art AV and lighting systems",
  "Convenient location with ample parking",
  "Flexible packages for every budget",
  "Impeccable attention to detail",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Crafting unforgettable experiences since day one"
      />

      <section className="section-padding surface-ivory">
        <div className="container-custom">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
            <FadeIn direction="left">
              <SectionHeader
                label="Our Story"
                title="A Legacy of Elegance"
                align="left"
              />
              <p className="body-luxury mb-5">
                Founded with a vision to redefine event hospitality, Century Convention
                Center has grown to become one of the region&apos;s most sought-after
                venues. What began as a dream to create a space where celebrations come
                alive has evolved into a landmark of luxury and sophistication.
              </p>
              <p className="text-charcoal-light leading-relaxed">
                Every corner of our venue reflects our commitment to excellence — from
                the grand chandeliers that illuminate our halls to the warm hospitality
                that greets every guest. We believe that every event, regardless of
                scale, deserves to be extraordinary.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099f26?w=800&q=80"
                  alt="Century Convention Center lobby"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn>
              <div className="premium-card p-6 sm:p-10 lg:p-12">
                <Eye className="mb-5 h-7 w-7 text-gold-500" strokeWidth={1.25} />
                <h3 className="heading-sub mb-5 text-luxury-dark">Our Vision</h3>
                <p className="body-luxury text-sm">
                  To be the most trusted and admired event venue, setting the standard
                  for luxury hospitality and creating spaces where life&apos;s most
                  precious moments are celebrated with grandeur and grace.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="premium-card p-6 sm:p-10 lg:p-12">
                <Target className="mb-5 h-7 w-7 text-gold-500" strokeWidth={1.25} />
                <h3 className="heading-sub mb-5 text-luxury-dark">Our Mission</h3>
                <p className="body-luxury text-sm">
                  To deliver exceptional event experiences through impeccable service,
                  world-class facilities, and personalized attention — ensuring every
                  client feels valued and every guest leaves with lasting memories.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding surface-dark">
        <div className="container-custom">
          <SectionHeader
            label="By the Numbers"
            title="Venue Overview"
            light
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-3xl font-semibold text-gold-400 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-ivory/70">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding surface-ivory">
        <div className="container-custom">
          <SectionHeader
            label="Why Choose Us"
            title="The Century Difference"
            description="Discover what sets us apart as the premier event destination."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item, index) => (
              <FadeIn key={item} delay={index * 0.05}>
                <div className="premium-card flex items-start gap-4 p-6">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.25} />
                  <p className="text-sm tracking-wide text-charcoal-light">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-12 flex justify-center">
            <Award className="h-16 w-16 text-gold-400 opacity-50" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
