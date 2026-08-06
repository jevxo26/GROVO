"use client";

import React from "react";
import { FolderKanban, CheckCircle, Clock, Target, Building2 } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import { Progress } from "@/components/ui/progress";

const corporateProjects = [
  { id: "1", name: "Rural School Building Project", partner: "Grameen Telecom", category: "Education", budget: "৳ 20,00,000", raised: "৳ 15,00,000", progress: 75, status: "active" },
  { id: "2", name: "Clean Water Initiative", partner: "Unilever Bangladesh", category: "WASH", budget: "৳ 10,00,000", raised: "৳ 4,50,000", progress: 45, status: "active" },
  { id: "3", name: "Women Empowerment Program", partner: "BRAC Bank CSR", category: "Livelihood", budget: "৳ 10,00,000", raised: "৳ 9,00,000", progress: 90, status: "active" },
  { id: "4", name: "Solar Powered Health Center", partner: "Chevron CSR", category: "Healthcare", budget: "৳ 25,00,000", raised: "৳ 25,00,000", progress: 100, status: "completed" },
];

export default function CorporateProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="CSR Projects" value={corporateProjects.length} change="Sponsored programs" icon={FolderKanban} />
        <StatCard title="Active Funded" value={corporateProjects.filter((p) => p.status === "active").length} change="In execution" icon={Clock} />
        <StatCard title="Completed Projects" value={corporateProjects.filter((p) => p.status === "completed").length} change="Fully delivered" icon={CheckCircle} />
        <StatCard title="Total Committed" value="৳ 65.0L" change="Multi-year grants" icon={Target} />
      </div>

      {/* Corporate Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {corporateProjects.map((p) => (
          <div key={p.id} className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  {p.category}
                </span>
                <h3 className="font-bold text-foreground text-base mt-2">{p.name}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5" /> Corporate Partner: {p.partner}
                </p>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${p.status === "completed" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-blue-500/10 text-blue-600 border border-blue-500/20"}`}>
                {p.status}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Budget Progress</span>
                <span className="text-primary">{p.progress}%</span>
              </div>
              <Progress value={p.progress} className="h-2 bg-muted [&>div]:bg-primary" />
              <div className="flex justify-between text-xs font-semibold pt-1">
                <span className="text-foreground">{p.raised} Raised</span>
                <span className="text-muted-foreground">Target: {p.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}