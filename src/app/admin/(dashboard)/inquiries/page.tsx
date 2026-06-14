import { getInquiries } from "@/lib/db";
import { AdminInquiriesContainer } from "./admin-inquiries-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiries Manager | Century Admin",
  description: "View and manage contact form and WhatsApp inquiry submissions.",
};

export const revalidate = 0; // Disable caching to fetch fresh database entries on load

export default async function AdminInquiriesPage() {
  const inquiries = getInquiries();

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header section */}
      <div className="shrink-0">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-1">CRM Database</span>
        <h2 
          className="text-4xl font-light text-neutral-800 tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Inquiries Manager
        </h2>
        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
          Track, search, and respond to incoming event booking inquiries submitted via the site or WhatsApp.
        </p>
      </div>

      {/* Main client component containing the interactive interface */}
      <div className="flex-1 min-h-0">
        <AdminInquiriesContainer initialInquiries={inquiries} />
      </div>
    </div>
  );
}
