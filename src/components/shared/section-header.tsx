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
      className={cn("mb-16 lg:mb-24", align === "center" && "text-center")}
    >
      {label && (
        <span className={cn("label-luxury mb-6 block", light ? "text-gold" : "text-gold")}>
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
      <div
        className={cn(
          "divider-ornate mt-8 mb-8",
          align === "center" ? "mx-auto max-w-xs justify-center" : "max-w-[120px]"
        )}
      >
        <span className="divider-ornate-center" />
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
