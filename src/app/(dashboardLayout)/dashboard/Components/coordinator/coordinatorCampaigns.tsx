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
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Campaigns</span>
      </div>

      {/* Search Bar */}
      <div className="bg-card text-card-foreground p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
          />
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCampaigns.map((camp, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm space-y-4 transition-all hover:border-primary/40 group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-foreground text-base tracking-tight">
                  {camp.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {camp.code} • {camp.category}
                </p>
              </div>
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-primary/15 text-primary border border-primary/20">
                {camp.status}
              </span>
            </div>

            {/* Progress Bar & Percentage in same row */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-accent rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${camp.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-foreground w-10 text-right">
                  {camp.progress}%
                </span>
              </div>
            </div>

            {/* Target & Donors below progress bar */}
            <div className="flex justify-between items-center text-xs pt-2 border-t border-border">
              <span className="font-medium text-muted-foreground">Target: {camp.target}</span>
              <span className="font-medium text-foreground">{camp.donors} donors</span>
            </div>
          </div>
        ))}
        {filteredCampaigns.length === 0 && (
          <div className="col-span-2 text-center py-8 text-muted-foreground text-sm">
            No campaigns found.
          </div>
        )}
      </div>
    </div>
  );
}