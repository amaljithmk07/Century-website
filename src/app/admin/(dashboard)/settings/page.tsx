import { getSettings } from "@/lib/db";
import { AdminSettingsContainer } from "./admin-settings-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Settings | Century Admin",
  description: "Configure phone numbers, emails, addresses, headlines, taglines and office hours.",
};

export const revalidate = 0; // Disable caching to fetch fresh configuration parameters

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-10">
      {/* Header section */}
      <div>
        <h2 
          className="text-4xl font-light text-neutral-800 tracking-wide"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Portal Settings
        </h2>
        <p className="text-sm text-neutral-500 mt-1.5">
          Modify global variables like contact coordinates, business hour shifts, headlines, taglines, and physical addresses on the fly.
        </p>
      </div>

      {/* Main client component containing the editor forms */}
      <AdminSettingsContainer settings={settings} />
    </div>
  );
}
