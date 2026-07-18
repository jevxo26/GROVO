import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtext?: string;
  subtextColor?: "green" | "muted";
}

export function StatCard({ title, value, subtext, subtextColor = "muted" }: StatCardProps) {
  return (
    <Card className="shadow-sm border-border bg-card">
      <CardContent className="p-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{title}</h3>
        <div className="text-3xl font-bold text-foreground font-serif">{value}</div>
        {subtext && (
          <p className={cn(
            "text-xs mt-2",
            subtextColor === "green" ? "text-teal-600 dark:text-teal-400" : "text-muted-foreground"
          )}>
            {subtext}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
