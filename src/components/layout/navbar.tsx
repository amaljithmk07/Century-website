"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const showGlass = isScrolled || !isHome;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className={cn(
          "pointer-events-auto relative mx-auto flex max-w-7xl items-center justify-between transition-all duration-700 ease-out",
          showGlass
            ? "glass-luxury rounded-2xl px-6 py-3 lg:px-8"
            : "bg-transparent px-2 py-5",
        )}
      >
        <Logo variant={showGlass ? "dark" : "light"} size="md" />

        <div className="hidden items-center gap-9 lg:flex">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-[13px] font-medium tracking-wide transition-colors duration-300",
                  isActive
                    ? showGlass
                      ? "text-burgundy"
                      : "text-gold"
                    : showGlass
                      ? "text-text-secondary hover:text-burgundy"
                      : "text-white/75 hover:text-white",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Button variant={ "gold"} size="sm" asChild>
            <Link href="/contact">Inquire</Link>
          </Button>
        </div>

        <button
          className={cn(
            "lg:hidden p-2 transition-colors",
            showGlass ? "text-burgundy" : "text-white",
          )}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl glass-nav lg:hidden"
          >
            <div className="flex flex-col p-4">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-cream text-burgundy"
                      : "text-text-secondary hover:bg-cream/60 hover:text-burgundy",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="default" className="mt-3 w-full" asChild>
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
