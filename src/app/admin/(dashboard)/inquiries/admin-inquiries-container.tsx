"use client";

import { useState, useTransition } from "react";
import { changeInquiryStatusAction, deleteInquiryAction } from "@/app/actions/inquiry-actions";
import { DBInquiry } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Inbox, 
  X, 
  Trash2, 
  Clock,
  ExternalLink,
  Smartphone,
  FileText,
  Check,
  Archive,
  AlertCircle,
  MailOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AdminInquiriesContainerProps {
  initialInquiries: DBInquiry[];
}

export function AdminInquiriesContainer({ initialInquiries }: AdminInquiriesContainerProps) {
  const [inquiries, setInquiries] = useState<DBInquiry[]>(initialInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Detail and selection states
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  
  // Transition actions
  const [isPending, startTransition] = useTransition();

  // Sync state if initialInquiries changes
  if (initialInquiries !== inquiries) {
    setInquiries(initialInquiries);
  }

  const handleStatusChange = async (id: string, status: DBInquiry["status"]) => {
    startTransition(async () => {
      const res = await changeInquiryStatusAction(id, status);
      if (!res.success) {
        setErrorAlert(res.error || "Failed to update status");
        setTimeout(() => setErrorAlert(null), 5000);
      }
    });
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirmId(id);
  };

  // Filtering logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.eventType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesType = typeFilter === "all" || inq.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Automatically select the active inquiry
  const activeInquiry = 
    filteredInquiries.find(i => i.id === selectedInquiryId) || 
    filteredInquiries[0] || 
    null;

  const handleInquirySelect = (inq: DBInquiry) => {
    setSelectedInquiryId(inq.id);
    setIsMobileDrawerOpen(true);
    
    // Automatically mark as "read" if it was "new"
    if (inq.status === "new") {
      handleStatusChange(inq.id, "read");
    }
  };

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "read", label: "Read" },
    { value: "replied", label: "Replied" },
    { value: "archived", label: "Archived" },
  ];

  const typeOptions = [
    { value: "all", label: "All Channels" },
    { value: "contact", label: "Contact Form" },
    { value: "whatsapp", label: "WhatsApp Inquiries" },
  ];

  const statusColors = {
    new: "bg-gold/5 text-gold-600 border-gold/20",
    read: "bg-blue-500/5 text-blue-600 border-blue-500/10",
    replied: "bg-emerald-500/5 text-emerald-600 border-emerald-500/10",
    archived: "bg-neutral-100 text-neutral-500 border-neutral-200",
  };

  const statusDotColors = {
    new: "bg-gold",
    read: "bg-blue-500",
    replied: "bg-emerald-500",
    archived: "bg-neutral-300",
  };

  const channelLabels = {
    contact: "Form",
    whatsapp: "WhatsApp",
  };

  const channelColors = {
    contact: "bg-gold/5 text-gold-600 border-gold/15",
    whatsapp: "bg-emerald-500/5 text-emerald-600 border-emerald-500/10",
  };

  return (
    <div className="lg:h-full flex flex-col space-y-6 lg:overflow-hidden">
      {/* Search and Filters Bar */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 rounded-2xl border border-gold/15 bg-white p-4 shrink-0 shadow-sm relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        
        {/* Search */}
        <div className="relative md:col-span-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-neutral-400" />
          </div>
          <Input
            type="text"
            placeholder="Search name, phone, message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 h-10 border border-gold/15 bg-white text-neutral-800 focus-visible:border-gold-500 rounded-xl placeholder-neutral-400 text-xs transition-all"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 w-full px-4 rounded-xl border border-gold/15 bg-white text-xs text-neutral-800 focus-visible:border-gold-500 focus-visible:outline-none transition-all"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-neutral-800">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="flex h-10 w-full px-4 rounded-xl border border-gold/15 bg-white text-xs text-neutral-800 focus-visible:border-gold-500 focus-visible:outline-none transition-all"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-neutral-800">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Split Pane Layout */}
      <div className="grid gap-6 lg:grid-cols-12 lg:flex-1 lg:overflow-hidden min-h-0">
        {/* Left Panel: Inquiry Cards List (40% width on desktop) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col space-y-3 lg:h-full lg:overflow-y-auto pr-2 custom-scrollbar">
          {filteredInquiries.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gold/15 p-6 text-center bg-white shadow-sm">
              <Inbox className="h-7 w-7 text-neutral-300 mb-2.5" strokeWidth={1} />
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">No matches found</p>
            </div>
          ) : (
            filteredInquiries.map((inq) => {
              const isSelected = activeInquiry?.id === inq.id;
              
              return (
                <div
                  key={inq.id}
                  onClick={() => handleInquirySelect(inq)}
                  className={cn(
                    "group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left overflow-hidden",
                    isSelected 
                      ? "border-gold/35 bg-gold/[0.02] pl-5 shadow-[inset_2px_0_0_0_#c7a56a] shadow-sm"
                      : "border-gold/10 bg-white hover:bg-gold/[0.01] hover:border-gold/20 pl-4 shadow-sm"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* New Status Dot Indicator */}
                      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", inq.status === "new" ? "bg-gold animate-pulse" : statusDotColors[inq.status])} />
                      <h4 className="text-xs font-semibold text-neutral-800 truncate max-w-[150px] uppercase tracking-wider">{inq.name}</h4>
                    </div>
                    <span className="text-[9px] text-neutral-400 shrink-0 font-mono">
                      {new Date(inq.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-gold-600 font-medium truncate font-serif italic">{inq.eventType}</span>
                    <span className={cn("rounded-full border px-2 py-0.2 text-[8px] font-semibold tracking-wider uppercase", channelColors[inq.type])}>
                      {channelLabels[inq.type]}
                    </span>
                  </div>

                  {/* Message Preview */}
                  <p className="mt-2.5 text-xs text-neutral-500 line-clamp-1 truncate leading-relaxed">
                    {inq.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Panel: Classy Reading Pane Document (60% width on desktop, hidden on mobile) */}
        <div className="hidden lg:block lg:col-span-7 h-full overflow-hidden">
          {activeInquiry ? (
            <div className="rounded-2xl border border-gold/15 bg-white p-8 flex flex-col h-full overflow-y-auto pr-4 custom-scrollbar relative shadow-lg">
              {/* Subtle top light overlay */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
              
              {/* Ornate corner gold-foil framing lines */}
              <div className="absolute top-4 left-4 h-6 w-6 border-t border-l border-gold/20 pointer-events-none" />
              <div className="absolute top-4 right-4 h-6 w-6 border-t border-r border-gold/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-gold/20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-gold/20 pointer-events-none" />

              {/* Document Header Controls */}
              <div className="flex items-center justify-between border-b border-gold/10 pb-4 mb-6 relative z-10">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold-600 font-semibold">Booking Inquiry Sheet</span>
                  <h3 
                    className="text-2xl font-light text-neutral-800 tracking-wide mt-0.5"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {activeInquiry.name}
                  </h3>
                </div>

                {/* Quick actions top bar button group */}
                <div className="flex items-center gap-1.5">
                  {activeInquiry.status !== "replied" && (
                    <button
                      onClick={() => handleStatusChange(activeInquiry.id, "replied")}
                      className="rounded-lg bg-neutral-50 border border-neutral-200 hover:border-emerald-500/20 hover:bg-emerald-500/5 p-2 text-neutral-600 hover:text-emerald-600 transition-all cursor-pointer"
                      title="Mark as Replied"
                      disabled={isPending}
                    >
                      <Check className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  )}
                  {activeInquiry.status !== "archived" && (
                    <button
                      onClick={() => handleStatusChange(activeInquiry.id, "archived")}
                      className="rounded-lg bg-neutral-50 border border-neutral-200 hover:border-gold/25 hover:bg-gold/5 p-2 text-neutral-600 hover:text-gold-600 transition-all cursor-pointer"
                      title="Archive Inquiry"
                      disabled={isPending}
                    >
                      <Archive className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(activeInquiry.id)}
                    className="rounded-lg bg-neutral-50 border border-neutral-200 hover:border-red-500/20 hover:bg-red-500/5 p-2 text-neutral-500 hover:text-red-600 transition-all cursor-pointer"
                    title="Delete permanently"
                    disabled={isPending}
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Document Info Metadata Blocks */}
              <div className="grid gap-4 grid-cols-2 mb-6 relative z-10">
                <div className="p-4 rounded-xl border border-gold/10 bg-[#faf8f4] space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-semibold">Customer Information</span>
                  <div className="space-y-1.5 font-sans text-xs">
                    {activeInquiry.email && (
                      <a href={`mailto:${activeInquiry.email}`} className="flex items-center gap-2 text-neutral-800 hover:text-gold-600 transition-colors break-all">
                        <Mail className="h-3.5 w-3.5 text-gold-600 shrink-0" strokeWidth={1.25} />
                        {activeInquiry.email}
                      </a>
                    )}
                    <a href={`tel:${activeInquiry.phone}`} className="flex items-center gap-2 text-neutral-800 hover:text-gold-600 transition-colors font-mono">
                      <Phone className="h-3.5 w-3.5 text-gold-600 shrink-0" strokeWidth={1.25} />
                      {activeInquiry.phone}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gold/10 bg-[#faf8f4] space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-semibold">Booking Requirements</span>
                  <div className="space-y-1.5 font-sans text-xs">
                    <div className="flex items-center gap-2 text-neutral-800">
                      <Calendar className="h-3.5 w-3.5 text-gold-600 shrink-0" strokeWidth={1.25} />
                      <span className="font-mono">
                        {activeInquiry.eventDate ? (
                          new Date(activeInquiry.eventDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })
                        ) : (
                          <span className="text-neutral-500 italic">Date not set</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-800">
                      <Users className="h-3.5 w-3.5 text-gold-600 shrink-0" strokeWidth={1.25} />
                      <span>{activeInquiry.guestCount ? `${activeInquiry.guestCount} Expected Guests` : <span className="text-neutral-500 italic">Guests not set</span>}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Type & Channel Info Row */}
              <div className="flex flex-wrap gap-2.5 items-center mb-6 relative z-10">
                <span className="rounded-full bg-gold/5 px-3 py-0.5 text-[9px] font-semibold text-gold-600 uppercase tracking-widest border border-gold/25">
                  {activeInquiry.eventType}
                </span>
                <span className="text-xs text-neutral-500">received via</span>
                <span className={cn("rounded-full border px-3 py-0.5 text-[9px] font-semibold tracking-widest uppercase flex items-center gap-1.5", channelColors[activeInquiry.type])}>
                  {activeInquiry.type === "contact" ? <FileText className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
                  {channelLabels[activeInquiry.type]}
                </span>
                
                {/* Time Indicator */}
                <div className="ml-auto flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.25} />
                  <span>{new Date(activeInquiry.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>

              {/* Classy Ornate Divider */}
              <div className="flex items-center justify-center gap-4 my-2 mb-6 relative z-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/25" />
                <div className="h-1.5 w-1.5 rotate-45 border border-gold/30 bg-gold/5 shadow-[0_0_5px_rgba(199,165,106,0.1)]" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/25" />
              </div>

              {/* Message text block */}
              <div className="flex-1 space-y-4 relative z-10">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 block font-semibold">Inquiry Message / Notes</span>
                <p 
                  className="text-lg text-neutral-800 whitespace-pre-wrap leading-relaxed font-light italic pl-5 border-l border-gold/20"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "18px" }}
                >
                  &ldquo;{activeInquiry.message}&rdquo;
                </p>
              </div>

              {/* Bottom Respond Action Button */}
              {activeInquiry.phone && (
                <div className="border-t border-gold/10 pt-6 mt-6 flex justify-end relative z-10">
                  <Button
                    variant="gold"
                    className="rounded-xl text-[10px] font-semibold gap-2 h-10 px-5 uppercase tracking-wider shadow-md shadow-gold/5 cursor-pointer"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${activeInquiry.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                      Reply on WhatsApp
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-gold/15 bg-white p-8 flex flex-col items-center justify-center h-full min-h-[400px] text-center relative shadow-sm">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
              <MailOpen className="h-8 w-8 text-neutral-300 mb-3.5" strokeWidth={1} />
              <h4 className="text-base font-light text-neutral-700 font-display uppercase tracking-wider">No Message Selected</h4>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed mt-1.5">
                Select an inquiry from the panel list on the left to read its details.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Mobile Slide-Over Drawer (Only mounts/opens on Mobile when activeInquiry clicked) */}
      <AnimatePresence>
        {isMobileDrawerOpen && activeInquiry && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-over panel drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-xl flex-col border-l border-gold/15 bg-[#faf8f4] p-6 text-neutral-800 shadow-2xl md:p-8 lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-gold/10 pb-4 mb-6">
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-semibold">Inquiry Details</span>
                  <h3 
                    className="text-2xl font-light text-neutral-800 tracking-wide mt-0.5"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {activeInquiry.name}
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {/* Status Options */}
                <div className="rounded-xl bg-white border border-gold/15 p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Status</p>
                    <span className={`inline-block rounded-full border px-2 py-0.5 text-[8px] font-semibold tracking-wide uppercase ${statusColors[activeInquiry.status]}`}>
                      {activeInquiry.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["new", "read", "replied", "archived"].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(activeInquiry.id, st as DBInquiry["status"])}
                        className={`rounded-lg px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider transition-all ${
                          activeInquiry.status === st
                            ? "bg-gold text-luxury-dark"
                            : "bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-800"
                        }`}
                        disabled={isPending}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Contact Cards */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-4 border border-gold/15 flex items-start gap-3 shadow-sm">
                    <Mail className="h-4 w-4 text-gold-600 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Email</p>
                      <a href={`mailto:${activeInquiry.email}`} className="text-xs font-medium text-neutral-800 hover:text-gold-600 transition-colors break-all">
                        {activeInquiry.email || <span className="text-neutral-500 italic">Not set</span>}
                      </a>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4 border border-gold/15 flex items-start gap-3 shadow-sm">
                    <Phone className="h-4 w-4 text-gold-600 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Phone</p>
                      <a href={`tel:${activeInquiry.phone}`} className="text-xs font-medium text-neutral-800 hover:text-gold-600 transition-colors font-mono">
                        {activeInquiry.phone}
                      </a>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4 border border-gold/15 flex items-start gap-3 shadow-sm">
                    <Calendar className="h-4 w-4 text-gold-600 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Preferred Date</p>
                      <p className="text-xs font-medium text-neutral-800 font-mono">
                        {activeInquiry.eventDate ? (
                          new Date(activeInquiry.eventDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                          })
                        ) : (
                          <span className="text-neutral-500 italic">Not specified</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4 border border-gold/15 flex items-start gap-3 shadow-sm">
                    <Users className="h-4 w-4 text-gold-600 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Expected Guests</p>
                      <p className="text-xs font-medium text-neutral-800">{activeInquiry.guestCount || <span className="text-neutral-500 italic">Not specified</span>}</p>
                    </div>
                  </div>
                </div>

                {/* Event Type / Channel Card */}
                <div className="grid gap-4 grid-cols-2">
                  <div className="p-4 rounded-xl border border-gold/15 bg-white shadow-sm">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Event Type</p>
                    <p className="text-xs font-medium mt-0.5 font-serif italic text-gold-600">{activeInquiry.eventType}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gold/15 bg-white shadow-sm">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Received Channel</p>
                    <div className="flex items-center gap-2 mt-1">
                      {activeInquiry.type === "contact" ? (
                        <>
                          <FileText className="h-3.5 w-3.5 text-gold-600" />
                          <span className="text-xs text-neutral-800 font-medium">Website Form</span>
                        </>
                      ) : (
                        <>
                          <Smartphone className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-xs text-neutral-800 font-medium">WhatsApp</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message notes */}
                <div className="rounded-xl bg-white p-5 border border-gold/15 space-y-2.5 shadow-sm">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Customer Message</p>
                  <p className="text-xs text-neutral-800 whitespace-pre-wrap leading-relaxed italic pl-3 border-l border-gold/20">
                    &ldquo;{activeInquiry.message}&rdquo;
                  </p>
                </div>

                {/* Received Time stamp */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 justify-end font-mono">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Received {new Date(activeInquiry.createdAt).toLocaleString("en-US")}</span>
                </div>
              </div>

              {/* Drawer Footer Buttons */}
              <div className="border-t border-gold/10 pt-4 mt-6 flex justify-between gap-4">
                <Button
                  onClick={() => handleDelete(activeInquiry.id)}
                  variant="outline"
                  className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl text-[10px] gap-1.5 h-10 px-4 uppercase tracking-wider font-semibold"
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  Delete Permanently
                </Button>

                {activeInquiry.phone && (
                  <Button
                    variant="gold"
                    className="rounded-xl text-[10px] font-semibold gap-1.5 h-10 px-4 uppercase tracking-wider"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${activeInquiry.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                      Reply on WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Alert Messages */}
      <AnimatePresence>
        {errorAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 right-6 lg:right-10 z-50 flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-800 shadow-2xl backdrop-blur-md"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <span>{errorAlert}</span>
            <button onClick={() => setErrorAlert(null)} className="ml-2.5 text-neutral-400 hover:text-neutral-700 cursor-pointer">
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Dialog Deletion confirmation */}
      <AnimatePresence>
        {deleteConfirmId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="fixed inset-0 z-55 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: "-45%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: "-45%" }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-55 w-full max-w-sm rounded-2xl border border-gold/15 bg-white p-6 text-center shadow-2xl"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 className="h-5 w-5" strokeWidth={1.5} />
              </div>
              
              <h4 className="text-lg font-light text-neutral-800 font-display uppercase tracking-wider">Delete Inquiry?</h4>
              <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                This will permanently remove the inquiry from the database. This action cannot be undone.
              </p>
              
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteConfirmId(null)}
                  className="rounded-xl px-4 h-9 text-[10px] border border-neutral-200 uppercase tracking-wider text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 cursor-pointer"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (deleteConfirmId) {
                      startTransition(async () => {
                        const res = await deleteInquiryAction(deleteConfirmId);
                        if (res.success) {
                           setSelectedInquiryId(null);
                           setIsMobileDrawerOpen(false);
                           setDeleteConfirmId(null);
                        } else {
                           setErrorAlert(res.error || "Failed to delete inquiry");
                           setDeleteConfirmId(null);
                        }
                      });
                    }
                  }}
                  className="rounded-xl px-4 h-9 text-[10px] bg-red-600 hover:bg-red-700 text-white uppercase tracking-wider font-semibold border-none cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? "..." : "Delete"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
