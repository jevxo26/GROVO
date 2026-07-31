"use client";

import React from "react";
import { ArrowRight, Layers, RefreshCw } from "lucide-react";
import { useGetCampaignCategoriesQuery } from "../../redux/api/campaignCategoriesApi";
import CampaignCard, { CampaignProps } from "../shared/CampaignCard";

const sampleCampaignsFallback: CampaignProps[] = [
  {
    id: "sample-1",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
    category: "EMERGENCY RELIEF",
    isUrgent: true,
    raised: "BDT 343K",
    goal: "BDT 500K",
    title: "Emergency Flood Relief – Sylhet Division",
    description: "Immediate aid for flood-affected families in Sylhet.",
    percentage: 69,
    daysLeft: 17,
    helpedCount: "12,500",
  },
  {
    id: "sample-2",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800",
    category: "EDUCATION",
    isUrgent: false,
    raised: "BDT 219K",
    goal: "BDT 350K",
    title: "Education for Every Child – Rural Schools Program",
    description: "Building schools and providing education for rural children.",
    percentage: 62,
    daysLeft: 155,
    helpedCount: "8,500",
  },
  {
    id: "sample-3",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800",
    category: "MEDICAL",
    isUrgent: false,
    raised: "BDT 156K",
    goal: "BDT 200K",
    title: "Free Medical Camp – Rural Health Access",
    description: "Free mobile medical camps in remote villages.",
    percentage: 78,
    daysLeft: 124,
    helpedCount: "6,200",
  },
];

export default function ActiveCampaignsSection() {
  // RTK Query hook for Campaign Categories
  const { data: categories = [], isLoading: categoriesLoading, isError, error } = useGetCampaignCategoriesQuery();

  // Log state data to console for developer verification
  console.log("=== ActiveCampaignsSection: RTK Query Data ===");
  console.log("RTK Query Categories state data:", categories);
  if (isError) {
    console.error("RTK Query Categories Error:", error);
  }

  // Display fetched database campaigns, or fall back to mock sample data if none exist yet
  const displayCampaigns = categories.length > 0 ? categories.slice(0, 3) : sampleCampaignsFallback;

  return (
    <section className="bg-[#FAF9F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#136139] bg-[#EAF5EF] px-2.5 py-1 rounded-md mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#136139]" />
              ACTIVE CAMPAIGNS
            </div>
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-serif">
              Where Your Help is <span className="text-[#136139]">Needed Most</span>
            </h2>
          </div>

          {/* Top Right Link */}
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#136139] hover:underline"
          >
            View All Campaigns
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Real-time Redux Verification Panel */}
        <div className="mt-12 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">
            Developer Console: RTK Query Fetch Verification
          </h4>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#136139]" />
                <span className="font-semibold text-gray-700">Campaigns (RTK Query)</span>
              </div>
              <span className="text-gray-500 font-bold">
                {categoriesLoading ? (
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-[#136139] animate-spin" />
                    Loading...
                  </span>
                ) : isError ? (
                  <span className="text-red-500">Error loading campaigns</span>
                ) : (
                  `${categories.length} loaded`
                )}
              </span>
            </div>

            {/* List the loaded categories */}
            {!categoriesLoading && !isError && categories.length > 0 && (
              <div className="p-3 bg-[#EAF5EF] text-[#136139] rounded-xl text-xs space-y-1">
                <p className="font-bold border-b border-[#136139]/10 pb-1 mb-1">Fetched Campaigns:</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span key={cat.id} className="bg-white/80 px-2 py-0.5 rounded font-medium shadow-sm">
                      {cat.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}