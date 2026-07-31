"use client";

import { ArrowRight } from "lucide-react";
import CampaignCard from "../shared/CampaignCard";
import { allCampaigns } from "../../data/landingpage/campaignsData"; // আপনার ডাটা ফাইলের সঠিক path দিন

export default function ActiveCampaignsSection() {
  // allCampaigns থেকে প্রথম ৩টি ডাটা নেওয়া হচ্ছে
  const displayCampaigns = allCampaigns.slice(0, 3);

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

        {/* Cards Grid - 3 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  );
}