import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { type DBSettings } from "@/lib/db";

const socialIcons = [
  { href: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
  { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
  { href: siteConfig.social.youtube, icon: Youtube, label: "YouTube" },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
];

interface FooterProps {
  settings: DBSettings;
}

export function Footer({ settings }: FooterProps) {
  const addressFull = `${settings.addressStreet}, ${settings.addressCity}, ${settings.addressState} ${settings.addressZip}, ${settings.addressCountry}`;

  return (
    <footer className="bg-luxury-dark text-white">
      <div className="pointer-events-none h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container-custom section-padding !pb-10">
        <div className="grid gap-10 sm:gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 sm:mb-8">
              <Logo variant="light" size="lg" href="/" />
            </div>
            <p className="body-luxury text-sm text-white/50">{settings.description}</p>
            <div className="mt-8 flex gap-3">
              {socialIcons.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gold/70 transition-all duration-300 hover:border-gold/40 hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.25} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label-luxury mb-8 text-gold/80">Navigation</h3>
            <ul className="space-y-4">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-luxury mb-8 text-gold/80">Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.25} />
                <span className="text-sm leading-relaxed text-white/50">{addressFull}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.25} />
                <a
                  href={`tel:${settings.phoneRaw}`}
                  className="text-sm text-white/50 transition-colors hover:text-gold"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.25} />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm text-white/50 transition-colors hover:text-gold"
                >
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="label-luxury mb-8 text-gold/80">Hours</h3>
            <ul className="space-y-4">
              {settings.businessHours.map((item) => (
                <li key={item.day} className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.25} />
                  <div>
                    <p className="text-sm text-white/70">{item.day}</p>
                    <p className="text-sm text-white/40">{item.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-16 border-t border-white/8 pt-8 text-center">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/30 flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>&copy; {new Date().getFullYear()} {settings.name}. All rights reserved.</span>
            <span className="text-white/10 hidden sm:inline">|</span>
            <Link href="/admin" className="hover:text-gold transition-colors lowercase sm:uppercase text-[10px] tracking-widest font-semibold mt-1 sm:mt-0">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
