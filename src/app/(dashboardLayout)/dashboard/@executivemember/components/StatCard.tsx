import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string; // যেমন: bg-muted
  iconColor: string; // যেমন: text-primary
}

export const StatCard = ({ title, value, subtitle, icon: Icon, iconBg, iconColor }: StatCardProps) => (
  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm transition-colors duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-foreground mt-1">
          {value}
        </h3>
      </div>
      <div className={`p-2 rounded-lg ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
    <p className="text-sm text-muted-foreground mt-4">
      {subtitle}
    </p>
  </div>
);