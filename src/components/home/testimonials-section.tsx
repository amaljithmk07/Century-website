"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonials, stats } from "@/lib/data";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeader } from "@/components/shared/section-header";
import "swiper/css";
import "swiper/css/pagination";

export function TestimonialsSection() {
  return (
    <section className="section-padding surface-cream">
      <div className="container-custom">
        <SectionHeader
          label="Testimonials"
          title="Trusted by Our Clients"
          description="Hear from those who have celebrated their most cherished moments with us."
        />

        <div className="mb-20 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div className="text-center p-6 bg-white/40 border border-gold-300/10 rounded-2xl backdrop-blur-sm">
                <p className="text-gradient-gold text-4xl font-light sm:text-5xl" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {stat.value}
                </p>
                <p className="label-luxury mt-3 text-text-muted">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={28}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="!pb-14"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.author}>
                <div className="premium-card bg-white/70 backdrop-blur-sm flex h-full flex-col p-10 border border-gold-300/10 hover:border-gold-300/30">
                  <div className="mb-4 text-5xl font-light leading-none text-gold/40" style={{ fontFamily: "var(--font-cormorant)" }}>
                    &ldquo;
                  </div>
                  <p
                    className="mb-8 flex-1 text-[16px] leading-[1.8] text-text-secondary italic font-light"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-gold/10 pt-6">
                    <p className="text-sm font-medium tracking-wide text-burgundy">
                      {testimonial.author}
                    </p>
                    <p className="label-luxury mt-1 text-gold/80">{testimonial.event}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
