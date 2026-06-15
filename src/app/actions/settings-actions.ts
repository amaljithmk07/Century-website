"use server";

import { revalidatePath } from "next/cache";
import { updateSettings } from "@/lib/db";

/**
 * Updates website settings and clears static rendering caches
 */
export async function updateSettingsAction(formData: FormData) {
  try {
    const headline = formData.get("headline") as string;
    const tagline = formData.get("tagline") as string;
    const description = formData.get("description") as string;
    const phone = formData.get("phone") as string;
    const phoneRaw = formData.get("phoneRaw") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const addressStreet = formData.get("addressStreet") as string;
    const addressCity = formData.get("addressCity") as string;
    const addressState = formData.get("addressState") as string;
    const addressZip = formData.get("addressZip") as string;
    const addressCountry = formData.get("addressCountry") as string;

    // Parse business hours arrays
    const hoursMonSat = formData.get("hoursMonSat") as string;
    const hoursSun = formData.get("hoursSun") as string;

    const businessHours = [
      { day: "Monday – Saturday", hours: hoursMonSat || "9:00 AM – 8:00 PM" },
      { day: "Sunday", hours: hoursSun || "10:00 AM – 6:00 PM" },
    ];

    if (!headline || !tagline || !description || !phone || !email || !whatsapp) {
      return { success: false, error: "Please fill in all core configurations." };
    }

    await updateSettings({
      headline,
      tagline,
      description,
      phone,
      phoneRaw: phoneRaw || phone.replace(/[^0-9+]/g, ""),
      email,
      whatsapp,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      addressCountry,
      businessHours,
    });

    // Revalidate public routes
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/services");
    revalidatePath("/facilities");
    revalidatePath("/admin/settings");

    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
