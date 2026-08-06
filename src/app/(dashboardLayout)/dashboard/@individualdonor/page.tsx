"use client";

import React from "react";
import { CircleDollarSign, Coins, Flag, CornerUpRight, Wallet, Award, Eye, Share2 } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import UserWelcomeSection from "@/components/dashboard/UserWelcomeSection";
import SupportedCampaigns from "@/components/dashboard/SupportedCampaigns";
import RecentDonations from "@/components/dashboard/RecentDonations";
import QuickActions from "@/components/dashboard/QuickActions";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";

export default function IndividualDonorDashboardPage() {
  const { data: profileRes } = useGetUserProfileQuery();
  const user = profileRes?.data || profileRes;
  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Donor";

  const badges = ["Early Supporter", "Monthly Donor", "Education Champion", "Emergency Responder"];

  const recentDonationsData = [
    { id: "DON-001", title: "Sylhet Flood Emergency Appeal", date: "2026-07-28", amount: "৳ 5,000", status: "completed" },
    { id: "DON-002", title: "Orphan Education Monthly Fund", date: "2026-07-01", amount: "৳ 2,500", status: "completed" },
    { id: "DON-003", title: "Winter Relief Package Drive", date: "2026-06-15", amount: "৳ 3,000", status: "completed" },
  ];

  const supportedCampaignsData = [
    { title: "Sylhet Emergency Flood Relief", percentage: 85, raised: "8,50,000", target: "10,000,000", beneficiaries: 12500 },
    { title: "Orphan Education Sponsorship", percentage: 62, raised: "3,10,000", target: "5,00,000", beneficiaries: 450 },
    { title: "Free Medical Camp", percentage: 90, raised: "4,50,000", target: "5,00,000", beneficiaries: 3200 },
  ];

  const quickActionsData = [
    { title: "My Wallet", desc: "Check reward points & transaction history", icon: Wallet, href: "/dashboard/wallet" },
    { title: "Make a Donation", desc: "Contribute to active humanitarian campaigns", icon: CircleDollarSign, href: "/dashboard/donations" },
    { title: "My Impact", desc: "See real-time usage tracker of your donations", icon: Eye, href: "/dashboard/impact" },
    { title: "Refer a Friend", desc: "Invite others and earn referral points", icon: Share2, href: "/dashboard/referal" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <UserWelcomeSection name={fullName} memberSince="2024" memberId="ASH-DON-2024-0847" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donated" value="৳ 19,000" change="All-time giving" icon={CircleDollarSign} />
        <StatCard title="Reward Points" value="2,450" change="Redeemable balance" icon={Coins} />
        <StatCard title="Campaigns Supported" value="4" change="Active campaigns" icon={Flag} />
        <StatCard title="Successful Referrals" value="4" change="+200 bonus pts" icon={CornerUpRight} />
      </div>

      {/* Badges */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Donor Achievement Badges
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {badges.map((badge) => (
            <span key={badge} className="px-3.5 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold tracking-wide">
              🎖 {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDonations title="My Recent Donations" donations={recentDonationsData} />
        <SupportedCampaigns title="Campaigns You Supported" campaigns={supportedCampaignsData} />
      </div>

      {/* Quick Launch */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">Donor Quick Services</h3>
        <QuickActions actions={quickActionsData} />
      </div>
    </div>
  );
}