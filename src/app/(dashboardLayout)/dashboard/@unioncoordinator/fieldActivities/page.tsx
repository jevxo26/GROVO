"use client";

import React from "react";
import { Activity, MapPin, CheckCircle, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const fieldData = [
  { id: "1", volunteer: "Shahinur Rahman", activity: "Beneficiary verification visit - 12 families", location: "Ward 5, Tetuljhora", date: "2026-07-28", points: 60, status: "approved" },
  { id: "2", volunteer: "Fatema Khatun", activity: "New member registration drive - 8 enrolled", location: "Ashulia Bazar", date: "2026-07-25", points: 40, status: "approved" },
  { id: "3", volunteer: "Rahim Uddin", activity: "Relief distribution supervision", location: "Dhamrai Union Parishad", date: "2026-07-20", points: 80, status: "pending" },
  { id: "4", volunteer: "Salma Begum", activity: "Medical camp assistance & photo upload", location: "Savar Health Complex", date: "2026-07-15", points: 50, status: "pending" },
];

export default function CoordinatorFieldActivitiesPage() {
  const columns: Column<(typeof fieldData)[0]>[] = [
    { header: "Volunteer", cell: (row) => <span className="font-bold text-foreground text-sm">{row.volunteer}</span> },
    { header: "Activity Report", cell: (row) => (
      <div>
        <div className="font-medium text-foreground text-sm">{row.activity}</div>
        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {row.location}</div>
      </div>
    )},
    { header: "Date", accessorKey: "date" },
    { header: "Points", cell: (row) => <span className="font-bold text-primary">+{row.points} pts</span> },
    { header: "Status", cell: (row) => <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${row.status === "approved" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{row.status}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Field Reports" value={fieldData.length} change="This month" icon={Activity} />
        <StatCard title="Approved" value={fieldData.filter((f) => f.status === "approved").length} change="Verified" icon={CheckCircle} />
        <StatCard title="Pending Review" value={fieldData.filter((f) => f.status === "pending").length} change="Needs action" isPositive={false} icon={Clock} />
        <StatCard title="Total Points" value="230" change="Across volunteers" icon={Activity} />
      </div>
      <DataTable title="Field Activity Reports & Check-ins" description="Review, approve, and track volunteer field assignments in your jurisdiction" columns={columns} data={fieldData} searchPlaceholder="Search field reports..." searchField="volunteer" />
    </div>
  );
}