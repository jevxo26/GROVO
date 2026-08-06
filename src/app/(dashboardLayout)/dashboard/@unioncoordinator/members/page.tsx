"use client";

import React from "react";
import { Users, UserCheck, Clock, CheckCircle, MapPin } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const membersData = [
  { id: "1", name: "Md. Rafiqul Islam", email: "rafiq@email.com", membershipNo: "ASH-MEM-2026-1201", type: "General Member", union: "Tetuljhora", status: "pending", joined: "2026-07-10" },
  { id: "2", name: "Nasrin Akhter", email: "nasrin@email.com", membershipNo: "ASH-MEM-2026-1202", type: "General Member", union: "Ashulia", status: "active", joined: "2026-06-15" },
  { id: "3", name: "Kabir Hossain", email: "kabir@email.com", membershipNo: "ASH-MEM-2026-1203", type: "Individual Donor", union: "Dhamrai", status: "active", joined: "2026-05-20" },
  { id: "4", name: "Rokeya Begum", email: "rokeya@email.com", membershipNo: "ASH-MEM-2026-1204", type: "General Member", union: "Tetuljhora", status: "pending", joined: "2026-07-08" },
  { id: "5", name: "Shahinur Rahman", email: "shahin@email.com", membershipNo: "ASH-MEM-2026-1205", type: "Volunteer", union: "Savar", status: "active", joined: "2026-04-10" },
  { id: "6", name: "Fatema Khatun", email: "fatema@email.com", membershipNo: "ASH-MEM-2026-1206", type: "General Member", union: "Ashulia", status: "active", joined: "2026-03-25" },
  { id: "7", name: "Abdul Karim", email: "karim@email.com", membershipNo: "ASH-MEM-2026-1207", type: "Individual Donor", union: "Dhamrai", status: "suspended", joined: "2026-02-15" },
];

export default function CoordinatorMembersPage() {
  const columns: Column<(typeof membersData)[0]>[] = [
    {
      header: "Member",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    {
      header: "Membership No.",
      accessorKey: "membershipNo",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.membershipNo}</span>,
    },
    { header: "Type", accessorKey: "type" },
    {
      header: "Union",
      cell: (row) => (
        <span className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3 text-muted-foreground" /> {row.union}</span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "active"
              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
              : row.status === "pending"
              ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
              : "bg-red-500/10 text-red-600 border border-red-500/20"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Joined", accessorKey: "joined" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Members" value={membersData.length} change="In jurisdiction" icon={Users} />
        <StatCard title="Active" value={membersData.filter((m) => m.status === "active").length} change="Verified" icon={CheckCircle} />
        <StatCard title="Pending Approval" value={membersData.filter((m) => m.status === "pending").length} change="Needs review" isPositive={false} icon={Clock} />
        <StatCard title="All Types" value="3 Tiers" change="General, Donor, Volunteer" icon={UserCheck} />
      </div>

      <DataTable
        title="Jurisdiction Members Registry"
        description="View, approve, and manage community members in your assigned territory"
        columns={columns}
        data={membersData}
        searchPlaceholder="Search members by name, email or membership no..."
        searchField="name"
      />
    </div>
  );
}