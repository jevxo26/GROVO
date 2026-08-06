"use client";

import { useState } from "react";
import { UserCheck, Award, MapPin, Activity } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { VolunteerModalForm } from "@/components/dashboard/volunteers/VolunteerModalForm";
import { volunteersData } from "@/data/volunteersData";

export default function VolunteersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const columns: Column<(typeof volunteersData)[0]>[] = [
    {
      header: "Volunteer Name",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.district}</div>
        </div>
      ),
    },
    {
      header: "Code",
      accessorKey: "code",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.code}</span>,
    },
    { header: "Duty Location", accessorKey: "location" },
    { header: "Members Registered", accessorKey: "members", className: "font-bold text-center" },
    {
      header: "Performance Score",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-muted h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${row.score}%` }} />
          </div>
          <span className="font-bold text-xs">{row.score}</span>
        </div>
      ),
    },
    {
      header: "Rank Badge",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
            row.rank === "Gold"
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
              : row.rank === "Silver"
                ? "bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20"
                : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
          }`}
        >
          {row.rank}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "active"
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
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Volunteers" value="3,200" change="+120 active" icon={UserCheck} />
        <StatCard title="Gold Rank Volunteers" value="480" change="Top 15%" icon={Award} />
        <StatCard title="Duty Locations" value="64 Districts" change="100% coverage" icon={MapPin} />
        <StatCard title="Field Operations" value="1,420" change="Ongoing tasks" icon={Activity} />
      </div>

      {/* Main Table */}
      <DataTable
        title="Field Volunteer Directory"
        description="Monitor volunteer rankings, performance scores, and territory deployments"
        columns={columns}
        data={volunteersData}
        searchPlaceholder="Search volunteer by name, code or location..."
        searchField="name"
        onAddClick={() => setIsAddModalOpen(true)}
        addButtonLabel="Add Volunteer"
      />

      {/* Schema-driven Modal */}
      <VolunteerModalForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(formData) => {
          console.log("Submitting volunteer:", formData);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
}