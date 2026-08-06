"use client";

import React from "react";
import { DollarSign, Users, User, PieChart, FileText, FolderKanban, BarChart3, Building2 } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import UserWelcomeSection from "@/components/dashboard/UserWelcomeSection";
import SupportedCampaigns from "@/components/dashboard/SupportedCampaigns";
import RecentDonations from "@/components/dashboard/RecentDonations";
import QuickActions from "@/components/dashboard/QuickActions";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";

export default function CorporateDashboardPage() {
  const { data: profileRes } = useGetUserProfileQuery();
  const user = profileRes?.data || profileRes;
  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Corporate Partner";

  const badges = ["Corporate Partner", "Matching Donor", "Platinum CSR"];

  const recentDonationsData = [
    { id: "CSR-001", title: "Education Infrastructure Fund", date: "2026-07-20", amount: "৳ 2,50,000", status: "completed" },
    { id: "CSR-002", title: "Employee Matching Program", date: "2026-07-01", amount: "৳ 1,00,000", status: "completed" },
    { id: "CSR-003", title: "Winter Relief Corporate Drive", date: "2026-06-15", amount: "৳ 50,000", status: "completed" },
  ];

  const supportedCampaignsData = [
    { title: "Rural School Building Program", percentage: 75, raised: "15,00,000", target: "20,00,000", beneficiaries: 3000 },
    { title: "Clean Water Initiative", percentage: 45, raised: "4,50,000", target: "10,00,000", beneficiaries: 8000 },
    { title: "Women Empowerment Skills Training", percentage: 90, raised: "9,00,000", target: "10,00,000", beneficiaries: 1200 },
  ];

  const quickActionsData = [
    { title: "CSR Sponsorship", desc: "Create new corporate sponsorship contribution", icon: DollarSign, href: "/dashboard/donations" },
    { title: "Sponsored Projects", desc: "View humanitarian projects your company funds", icon: FolderKanban, href: "/dashboard/projects" },
    { title: "Impact Reports", desc: "Download CSR executive impact reports", icon: FileText, href: "/dashboard/reports" },
    { title: "Company Analytics", desc: "View CSR budget utilization & metrics", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <UserWelcomeSection name={fullName} memberSince="2023" memberId="ASH-CORP-2023-001" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total CSR Donated" value="৳ 10.3L" change="Annual corporate giving" icon={DollarSign} />
        <StatCard title="Employee Matching" value="৳ 300K" change="Matched contributions" icon={Users} />
        <StatCard title="Participating Employees" value="450" change="Active corporate donors" icon={User} />
        <StatCard title="CSR Budget Utilized" value="52%" change="৳ 20L allocated" icon={PieChart} />
      </div>

      {/* Badges */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Corporate CSR Badges</h3>
        <div className="flex flex-wrap gap-2.5">
          {badges.map((badge) => (
            <span key={badge} className="px-3.5 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold tracking-wide">
              🏢 {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDonations title="Corporate Contributions" donations={recentDonationsData} />
        <SupportedCampaigns title="Sponsored Programs" campaigns={supportedCampaignsData} />
      </div>

      {/* Quick Launch */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">Corporate Quick Services</h3>
        <QuickActions actions={quickActionsData} />
      </div>
    </div>
  );
}
