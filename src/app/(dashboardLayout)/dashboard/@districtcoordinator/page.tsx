"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Users,
  UserCheck,
  HandCoins,
  Flag,
  HeartHandshake,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  FolderKanban,
  BarChart3,
  AlertCircle,
  BookmarkCheck,
  Star,
  Truck,
  Folder,
  ShieldCheck,
  CalendarDays,
  Book,
  BookOpen,
} from "lucide-react";

export default function DashboardOverview() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const formattedPageName = segments.length > 1 ? segments[1].charAt(0).toUpperCase() + segments[1].slice(1) : "Coordinator Dashboard";

  const stats = [
    { label: "MEMBERS", value: "8,470", icon: Users },
    { label: "VOLUNTEERS", value: "420", icon: UserCheck },
    { label: "DONORS", value: "2,150", icon: HandCoins },
    { label: "CAMPAIGNS", value: "8", icon: Flag },
    { label: "BENEFICIARIES", value: "12,500", icon: HeartHandshake },
    { label: "MONTHLY", value: "৳18.5L", icon: TrendingUp },
  ];

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
    { title: "Emergency flood relief meeting", time: "2026-07-12 at 10:00 AM · Savar Upazila Office", badge: "high", badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900", icon: CalendarDays },
    { title: "Monthly volunteer training session", time: "2026-07-15 at 02:00 PM · Tetuljhora Community Center", badge: "medium", badgeColor: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900", icon: BookOpen },
    { title: "Eid food package distribution", time: "2026-07-18 at 08:00 AM · All union centers", badge: "high", badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900", icon: Star },
  ];

  const quickActions = [
    { name: "Members", icon: Users },
    { name: "Volunteers", icon: UserCheck },
    { name: "Campaigns", icon: Flag },
    { name: "Projects", icon: Folder },
    { name: "Distribution", icon: Truck },
    { name: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <span>Home</span> <span>›</span> <span className="text-foreground font-medium">{formattedPageName}</span>
        </div>
        <div className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary-foreground/80 font-medium">Jurisdiction</p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-0.5">Tetuljhora, Savar</h1>
            <p className="text-sm text-primary-foreground/80 mt-1">Dhaka District · Dhaka Division</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> 34 Pending Approvals
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-card text-card-foreground p-4 rounded-xl border border-border shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-2">
                <span className="text-[11px] font-bold tracking-wider">{item.label}</span>
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-foreground">{item.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-foreground text-base">Recent Members</h2>
              <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-3">
              {recentMembers.map((m, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-none">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase font-medium border ${
                    m.status === "active" 
                      ? "bg-primary/15 text-primary border-primary/20" 
                      : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900"
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-foreground text-base">Field Activities</h2>
              <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-3">
              {fieldActivities.map((act, i) => {
                const ActIcon = act.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-accent/40 border border-border">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0 shadow-xs">
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
        </div>

        <div className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-foreground text-base">Upcoming Events</h2>
              <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((ev, i) => {
                const EvIcon = ev.icon;
                return (
                  <div key={i} className="p-3 rounded-xl border border-border bg-accent/40 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <EvIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <h3 className="text-xs font-semibold text-foreground leading-snug">{ev.title}</h3>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase shrink-0 border ${ev.badgeColor}`}>{ev.badge}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 pl-6">
                      <Calendar className="w-3 h-3" /> {ev.time}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
        {quickActions.map((act, i) => {
          const ActionIcon = act.icon;
          return (
            <div key={i} className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:border-primary transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-xs">
                <ActionIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{act.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}