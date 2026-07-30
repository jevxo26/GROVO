"use client";

import React, { useState } from "react";
import CampaignCard, { CampaignProps } from "../shared/CampaignCard";

const categories = [
  "All",
  "Emergency Relief",
  "Education",
  "Medical",
  "Food",
  "Winter Relief",
  "Orphan Support",
];

const allCampaigns: CampaignProps[] = [
  {
    id: "1",
    title: "Emergency Flood Relief – Sylhet Division",
    description:
      "Providing immediate food, clean water, shelter materials, and medical aid to families affected by severe flooding.",
    category: "Emergency Relief",
    isUrgent: true,
    raised: "BDT 343K",
    goal: "BDT 500K",
    percentage: 68,
    daysLeft: 12,
    helpedCount: "1.2k+",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Education for Every Child – Rural Schools Program",
    description:
      "Building classrooms, providing textbooks, school supplies, and scholarships for underprivileged rural students.",
    category: "Education",
    raised: "BDT 219K",
    goal: "BDT 350K",
    percentage: 62,
    daysLeft: 24,
    helpedCount: "850+",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Free Medical Camp – Rural Health Access",
    description:
      "Setting up mobile medical camps in remote villages to provide free checkups, medicines, and basic healthcare.",
    category: "Medical",
    raised: "BDT 156K",
    goal: "BDT 200K",
    percentage: 78,
    daysLeft: 8,
    helpedCount: "3.4k+",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Nutritious Food Packages for Families",
    description:
      "Distributing monthly dry ration food packs containing rice, lentils, oil, and essentials to needy households.",
    category: "Food",
    raised: "BDT 90K",
    goal: "BDT 150K",
    percentage: 60,
    daysLeft: 15,
    helpedCount: "500+",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Winter Warmth Campaign – Warm Clothes",
    description:
      "Distributing heavy blankets and warm winter clothing to cold-stricken northern districts of Bangladesh.",
    category: "Winter Relief",
    raised: "BDT 110K",
    goal: "BDT 250K",
    percentage: 44,
    daysLeft: 18,
    helpedCount: "920+",
    image:
      "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Orphan Education & Support Fund",
    description:
      "Sponsoring living costs, accommodation, healthcare, and formal education for orphaned children.",
    category: "Orphan Support",
    raised: "BDT 280K",
    goal: "BDT 400K",
    percentage: 70,
    daysLeft: 30,
    helpedCount: "150+",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1000&auto=format&fit=crop",
  },
];

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