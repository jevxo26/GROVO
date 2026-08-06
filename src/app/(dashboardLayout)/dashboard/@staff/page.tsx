"use client";

import React from "react";
import { ClipboardList, CheckCircle, Clock, AlertCircle, Building2, ListChecks, Info, CalendarCheck } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import UserWelcomeSection from "@/components/dashboard/UserWelcomeSection";
import QuickActions from "@/components/dashboard/QuickActions";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";

const myTasksData = [
  { id: "1", title: "Process 15 new membership applications", priority: "high", deadline: "2026-07-10", status: "in_progress" },
  { id: "2", title: "Update beneficiary database records", priority: "medium", deadline: "2026-07-11", status: "pending" },
  { id: "3", title: "Prepare monthly donation reconciliation report", priority: "high", deadline: "2026-07-12", status: "pending" },
  { id: "4", title: "Coordinate volunteer training session", priority: "low", deadline: "2026-07-15", status: "completed" },
  { id: "5", title: "File quarterly compliance documents", priority: "high", deadline: "2026-07-08", status: "completed" },
];

export default function StaffDashboardPage() {
  const { data: profileRes } = useGetUserProfileQuery();
  const user = profileRes?.data || profileRes;
  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Staff";

  const quickActionsData = [
    { title: "My Task Board", desc: "View assigned daily tasks & deadlines", icon: ListChecks, href: "/dashboard/mytask" },
    { title: "Branch Information", desc: "View operating hours & office contacts", icon: Building2, href: "/dashboard/branchinfo" },
    { title: "Calendar & Events", desc: "Check upcoming events & schedules", icon: CalendarCheck },
    { title: "Help Center", desc: "Access knowledge base & SOPs", icon: Info },
  ];

  const columns: Column<(typeof myTasksData)[0]>[] = [
    {
      header: "Task Description",
      cell: (row) => <span className="font-semibold text-foreground text-sm">{row.title}</span>,
    },
    {
      header: "Priority",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.priority === "high"
              ? "bg-red-500/10 text-red-600 border border-red-500/20"
              : row.priority === "medium"
              ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
          }`}
        >
          {row.priority}
        </span>
      ),
    },
    { header: "Deadline", accessorKey: "deadline" },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "completed"
              ? "bg-emerald-500/10 text-emerald-600"
              : row.status === "in_progress"
              ? "bg-blue-500/10 text-blue-600"
              : "bg-amber-500/10 text-amber-600"
          }`}
        >
          {row.status.replace("_", " ")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <UserWelcomeSection name={fullName} memberSince="2024" memberId="ASH-STF-2024-001" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value={myTasksData.length} change="Assigned this week" icon={ClipboardList} />
        <StatCard title="Completed" value={myTasksData.filter((t) => t.status === "completed").length} change="On time" icon={CheckCircle} />
        <StatCard title="In Progress" value={myTasksData.filter((t) => t.status === "in_progress").length} change="Active tasks" icon={Clock} />
        <StatCard title="Pending" value={myTasksData.filter((t) => t.status === "pending").length} change="Awaiting action" isPositive={false} icon={AlertCircle} />
      </div>

      {/* Tasks Table */}
      <DataTable
        title="Staff Daily Task Board"
        description="Your assigned operational tasks, priorities, and deadlines"
        columns={columns}
        data={myTasksData}
        searchPlaceholder="Search tasks..."
        searchField="title"
      />

      {/* Quick Launch */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-3">Staff Quick Services</h3>
        <QuickActions actions={quickActionsData} />
      </div>
    </div>
  );
}
