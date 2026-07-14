import React from 'react';

// ১. প্রপসের টাইপ ডিফাইন করুন
interface Campaign {
  title: string;
  percentage: number;
  raised: string | number;
  target: string | number;
  beneficiaries: number;
}

interface SupportedCampaignsProps {
  title?: string; // ঐচ্ছিক (optional)
  campaigns: Campaign[]; // এটি বাধ্যতামূলক
}

// ২. টাইপটি কম্পোনেন্টে অ্যাপ্লাই করুন
const SupportedCampaigns: React.FC<SupportedCampaignsProps> = ({ 
  title = "Active Projects", 
  campaigns = [] 
}) => {
  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <a href="#" className="text-sm text-[#8b4513] hover:underline">View All</a>
      </div>

      <div className="space-y-8">
        {campaigns.map((c, i) => (
          <div key={i}>
            <div className="flex justify-between items-end mb-2">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{c.title}</p>
              <span className="text-sm text-gray-600 dark:text-gray-300">{c.percentage}%</span>
            </div>
            
            <div className="w-full bg-[#f2efe9] dark:bg-[#2f2824] h-1.5 rounded-full mb-3">
              <div 
                className="bg-[#6d7946] h-1.5 rounded-full" 
                style={{ width: `${c.percentage}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ৳ {c.raised} / ৳ {c.target} · {c.beneficiaries} beneficiaries
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedCampaigns;