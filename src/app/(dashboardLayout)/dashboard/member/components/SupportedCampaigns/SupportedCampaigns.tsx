import React from 'react';

interface Campaign {
  title: string;
  count: string;
  percentage: number;
  total: string;
}

const campaigns: Campaign[] = [
  { title: "Emergency Flood Relief – Sylhet", count: "3x", percentage: 68, total: "৳ 15,000" },
  { title: "Education for Every Child", count: "2x", percentage: 62, total: "৳ 6,000" },
  { title: "Food Security – Daily Meals", count: "3x", percentage: 89, total: "৳ 7,500" },
  { title: "Free Medical Camp", count: "1x", percentage: 78, total: "৳ 1,500" },
];

export const SupportedCampaigns = () => (
  <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm transition-colors duration-300">
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-bold text-gray-900 dark:text-gray-100">Supported Campaigns</h2>
      <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
        View All
      </a>
    </div>
    <div className="space-y-8">
      {campaigns.map((c, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800 dark:text-gray-200">{c.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.count}</p>
          </div>
          {/* প্রগ্রেস বার ব্যাকগ্রাউন্ড ডার্ক মোডের জন্য আপডেট করা হয়েছে */}
          <div className="w-full bg-gray-100 dark:bg-[#2f2824] h-2 rounded-full mb-1">
            <div
              className="bg-[#009688] h-2 rounded-full"
              style={{ width: `${c.percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs">
            <p className="text-gray-500 dark:text-gray-400">Total: {c.total}</p>
            <p className="font-bold text-gray-900 dark:text-gray-100">{c.percentage}%</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);