"use client";
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { allDonations } from '@/data/alldonation';

export const DonationTable = () => {
  const [filter, setFilter] = useState<'All' | 'One Time' | 'Monthly'>('All');

  const filteredData = filter === 'All' 
    ? allDonations 
    : allDonations.filter(d => d.type === filter);

  const filters = ['All', 'One Time', 'Monthly','Quarterly'];

  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm">
      {/* Filter Section */}
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === f ? 'bg-[#a0522d] text-white' : 'bg-gray-100 dark:bg-[#2f2824] text-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400 border-b border-gray-100 dark:border-[#2f2824]">
            <tr>
              {['RECEIPT', 'CAMPAIGN', 'AMOUNT', 'TYPE', 'DATE', 'STATUS', 'ACTION'].map(h => (
                <th key={h} className="pb-4 px-2 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((d) => (
              <tr key={d.id} className="text-gray-700 dark:text-gray-300">
                <td className="py-4 px-2">{d.id}</td>
                <td className="py-4 px-2 font-medium">{d.campaign}</td>
                <td className="py-4 px-2 font-bold">{d.amount}</td>
                <td className="py-4 px-2">{d.type}</td>
                <td className="py-4 px-2">{d.date}</td>
                <td className="py-4 px-2">
                  <span className="bg-[#eef2ef] text-[#4a7c59] px-2 py-1 rounded text-[10px] font-bold">
                    {d.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-2 text-[#a0522d] flex items-center gap-1 cursor-pointer hover:underline">
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