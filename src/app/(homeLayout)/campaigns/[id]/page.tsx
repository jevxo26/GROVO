"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Heart, Lock } from "lucide-react";
import { allCampaigns } from "../../../../data/landingpage/campaignsData";

export default function CampaignsDetailsPage() {
  const params = useParams();
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // URL parameters থেকে ID নেওয়া (ডিফল্ট "1" সিলেক্ট করা থাকবে)
  const id = params?.id ? String(params.id) : "1";
  
  // matching campaign ডাটা খোঁজা
  const campaign =
    allCampaigns.find((item) => String(item.id) === id) || allCampaigns[0];

  const presetAmounts = [500, 1000, 2000, 5000, 10000];

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount(amount.toString());
  };

  return (
    <main className="w-full bg-[#FCFBF7] min-h-screen text-gray-800">
      {/* 1. Hero Banner Section */}
      <section
        className="w-full aspect-16/6 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${campaign.image})` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="max-w-7xl mx-auto h-full px-6 py-12 relative z-10 flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#15803d] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded">
              {campaign.category}
            </span>
            {campaign.isUrgent && (
              <span className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Emergency
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white max-w-4xl font-serif leading-tight">
            {campaign.title}
          </h1>
        </div>
      </section>

      {/* 2. Main Body Content (2 Columns Layout) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Side: About, Stats, Supporters (2 Columns width on LG) */}
          <div className="lg:col-span-2 space-y-10">
            {/* About This Campaign */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-gray-900 mb-4">
                About This Campaign
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {campaign.description}
              </p>
            </div>

            {/* Campaign Progress Card */}
            <div className="bg-[#F6F4EB] p-6 sm:p-8 rounded-2xl space-y-6 border border-[#EBE7D8]">
              <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <p className="text-2xl sm:text-4xl font-extrabold text-[#15803d] font-serif">
                    {campaign.raised}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-semibold uppercase">
                    Raised
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-serif">
                    {campaign.goal}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-semibold uppercase">
                    Goal
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-4xl font-extrabold text-[#85A947] font-serif">
                    {campaign.beneficiaries || campaign.helpedCount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-semibold uppercase">
                    Beneficiaries
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-[#E5E0D0] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#15803d] h-full rounded-full transition-all duration-500"
                    style={{ width: `${campaign.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-semibold text-gray-600 pt-1">
                  <span className="text-[#15803d] font-bold">
                    {campaign.percentage}% Complete
                  </span>
                  <span>{campaign.daysLeft} days remaining</span>
                </div>
              </div>
            </div>

            {/* Recent Supporters */}
            <div>
              <h3 className="text-xl font-bold font-serif text-gray-900 mb-6">
                Recent Supporters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(campaign.recentSupporters || []).map((supporter) => (
                  <div
                    key={supporter.id}
                    className="flex items-center gap-3 bg-[#F6F4EB] p-4 rounded-xl border border-[#EBE7D8]"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#E3EEDD] flex items-center justify-center text-[#15803d] shrink-0">
                      <Heart className="w-4 h-4 fill-[#15803d]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {supporter.name}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        donated{" "}
                        <span className="font-bold text-[#15803d]">
                          {supporter.amount}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Donation Form Widget (1 Column width on LG) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-[#F6F4EB] p-6 sm:p-8 rounded-2xl border border-[#EBE7D8] space-y-6">
              <h3 className="text-lg font-bold font-serif text-gray-900">
                Make a Donation
              </h3>

              {/* Preset Amounts */}
              <div className="flex flex-wrap gap-2">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handlePresetClick(amt)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedPreset === amt
                        ? "bg-[#15803d] text-white shadow"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    BDT {amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  CUSTOM AMOUNT
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-semibold text-gray-400">
                    BDT
                  </span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPreset(null);
                    }}
                    className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 font-medium select-none">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#15803d] focus:ring-[#15803d]"
                />
                Donate anonymously
              </label>

              {/* Submit Button */}
              <button className="w-full bg-[#E2DEC9] hover:bg-[#d6d1b8] text-gray-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm">
                <Heart className="w-4 h-4 fill-gray-600 text-gray-600" />
                Proceed to Donate
              </button>

              {/* Footer text */}
              <p className="text-[11px] text-center text-gray-400 leading-relaxed flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 inline" />
                Secure payment powered by Stripe. 100% of your donation goes to
                this campaign.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}