"use client";
import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface Donation {
  id: string;
  campaign: string;
  amount: string;
  type: 'One Time' | 'Monthly';
  date: string;
  status: string;
}

// বর্ধিত ডেটা সেট
const allDonations: Donation[] = [
  { id: "DON-2026-0847", campaign: "Emergency Flood Relief – Sylhet", amount: "৳ 5,000", type: "One Time", date: "2026-07-08", status: "completed" },
  { id: "DON-2026-0782", campaign: "Education for Every Child", amount: "৳ 3,000", type: "One Time", date: "2026-06-25", status: "completed" },
  { id: "DON-2026-0691", campaign: "Food Security – Daily Meals", amount: "৳ 2,500", type: "Monthly", date: "2026-06-15", status: "completed" },
  { id: "DON-2026-0603", campaign: "Free Medical Camp", amount: "৳ 1,500", type: "One Time", date: "2026-05-20", status: "completed" },
  { id: "DON-2026-0512", campaign: "Winter Warmth Drive", amount: "৳ 2,000", type: "One Time", date: "2026-05-01", status: "completed" },
  { id: "DON-2026-0428", campaign: "Orphan Support Fund", amount: "৳ 5,000", type: "Monthly", date: "2026-04-15", status: "completed" },
  { id: "DON-2026-0341", campaign: "Education for Every Child", amount: "৳ 3,000", type: "One Time", date: "2026-03-10", status: "completed" },
  { id: "DON-2026-0255", campaign: "Emergency Flood Relief – Sylhet", amount: "৳ 10,000", type: "One Time", date: "2026-02-28", status: "completed" },
  { id: "DON-2026-0120", campaign: "Food Security – Daily Meals", amount: "৳ 2,500", type: "Monthly", date: "2026-01-15", status: "completed" },
];

export const DonationTable = () => {
  const [filter, setFilter] = useState<'All' | 'One Time' | 'Monthly'>('All');

  const filteredData = filter === 'All' 
    ? allDonations 
    : allDonations.filter(d => d.type === filter);

  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm transition-colors duration-300">
      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['All', 'One Time', 'Monthly'].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === f 
                ? 'bg-[#8b4513] text-white' 
                : 'bg-gray-100 dark:bg-[#2f2824] text-gray-600 dark:text-gray-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100 dark:border-[#2f2824]">
              {['RECEIPT', 'CAMPAIGN', 'AMOUNT', 'TYPE', 'DATE', 'STATUS', 'ACTION'].map((h, index) => (
                <th key={`${h}-${index}`} className="pb-4 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#2f2824]">
            {filteredData.map((d) => (
              <tr key={d.id} className="text-gray-900 dark:text-gray-200">
                <td className="py-4">{d.id}</td>
                <td className="py-4">{d.campaign}</td>
                <td className="py-4 font-bold">{d.amount}</td>
                <td className="py-4 text-gray-500">{d.type}</td>
                <td className="py-4 text-gray-500">{d.date}</td>
                <td className="py-4">
                  <span className="bg-[#eef2ef] dark:bg-[#1b2a21] text-[#4a7c59] dark:text-[#6ba97e] px-2 py-0.5 rounded text-xs">
                    {d.status}
                  </span>
                </td>
                <td className="py-4 text-[#009688] dark:text-[#6ba97e] flex items-center gap-1 cursor-pointer hover:underline">
                  <Download className="w-4 h-4" /> Download
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};