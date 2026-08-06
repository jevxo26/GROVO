"use client";

import { Users, UserCheck, Flag, HandCoins, HeartHandshake, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import OverviewCharts from "@/components/dashboard/shared/OverviewCharts";
import QuickActions from "@/components/dashboard/QuickActions";

export default function NationalAdminOverviewPage() {
  const quickActions = [
    { title: "Manage Members", desc: "View, verify & approve memberships", icon: Users },
    { title: "Volunteer Roster", desc: "Track shifts & performance scores", icon: UserCheck },
    { title: "Active Campaigns", desc: "Manage emergency appeals & goals", icon: Flag },
    { title: "Donation Ledger", desc: "Track bKash, Nagad & Stripe logs", icon: HandCoins },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Members" value="48,500" change="+847 this month" icon={Users} />
        <StatCard title="Volunteers" value="3,200" change="2,890 active" icon={UserCheck} />
        <StatCard title="Campaigns" value="6" change="12 total" icon={Flag} />
        <StatCard title="Donations" value="1.25 Cr" change="+324k this month" icon={HandCoins} />
        <StatCard title="Beneficiaries" value="156,000" change="All time" icon={HeartHandshake} />
        <StatCard title="Pending" value="156" change="Needs review" isPositive={false} icon={Clock} />
      </div>

      {/* Overview Charts */}
      <OverviewCharts />

      {/* Quick Action Hub */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">National Executive Quick Launch</h3>
        <QuickActions actions={quickActions} />
      </div>
    </div>
  );
}
