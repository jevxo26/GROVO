import React from "react";
import Link from "next/link";
import { Flag, HeartHandshake, ArrowUpRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Campaign {
  id?: string;
  title: string;
  category?: string;
  percentage: number;
  raised: string | number;
  target: string | number;
  beneficiaries: number;
  urgency?: "emergency" | "urgent" | "normal" | string;
}

interface SupportedCampaignsProps {
  title?: string;
  campaigns: Campaign[];
  onDonateClick?: (campaign: Campaign) => void;
}

export const SupportedCampaigns: React.FC<SupportedCampaignsProps> = ({
  title = "Active Appeals & Humanitarian Projects",
  campaigns = [],
  onDonateClick,
}) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm transition-all">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-extrabold text-foreground text-lg tracking-tight flex items-center gap-2">
            <Flag className="w-5 h-5 text-primary" /> {title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Explore emergency appeals and verified community projects</p>
        </div>
        <Link href="/dashboard/campaigns" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
          View All <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((c, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-border/70 bg-card hover:bg-muted/20 hover:border-primary/40 transition-all duration-300 shadow-sm flex flex-col justify-between group space-y-4"
          >
            {/* Header Tag & Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  {c.category || "Emergency Relief"}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    c.urgency === "emergency"
                      ? "bg-red-500/10 text-red-600 border border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  }`}
                >
                  {c.urgency === "emergency" ? "Emergency" : "Active"}
                </span>
              </div>
              <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors leading-snug line-clamp-2">
                {c.title}
              </h3>
            </div>

            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground flex items-center gap-1 font-medium">
                  <Target className="w-3.5 h-3.5 text-primary" /> Goal Progress
                </span>
                <span className="font-extrabold text-primary">{c.percentage}%</span>
              </div>

              <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(c.percentage, 100)}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-semibold text-foreground pt-1">
                <span>৳ {c.raised} raised</span>
                <span className="text-muted-foreground font-normal">of ৳ {c.target}</span>
              </div>
            </div>

            {/* Footer Metrics & Action */}
            <div className="pt-3 border-t border-border/50 flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <HeartHandshake className="w-3.5 h-3.5 text-primary" /> {c.beneficiaries} Helped
              </span>
              <Button
                size="sm"
                onClick={() => onDonateClick?.(c)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs font-bold gap-1 px-3"
              >
                Support <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedCampaigns;
