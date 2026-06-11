"use client";

import {
  Award,
  Users,
  Sparkles,
  Shield,
  Clock,
  HeartHandshake,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerChildren, StaggerItem } from "@/components/shared/fade-in";

const reasons = [
  {
    icon: Award,
    title: "15+ Years of Excellence",
    description: "A trusted legacy of hosting prestigious weddings, corporate events, and grand celebrations.",
  },
  {
    icon: Users,
    title: "1,500 Guest Capacity",
    description: "Expansive halls with flexible seating for intimate gatherings or large-scale events.",
  },
  {
    icon: Sparkles,
    title: "Premium Ambiance",
    description: "Elegantly designed interiors with crystal chandeliers and refined architectural details.",
  },
  {
    icon: Shield,
    title: "Dedicated Event Team",
    description: "Personal coordinators ensuring flawless execution from planning to celebration.",
  },
  {
    icon: Clock,
    title: "End-to-End Support",
    description: "Catering, décor, AV, and logistics — everything managed under one roof.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted by Families",
    description: "Hundreds of families and corporations choose us for their most important moments.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          label="Why Choose Us"
          title="The Century Difference"
          description="Discover what sets us apart as the region's most sought-after luxury event destination."
        />

        <StaggerChildren className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group flex gap-5">
                <div className="icon-luxury mt-1 h-12 w-12 shrink-0 rounded-full bg-cream transition-colors duration-500 group-hover:bg-gold/15">
                  <item.icon className="h-5 w-5" strokeWidth={1.25} />
                </div>
                <div>
                  <h3 className="heading-sub mb-2 text-text-primary">{item.title}</h3>
                  <p className="body-luxury text-sm">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
