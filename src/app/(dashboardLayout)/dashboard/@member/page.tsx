"use client";

import React from "react";
import { HandCoins, Flag, Award, Crown, Shield } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import UserWelcomeSection from "@/components/dashboard/UserWelcomeSection";
import SupportedCampaigns from "@/components/dashboard/SupportedCampaigns";
import RecentDonations from "@/components/dashboard/RecentDonations";
import QuickActions from "@/components/dashboard/QuickActions";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";

export default function MemberDashboardPage() {
  const { data: profileRes } = useGetUserProfileQuery();
  const user = profileRes?.data || profileRes;

  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Member";
  const memberId = user?.membership?.[0]?.membershipCardNumber || user?.membershipCardNumber || "ASH-MEM-2026-0847";

  const badges = [
    "Early Foundation Supporter",
    "Monthly Supporter",
    "Education Champion",
    "Emergency Relief Donor",
  ];

  const recentDonationsData = [
    { id: "REC-9921", title: "Sylhet Flood Emergency Appeal", date: "2026-07-28", amount: "৳ 5,000", status: "completed" },
    { id: "REC-9812", title: "Orphan Education Monthly Fund", date: "2026-07-01", amount: "৳ 2,500", status: "completed" },
    { id: "REC-9654", title: "Winter Relief Package Distribution", date: "2026-06-15", amount: "৳ 3,000", status: "completed" },
  ];

  const supportedCampaignsData = [
    { title: "Sylhet Emergency Flood Relief", percentage: 85, raised: "8,50,000", target: "10,000,000", beneficiaries: 12500 },
    { title: "Orphan Child Education Sponsorship", percentage: 62, raised: "3,10,000", target: "5,00,000", beneficiaries: 450 },
    { title: "Free Medical Camp & Medicine Distribution", percentage: 90, raised: "4,50,000", target: "5,00,000", beneficiaries: 3200 },
  ];

  const quickActionsData = [
    { title: "My Digital Card", desc: "View & print scannable QR membership pass", icon: Crown, href: "/dashboard/certificates" },
    { title: "Make a Donation", desc: "Support ongoing humanitarian appeals", icon: HandCoins, href: "/dashboard/donations" },
    { title: "Explore Campaigns", desc: "Discover active projects across Bangladesh", icon: Flag, href: "/dashboard/campaigns" },
    { title: "My Certificates", desc: "Download appreciation awards & badges", icon: Award, href: "/dashboard/certificates" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <UserWelcomeSection
        name={fullName}
        memberSince="2024"
        memberId={memberId}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donated" value="৳ 32,000" change="All-time contributions" icon={HandCoins} />
        <StatCard title="Campaigns Supported" value="12" change="100% impact delivery" icon={Flag} />
        <StatCard title="Certificates Earned" value="4" change="Verified badges" icon={Award} />
        <StatCard title="Membership Status" value="General Member" change="Active member" icon={Shield} />
      </div>

      {/* Badges Section */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Unlocked Foundation Badges
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-3.5 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold tracking-wide"
            >
              🏅 {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDonations title="My Recent Contributions" donations={recentDonationsData} />
        <SupportedCampaigns title="Campaigns You Supported" campaigns={supportedCampaignsData} />
      </div>

      {/* Quick Launch Hub */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">Quick Member Services</h3>
        <QuickActions actions={quickActionsData} />
      </div>
    </div>
  );
}