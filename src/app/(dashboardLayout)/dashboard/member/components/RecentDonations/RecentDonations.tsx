import React from 'react';

interface Donation {
  title: string;
  date: string;
  id: string;
  amount: string;
  status: string;
}

const donations: Donation[] = [
  { title: "Emergency Flood Relief – Sylhet", date: "2026-07-08", id: "DON-2026-0847", amount: "৳ 5,000", status: "completed" },
  { title: "Education for Every Child", date: "2026-06-25", id: "DON-2026-0782", amount: "৳ 3,000", status: "completed" },
  { title: "Food Security – Daily Meals", date: "2026-06-15", id: "DON-2026-0691", amount: "৳ 2,500", status: "completed" },
  { title: "Free Medical Camp", date: "2026-05-20", id: "DON-2026-0603", amount: "৳ 1,500", status: "completed" },
];

export const RecentDonations = () => (
  // bg-white -> dark:bg-[#1a1716] এবং border বর্ডার ডার্ক মোডের জন্য আপডেট করা হয়েছে
  <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm transition-colors duration-300">
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-bold text-gray-900 dark:text-gray-100">Recent Donations</h2>
      <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">View All</a>
    </div>
    <div className="space-y-6">
      {donations.map((d, i) => (
        <div key={i} className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{d.title}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{d.date} · {d.id}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 dark:text-gray-100">{d.amount}</p>
            {/* স্ট্যাটাস ব্যাজের কালার ডার্ক মোডের জন্য কিছুটা পরিবর্তন করা হয়েছে */}
            <span className="text-[10px] bg-[#eef2ef] dark:bg-[#1b2a21] text-[#4a7c59] dark:text-[#6ba97e] px-2 py-0.5 rounded">
              {d.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);