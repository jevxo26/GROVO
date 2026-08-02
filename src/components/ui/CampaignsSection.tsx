"use client";

import React, { useState } from "react";
import CampaignCard from "../shared/CampaignCard";
import { categories, allCampaigns } from "../../data/landingpage/campaignsData"; // আপনার ডাটা ফাইলের সঠিক পথ দিন

export default function CampaignsSection() {
  const [activeTab, setActiveTab] = useState("All");

  // Filter campaigns based on selected active tab
  const filteredCampaigns =
    activeTab === "All"
      ? allCampaigns
      : allCampaigns.filter((item) => item.category === activeTab);

  return (
    <section className="w-full bg-[#fcfbf7] py-8 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-[#15803d] text-white shadow-md"
                    : "bg-[#f2eee3] text-[#3f5c22] hover:bg-[#e6e0d0] border border-[#e2decb]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-medium">
            No active campaigns found for &quot;{activeTab}&quot;.
          </div>
        )}

      </div>
    </section>
  );
}