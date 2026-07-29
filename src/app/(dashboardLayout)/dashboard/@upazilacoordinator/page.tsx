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
    { title: "Emergency flood relief meeting", time: "2026-07-12 at 10:00 AM · Savar Upazila Office", badge: "high", badgeColor: "bg-emerald-100 text-emerald-700", icon: CalendarDays },
    { title: "Monthly volunteer training session", time: "2026-07-15 at 02:00 PM · Tetuljhora Community Center", badge: "medium", badgeColor: "bg-amber-100 text-amber-700", icon: BookOpen },
    { title: "Eid food package distribution", time: "2026-07-18 at 08:00 AM · All union centers", badge: "high", badgeColor: "bg-emerald-100 text-emerald-700", icon: Star },
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
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="space-y-2">
        <div className="text-sm text-slate-500 dark:text-slate-400">Home <span className="mx-1">›</span> {formattedPageName}</div>
        <div className="bg-[#587a0c] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-lime-100 font-medium">Jurisdiction</p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-0.5">Tetuljhora, Savar</h1>
            <p className="text-sm text-lime-100 mt-1">Dhaka District · Dhaka Division</p>
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
            <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 mb-2"><span className="text-[11px] font-bold tracking-wider">{item.label}</span><Icon className="w-4 h-4 text-lime-700" /></div>
              <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{item.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-slate-900 dark:text-white text-base">Recent Members</h2><span className="text-xs text-lime-700 font-medium cursor-pointer">View All</span></div>
            <div className="space-y-3">
              {recentMembers.map((m, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800 last:border-none">
                  <div><h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200">{m.name}</h3><p className="text-xs text-slate-500">{m.role}</p></div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase font-medium ${m.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-slate-900 dark:text-white text-base">Field Activities</h2><span className="text-xs text-lime-700 font-medium cursor-pointer">View All</span></div>
            <div className="space-y-3">
              {fieldActivities.map((act, i) => {
                const ActIcon = act.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-lg bg-[#f0f4e8] dark:bg-slate-900 text-lime-700 flex items-center justify-center shrink-0 shadow-sm"><ActIcon className="w-4 h-4" /></div>
                    <div className="overflow-hidden"><h3 className="text-xs font-semibold text-slate-900 dark:text-slate-200 leading-snug">{act.title}</h3><p className="text-[11px] text-slate-500 mt-0.5">{act.meta}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4"><h2 className="font-bold text-slate-900 dark:text-white text-base">Upcoming Events</h2><span className="text-xs text-lime-700 font-medium cursor-pointer">View All</span></div>
            <div className="space-y-3">
              {upcomingEvents.map((ev, i) => {
                const EvIcon = ev.icon;
                return (
                  <div key={i} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <EvIcon className="w-4 h-4 text-lime-700 shrink-0 mt-0.5" />
                        <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-200 leading-snug">{ev.title}</h3>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase shrink-0 ${ev.badgeColor}`}>{ev.badge}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 pl-6"><Calendar className="w-3 h-3" /> {ev.time}</p>
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
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:border-lime-700 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-[#f0f4e8] dark:bg-lime-950/50 text-lime-700 dark:text-lime-400 flex items-center justify-center group-hover:bg-lime-700 group-hover:text-white transition-colors shadow-sm"><ActionIcon className="w-6 h-6" /></div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-lime-700">{act.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
