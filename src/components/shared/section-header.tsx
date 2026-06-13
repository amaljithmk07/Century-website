"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-10 sm:mb-16 lg:mb-24", align === "center" && "text-center")}
    >
      {label && (
        <span
          className={cn("label-luxury mb-2 sm:mb-4 block", light ? "text-gold-300" : "text-gold")}
          style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.28em", fontStyle: "italic" }}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "heading-section",
          light ? "text-white" : "text-text-primary"
        )}
      >
        {title}
      </h2>
      
      {/* Luxury ornate divider layout */}
      <div
        className={cn(
          "flex items-center gap-3 mt-4 mb-4 sm:mt-6 sm:mb-6",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        {align === "center" ? (
          <>
            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-gold-300/30 to-gold" />
            <div className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/10" />
            <div className="h-[1px] w-14 bg-gradient-to-l from-transparent via-gold-300/30 to-gold" />
          </>
        ) : (
          <>
            <div className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/10" />
            <div className="h-[1px] w-20 bg-gradient-to-r from-gold via-gold-300/30 to-transparent" />
          </>
        )}
      </div>

      {description && (
        <p
          className={cn(
            "body-luxury max-w-xl",
            align === "center" && "mx-auto",
            light ? "text-white/60" : "text-text-secondary"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
