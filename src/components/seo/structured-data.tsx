import { siteConfig } from "@/lib/site-config";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: siteConfig.businessHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.day,
      opens: "09:00",
      closes: "20:00",
    })),
    sameAs: Object.values(siteConfig.social),
    image: `${siteConfig.url}${siteConfig.logo.src}`,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    priceRange: "$$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
