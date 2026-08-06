"use client";

import { Bell, Send, CheckCircle, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const templates = [
  { id: "1", name: "New donation received", type: "push", audience: "All roles", lastUsed: "2026-07-10", status: "active" },
  { id: "2", name: "Membership approval notification", type: "email", audience: "Coordinators", lastUsed: "2026-07-08", status: "active" },
  { id: "3", name: "Emergency flood alert broadcast", type: "push", audience: "All users", lastUsed: "2026-07-05", status: "active" },
  { id: "4", name: "Monthly volunteer performance report", type: "email", audience: "Volunteers", lastUsed: "2026-07-01", status: "active" },
  { id: "5", name: "Campaign milestone reached", type: "in_app", audience: "Donors", lastUsed: "2026-06-28", status: "draft" },
  { id: "6", name: "Relief distribution reminder SMS", type: "sms", audience: "Coordinators", lastUsed: "2026-06-20", status: "draft" },
];

export default function NotificationsPage() {
  const columns: Column<(typeof templates)[0]>[] = [
    {
      header: "Template Name",
      cell: (row) => <span className="font-bold text-foreground text-sm">{row.name}</span>,
    },
    {
      header: "Type",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-muted/50 text-muted-foreground border border-border">
          {row.type.replace("_", " ")}
        </span>
      ),
    },
    { header: "Audience Target", accessorKey: "audience" },
    { header: "Last Broadcast Date", accessorKey: "lastUsed" },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "active"
              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
              : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
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
        <StatCard title="Total Templates" value={templates.length} change="Notification hub" icon={Bell} />
        <StatCard title="Active Broadcasts" value={templates.filter((t) => t.status === "active").length} change="Automated triggers" icon={CheckCircle} />
        <StatCard title="Draft Templates" value={templates.filter((t) => t.status === "draft").length} change="Needs review" isPositive={false} icon={Clock} />
        <StatCard title="Total Dispatched" value="142,500" change="Push / Email / SMS" icon={Send} />
      </div>

      {/* Notifications Table */}
      <DataTable
        title="Broadcast Notification Templates & Logs"
        description="Manage automated push alerts, emails, and SMS broadcasts to volunteers, donors, and members"
        columns={columns}
        data={templates}
        searchPlaceholder="Search notification templates..."
        searchField="name"
      />
    </div>
  );
}
