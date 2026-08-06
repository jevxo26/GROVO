"use client";

import React from "react";
import { LucideIcon, Users, UserCheck, HandCoins, Flag, HeartHandshake, TrendingUp, MapPin, Clock, CheckCircle2, Calendar, Building2, BarChart3, Truck, Folder, ShieldCheck } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";

interface CoordinatorOverviewProps {
  jurisdictionName: string;
  jurisdictionParent: string;
  pendingApprovals: number;
  stats?: { title: string; value: string | number; change: string; icon: LucideIcon }[];
}

const recentMembers = [
  { name: "Md. Rafiqul Islam", role: "General Member · Tetuljhora", status: "pending" },
  { name: "Nasrin Akhter", role: "General Member · Ashulia", status: "active" },
  { name: "Kabir Hossain", role: "Individual Donor · Dhamrai", status: "active" },
  { name: "Rokeya Begum", role: "General Member · Tetuljhora", status: "pending" },
  { name: "Shahinur Rahman", role: "Volunteer · Savar", status: "active" },
];

const fieldActivities = [
  { title: "Flood damage assessment - Tetuljhora", meta: "Shahinur Rahman · 2026-07-10", icon: Clock },
  { title: "School visit - Education program check", meta: "Rokeya Begum · 2026-07-08", icon: ShieldCheck },
  { title: "Beneficiary verification - Medical needs", meta: "Kabir Hossain · 2026-07-05", icon: CheckCircle2 },
  { title: "Water pump installation monitoring", meta: "Shahinur Rahman · 2026-07-01", icon: CheckCircle2 },
];

const upcomingEvents = [
  { title: "Emergency flood relief meeting", time: "2026-07-12 at 10:00 AM", priority: "high" },
  { title: "Monthly volunteer training session", time: "2026-07-15 at 02:00 PM", priority: "medium" },
  { title: "Eid food package distribution", time: "2026-07-18 at 08:00 AM", priority: "high" },
];

export default function CoordinatorOverview({
  jurisdictionName,
  jurisdictionParent,
  pendingApprovals,
  stats,
}: CoordinatorOverviewProps) {
  const defaultStats = [
    { title: "Members", value: "8,470", change: "In jurisdiction", icon: Users },
    { title: "Volunteers", value: "420", change: "Active field agents", icon: UserCheck },
    { title: "Donors", value: "2,150", change: "Monthly contributors", icon: HandCoins },
    { title: "Campaigns", value: "8", change: "Currently active", icon: Flag },
    { title: "Beneficiaries", value: "12,500", change: "Relief recipients", icon: HeartHandshake },
    { title: "Monthly Collection", value: "৳18.5L", change: "This month", icon: TrendingUp },
  ];

  const displayStats = stats || defaultStats;

  const quickActionsData = [
    { title: "Members", desc: "View & manage jurisdiction members", icon: Users },
    { title: "Volunteers", desc: "Track field agents & shifts", icon: UserCheck },
    { title: "Campaigns", desc: "Manage active campaigns", icon: Flag },
    { title: "Projects", desc: "Monitor humanitarian projects", icon: Folder },
    { title: "Distribution", desc: "Track relief distributions", icon: Truck },
    { title: "Analytics", desc: "Jurisdiction analytics & reports", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Jurisdiction Banner */}
      <div className="bg-primary text-primary-foreground p-6 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider opacity-80 font-medium flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> Jurisdiction
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-0.5">{jurisdictionName}</h1>
          <p className="text-sm opacity-80 mt-1">{jurisdictionParent}</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          {pendingApprovals} Pending Approvals
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {displayStats.map((stat, i) => (
          <StatCard key={i} title={stat.title} value={stat.value} change={stat.change} icon={stat.icon} />
        ))}
      </div>

      {/* Three Column Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Members */}
        <div className="bg-card text-card-foreground p-5 rounded-3xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-foreground text-base">Recent Members</h2>
            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            {recentMembers.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-none">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold ${
                    m.status === "active"
                      ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                  }`}
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Field Activities */}
        <div className="bg-card text-card-foreground p-5 rounded-3xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-foreground text-base">Field Activities</h2>
            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            {fieldActivities.map((act, i) => {
              const ActIcon = act.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ActIcon className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-xs font-semibold text-foreground leading-snug">{act.title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{act.meta}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-card text-card-foreground p-5 rounded-3xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-foreground text-base">Upcoming Events</h2>
            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((ev, i) => (
              <div key={i} className="p-3 rounded-2xl border border-border/50 bg-muted/30 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <h3 className="text-xs font-semibold text-foreground leading-snug">{ev.title}</h3>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase shrink-0 ${
                      ev.priority === "high"
                        ? "bg-red-500/10 text-red-600 border border-red-500/20"
                        : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                    }`}
                  >
                    {ev.priority}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground pl-6">{ev.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">Coordinator Quick Launch</h3>
        <QuickActions actions={quickActionsData} />
      </div>
    </div>
  );
}
