import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "overflow-hidden",
    "whitespace-nowrap",
    "select-none",
    "uppercase",
    "tracking-[0.25em]",
    "font-medium",
    "transition-all duration-700 ease-out",
    "cursor-pointer",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[#D8B36A]/40",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-transparent",
          "text-[#D8B36A]",
          "border border-[#D8B36A]/50",
          "hover:bg-[#D8B36A]",
          "hover:text-[#0F0F0F]",
        ].join(" "),

        gold: [
          "bg-[#0F0F0F]",
          "text-[#D8B36A]",

          "border border-[#D8B36A]/50",

          "shadow-[0_0_0_1px_rgba(216,179,106,0.15)]",

          "before:absolute",
          "before:inset-[4px]",
          "before:border",
          "before:border-[#D8B36A]/20",
          "before:content-['']",
          "before:pointer-events-none",

          "after:absolute",
          "after:top-0",
          "after:left-[-120%]",
          "after:h-full",
          "after:w-[50%]",
          "after:skew-x-[-25deg]",
          "after:bg-gradient-to-r",
          "after:from-transparent",
          "after:via-white/20",
          "after:to-transparent",
          "after:content-['']",

          "hover:after:left-[150%]",
          "after:transition-all",
          "after:duration-[1400ms]",

          "hover:border-[#D8B36A]",
          "hover:text-[#F5DE9C]",

          "hover:shadow-[0_0_30px_rgba(216,179,106,0.18)]",
          "hover:-translate-y-[2px]",
        ].join(" "),

        outline: [
          "bg-transparent",
          "text-[#D8B36A]",
          "border border-[#D8B36A]/60",

          "before:absolute",
          "before:inset-[4px]",
          "before:border",
          "before:border-[#D8B36A]/20",
          "before:content-['']",

          "hover:bg-[#D8B36A]/10",
          "hover:border-[#D8B36A]",
          "hover:text-[#F5DE9C]",
        ].join(" "),

        ghost: [
          "text-[#D8B36A]",
          "hover:bg-[#D8B36A]/10",
          "hover:text-[#F5DE9C]",
        ].join(" "),

        link: [
          "h-auto",
          "p-0",
          "border-none",
          "tracking-[0.15em]",
          "text-[#D8B36A]",
          "underline-offset-4",
          "hover:text-[#F5DE9C]",
          "hover:underline",
        ].join(" "),
      },

      size: {
        default: "h-14 px-10 text-[12px]",
        sm: "h-11 px-7 text-[11px]",
        lg: "h-16 px-14 text-[13px]",
        icon: "h-14 w-14 p-0",
      },

      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        full: "rounded-full",
      },
    },

    defaultVariants: {
      variant: "gold",
      size: "default",
      rounded: "none",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            rounded,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
