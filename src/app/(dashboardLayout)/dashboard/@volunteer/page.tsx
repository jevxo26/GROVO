"use client";

import React from "react";
import { Users, HandCoins, ListChecks, Award, UserPlus, Activity, BarChart3, MapPin } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import UserWelcomeSection from "@/components/dashboard/UserWelcomeSection";
import QuickActions from "@/components/dashboard/QuickActions";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";

const recentActivitiesData = [
  { id: "1", title: "Registered 5 new members in Savar Union", date: "2026-07-09", location: "Savar, Dhaka", points: "+50 pts", status: "completed" },
  { id: "2", title: "Secured 3 new monthly donors for Education Campaign", date: "2026-07-07", location: "Dhamrai, Dhaka", points: "+45 pts", status: "completed" },
  { id: "3", title: "Beneficiary verification visit - 12 families assessed", date: "2026-07-05", location: "Ashulia, Dhaka", points: "+60 pts", status: "completed" },
  { id: "4", title: "Assisted in Winter Warmth blanket distribution", date: "2026-06-28", location: "Savar, Dhaka", points: "+80 pts", status: "completed" },
  { id: "5", title: "Uploaded 47 photos from Medical Camp event", date: "2026-06-20", location: "Dhamrai, Dhaka", points: "+25 pts", status: "pending" },
];

export default function VolunteerDashboardPage() {
  const { data: profileRes } = useGetUserProfileQuery();
  const user = profileRes?.data || profileRes;
  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Volunteer";

  const quickActionsData = [
    { title: "Register Member", desc: "Onboard new community members", icon: UserPlus, href: "/dashboard/registermember" },
    { title: "My Activities", desc: "View field assignments & check-ins", icon: Activity, href: "/dashboard/activities" },
    { title: "Performance Score", desc: "Track your impact metrics & badges", icon: BarChart3, href: "/dashboard/performance" },
    { title: "Assigned Territory", desc: "View assigned wards & unions", icon: MapPin },
  ];

  const columns: Column<(typeof recentActivitiesData)[0]>[] = [
    {
      header: "Activity Description",
      cell: (row) => (
        <div>
          <div className="font-semibold text-foreground text-sm">{row.title}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {row.location}
          </div>
        </div>
      ),
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Points Earned",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          {row.points}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "completed"
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-amber-500/10 text-amber-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <UserWelcomeSection
        name={fullName}
        memberSince="2024"
        memberId="VOL-DHK-0124"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Members Registered" value="87" change="This month: +12" icon={Users} />
        <StatCard title="Donors Secured" value="34" change="Monthly donors" icon={HandCoins} />
        <StatCard title="Field Activities" value="156" change="Tasks completed" icon={ListChecks} />
        <StatCard title="Current Rank" value="Gold" change="Score: 94/100" icon={Award} />
      </div>

      {/* Recent Activities Table */}
      <DataTable
        title="Recent Field Activities & Check-ins"
        description="Track your recent humanitarian assignments, member registrations, and field visits"
        columns={columns}
        data={recentActivitiesData}
        searchPlaceholder="Search activities..."
        searchField="title"
      />

      {/* Quick Launch Hub */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">Volunteer Quick Launch</h3>
        <QuickActions actions={quickActionsData} />
      </div>
    </div>
  );
}