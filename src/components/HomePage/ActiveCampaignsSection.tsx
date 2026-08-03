"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
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
  const allCampaigns = sampleCampaignsFallback;
  const displayCampaigns = allCampaigns.slice(0, 3);

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8 transition-colors">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider 
          text-primary bg-primary/10 
          px-2.5 py-1 rounded-md mb-3">
          
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          ACTIVE CAMPAIGNS
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-foreground">
          Where Your Help is{" "}
          <span className="text-primary">
            Needed Most
          </span>
        </h2>
      </div>

      {/* Link */}
      <a
        href="#"
        className="inline-flex items-center gap-1.5 text-xs font-bold 
        text-primary hover:underline"
      >
        View All Campaigns
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  </div>
</section>
  );
}