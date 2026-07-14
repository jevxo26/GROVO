import React from 'react';

// ডেটার ইন্টারফেস
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
  donations = [] 
}) => {
  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">View All</a>
      </div>
      
      <div className="space-y-6">
        {donations.map((d, i) => (
          <div key={d.id || i} className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{d.title}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{d.date} · {d.id}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900 dark:text-gray-100">{d.amount}</p>
              <span className="text-[10px] bg-[#eef2ef] dark:bg-[#1b2a21] text-[#4a7c59] dark:text-[#6ba97e] px-2 py-0.5 rounded capitalize">
                {d.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};