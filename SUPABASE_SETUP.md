# Supabase Setup Guide for Century Convention Center

To configure Supabase for your live website, follow these two simple steps:

---

## Step 1: Database Schema Setup
Go to your **Supabase Dashboard** -> **SQL Editor** -> **New Query**, paste the following SQL commands, and click **Run**:

```sql
-- 1. Create gallery_images table
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id TEXT PRIMARY KEY,
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    category TEXT NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and create policy to allow public reads, and service role write bypass (automatic)
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to gallery" ON public.gallery_images FOR SELECT USING (true);

-- 2. Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_date TEXT,
    guest_count TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Read/Write will be bypassed securely using service role key on the server side)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 3. Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'site_config',
    name TEXT NOT NULL,
    headline TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    phone TEXT NOT NULL,
    phone_raw TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    address_street TEXT NOT NULL,
    address_city TEXT NOT NULL,
    address_state TEXT NOT NULL,
    address_zip TEXT NOT NULL,
    address_country TEXT NOT NULL,
    business_hours JSONB NOT NULL
);

-- Enable RLS and allow public reads
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to settings" ON public.settings FOR SELECT USING (true);
```

---

## Step 2: Storage Bucket Setup for Gallery Images
In your **Supabase Dashboard** under **Storage**:
1. Click **New bucket**.
2. Name the bucket precisely: `gallery`
3. Toggle the **Public bucket** switch to **ON** (this allows public URLs to display images in the gallery).
4. Click **Save**.

---

## Step 3: Environment Variables
Add the following keys to your deployment platform dashboard (e.g. Vercel) or your local `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
```

*Note: You can find these variables under **Project Settings** -> **API** in the Supabase dashboard. Be sure to use the **`service_role`** (secret) key for `SUPABASE_SERVICE_ROLE_KEY` so that your Server Actions can write to the database and upload files.*
