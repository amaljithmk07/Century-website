import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "./supabase";

// Define TypeScript interfaces for our database structure
export interface DBGalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "events" | "venue" | "facilities";
  width: number;
  height: number;
  createdAt: string;
}

export interface DBInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  guestCount?: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  type: "contact" | "whatsapp";
  createdAt: string;
}

export interface DBSettings {
  name: string;
  headline: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  email: string;
  whatsapp: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  businessHours: { day: string; hours: string }[];
}

export interface DatabaseSchema {
  gallery: DBGalleryImage[];
  inquiries: DBInquiry[];
  settings: DBSettings;
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "db.json");

// Default initial data to seed database
const DEFAULT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    alt: "Grand convention hall interior",
    category: "venue" as const,
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    alt: "Elegant wedding ceremony setup",
    category: "events" as const,
    width: 600,
    height: 900,
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    alt: "Wedding reception dining hall",
    category: "events" as const,
    width: 800,
    height: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    alt: "Corporate conference event",
    category: "events" as const,
    width: 600,
    height: 700,
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    alt: "Conference auditorium seating",
    category: "facilities" as const,
    width: 800,
    height: 550,
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Premium dining setup",
    category: "facilities" as const,
    width: 600,
    height: 800,
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    alt: "Stage with lighting and AV",
    category: "facilities" as const,
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1505236858219-8359eb2e4c0b?w=800&q=80",
    alt: "Banquet seating arrangement",
    category: "venue" as const,
    width: 800,
    height: 500,
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    alt: "Social gathering celebration",
    category: "events" as const,
    width: 600,
    height: 750,
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099f26?w=800&q=80",
    alt: "Luxury venue lobby",
    category: "venue" as const,
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
    alt: "Concert stage setup",
    category: "facilities" as const,
    width: 600,
    height: 700,
  },
  {
    src: "https://images.unsplash.com/photo-1523580495183-7a0f5a4c1acf?w=800&q=80",
    alt: "Community event gathering",
    category: "events" as const,
    width: 800,
    height: 550,
  },
];

const DEFAULT_SETTINGS: DBSettings = {
  name: "Century Convention Center",
  headline: "Where Grand Celebrations Become Timeless Memories",
  tagline: "Century Convention Center offers a premium destination for weddings, corporate events, conferences, exhibitions, and unforgettable celebrations.",
  description: "Century Convention Center is a premium event venue for weddings, corporate events, conferences, exhibitions, and social gatherings. Experience luxury, elegance, and world-class hospitality.",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  email: "info@centuryconvention.com",
  whatsapp: "919876543210",
  addressStreet: "Century Convention Center, Main Road",
  addressCity: "City Name",
  addressState: "State",
  addressZip: "000000",
  addressCountry: "India",
  businessHours: [
    { day: "Monday – Saturday", hours: "9:00 AM – 8:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
  ],
};

// Ensure database file and directories exist
function initDB(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialData: DatabaseSchema = {
      gallery: DEFAULT_IMAGES.map((img, idx) => ({
        ...img,
        id: `img-${Date.now()}-${idx}`,
        createdAt: new Date().toISOString(),
      })),
      inquiries: [],
      settings: DEFAULT_SETTINGS,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to read database. Re-initializing.", error);
    const initialData: DatabaseSchema = {
      gallery: DEFAULT_IMAGES.map((img, idx) => ({
        ...img,
        id: `img-${Date.now()}-${idx}`,
        createdAt: new Date().toISOString(),
      })),
      inquiries: [],
      settings: DEFAULT_SETTINGS,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }
}

// Read database data
export function getDB(): DatabaseSchema {
  return initDB();
}

// Write data to file
export function writeDB(data: DatabaseSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

// ── GALLERY API ──
export async function getGalleryImages(): Promise<DBGalleryImage[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error fetching gallery:", error);
        return getLocalGalleryImages();
      }

      return (data || []).map(img => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        category: img.category as "events" | "venue" | "facilities",
        width: img.width,
        height: img.height,
        createdAt: img.created_at,
      }));
    }
  } catch (err) {
    console.error("Network or connection error fetching gallery from Supabase:", err);
  }
  return getLocalGalleryImages();
}

