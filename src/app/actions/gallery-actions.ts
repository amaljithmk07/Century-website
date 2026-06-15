"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { addGalleryImage, deleteGalleryImage } from "@/lib/db";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Handles uploading an image file, saving it locally, and registering it in the DB
 */
export async function uploadGalleryImageAction(prevState: unknown, formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;
    const category = formData.get("category") as "events" | "venue" | "facilities";

    if (!file || file.size === 0) {
      return { success: false, error: "Please select an image to upload." };
    }

    if (!alt || alt.trim().length === 0) {
      return { success: false, error: "Please specify alt text for accessibility." };
    }

    if (!category || !["events", "venue", "facilities"].includes(category)) {
      return { success: false, error: "Please choose a valid category." };
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return { success: false, error: "Only JPEG, PNG, WEBP, and GIF images are allowed." };
    }

    let relativeSrc = "";

    if (isSupabaseConfigured && supabase) {
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${timestamp}-${sanitizedName}`;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const { error } = await supabase.storage
        .from("gallery")
        .upload(filename, buffer, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Supabase storage upload error:", error);
        return { success: false, error: `Upload to cloud storage failed: ${error.message}` };
      }

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(filename);

      relativeSrc = publicUrl;
    } else {
      // Ensure uploads directory exists
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }

      // Sanitize filename to avoid directory traversal
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${timestamp}-${sanitizedName}`;
      const destinationPath = path.join(UPLOADS_DIR, filename);

      // Convert File to Buffer and write it
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await fs.promises.writeFile(destinationPath, buffer);

      relativeSrc = `/uploads/${filename}`;
    }

    // Add to DB (we default dimensions to 800x600 for layout scaling)
    await addGalleryImage({
      src: relativeSrc,
      alt,
      category,
      width: 800,
      height: 600,
    });

    // Revalidate affected cache paths
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Gallery upload error:", error);
    return { success: false, error: "An unexpected error occurred during upload." };
  }
}

/**
 * Handles deleting a gallery image
 */
export async function deleteGalleryImageAction(id: string) {
  try {
    const success = await deleteGalleryImage(id);
    if (!success) {
      return { success: false, error: "Image not found." };
    }

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Gallery delete error:", error);
    return { success: false, error: "An unexpected error occurred during deletion." };
  }
}
