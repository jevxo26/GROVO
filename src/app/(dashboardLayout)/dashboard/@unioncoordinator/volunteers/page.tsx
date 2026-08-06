"use client";

import React from "react";
import { UserCheck, Award, Clock, CheckCircle, MapPin } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const volunteersData = [
  { id: "1", name: "Shahinur Rahman", phone: "+880 1712-111111", territory: "Savar", rank: "Gold", activities: 156, status: "active" },
  { id: "2", name: "Fatema Khatun", phone: "+880 1712-222222", territory: "Ashulia", rank: "Silver", activities: 89, status: "active" },
  { id: "3", name: "Rahim Uddin", phone: "+880 1712-333333", territory: "Dhamrai", rank: "Bronze", activities: 42, status: "active" },
  { id: "4", name: "Salma Begum", phone: "+880 1712-444444", territory: "Tetuljhora", rank: "Silver", activities: 67, status: "inactive" },
];

export default function CoordinatorVolunteersPage() {
  const columns: Column<(typeof volunteersData)[0]>[] = [
    {
      header: "Volunteer",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.phone}</div>
        </div>
      ),
    },
    { header: "Territory", cell: (row) => <span className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3 text-muted-foreground" /> {row.territory}</span> },
    { header: "Rank", cell: (row) => <span className="font-bold text-primary text-sm">{row.rank}</span> },
    { header: "Activities", cell: (row) => <span className="font-bold text-foreground">{row.activities}</span> },
    {
      header: "Status",
      cell: (row) => (
        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${row.status === "active" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border border-amber-500/20"}`}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Volunteers" value={volunteersData.length} change="In jurisdiction" icon={UserCheck} />
        <StatCard title="Active" value={volunteersData.filter((v) => v.status === "active").length} change="On duty" icon={CheckCircle} />
        <StatCard title="Top Rank" value="Gold" change="Shahinur Rahman" icon={Award} />
        <StatCard title="Total Activities" value="354" change="This quarter" icon={Clock} />
      </div>
      <DataTable title="Jurisdiction Volunteers Registry" description="Manage field agents, track performance ranks, and assign territories" columns={columns} data={volunteersData} searchPlaceholder="Search volunteers..." searchField="name" />
    </div>
  );
}