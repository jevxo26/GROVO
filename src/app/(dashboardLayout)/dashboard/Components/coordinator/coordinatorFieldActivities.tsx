"use client";

import React, { useState } from "react";
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
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Field Activities</span>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activitiesData.map((act, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm space-y-4 transition-all hover:border-primary/40 group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-foreground text-base tracking-tight">
                  {act.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {act.volunteer}
                </p>
              </div>
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider border ${
                  act.status === "pending"
                    ? "bg-accent text-accent-foreground border-border"
                    : act.status === "verified"
                    ? "bg-accent text-muted-foreground border-border"
                    : "bg-primary/15 text-primary border-primary/20"
                }`}
              >
                {act.status}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{act.location}</span>
              <span>•</span>
              <span>{act.date}</span>
            </div>

            {/* Separate Cards for Families & Expenses */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-accent/40 p-3 rounded-xl text-center border border-border">
                <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Families</div>
                <div className="text-sm font-bold text-foreground mt-0.5">{act.families}</div>
              </div>
              <div className="bg-accent/40 p-3 rounded-xl text-center border border-border">
                <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Expenses</div>
                <div className="text-sm font-bold text-foreground mt-0.5">{act.expenses}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm cursor-pointer">
                <Check className="w-3.5 h-3.5" />
                Approve
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer">
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