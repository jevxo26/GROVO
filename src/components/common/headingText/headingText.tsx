import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "font-serif font-bold tracking-tight transition-colors duration-200", // 👈 Added font-serif
  {
    variants: {
      size: {
        sm: "text-2xl sm:text-3xl",
        default: "text-3xl sm:text-4xl md:text-5xl",
        lg: "text-4xl sm:text-5xl md:text-6xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface HeadingTextProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headingVariants> {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "h3" | "h4";

  titleColor?: string;
  highlightGradient?: string;
  badgeColor?: string;
  descriptionColor?: string;
}

export function HeadingText({
  badge,
  title,
  highlight,
  description,
  size,
  align = "center",
  as: Component = "h2",

  // Dynamic Light/Dark Mode colors matching your images
  titleColor = "text-slate-950 dark:text-slate-50",
  highlightGradient = "from-[#0f7638] to-[#0f7638] dark:from-[#28a745] dark:to-[#28a745]",
  badgeColor = "bg-[#f0f9f3] text-[#0f7638] border-[#d3ebd9] dark:bg-[#0f7638]/20 dark:text-[#28a745] dark:border-[#0f7638]/40",
  descriptionColor = "text-slate-600 dark:text-slate-400",
  className,
  ...props
}: HeadingTextProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-3xl",
        align === "center" && "items-center text-center mx-auto",
        align === "left" && "items-start text-left",
        align === "right" && "items-end text-right",
        className,
      )}
      {...props}
    >
      {/* Badge Pill */}
      {badge && (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3.5 py-1 text-xs font-sans font-semibold uppercase tracking-wider border backdrop-blur-sm transition-colors duration-200",
            badgeColor,
          )}
        >
          {badge}
        </span>
      )}

      {/* Main Title + Highlight */}
      <Component className={cn(headingVariants({ size }), titleColor)}>
        {title}{" "}
        {highlight && (
          <span
            className={cn(
              "inline-block bg-gradient-to-r bg-clip-text text-transparent transition-all duration-200",
              highlightGradient,
            )}
          >
            {highlight}
          </span>
        )}
      </Component>

      {/* Subtitle / Description */}
      {description && (
        <p
          className={cn(
            "font-sans text-base sm:text-lg leading-relaxed max-w-2xl transition-colors duration-200",
            descriptionColor,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
