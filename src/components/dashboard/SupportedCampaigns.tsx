import React from "react";
import Link from "next/link";

interface Campaign {
  title: string;
  percentage: number;
  raised: string | number;
  target: string | number;
  beneficiaries: number;
}

interface SupportedCampaignsProps {
  title?: string;
  campaigns: Campaign[];
}

export const SupportedCampaigns: React.FC<SupportedCampaignsProps> = ({
  title = "Active Projects",
  campaigns = [],
}) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-[#136139] dark:text-foreground text-lg">{title}</h2>
        <Link href="/dashboard/campaigns" className="text-xs font-semibold text-[#136139] hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-6">
        {campaigns.map((c, i) => (
          <div key={i} className="p-3 rounded-xl border border-border/40 hover:bg-muted/30 transition-colors">
            <div className="flex justify-between items-end mb-2">
              <p className="font-semibold text-foreground text-sm">{c.title}</p>
              <span className="text-xs font-bold text-primary">{c.percentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted h-2 rounded-full mb-2.5 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${c.percentage}%` }}
              ></div>
            </div>

            <p className="text-xs text-muted-foreground">
              ৳ {c.raised} / ৳ {c.target} · {c.beneficiaries} beneficiaries
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedCampaigns;