function getLocalGalleryImages(): DBGalleryImage[] {
  const db = getDB();
  return db.gallery.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addGalleryImage(image: Omit<DBGalleryImage, "id" | "createdAt">): Promise<DBGalleryImage> {
  try {
    if (isSupabaseConfigured && supabase) {
      const newImg = {
        id: `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        src: image.src,
        alt: image.alt,
        category: image.category,
        width: image.width,
        height: image.height,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("gallery_images")
        .insert(newImg);

      if (error) {
        console.error("Supabase error adding image:", error);
        throw error;
      }

      return {
        id: newImg.id,
        src: newImg.src,
        alt: newImg.alt,
        category: newImg.category,
        width: newImg.width,
        height: newImg.height,
        createdAt: newImg.created_at,
      };
    }
  } catch (err) {
    console.error("Network or connection error adding image to Supabase:", err);
  }

  const db = getDB();
  const newImg: DBGalleryImage = {
    ...image,
    id: `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
  };
  db.gallery.push(newImg);
  writeDB(db);
  return newImg;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  try {
    if (isSupabaseConfigured && supabase) {
      // Fetch image details first to delete from storage if needed
      const { data: imgData } = await supabase
        .from("gallery_images")
        .select("src")
        .eq("id", id)
        .single();

      if (imgData && imgData.src.includes("/storage/v1/object/public/gallery/")) {
        const parts = imgData.src.split("/storage/v1/object/public/gallery/");
        const pathName = parts[parts.length - 1];
        await supabase.storage.from("gallery").remove([pathName]);
      }

      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Supabase error deleting image:", error);
        return false;
      }
      return true;
    }
  } catch (err) {
    console.error("Network or connection error deleting image from Supabase:", err);
  }

  const db = getDB();
  const index = db.gallery.findIndex((img) => img.id === id);
  if (index === -1) return false;

  const image = db.gallery[index];
  
  // If the image is locally uploaded, delete it from the file system
  if (image.src.startsWith("/uploads/")) {
    try {
      const filePath = path.join(process.cwd(), "public", image.src);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error(`Error deleting image file: ${image.src}`, err);
    }
  }

  db.gallery.splice(index, 1);
  writeDB(db);
  return true;
}

// ── INQUIRIES API ──
export async function getInquiries(): Promise<DBInquiry[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error fetching inquiries:", error);
        return getLocalInquiries();
      }

      return (data || []).map(inq => ({
        id: inq.id,
        name: inq.name,
        email: inq.email,
        phone: inq.phone,
        eventType: inq.event_type,
        eventDate: inq.event_date || undefined,
        guestCount: inq.guest_count || undefined,
        message: inq.message,
        status: inq.status as DBInquiry["status"],
        type: inq.type as DBInquiry["type"],
        createdAt: inq.created_at,
      }));
    }
  } catch (err) {
    console.error("Network or connection error fetching inquiries from Supabase:", err);
  }
  return getLocalInquiries();
}

function getLocalInquiries(): DBInquiry[] {
  const db = getDB();
  return db.inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addInquiry(inquiry: Omit<DBInquiry, "id" | "createdAt" | "status">): Promise<DBInquiry> {
  try {
    if (isSupabaseConfigured && supabase) {
      const newInq = {
        id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        event_type: inquiry.eventType,
        event_date: inquiry.eventDate || null,
        guest_count: inquiry.guestCount || null,
        message: inquiry.message,
        status: "new",
        type: inquiry.type,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("inquiries")
        .insert(newInq);

      if (error) {
        console.error("Supabase error adding inquiry:", error);
        throw error;
      }

      return {
        id: newInq.id,
        name: newInq.name,
        email: newInq.email,
        phone: newInq.phone,
        eventType: newInq.event_type,
        eventDate: newInq.event_date || undefined,
        guestCount: newInq.guest_count || undefined,
        message: newInq.message,
        status: newInq.status as DBInquiry["status"],
        type: newInq.type as DBInquiry["type"],
        createdAt: newInq.created_at,
      };
    }
  } catch (err) {
    console.error("Network or connection error adding inquiry to Supabase:", err);
  }

  const db = getDB();
  const newInq: DBInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  db.inquiries.push(newInq);
  writeDB(db);
  return newInq;
}

export async function updateInquiryStatus(id: string, status: DBInquiry["status"]): Promise<boolean> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.error("Supabase error updating inquiry status:", error);
        return false;
      }
      return true;
    }
  } catch (err) {
    console.error("Network or connection error updating inquiry status in Supabase:", err);
  }

  const db = getDB();
  const inq = db.inquiries.find((i) => i.id === id);
  if (!inq) return false;
  inq.status = status;
  writeDB(db);
  return true;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Supabase error deleting inquiry:", error);
        return false;
      }
      return true;
    }
  } catch (err) {
    console.error("Network or connection error deleting inquiry from Supabase:", err);
  }

  const db = getDB();
  const index = db.inquiries.findIndex((i) => i.id === id);
  if (index === -1) return false;
  db.inquiries.splice(index, 1);
  writeDB(db);
  return true;
}

