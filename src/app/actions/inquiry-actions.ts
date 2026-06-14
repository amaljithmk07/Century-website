"use server";

import { revalidatePath } from "next/cache";
import { updateInquiryStatus, deleteInquiry, type DBInquiry } from "@/lib/db";

/**
 * Updates an inquiry's state (new, read, replied, archived)
 */
export async function changeInquiryStatusAction(id: string, status: DBInquiry["status"]) {
  try {
    const success = updateInquiryStatus(id, status);
    if (!success) {
      return { success: false, error: "Inquiry not found." };
    }

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error changing inquiry status:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

/**
 * Deletes an inquiry from the database
 */
export async function deleteInquiryAction(id: string) {
  try {
    const success = deleteInquiry(id);
    if (!success) {
      return { success: false, error: "Inquiry not found." };
    }

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
