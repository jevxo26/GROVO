"use client";

import React from "react";
import { Flag, HeartHandshake, Award, Target } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import SupportedCampaigns from "@/components/dashboard/SupportedCampaigns";

const campaignsData = [
  { title: "Emergency Flood Relief – Sylhet", percentage: 68, raised: "15,000", target: "25,000", beneficiaries: 12500 },
  { title: "Education for Every Child", percentage: 62, raised: "6,000", target: "10,000", beneficiaries: 450 },
  { title: "Food Security – Daily Meals", percentage: 89, raised: "7,500", target: "10,000", beneficiaries: 3200 },
  { title: "Free Medical Camp & Medicine Drive", percentage: 78, raised: "1,500", target: "2,000", beneficiaries: 1500 },
  { title: "Orphan Support Fund", percentage: 44, raised: "15,000", target: "35,000", beneficiaries: 200 },
  { title: "Winter Warmth Blanket Drive", percentage: 59, raised: "3,500", target: "6,000", beneficiaries: 800 },
];

export default function MemberCampaignsPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Campaigns" value={campaignsData.length} change="In progress" icon={Flag} />
        <StatCard title="Total Impacted" value="18,650" change="Beneficiaries" icon={HeartHandshake} />
        <StatCard title="Funding Progress" value="66.5%" change="Average raised" icon={Target} />
        <StatCard title="My Contributions" value="৳ 48,500" change="Across 6 projects" icon={Award} />
      </div>

      {/* Campaign Cards Grid */}
      <SupportedCampaigns title="Explore & Support Active Appeals" campaigns={campaignsData} />
    </div>
  );
}