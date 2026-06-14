"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Inbox, 
  Settings as SettingsIcon, 
  LogOut,
  LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  logoutAction: () => Promise<void>;
}

const sidebarNavItems: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export function AdminSidebar({ logoutAction }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-gold/15 bg-white p-6 lg:block h-full relative">
      <div className="flex flex-col h-full">
        {/* Logo Monogram */}
        <div className="mb-12 text-center mt-4">
          <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold-600 font-serif text-xl font-light tracking-wide shadow-[0_0_15px_rgba(199,165,106,0.02)]">
            C
          </div>
          <h2 
            className="text-base font-light tracking-[0.25em] text-neutral-800 uppercase"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Century Panel
          </h2>
          <span className="text-[8px] uppercase tracking-[0.35em] text-gold-600/60 block mt-1.5 font-sans">Management Portal</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1">
          {sidebarNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 border-l pl-5",
                  isActive
                    ? "border-gold text-gold-600 bg-gold/[0.02] font-semibold"
                    : "border-transparent text-neutral-500 hover:border-gold/30 hover:text-neutral-800 hover:bg-neutral-50/50"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-105", isActive ? "text-gold-600" : "text-neutral-400")} strokeWidth={1} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="border-t border-gold/15 pt-6 mb-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-4 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-500 hover:text-red-600 transition-all duration-300 border-l border-transparent pl-5 hover:border-red-500/20 hover:bg-red-50/50 text-left cursor-pointer"
            >
              <LogOut className="h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.25} />
              Log Out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
