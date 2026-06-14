import { checkAuth, logoutAdmin } from "@/app/actions/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminMobileNav } from "./admin-mobile-nav";
import { AdminSidebar } from "./admin-sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Protect all dashboard routes inside this route group
  await checkAuth();

  return (
    <div className="flex min-h-screen lg:h-screen lg:overflow-hidden bg-[#faf8f4] text-neutral-800">
      {/* Sidebar - Desktop */}
      <AdminSidebar logoutAction={logoutAdmin} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:h-full lg:overflow-hidden">
        {/* Top Header - Mobile & Desktop */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-gold/15 bg-white px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-4">
            {/* Mobile Nav Toggle */}
            <AdminMobileNav logoutAction={logoutAdmin} />
            
            <h1 
              className="text-xl font-light text-neutral-800 hidden sm:block"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Century Convention Center Portal
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs text-gold-600 font-medium">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden md:inline">Live Database Connected</span>
              <span className="md:hidden">Live</span>
            </div>
            <Button variant="outline" size="sm" asChild className="border-gold/30 text-gold-600 hover:bg-gold/5 hover:text-gold-500 rounded-xl text-[10px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 h-auto">
              <Link href="/" target="_blank">
                Visit Site
              </Link>
            </Button>
          </div>
        </header>

        {/* Dynamic Subpage Content */}
        <main className="flex-1 lg:overflow-y-auto p-4 sm:p-6 lg:p-10 bg-[#faf8f4] custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
