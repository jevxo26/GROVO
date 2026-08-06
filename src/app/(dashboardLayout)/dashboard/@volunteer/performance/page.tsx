"use client";

import React from "react";
import { Users, HandCoins, ListChecks, Award, Target, Trophy } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import OverviewCharts from "@/components/dashboard/shared/OverviewCharts";
import { Progress } from "@/components/ui/progress";

export default function VolunteerPerformancePage() {
  return (
    <div className="space-y-6">
      {/* Top Performance Rank Banner */}
      <div className="bg-card text-card-foreground p-6 md:p-8 rounded-3xl border border-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
              🥇 Gold Rank Volunteer
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mt-2">
              Performance Score: 94 / 100
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Top 5% volunteer across Dhaka Division</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-2xl flex items-center gap-3">
            <Trophy className="w-8 h-8 shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground font-semibold">Next Rank Milestone</div>
              <div className="font-bold text-foreground text-sm">Platinum Tier (600 pts)</div>
            </div>
          </div>
        </div>

        {/* Rank Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-muted-foreground">Progress to Platinum</span>
            <span className="text-primary">445 / 600 pts (74%)</span>
          </div>
          <Progress value={74} className="h-3 bg-muted [&>div]:bg-primary" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Members Registered" value="87" change="+12 this month" icon={Users} />
        <StatCard title="Donors Registered" value="34" change="Monthly pledges" icon={HandCoins} />
        <StatCard title="Activities Completed" value="156" change="100% verified" icon={ListChecks} />
        <StatCard title="Current Rank" value="Gold" change="Score: 94/100" icon={Award} />
      </div>

      {/* Performance Charts */}
      <OverviewCharts />
    </div>
  );
}
