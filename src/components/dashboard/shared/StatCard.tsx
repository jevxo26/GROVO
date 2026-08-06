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
        "bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 group",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
          {value}
        </h3>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md",
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400",
            )}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
