"use client";
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { allDonations } from '@/data/alldonation';

export const DonationTable = () => {
  const [filter, setFilter] = useState<'All' | 'One Time' | 'Monthly' | 'Quarterly'>('All');

  const filteredData = filter === 'All' 
    ? allDonations 
    : allDonations.filter(d => d.type === filter);

  const filters = ['All', 'One Time', 'Monthly', 'Quarterly'];

  return (
    <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-border shadow-sm transition-colors duration-300">
      {/* Filter Section */}
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === f 
                ? 'bg-[#a0522d] text-white dark:bg-orange-800' 
                : 'bg-gray-100 dark:bg-muted text-gray-600 dark:text-muted-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400 dark:text-muted-foreground border-b border-gray-100 dark:border-border">
            <tr>
              {['RECEIPT', 'CAMPAIGN', 'AMOUNT', 'TYPE', 'DATE', 'STATUS', 'ACTION'].map(h => (
                <th key={h} className="pb-4 px-2 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-border">
            {filteredData.map((d) => (
              <tr key={d.id} className="text-gray-700 dark:text-foreground">
                <td className="py-4 px-2">{d.id}</td>
                <td className="py-4 px-2 font-medium">{d.campaign}</td>
                <td className="py-4 px-2 font-bold">{d.amount}</td>
                <td className="py-4 px-2">{d.type}</td>
                <td className="py-4 px-2">{d.date}</td>
                <td className="py-4 px-2">
                  <span className="bg-[#eef2ef] dark:bg-emerald-950 text-[#4a7c59] dark:text-emerald-400 px-2 py-1 rounded text-[10px] font-bold">
                    {d.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-2 text-[#a0522d] dark:text-orange-400 flex items-center gap-1 cursor-pointer hover:underline">
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