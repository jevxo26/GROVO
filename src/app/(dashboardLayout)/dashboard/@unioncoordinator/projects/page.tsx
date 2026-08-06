"use client";

import React from "react";
import { FolderKanban, CheckCircle, Clock, Target } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const projectsData = [
  { id: "1", name: "Deep Tube-Well Installation - Ward 5", budget: "৳ 2,50,000", progress: 75, status: "in_progress", deadline: "2026-08-15" },
  { id: "2", name: "Community Health Center Renovation", budget: "৳ 5,00,000", progress: 45, status: "in_progress", deadline: "2026-09-30" },
  { id: "3", name: "School Building Repair - Tetuljhora", budget: "৳ 1,80,000", progress: 100, status: "completed", deadline: "2026-06-30" },
  { id: "4", name: "Women Skill Development Center", budget: "৳ 3,50,000", progress: 20, status: "pending", deadline: "2026-12-31" },
];

export default function CoordinatorProjectsPage() {
  const columns: Column<(typeof projectsData)[0]>[] = [
    { header: "Project Name", cell: (row) => <span className="font-bold text-foreground text-sm">{row.name}</span> },
    { header: "Budget", cell: (row) => <span className="font-bold text-foreground">{row.budget}</span> },
    { header: "Progress", cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-24 bg-muted h-2 rounded-full overflow-hidden"><div className="bg-primary h-2 rounded-full" style={{ width: `${row.progress}%` }} /></div>
        <span className="font-bold text-xs">{row.progress}%</span>
      </div>
    )},
    { header: "Deadline", accessorKey: "deadline" },
    { header: "Status", cell: (row) => <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${row.status === "completed" ? "bg-emerald-500/10 text-emerald-600" : row.status === "in_progress" ? "bg-blue-500/10 text-blue-600" : "bg-amber-500/10 text-amber-600"}`}>{row.status.replace("_", " ")}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Projects" value={projectsData.length} change="In jurisdiction" icon={FolderKanban} />
        <StatCard title="Completed" value={projectsData.filter((p) => p.status === "completed").length} change="Delivered" icon={CheckCircle} />
        <StatCard title="In Progress" value={projectsData.filter((p) => p.status === "in_progress").length} change="Active" icon={Clock} />
        <StatCard title="Total Budget" value="৳ 12.8L" change="Allocated" icon={Target} />
      </div>
      <DataTable title="Humanitarian Projects & Infrastructure" description="Monitor community projects, budgets, and delivery timelines" columns={columns} data={projectsData} searchPlaceholder="Search projects..." searchField="name" />
    </div>
  );
}