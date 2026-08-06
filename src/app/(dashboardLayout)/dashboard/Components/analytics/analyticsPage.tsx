"use client";

import { HandCoins, Users, UserCheck, HeartHandshake, Flag, Building2 } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import OverviewCharts from "@/components/dashboard/shared/OverviewCharts";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Donations Collected" value="৳ 1.25 Cr" change="+10.5% growth" icon={HandCoins} />
        <StatCard title="Total Foundation Members" value="48,500" change="+1.7% new members" icon={Users} />
        <StatCard title="Active Field Volunteers" value="3,200" change="64 Districts" icon={UserCheck} />
        <StatCard title="Beneficiaries Served" value="156,000" change="98.2% satisfied" icon={HeartHandshake} />
        <StatCard title="Humanitarian Campaigns" value="12 Active" change="3 Emergency" icon={Flag} />
        <StatCard title="Active Branch Network" value="42 Branches" change="100% operational" icon={Building2} />
      </div>

      {/* Main Analytics Charts */}
      <OverviewCharts />

      {/* Deep Analytics Modules Grid */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm">
        <h3 className="font-bold text-foreground text-base mb-4">Deep Business Intelligence & Analytics Slices</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            "Donations Analytics",
            "Campaigns Analytics",
            "Projects Analytics",
            "Volunteers Analytics",
            "Beneficiaries Analytics",
            "Branches Analytics",
            "Financial Analytics",
            "Memberships Analytics",
            "Users Analytics",
            "Security Audit Logs",
          ].map((box, i) => (
            <div
              key={i}
              className="p-4 text-center rounded-2xl border border-border/60 hover:border-primary/40 hover:bg-muted/40 transition-all cursor-pointer group"
            >
              <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {box.split(" ")[0]}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {box.split(" ").slice(1).join(" ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
