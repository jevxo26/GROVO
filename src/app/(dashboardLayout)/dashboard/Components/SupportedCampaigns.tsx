import React from 'react';

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

const SupportedCampaigns: React.FC<SupportedCampaignsProps> = ({ 
  title = "Active Projects", 
  campaigns = [] 
}) => {
  return (
    <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-border shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-900 dark:text-foreground">{title}</h2>
        <a href="#" className="text-sm text-[#8b4513] dark:text-orange-400 hover:underline">View All</a>
      </div>

      <div className="space-y-8">
        {campaigns.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between items-end mb-2">
              <p className="font-semibold text-gray-900 dark:text-foreground">{c.title}</p>
              <span className="text-sm text-gray-600 dark:text-muted-foreground">{c.percentage}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-muted h-1.5 rounded-full mb-3">
              <div 
                className="bg-[#6d7946] dark:bg-emerald-600 h-1.5 rounded-full" 
                style={{ width: `${c.percentage}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-muted-foreground">
              ৳ {c.raised} / ৳ {c.target} · {c.beneficiaries} beneficiaries
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedCampaigns;