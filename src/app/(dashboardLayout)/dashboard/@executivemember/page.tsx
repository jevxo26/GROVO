"use client";

import React from "react";
import { HandCoins, Flag, Award, Crown, Shield } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import UserWelcomeSection from "@/components/dashboard/UserWelcomeSection";
import SupportedCampaigns from "@/components/dashboard/SupportedCampaigns";
import RecentDonations from "@/components/dashboard/RecentDonations";
import QuickActions from "@/components/dashboard/QuickActions";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";

export default function ExecutiveMemberDashboardPage() {
  const { data: profileRes } = useGetUserProfileQuery();
  const user = profileRes?.data || profileRes;

  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Executive Member";
  const memberId = user?.membership?.[0]?.membershipCardNumber || user?.membershipCardNumber || "ASH-EX-2024-0012";

  const badges = [
    "Board Executive Member",
    "High Impact Patron",
    "Education Champion",
    "Emergency Relief Donor",
  ];

  const recentDonationsData = [
    { id: "REC-9921", title: "Sylhet Flood Emergency Appeal", date: "2026-07-28", amount: "৳ 15,000", status: "completed" },
    { id: "REC-9812", title: "Orphan Education Monthly Fund", date: "2026-07-01", amount: "৳ 5,000", status: "completed" },
    { id: "REC-9654", title: "Winter Relief Package Distribution", date: "2026-06-15", amount: "৳ 10,000", status: "completed" },
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
        memberSince="2023"
        memberId={memberId}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donated" value="৳ 1,50,000" change="Executive contribution" icon={HandCoins} />
        <StatCard title="Campaigns Supported" value="18" change="100% impact delivery" icon={Flag} />
        <StatCard title="Certificates Earned" value="8" change="Executive Board Honors" icon={Award} />
        <StatCard title="Membership Status" value="Executive Board" change="Active Executive" icon={Shield} />
      </div>

      {/* Badges Section */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Executive Committee Badges
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-3.5 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold tracking-wide"
            >
              👑 {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDonations title="Executive Contributions" donations={recentDonationsData} />
        <SupportedCampaigns title="Sponsored Programs" campaigns={supportedCampaignsData} />
      </div>

      {/* Quick Launch Hub */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">Executive Services</h3>
        <QuickActions actions={quickActionsData} />
      </div>
    </div>
  );
}
