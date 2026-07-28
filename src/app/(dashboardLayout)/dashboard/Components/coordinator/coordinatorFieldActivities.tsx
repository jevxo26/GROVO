"use client";

import React from "react";
import { Check, Eye, MapPin } from "lucide-react";

export default function CoordinatorFieldActivities() {
  const activitiesData = [
    {
      title: "Flood damage assessment - Tetuljhora",
      volunteer: "Shahinur Rahman",
      location: "Tetuljhora, Savar",
      date: "2026-07-10",
      families: 45,
      expenses: "৳ 2500",
      status: "pending",
    },
    {
      title: "School visit - Education program check",
      volunteer: "Rokeya Begum",
      location: "Ashulia, Savar",
      date: "2026-07-08",
      families: 0,
      expenses: "৳ 1200",
      status: "verified",
    },
    {
      title: "Beneficiary verification - Medical needs",
      volunteer: "Kabir Hossain",
      location: "Dhamrai, Dhaka",
      date: "2026-07-05",
      families: 28,
      expenses: "৳ 800",
      status: "approved",
    },
    {
      title: "Water pump installation monitoring",
      volunteer: "Shahinur Rahman",
      location: "Ashulia, Savar",
      date: "2026-07-01",
      families: 0,
      expenses: "৳ 3500",
      status: "approved",
    },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Field Activities
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activitiesData.map((act, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {act.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {act.volunteer}
                </p>
              </div>
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider ${
                  act.status === "pending"
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                    : act.status === "verified"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                    : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                }`}
              >
                {act.status}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{act.location}</span>
              <span>•</span>
              <span>{act.date}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 text-center">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Families</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{act.families}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Expenses</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{act.expenses}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">
                <Check className="w-3.5 h-3.5" />
                Approve
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Eye className="w-3.5 h-3.5" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}