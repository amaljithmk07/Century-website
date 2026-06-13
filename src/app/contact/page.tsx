import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FadeIn } from "@/components/shared/fade-in";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Century Convention Center. Send an inquiry, call us, or chat on WhatsApp to plan your perfect event.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
      />

      <section className="section-padding surface-ivory">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-20">
            <FadeIn className="lg:col-span-3">
              <span className="label-luxury mb-2 sm:mb-4 block">Inquiry</span>
              <h2 className="heading-sub mb-3 sm:mb-4 text-maroon-950">Send a Message</h2>
              <p className="body-luxury mb-6 sm:mb-10 max-w-md">
                Fill out the form below and our team will respond within 24 hours.
              </p>
              <ContactForm />
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-2">
              <div className="premium-card space-y-6 sm:space-y-10 p-6 sm:p-10">
                <div>
                  <span className="label-luxury mb-6 block">Reach Us</span>
                  <h2 className="heading-sub mb-8 text-maroon-950">Contact Information</h2>
                  <ul className="space-y-7">
                    <li className="flex items-start gap-4">
                      <div className="icon-frame h-10 w-10 shrink-0">
                        <MapPin className="h-4 w-4 text-gold-600" strokeWidth={1.25} />
                      </div>
                      <div>
                        <p className="label-luxury mb-1 text-charcoal">Address</p>
                        <p className="text-sm leading-relaxed text-charcoal-light">{siteConfig.address.full}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="icon-frame h-10 w-10 shrink-0">
                        <Phone className="h-4 w-4 text-gold-600" strokeWidth={1.25} />
                      </div>
                      <div>
                        <p className="label-luxury mb-1 text-charcoal">Phone</p>
                        <a
                          href={`tel:${siteConfig.phoneRaw}`}
                          className="text-sm text-charcoal-light transition-colors hover:text-gold-600"
                        >
                          {siteConfig.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="icon-frame h-10 w-10 shrink-0">
                        <Mail className="h-4 w-4 text-gold-600" strokeWidth={1.25} />
                      </div>
                      <div>
                        <p className="label-luxury mb-1 text-charcoal">Email</p>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-sm text-charcoal-light transition-colors hover:text-gold-600"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gold-200/50 pt-8">
                  <span className="label-luxury mb-5 block">Hours</span>
                  <ul className="space-y-4">
                    {siteConfig.businessHours.map((item) => (
                      <li key={item.day} className="flex items-center gap-4">
                        <Clock className="h-4 w-4 text-gold-500/70" strokeWidth={1.25} />
                        <div>
                          <span className="text-sm text-charcoal">{item.day}</span>
                          <span className="mx-2 text-gold-300">·</span>
                          <span className="text-sm text-charcoal-light">{item.hours}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="gold" className="w-full" asChild>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="h-[320px] sm:h-[420px] w-full border-t border-gold-200/30">
        <iframe
          src={siteConfig.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Century Convention Center Location"
        />
      </section>
    </>
  );
}
