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
    <div className="flex h-screen overflow-hidden bg-[#faf8f4] text-neutral-800">
      {/* Sidebar - Desktop */}
      <AdminSidebar logoutAction={logoutAdmin} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        {/* Top Header - Mobile & Desktop */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-gold/15 bg-white px-6 lg:px-10">
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

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs text-gold-600 font-medium">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Database Connected</span>
            </div>
            <Button variant="outline" size="sm" asChild className="border-gold/30 text-gold-600 hover:bg-gold/5 hover:text-gold-500 rounded-xl">
              <Link href="/" target="_blank">
                Visit Site
              </Link>
            </Button>
          </div>
        </header>

        {/* Dynamic Subpage Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#faf8f4] custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
