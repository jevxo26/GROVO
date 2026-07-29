"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function CoordinatorCampaigns() {
  const [searchQuery, setSearchQuery] = useState("");

  const campaignsData = [
    {
      title: "Savar Flood Relief",
      code: "CAM-SAV-001",
      category: "Emergency Relief",
      status: "active",
      progress: 78,
      target: "৳ 200,000",
      donors: 340,
    },
    {
      title: "Education for Savar Children",
      code: "CAM-SAV-002",
      category: "Education",
      status: "active",
      progress: 65,
      target: "৳ 150,000",
      donors: 210,
    },
    {
      title: "Savar Food Security",
      code: "CAM-SAV-003",
      category: "Food",
      status: "active",
      progress: 89,
      target: "৳ 100,000",
      donors: 180,
    },
    {
      title: "Medical Camp Savar",
      code: "CAM-SAV-004",
      category: "Medical",
      status: "active",
      progress: 84,
      target: "৳ 80,000",
      donors: 145,
    },
  ];

  const filteredCampaigns = campaignsData.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Campaigns
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-lime-700"
          />
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCampaigns.map((camp, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {camp.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {camp.code} • {camp.category}
                </p>
              </div>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                {camp.status}
              </span>
            </div>

            {/* Progress Bar & Percentage in same row */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${camp.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-10 text-right">
                  {camp.progress}%
                </span>
              </div>
            </div>

            {/* Target & Donors below progress bar */}
            <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-medium text-slate-500 dark:text-slate-400">Target: {camp.target}</span>
              <span className="font-medium text-slate-600 dark:text-slate-300">{camp.donors} donors</span>
            </div>
          </div>
        ))}
        {filteredCampaigns.length === 0 && (
          <div className="col-span-2 text-center py-8 text-slate-400 text-sm">
            No campaigns found.
          </div>
        )}
      </div>
    </div>
  );
}