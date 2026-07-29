"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function CoordinatorDonors() {
  const [searchQuery, setSearchQuery] = useState("");

  const donorsData = [
    { name: "Kamal Hossain", receipt: "DON-2026-0847", campaign: "Emergency Flood Relief", amount: "৳ 5,000", type: "One Time", date: "2026-07-08" },
    { name: "Rahim Industries", receipt: "DON-2026-0846", campaign: "Education Program", amount: "৳ 50,000", type: "One Time", date: "2026-07-08" },
    { name: "Fatima Rahman", receipt: "DON-2026-0845", campaign: "Food Security", amount: "৳ 2,500", type: "Monthly", date: "2026-07-07" },
    { name: "Anonymous", receipt: "DON-2026-0844", campaign: "Orphan Support", amount: "৳ 15,000", type: "One Time", date: "2026-07-07" },
    { name: "Syed Corp Ltd.", receipt: "DON-2026-0843", campaign: "Emergency Flood Relief", amount: "৳ 100,000", type: "One Time", date: "2026-07-06" },
    { name: "Nasrin Akhter", receipt: "DON-2026-0842", campaign: "Medical Camp", amount: "৳ 1,500", type: "One Time", date: "2026-07-06" },
    { name: "Hasan Mahmud", receipt: "DON-2026-0841", campaign: "Winter Warmth", amount: "৳ 2,000", type: "One Time", date: "2026-07-05" },
    { name: "Ayesha Siddiqua", receipt: "DON-2026-0840", campaign: "Education Program", amount: "৳ 3,500", type: "Monthly", date: "2026-07-05" },
  ];

  const filteredDonors = donorsData.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.receipt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Donors
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Donors</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">2,150</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Collection</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">৳ 18.5L</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recent Total</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">৳ 179,500</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search donors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-lime-700"
          />
        </div>
      </div>

      {/* Donors Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-3.5 px-6">Donor</th>
                <th className="py-3.5 px-6">Receipt No.</th>
                <th className="py-3.5 px-6">Campaign</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredDonors.map((donor, index) => (
                <tr key={index} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">{donor.name}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-mono text-xs">{donor.receipt}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{donor.campaign}</td>
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">{donor.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                      donor.type === "Monthly" 
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400" 
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}>
                      {donor.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{donor.date}</td>
                </tr>
              ))}
              {filteredDonors.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 text-sm">No donors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}