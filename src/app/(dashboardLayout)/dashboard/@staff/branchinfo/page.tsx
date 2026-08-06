"use client";

import React from "react";
import { Building2, MapPin, Phone, Clock, Users, Shield } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import { Progress } from "@/components/ui/progress";

const budgetItems = [
  { name: "Program Expenses", amount: "৳ 1,20,000", used: 72, total: "৳ 1,65,000" },
  { name: "Admin & Overhead", amount: "৳ 35,000", used: 58, total: "৳ 60,000" },
  { name: "Emergency Reserve", amount: "৳ 80,000", used: 40, total: "৳ 2,00,000" },
  { name: "Event & Outreach", amount: "৳ 22,000", used: 88, total: "৳ 25,000" },
];

export default function StaffBranchInfoPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Branch Code" value="HQ-DHK-001" change="National Headquarters" icon={Building2} />
        <StatCard title="Staff Count" value="24 Active" change="3 departments" icon={Users} />
        <StatCard title="Operating Hours" value="9 AM - 5 PM" change="Sun - Thu" icon={Clock} />
        <StatCard title="Security Level" value="Tier 1" change="CCTV + Biometric" icon={Shield} />
      </div>

      {/* Branch Details Card */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm space-y-4">
        <h3 className="font-bold text-foreground text-base flex items-center gap-2 border-b border-border/50 pb-3">
          <Building2 className="w-5 h-5 text-primary" /> Branch Contact & Location Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground flex items-center gap-2"><Building2 className="w-4 h-4" /> Branch Name:</span>
              <span className="font-semibold text-foreground">Ashray Foundation National HQ</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" /> Address:</span>
              <span className="font-semibold text-foreground">Savar, Dhaka-1340</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground flex items-center gap-2"><Phone className="w-4 h-4" /> Contact:</span>
              <span className="font-semibold text-foreground">+880 2-7742000</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Manager:</span>
              <span className="font-semibold text-foreground">Ayesha Siddiqua</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-semibold text-foreground">Administration</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-bold text-emerald-600 text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 uppercase">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Utilization */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm space-y-5">
        <h3 className="font-bold text-foreground text-base border-b border-border/50 pb-3">
          Monthly Budget Utilization
        </h3>
        <div className="space-y-5">
          {budgetItems.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">{item.name}</span>
                <div className="flex gap-2">
                  <span className="font-bold text-foreground">{item.amount}</span>
                  <span className="text-muted-foreground text-xs">/ {item.total}</span>
                </div>
              </div>
              <Progress value={item.used} className="h-2 bg-muted [&>div]:bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}