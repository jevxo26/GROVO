"use client";

import React from "react";
import { Users, UserCheck, HandCoins, Flag } from "lucide-react";

export default function CoordinatorAnalytics() {
  const statsCards = [
    { title: "MEMBERS GROWTH", value: "+8,470", subtitle: "YTD 2026", icon: Users },
    { title: "VOLUNTEER RATE", value: "5.0%", subtitle: "Active volunteers", icon: UserCheck },
    { title: "AVG DONATION", value: "৳ 860", subtitle: "Per donor monthly", icon: HandCoins },
    { title: "CAMPAIGN SUCCESS", value: "75%", subtitle: "Target achieved", icon: Flag },
  ];

  const monthlyData = [
    { month: "Jan", height: "60%" },
    { month: "Feb", height: "65%" },
    { month: "Mar", height: "70%" },
    { month: "Apr", height: "55%" },
    { month: "May", height: "68%" },
    { month: "Jun", height: "80%" },
    { month: "Jul", height: "50%" },
  ];

  const campaignProgress = [
    { title: "Savar Flood Relief", progress: 78 },
    { title: "Education for Savar Children", progress: 65 },
    { title: "Savar Food Security", progress: 89 },
    { title: "Medical Camp Savar", progress: 84 },
  ];

  const volunteerPerformance = [
    { name: "Shahinur Rahman", score: 88 },
    { name: "Rokeya Begum", score: 82 },
    { name: "Kabir Hossain", score: 75 },
    { name: "Fatema Khatun", score: 0 },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Analytics
      </div>

      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{card.title}</div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{card.value}</div>
              <div className="text-xs text-slate-400">{card.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Monthly Member Registration Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Monthly Member Registration</h3>
        <div className="h-48 flex items-end justify-between gap-2 pt-6 px-4 border-b border-slate-100 dark:border-slate-800">
          {monthlyData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full max-w-[40px] bg-lime-600 rounded-t-lg transition-all duration-500 hover:bg-lime-500"
                style={{ height: item.height }}
              ></div>
              <span className="text-xs font-semibold text-slate-400 pb-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Two Sections: Campaign Progress & Volunteer Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campaign Progress */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Campaign Progress</h3>
          <div className="space-y-4 pt-2">
            {campaignProgress.map((camp, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{camp.title}</span>
                  <span className="text-slate-500">{camp.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-lime-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${camp.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Performance */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Volunteer Performance</h3>
          <div className="space-y-4 pt-2">
            {volunteerPerformance.map((vol, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">{vol.name}</span>
                  <span className="text-slate-500">{vol.score} / 100</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-green-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${vol.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}