"use client";

import { useState } from "react";
import { Users, UserCheck, Clock, ShieldAlert } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { MemberModalForm } from "@/components/dashboard/members/MemberModalForm";

export default function MembersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const membersData = [
    {
      id: "1",
      name: "Kamal Hossain",
      phone: "+880 1712-345678",
      membership: "ASH-MEM-2024-0847",
      type: "General Member",
      district: "Dhaka",
      status: "active",
      joined: "2024-03-15",
    },
    {
      id: "2",
      name: "Fatima Rahman",
      phone: "+880 1812-456789",
      membership: "ASH-MEM-2024-1156",
      type: "Individual Donor",
      district: "Chattogram",
      status: "active",
      joined: "2024-06-20",
    },
    {
      id: "3",
      name: "Rahim Industries Ltd.",
      phone: "+880 2555-7890",
      membership: "ASH-MEM-2024-0923",
      type: "Corporate Donor",
      district: "Dhaka",
      status: "active",
      joined: "2024-04-10",
    },
    {
      id: "4",
      name: "Dr. Imran Khan",
      phone: "+880 1612-567890",
      membership: "ASH-MEM-2025-0456",
      type: "Individual Donor",
      district: "Sylhet",
      status: "pending",
      joined: "2025-07-01",
    },
  ];

  const columns: Column<(typeof membersData)[0]>[] = [
    {
      header: "Member Name",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.phone}</div>
        </div>
      ),
    },
    {
      header: "Membership ID",
      accessorKey: "membership",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.membership}</span>,
    },
    { header: "Type", accessorKey: "type" },
    { header: "District", accessorKey: "district" },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            row.status === "active"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : row.status === "pending"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Joined Date", accessorKey: "joined" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Members" value="48,500" change="+847 this month" icon={Users} />
        <StatCard title="Active Members" value="42,120" change="86.8% active rate" icon={UserCheck} />
        <StatCard title="Pending Approvals" value="156" change="Needs review" isPositive={false} icon={Clock} />
        <StatCard title="Suspended Accounts" value="12" change="-2 this week" isPositive={true} icon={ShieldAlert} />
      </div>

      {/* Main Data Table */}
      <DataTable
        title="Foundation Members Registry"
        description="Search, manage and approve foundation member accounts nationwide"
        columns={columns}
        data={membersData}
        searchPlaceholder="Search by name, phone or membership ID..."
        searchField="name"
        onAddClick={() => setIsModalOpen(true)}
        addButtonLabel="Register Member"
      />

      {/* Schema-driven Member Modal */}
      <MemberModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(formData) => {
          console.log("Submitting new member:", formData);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}