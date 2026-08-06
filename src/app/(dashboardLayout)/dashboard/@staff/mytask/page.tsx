"use client";

import React from "react";
import { ClipboardList, CheckCircle, Clock, AlertCircle, MapPin } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const myTasksData = [
  { id: "1", title: "Process 15 new membership applications", priority: "high", deadline: "2026-07-10", status: "in_progress", assignedBy: "Coordinator - Savar" },
  { id: "2", title: "Update beneficiary database records", priority: "medium", deadline: "2026-07-11", status: "pending", assignedBy: "National Admin" },
  { id: "3", title: "Prepare monthly donation reconciliation report", priority: "high", deadline: "2026-07-12", status: "pending", assignedBy: "Finance Dept" },
  { id: "4", title: "Coordinate volunteer training session logistics", priority: "low", deadline: "2026-07-15", status: "completed", assignedBy: "HR Dept" },
  { id: "5", title: "File quarterly compliance documents", priority: "high", deadline: "2026-07-08", status: "completed", assignedBy: "Legal Dept" },
];

export default function StaffMyTaskPage() {
  const columns: Column<(typeof myTasksData)[0]>[] = [
    {
      header: "Task Description",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Assigned by: {row.assignedBy}</div>
        </div>
      ),
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
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value={myTasksData.length} change="This week" icon={ClipboardList} />
        <StatCard title="Completed" value={myTasksData.filter((t) => t.status === "completed").length} change="On time" icon={CheckCircle} />
        <StatCard title="In Progress" value={myTasksData.filter((t) => t.status === "in_progress").length} change="Active now" icon={Clock} />
        <StatCard title="Pending" value={myTasksData.filter((t) => t.status === "pending").length} change="Awaiting action" isPositive={false} icon={AlertCircle} />
      </div>

      {/* Tasks Table */}
      <DataTable
        title="Staff Daily Task Board"
        description="Your assigned operational tasks with priorities and deadlines"
        columns={columns}
        data={myTasksData}
        searchPlaceholder="Search tasks..."
        searchField="title"
      />
    </div>
  );
}