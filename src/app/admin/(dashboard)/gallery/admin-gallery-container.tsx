"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { uploadGalleryImageAction, deleteGalleryImageAction } from "@/app/actions/gallery-actions";
import { DBGalleryImage } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon,
  Loader2, 
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function GalleryCard({ 
  img, 
  isConfirmingDelete, 
  isDeleting, 
  handleDelete, 
  confirmDelete, 
  setDeletingId 
}: { 
  img: DBGalleryImage; 
  isConfirmingDelete: boolean; 
  isDeleting: boolean; 
  handleDelete: (id: string) => void; 
  confirmDelete: (id: string) => void; 
  setDeletingId: (id: string | null) => void;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col h-[400px] overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Image Wrapper */}
      <div className="relative h-[240px] w-full overflow-hidden bg-neutral-100 shrink-0">
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 text-neutral-400 gap-2 border-b border-gold/5">
            <ImageIcon className="h-8 w-8 text-neutral-300" strokeWidth={1} />
            <span className="text-[9px] uppercase tracking-widest font-semibold text-neutral-400">Photo Unavailable</span>
          </div>
        ) : (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            sizes="(max-width: 768px) 50vw, 33vw"
            onError={() => setHasError(true)}
          />
        )}
      </div>

      {/* Info & Action Section */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white border-t border-gold/5 min-h-0">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[8px] font-semibold text-gold-600 uppercase tracking-widest border border-gold/15">
            {img.category}
          </span>
          
          <button
            onClick={() => handleDelete(img.id)}
            className="rounded-lg bg-red-50 hover:bg-red-100 p-2 text-red-600 transition-colors cursor-pointer shrink-0"
            title="Delete photo"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        
        <p className="text-[11px] text-neutral-500 line-clamp-3 leading-relaxed font-sans mt-2">
          {img.alt}
        </p>

        <div className="text-[8px] text-neutral-400 uppercase tracking-wider font-mono mt-auto pt-2 border-t border-neutral-100 flex justify-between">
          <span>ID: {img.id.slice(-8)}</span>
          <span>{new Date(img.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
        </div>
      </div>

      {/* Delete Confirmation Overlay */}
      <AnimatePresence>
        {isConfirmingDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/98 flex flex-col items-center justify-center p-6 text-center z-20"
          >
            <AlertCircle className="h-6 w-6 text-red-500 mb-2.5" strokeWidth={1.5} />
            <p className="text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-1.5">Delete Photo?</p>
            <p className="text-[10px] text-neutral-500 mb-4 max-w-[200px] leading-relaxed">This visual will be permanently removed from the website catalog.</p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDeletingId(null)}
                className="h-8 text-[10px] uppercase tracking-wider font-semibold border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-lg px-4 cursor-pointer"
                disabled={isDeleting}
              >
                No
              </Button>
              <Button
                size="sm"
                onClick={() => confirmDelete(img.id)}
                className="h-8 text-[10px] uppercase tracking-wider font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 cursor-pointer border-none"
                disabled={isDeleting}
              >
                {isDeleting ? "..." : "Yes"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AdminGalleryContainerProps {
  initialImages: DBGalleryImage[];
}

export function AdminGalleryContainer({ initialImages }: AdminGalleryContainerProps) {
  const [images, setImages] = useState<DBGalleryImage[]>(initialImages);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Upload states
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Deleting states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  // Sync state if initialImages changes
  if (initialImages !== images) {
    setImages(initialImages);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploadError(null);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadError(null);
    setSuccessStates();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      setUploadError("Please select a file to upload.");
      return;
    }

    startUploadTransition(async () => {
      const res = await uploadGalleryImageAction(null, formData);
      if (res.success) {
        setUploadSuccess(true);
        setPreviewUrl(null);
        if (formRef.current) formRef.current.reset();
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setUploadError(res.error || "An error occurred");
      }
    });
  };

  const setSuccessStates = () => {
    setUploadSuccess(false);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async (id: string) => {
    startDeleteTransition(async () => {
      const res = await deleteGalleryImageAction(id);
      if (res.success) {
        setDeletingId(null);
      } else {
        alert(res.error || "Failed to delete image");
      }
    });
  };

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter(img => img.category === activeCategory);

  const categories = [
    { value: "all", label: "All Photos" },
    { value: "events", label: "Events" },
    { value: "venue", label: "Venue" },
    { value: "facilities", label: "Facilities" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:h-full lg:overflow-hidden">
      {/* Upload Column (Desktop: 4 columns) */}
      <div className="col-span-12 lg:col-span-4 shrink-0">
        <div className="rounded-2xl border border-gold/15 bg-white p-6 shadow-sm relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          
          <div className="mb-6 border-b border-gold/10 pb-3">
            <h3 
              className="text-base font-light text-neutral-800 uppercase tracking-wider font-display"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Upload Photo
            </h3>
            <p className="text-[10px] text-neutral-500 mt-1">Publish new visuals to the public website</p>
          </div>

          <form ref={formRef} onSubmit={handleUploadSubmit} className="space-y-5">
            {/* File Dropzone */}
            <div className="space-y-2">
              <Label className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Image File</Label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gold/15 bg-gold/[0.01] p-4 text-center transition-all duration-300 hover:border-gold/35 hover:bg-gold/[0.03] overflow-hidden group shadow-sm"
              >
                <input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="absolute inset-0 z-10 bg-white">
                    <Image
                      src={previewUrl}
                      alt="Upload Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] text-gold font-semibold tracking-widest uppercase">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <Upload className="h-5 w-5 text-gold-600 mx-auto animate-pulse" strokeWidth={1} />
                    <p className="text-[10px] text-neutral-600">Drag & drop or <span className="text-gold-600 font-medium">browse files</span></p>
                    <p className="text-[9px] text-neutral-400 font-mono">JPG, PNG, WEBP, GIF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Alt text */}
            <div className="space-y-2">
              <Label htmlFor="alt" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Accessibility Text (Alt)</Label>
              <Input
                id="alt"
                name="alt"
                placeholder="e.g. Wedding banquet layout"
                required
                className="h-10 px-4 border border-gold/15 bg-white text-neutral-800 placeholder-neutral-400 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Category Segment</Label>
              <select
                id="category"
                name="category"
                required
                className="flex h-10 w-full px-4 rounded-xl border border-gold/15 bg-white text-xs text-neutral-800 focus-visible:border-gold-500 focus-visible:outline-none transition-all"
              >
                <option value="events" className="bg-white text-neutral-800">Events</option>
                <option value="venue" className="bg-white text-neutral-800">Venue</option>
                <option value="facilities" className="bg-white text-neutral-800">Facilities</option>
              </select>
            </div>

            {/* Alerts */}
            {uploadError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-[11px] text-red-800">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{uploadError}</span>
              </div>
            )}

            {uploadSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-[11px] text-emerald-800">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Added to gallery successfully.</span>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="gold"
              className="w-full h-11 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md shadow-gold-600/5 cursor-pointer"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Publish Photo"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Gallery List Column (Desktop: 8 columns) */}
      <div className="col-span-12 lg:col-span-8 flex flex-col space-y-6 lg:h-full lg:overflow-hidden">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gold/10 pb-4 shrink-0">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-4.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-gold  text-burgundy font-semibold shadow-md"
                  : "bg-white text-neutral-500 border border-gold/15 hover:text-neutral-800 hover:bg-gold/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gold/20 p-6 text-center bg-white shadow-sm">
            <ImageIcon className="h-8 w-8 text-neutral-300 mb-2.5" strokeWidth={1} />
            <p className="text-xs text-neutral-500 uppercase tracking-widest">No Photos Found</p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1 lg:overflow-y-auto pr-2 custom-scrollbar pb-6">
            <AnimatePresence>
              {filteredImages.map(img => (
                <GalleryCard
                  key={img.id}
                  img={img}
                  isConfirmingDelete={deletingId === img.id}
                  isDeleting={isDeleting}
                  handleDelete={handleDelete}
                  confirmDelete={confirmDelete}
                  setDeletingId={setDeletingId}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
