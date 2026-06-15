"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitWhatsAppInquiryAction } from "@/app/actions/contact";
import { 
  MessageCircle, 
  X, 
  Loader2, 
  AlertCircle, 
  CheckCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const eventTypes = [
  "Wedding",
  "Reception",
  "Corporate Event",
  "Conference",
  "Seminar",
  "Exhibition",
  "Social Gathering",
  "Community Event",
  "Other",
];

export function QuickInquiryModal({ isOpen, onClose }: QuickInquiryModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      eventType: formData.get("eventType") as string,
      eventDate: formData.get("eventDate") as string,
      guestCount: formData.get("guestCount") as string,
      message: formData.get("message") as string,
    };

    if (!data.name || !data.phone || !data.eventType || !data.message) {
      setError("Please fill in all required fields (*).");
      return;
    }

    startTransition(async () => {
      const res = await submitWhatsAppInquiryAction(data);
      if (res.success && res.whatsappUrl) {
        setSuccess(true);
        // Open WhatsApp in a new tab
        window.open(res.whatsappUrl, "_blank", "noopener,noreferrer");
        
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1500);
      } else {
        setError(res.error || "Failed to initialize inquiry");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl border border-gold/15 bg-white p-0 overflow-hidden rounded-2xl shadow-2xl">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-luxury-dark to-luxury-dark-soft p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg bg-black/10 p-1.5 text-white/70 hover:bg-black/20 hover:text-white transition-colors"
          >
            <X className="h-4.5 w-4.5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gold/25 p-2 border border-gold/20">
              <MessageCircle className="h-6 w-6 text-gold-300" fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <span className="label-luxury text-[9px] text-gold-300 tracking-[0.25em] block">WhatsApp Integration</span>
              <h3 
                className="text-xl font-light tracking-wide text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Quick Booking Inquiry
              </h3>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="rounded-full bg-emerald-500/10 p-4 border border-emerald-500/20 mb-4 animate-bounce">
                  <CheckCircle className="h-10 w-10 text-emerald-500" strokeWidth={1.25} />
                </div>
                <h4 className="text-lg font-medium text-luxury-dark mb-1">Inquiry Recorded!</h4>
                <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
                  Redirecting to WhatsApp to complete your booking chat...
                </p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="quick-name" className="text-xs font-semibold text-charcoal">Full Name *</Label>
                    <Input
                      id="quick-name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="h-11 border-gold-300/40 focus-visible:border-gold rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="quick-phone" className="text-xs font-semibold text-charcoal">Phone Number *</Label>
                    <Input
                      id="quick-phone"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      required
                      className="h-11 border-gold-300/40 focus-visible:border-gold rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="quick-email" className="text-xs font-semibold text-charcoal">Email Address (Optional)</Label>
                    <Input
                      id="quick-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 border-gold-300/40 focus-visible:border-gold rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="quick-eventType" className="text-xs font-semibold text-charcoal">Event Type *</Label>
                    <select
                      id="quick-eventType"
                      name="eventType"
                      required
                      defaultValue=""
                      className="flex h-11 w-full rounded-xl border border-gold-300/40 bg-transparent px-3 py-2 text-sm text-charcoal focus-visible:border-gold focus-visible:outline-none transition-colors"
                    >
                      <option value="" disabled>Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="quick-eventDate" className="text-xs font-semibold text-charcoal">Preferred Event Date</Label>
                    <Input
                      id="quick-eventDate"
                      name="eventDate"
                      type="date"
                      className="h-11 border-gold-300/40 focus-visible:border-gold rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="quick-guestCount" className="text-xs font-semibold text-charcoal">Expected Guests</Label>
                    <Input
                      id="quick-guestCount"
                      name="guestCount"
                      placeholder="e.g. 300"
                      className="h-11 border-gold-300/40 focus-visible:border-gold rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="quick-message" className="text-xs font-semibold text-charcoal">Short Message *</Label>
                  <Textarea
                    id="quick-message"
                    name="message"
                    placeholder="Tell us briefly about your event requirements..."
                    required
                    rows={3}
                    className="border-gold-300/40 focus-visible:border-gold rounded-xl text-sm"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="gold"
                  className="w-full h-11 rounded-xl text-xs font-semibold uppercase tracking-wider gap-2 shadow-lg shadow-gold-600/10 mt-2"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4 text-luxury-dark" fill="currentColor" strokeWidth={0} />
                      Start WhatsApp Inquiry
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
