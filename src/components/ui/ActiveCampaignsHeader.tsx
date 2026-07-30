"use client";

import React from "react";

export const ActiveCampaignsHeader: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfbf7] py-16 px-6 sm:px-12 lg:px-20 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex flex-col items-start space-y-4">
        
        {/* Active Campaigns Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e2decb] bg-[#f2eee3] text-[11px] font-bold tracking-wider uppercase text-[#3f5c22]">
          <span className="w-2 h-2 rounded-full bg-[#15803d]"></span>
          <span>ACTIVE CAMPAIGNS</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] leading-[1.15] max-w-2xl">
          Make an Impact with Your{" "}
          <span className="text-[#15803d]">Donation</span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-gray-500 text-base sm:text-lg max-w-xl font-normal leading-relaxed pt-1">
          Browse our active humanitarian campaigns and choose where your
          contribution creates the most meaningful change.
        </p>

      </div>
    </section>
  );
};

export default ActiveCampaignsHeader;