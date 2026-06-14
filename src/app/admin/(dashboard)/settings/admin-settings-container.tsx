"use client";

import { useState, useTransition } from "react";
import { updateSettingsAction } from "@/app/actions/settings-actions";
import { DBSettings } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Sliders,
  Phone,
  MapPin,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSettingsContainerProps {
  settings: DBSettings;
}

export function AdminSettingsContainer({ settings }: AdminSettingsContainerProps) {
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "location" | "hours">("general");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const monSatHours = settings.businessHours.find(h => h.day.includes("Monday"))?.hours || "9:00 AM – 8:00 PM";
  const sunHours = settings.businessHours.find(h => h.day.includes("Sunday"))?.hours || "10:00 AM – 6:00 PM";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateSettingsAction(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(res.error || "An error occurred");
      }
    });
  };

  const tabs = [
    { value: "general", label: "General Content", icon: Sliders },
    { value: "contact", label: "Contact Details", icon: Phone },
    { value: "location", label: "Location Map", icon: MapPin },
    { value: "hours", label: "Business Hours", icon: Clock },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-4">
      {/* Side Navigation Tabs */}
      <div className="lg:col-span-1 space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "flex w-full items-center gap-4 py-3.5 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all border-l pl-5 cursor-pointer text-left",
                isActive
                  ? "border-gold text-gold-600 bg-gold/[0.02]"
                  : "border-transparent text-neutral-500 hover:border-gold/30 hover:text-neutral-800 hover:bg-neutral-50/50"
              )}
            >
              <tab.icon className="h-4 w-4 shrink-0" strokeWidth={1} />
              {tab.label}
            </button>
          );
        })}

        {/* Global Save Button - Desktop */}
        <div className="pt-6 hidden lg:block border-t border-gold/15 mt-6">
          <Button
            type="submit"
            variant="gold"
            className="w-full h-11 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md shadow-gold-600/5 gap-2 cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" strokeWidth={1.5} />
            )}
            Save Changes
          </Button>

          {success && (
            <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 mt-4 text-[10px] text-emerald-800 font-semibold uppercase tracking-wider justify-center shadow-sm">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>Saved Successfully</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3.5 mt-4 text-[10px] text-red-800 font-semibold uppercase tracking-wider justify-center shadow-sm">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Inputs Form Box */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-gold/15 bg-white p-6 sm:p-8 space-y-6 shadow-sm relative">
          {/* Subtle top light overlay */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

          {/* TAB 1: GENERAL CONTENT */}
          {activeTab === "general" && (
            <div className="space-y-5">
              <div className="border-b border-gold/10 pb-3.5 mb-6">
                <h4 className="text-base font-light text-neutral-800 font-display uppercase tracking-wider" style={{ fontFamily: "var(--font-cormorant)" }}>General Copywriting</h4>
                <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">Configure homepage titles, taglines, and SEO definitions</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headline" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Hero Headline</Label>
                <Input
                  id="headline"
                  name="headline"
                  defaultValue={settings.headline}
                  required
                  className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Hero Tagline / Subtitle</Label>
                <Textarea
                  id="tagline"
                  name="tagline"
                  defaultValue={settings.tagline}
                  required
                  rows={3}
                  className="px-4 py-3 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs leading-relaxed transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Meta Description (SEO)</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={settings.description}
                  required
                  rows={4}
                  className="px-4 py-3 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs leading-relaxed transition-all"
                />
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT DETAILS */}
          {activeTab === "contact" && (
            <div className="space-y-5">
              <div className="border-b border-gold/10 pb-3.5 mb-6">
                <h4 className="text-base font-light text-neutral-800 font-display uppercase tracking-wider" style={{ fontFamily: "var(--font-cormorant)" }}>Contact Information</h4>
                <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">Configure email addresses, telephone credentials, and WhatsApp lines</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Phone (Display)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={settings.phone}
                    required
                    className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneRaw" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Phone (Raw Link Format)</Label>
                  <Input
                    id="phoneRaw"
                    name="phoneRaw"
                    defaultValue={settings.phoneRaw}
                    required
                    className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={settings.email}
                    required
                    className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">WhatsApp Link Target (digits only)</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    defaultValue={settings.whatsapp}
                    placeholder="e.g. 919876543210"
                    required
                    className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOCATION MAP */}
          {activeTab === "location" && (
            <div className="space-y-5">
              <div className="border-b border-gold/10 pb-3.5 mb-6">
                <h4 className="text-base font-light text-neutral-800 font-display uppercase tracking-wider" style={{ fontFamily: "var(--font-cormorant)" }}>Location Parameters</h4>
                <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">Configure physical addresses printed on public footer sections</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressStreet" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Street Address</Label>
                <Input
                  id="addressStreet"
                  name="addressStreet"
                  defaultValue={settings.addressStreet}
                  required
                  className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="addressCity" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">City</Label>
                  <Input
                    id="addressCity"
                    name="addressCity"
                    defaultValue={settings.addressCity}
                    required
                    className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressState" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">State / Region</Label>
                  <Input
                    id="addressState"
                    name="addressState"
                    defaultValue={settings.addressState}
                    required
                    className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressZip" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">ZIP Code</Label>
                  <Input
                    id="addressZip"
                    name="addressZip"
                    defaultValue={settings.addressZip}
                    required
                    className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressCountry" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Country</Label>
                <Input
                  id="addressCountry"
                  name="addressCountry"
                  defaultValue={settings.addressCountry}
                  required
                  className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                />
              </div>
            </div>
          )}

          {/* TAB 4: BUSINESS HOURS */}
          {activeTab === "hours" && (
            <div className="space-y-5">
              <div className="border-b border-gold/10 pb-3.5 mb-6">
                <h4 className="text-base font-light text-neutral-800 font-display uppercase tracking-wider" style={{ fontFamily: "var(--font-cormorant)" }}>Business Hours</h4>
                <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed">Configure operational timings printed on page footers</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursMonSat" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Monday – Saturday Hours</Label>
                <Input
                  id="hoursMonSat"
                  name="hoursMonSat"
                  defaultValue={monSatHours}
                  required
                  className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursSun" className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Sunday Hours</Label>
                <Input
                  id="hoursSun"
                  name="hoursSun"
                  defaultValue={sunHours}
                  required
                  className="h-11 px-4 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl text-xs transition-all"
                />
              </div>
            </div>
          )}

          {/* Global Save Button - Mobile only */}
          <div className="pt-4 lg:hidden border-t border-gold/10 space-y-4">
            {success && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-55 border border-emerald-200 p-3 text-[10px] text-emerald-800 font-semibold uppercase tracking-wider justify-center shadow-sm">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>Saved Successfully</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-[10px] text-red-800 font-semibold uppercase tracking-wider justify-center shadow-sm">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="gold"
              className="w-full h-11 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-lg shadow-gold-600/10 gap-2 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
