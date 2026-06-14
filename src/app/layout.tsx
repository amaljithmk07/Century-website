import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import { StructuredData } from "@/components/seo/structured-data";
import { GoogleAnalytics } from "@/components/seo/google-analytics";
import { siteConfig } from "@/lib/site-config";
import { getSettings } from "@/lib/db";
import { ClientLayoutWrapper } from "@/components/layout/client-layout-wrapper";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium Event Venue`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "convention center",
    "wedding venue",
    "event hall",
    "corporate events",
    "conference venue",
    "reception hall",
    "Century Convention Center",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Premium Event Venue`,
    description: siteConfig.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Premium Event Venue`,
    description: siteConfig.description,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
    ],
  },
  icons: {
    icon: siteConfig.logo.src,
    apple: siteConfig.logo.src,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSettings();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <ClientLayoutWrapper settings={settings}>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
