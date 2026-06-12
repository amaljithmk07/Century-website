import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type LogoVariant = "light" | "dark";
type LogoSize = "sm" | "md" | "lg";

const sizeMap: Record<LogoSize, string> = {
  sm: "h-8 w-auto max-w-[120px]",
  md: "h-9 w-auto max-w-[140px] sm:h-10 sm:max-w-[160px]",
  lg: "h-11 w-auto max-w-[180px] sm:h-12 sm:max-w-[200px]",
};

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  href?: string;
}

export function Logo({
  variant = "light",
  size = "md",
  className,
  href = "/",
}: LogoProps) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === "dark" ? siteConfig.logo.src : siteConfig.logoWhite.src}
      alt={siteConfig.logo.alt}
      width={siteConfig.logo.width}
      height={siteConfig.logo.height}
      className={cn("object-contain object-left", sizeMap[size], className)}
    />
  );

  if (!href) {
    return <span className="inline-flex shrink-0 items-center">{image}</span>;
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center"
      aria-label={siteConfig.name}
    >
      {image}
    </Link>
  );
}
