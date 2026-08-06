import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between min-w-0",
        className,
      )}
    >
      {/* Card Header: Title & Icon */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider truncate">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Card Value & Trend Badge */}
      <div className="space-y-1.5 mt-1">
        <h3 className="text-xl lg:text-2xl font-extrabold text-foreground tracking-tight truncate leading-tight">
          {value}
        </h3>
        {change && (
          <div
            className={cn(
              "inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap max-w-full",
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
            )}
          >
            {isPositive ? <TrendingUp className="w-3 h-3 shrink-0" /> : <TrendingDown className="w-3 h-3 shrink-0" />}
            <span className="truncate">{change}</span>
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed truncate">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
