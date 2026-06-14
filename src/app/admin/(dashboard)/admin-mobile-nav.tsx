"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard,
  Image as ImageIcon,
  Inbox,
  Settings as SettingsIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

interface AdminMobileNavProps {
  logoutAction: () => Promise<void>;
}

export function AdminMobileNav({ logoutAction }: AdminMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl border border-gold/20 bg-gold/5 p-2 text-gold hover:bg-gold/10 lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black lg:hidden"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 left-0 top-0 z-50 flex w-72 flex-col border-r border-gold/15 bg-white p-6 text-neutral-800 shadow-2xl lg:hidden"
            >
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 
                    className="text-2xl font-light text-neutral-800 tracking-wider"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    Century Panel
                  </h2>
                  <div className="h-[1px] w-16 bg-gold/50 mt-1" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 space-y-1.5">
                {mobileNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-[14px] font-medium tracking-wide transition-all duration-300",
                        isActive
                          ? "bg-gold text-burgundy shadow-lg shadow-gold/10 font-semibold"
                          : "text-neutral-600 hover:bg-gold/5 hover:text-gold-600"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isActive ? "text-burgundy" : "text-gold-600/80")} strokeWidth={1.5} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="border-t border-gold/15 pt-6">
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3.5 text-[14px] font-medium tracking-wide text-red-600 transition-all duration-300 hover:bg-red-50 hover:text-red-700 text-left cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
