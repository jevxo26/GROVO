"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Heart, Lock } from "lucide-react";
import { allCampaigns } from "../../../../data/landingpage/campaignsData";

export default function CampaignsDetailsPage() {
const params = useParams();
const [customAmount, setCustomAmount] = useState("");
const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

const id = params?.id ? String(params.id) : "1";

const campaign =
allCampaigns.find((item) => String(item.id) === id) || allCampaigns[0];

const presetAmounts = [500, 1000, 2000, 5000, 10000];

const handlePresetClick = (amount: number) => {
setSelectedPreset(amount);
setCustomAmount(amount.toString());
};

return ( <main className="w-full bg-background min-h-screen text-foreground">
  {/* Hero Section */}
  <section
    className="w-full aspect-[16/6] bg-cover bg-center relative"
    style={{ backgroundImage: `url(${campaign.image})` }}
  >
    <div className="absolute inset-0 bg-black/60" />

    <div className="max-w-7xl mx-auto h-full px-6 py-12 relative z-10 flex flex-col justify-end">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-primary text-primary-foreground text-xs sm:text-sm font-bold px-3 py-1 rounded">
          {campaign.category}
        </span>

        {campaign.isUrgent && (
          <span className="inline-flex items-center gap-1.5 bg-destructive text-destructive-foreground text-xs sm:text-sm font-bold px-3 py-1 rounded">
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

  {/* Main Section */}
  <section className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* Left Side */}
      <div className="lg:col-span-2 space-y-10">

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-4">
            About This Campaign
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {campaign.description}
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl space-y-6 border border-border">
          
          <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-primary font-serif">
                {campaign.raised}
              </p>
              <p className="text-xs text-muted-foreground mt-1 uppercase">
                Raised
              </p>
            </div>

            <div>
              <p className="text-2xl sm:text-4xl font-extrabold font-serif">
                {campaign.goal}
              </p>
              <p className="text-xs text-muted-foreground mt-1 uppercase">
                Goal
              </p>
            </div>

            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-chart-2 font-serif">
                {campaign.beneficiaries || campaign.helpedCount}
              </p>
              <p className="text-xs text-muted-foreground mt-1 uppercase">
                Beneficiaries
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${campaign.percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-xs font-semibold text-muted-foreground pt-1">
              <span className="text-primary font-bold">
                {campaign.percentage}% Complete
              </span>
              <span>{campaign.daysLeft} days remaining</span>
            </div>
          </div>
        </div>

        {/* Supporters */}
        <div>
          <h3 className="text-xl font-bold font-serif mb-6">
            Recent Supporters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(campaign.recentSupporters || []).map((supporter) => (
              <div
                key={supporter.id}
                className="flex items-center gap-3 bg-card p-4 rounded-xl border border-border"
              >
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-primary">
                  <Heart className="w-4 h-4 fill-primary" />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {supporter.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    donated{" "}
                    <span className="font-bold text-primary">
                      {supporter.amount}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div>
        <div className="sticky top-6 bg-card p-6 sm:p-8 rounded-2xl border border-border space-y-6">
          
          <h3 className="text-lg font-bold font-serif">
            Make a Donation
          </h3>

          {/* Preset */}
          <div className="flex flex-wrap gap-2">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handlePresetClick(amt)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedPreset === amt
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border hover:bg-accent"
                }`}
              >
                BDT {amt.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Input */}
          <div>
            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-2">
              Custom Amount
            </label>

            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs text-muted-foreground">
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
                className="w-full pl-12 pr-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" className="accent-primary" />
            Donate anonymously
          </label>

          {/* Button */}
          <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 text-sm">
            <Heart className="w-4 h-4 fill-current" />
            Proceed to Donate
          </button>

          {/* Footer */}
          <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secure payment powered by Stripe.
          </p>
        </div>
      </div>

    </div>
  </section>
</main>
);
}
