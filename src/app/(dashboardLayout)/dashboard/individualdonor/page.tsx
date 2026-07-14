"use client";
import React from "react";
import UserWelcomeSection from "../Components/UserWelcomeSection";
import { campaigns } from "@/data/campaigns";
import SupportedCampaigns from "../Components/SupportedCampaigns";
import { RecentDonations } from "../Components/RecentDonations";
import { donations } from "@/data/donations";
import { QuickActions } from "../Components/QuickActions";
import { StatCard } from "../corporate/components/StatCard";
import { CircleDollarSign, Coins, Flag, CornerUpRight } from 'lucide-react';
import { donoractions } from "@/data/quickActions";

// টাইপ ডিফিনিশন
type Badge = string;

const MemberDashboard: React.FC = () => {
  const badges: Badge[] = [
    "Early Supporter",
    "Monthly Donor",
    "Education Champion",
    "Emergency Responder",
  ];

  return (
    <div className="space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
      {/* Header Banner */}
      <UserWelcomeSection
        name="Kamal Hossain"
        memberSince="ASH-DON-2024-0847"
        memberId=""
        onDonationClick={() => console.log("Donation clicked!")}
        bgColor="bg-[#8b4513]"
      />

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="TOTAL DONATED"
          value="৳ 19,000"
          icon={CircleDollarSign}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Reward Points"
          value="2,450"
          icon={Coins}
          iconBg="bg-teal-100"
          iconColor="text-teal-700"
        />
        <StatCard
          title="Campaigns"
          value="4"
          icon={Flag}
          iconBg="bg-orange-100"
          iconColor="text-orange-700"
        />
        <StatCard
          title="Referrals"
          value="4"
          icon={CornerUpRight}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-700"
        />
      </section>

      {/* Badges Section */}
      <section>
        <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 tracking-wide text-sm">
          YOUR BADGES
        </h2>
        <div className="flex flex-wrap gap-3">
          {badges.map((badge: Badge) => (
            <span
              key={badge}
              className="px-4 py-2 bg-[#d1ede6] text-[#006d5b] rounded-full text-sm font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Recent Section */}
        <div className="grid grid-cols-1 py-8 md:grid-cols-2 gap-6">
          <RecentDonations title="Recent Donations" donations={donations} />
          {/* এখানে টাইপ এরর হবার কথা নয় যদি SupportedCampaigns-এ ইন্টারফেস সেট করা থাকে */}
          <SupportedCampaigns
            title="Supported Campaigns"
            campaigns={campaigns}
          />
        </div>

        <div>
          <QuickActions actions={donoractions} />
        </div>
      </section>
    </div>
  );
};

export default MemberDashboard;
