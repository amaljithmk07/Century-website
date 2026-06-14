import fs from "fs";
import path from "path";

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
export function getGalleryImages(): DBGalleryImage[] {
  const db = getDB();
  return db.gallery.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addGalleryImage(image: Omit<DBGalleryImage, "id" | "createdAt">): DBGalleryImage {
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

export function deleteGalleryImage(id: string): boolean {
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
export function getInquiries(): DBInquiry[] {
  const db = getDB();
  return db.inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addInquiry(inquiry: Omit<DBInquiry, "id" | "createdAt" | "status">): DBInquiry {
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

export function updateInquiryStatus(id: string, status: DBInquiry["status"]): boolean {
  const db = getDB();
  const inq = db.inquiries.find((i) => i.id === id);
  if (!inq) return false;
  inq.status = status;
  writeDB(db);
  return true;
}

export function deleteInquiry(id: string): boolean {
  const db = getDB();
  const index = db.inquiries.findIndex((i) => i.id === id);
  if (index === -1) return false;
  db.inquiries.splice(index, 1);
  writeDB(db);
  return true;
}

// ── SETTINGS API ──
export function getSettings(): DBSettings {
  const db = getDB();
  return db.settings || DEFAULT_SETTINGS;
}

export function updateSettings(settings: Partial<DBSettings>): DBSettings {
  const db = getDB();
  db.settings = {
    ...db.settings,
    ...settings,
  };
  writeDB(db);
  return db.settings;
}
