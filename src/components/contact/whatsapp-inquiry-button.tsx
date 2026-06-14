"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { QuickInquiryModal } from "./quick-inquiry-modal";

export function WhatsAppInquiryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="gold" 
        className="w-full cursor-pointer h-12 rounded-xl text-xs font-semibold uppercase tracking-wider gap-2 shadow-lg shadow-gold-600/10"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-4.5 w-4.5 text-burgundy" fill="currentColor" strokeWidth={0} />
        Quick WhatsApp Inquiry
      </Button>
      
      <QuickInquiryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
