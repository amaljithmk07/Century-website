export const siteConfig = {
  name: "Century Convention Center",
  logo: {
    src: "/images/logo.svg",
    alt: "Century Convention Center",
    width: 180,
    height: 57,
  },
  logoWhite: {
    src: "/images/logo-white.svg",
    alt: "Century Convention Center",
    width: 180,
    height: 57,
  },
  headline: "Where Grand Celebrations Become Timeless Memories",
  tagline:
    "Century Convention Center offers a premium destination for weddings, corporate events, conferences, exhibitions, and unforgettable celebrations.",
  description:
    "Century Convention Center is a premium event venue for weddings, corporate events, conferences, exhibitions, and social gatherings. Experience luxury, elegance, and world-class hospitality.",
  url: "https://centuryconvention.com",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  email: "info@centuryconvention.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  address: {
    street: "Century Convention Center, Main Road",
    city: "City Name",
    state: "State",
    zip: "000000",
    country: "India",
    full: "Century Convention Center, Main Road, City Name, State 000000, India",
  },
  businessHours: [
    { day: "Monday – Saturday", hours: "9:00 AM – 8:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
  ],
  social: {
    facebook: "https://facebook.com/centuryconvention",
    instagram: "https://instagram.com/centuryconvention",
    youtube: "https://youtube.com/centuryconvention",
    linkedin: "https://linkedin.com/company/centuryconvention",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.998527069114!2d75.8858748793457!3d11.113487100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba651413adf73dd%3A0x8172f834e02c1e66!2sCentury%20Convention%20Centre!5e0!3m2!1sen!2sin!4v1781335744800!5m2!1sen!2sin",
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/facilities", label: "Facilities" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(
    message || "Hello! I would like to inquire about Century Convention Center."
  );
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
