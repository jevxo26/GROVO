import React from "react";
import Link from "next/link";

interface Donation {
  id: string;
  title: string;
  date: string;
  amount: string;
  status: string;
}

interface RecentDonationsProps {
  title?: string;
  donations: Donation[];
}

export const RecentDonations: React.FC<RecentDonationsProps> = ({
  title = "Recent Donations",
  donations = [],
}) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-[#136139] dark:text-foreground text-lg">{title}</h2>
        <Link href="/dashboard/donations" className="text-xs font-semibold text-[#136139] hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {donations.map((d, i) => (
          <div key={d.id || i} className="flex justify-between items-center p-3 rounded-xl hover:bg-muted/50 transition-colors border border-border/40">
            <div>
              <p className="font-semibold text-foreground text-sm">{d.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{d.date} · <span className="font-mono">{d.id}</span></p>
            </div>
            <div className="text-right">
              <p className="font-bold text-foreground text-sm">{d.amount}</p>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold capitalize inline-block mt-0.5">
                {d.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDonations;
