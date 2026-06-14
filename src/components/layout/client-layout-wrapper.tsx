"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { DBSettings } from "@/lib/db";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  settings: DBSettings;
}

export function ClientLayoutWrapper({ children, settings }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Navbar />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton />
    </SmoothScroll>
  );
}