// ── SETTINGS API ──
export async function getSettings(): Promise<DBSettings> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("id", "site_config")
        .maybeSingle();

      if (error) {
        console.error("Supabase error fetching settings:", error);
        return getLocalSettings();
      }

      if (!data) {
        await seedSupabaseSettings();
        return DEFAULT_SETTINGS;
      }

      return {
        name: data.name,
        headline: data.headline,
        tagline: data.tagline,
        description: data.description,
        phone: data.phone,
        phoneRaw: data.phone_raw,
        email: data.email,
        whatsapp: data.whatsapp,
        addressStreet: data.address_street,
        addressCity: data.address_city,
        addressState: data.address_state,
        addressZip: data.address_zip,
        addressCountry: data.address_country,
        businessHours: data.business_hours || DEFAULT_SETTINGS.businessHours,
      };
    }
  } catch (err) {
    console.error("Network or connection error fetching settings from Supabase:", err);
  }
  return getLocalSettings();
}

async function seedSupabaseSettings(): Promise<void> {
  try {
    if (!supabase) return;
    const seedData = {
      id: "site_config",
      name: DEFAULT_SETTINGS.name,
      headline: DEFAULT_SETTINGS.headline,
      tagline: DEFAULT_SETTINGS.tagline,
      description: DEFAULT_SETTINGS.description,
      phone: DEFAULT_SETTINGS.phone,
      phone_raw: DEFAULT_SETTINGS.phoneRaw,
      email: DEFAULT_SETTINGS.email,
      whatsapp: DEFAULT_SETTINGS.whatsapp,
      address_street: DEFAULT_SETTINGS.addressStreet,
      address_city: DEFAULT_SETTINGS.addressCity,
      address_state: DEFAULT_SETTINGS.addressState,
      address_zip: DEFAULT_SETTINGS.addressZip,
      address_country: DEFAULT_SETTINGS.addressCountry,
      business_hours: DEFAULT_SETTINGS.businessHours,
    };
    await supabase.from("settings").insert(seedData);
  } catch (err) {
    console.error("Failed to seed Supabase settings:", err);
  }
}

function getLocalSettings(): DBSettings {
  const db = getDB();
  return db.settings || DEFAULT_SETTINGS;
}

export async function updateSettings(settings: Partial<DBSettings>): Promise<DBSettings> {
  try {
    if (isSupabaseConfigured && supabase) {
      const updateData: Record<string, unknown> = {};
      if (settings.name !== undefined) updateData.name = settings.name;
      if (settings.headline !== undefined) updateData.headline = settings.headline;
      if (settings.tagline !== undefined) updateData.tagline = settings.tagline;
      if (settings.description !== undefined) updateData.description = settings.description;
      if (settings.phone !== undefined) updateData.phone = settings.phone;
      if (settings.phoneRaw !== undefined) updateData.phone_raw = settings.phoneRaw;
      if (settings.email !== undefined) updateData.email = settings.email;
      if (settings.whatsapp !== undefined) updateData.whatsapp = settings.whatsapp;
      if (settings.addressStreet !== undefined) updateData.address_street = settings.addressStreet;
      if (settings.addressCity !== undefined) updateData.address_city = settings.addressCity;
      if (settings.addressState !== undefined) updateData.address_state = settings.addressState;
      if (settings.addressZip !== undefined) updateData.address_zip = settings.addressZip;
      if (settings.addressCountry !== undefined) updateData.address_country = settings.addressCountry;
      if (settings.businessHours !== undefined) updateData.business_hours = settings.businessHours;

      const { error } = await supabase
        .from("settings")
        .update(updateData)
        .eq("id", "site_config");

      if (error) {
        console.error("Supabase error updating settings:", error);
        throw error;
      }

      return getSettings();
    }
  } catch (err) {
    console.error("Network or connection error updating settings in Supabase:", err);
  }

  const db = getDB();
  db.settings = {
    ...db.settings,
    ...settings,
  };
  writeDB(db);
  return db.settings;
}
