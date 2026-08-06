"use client";

import React from "react";
import { HandCoins, Building2, TrendingUp, CreditCard } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const corporateDonationsData = [
  { id: "CSR-001", project: "Education Infrastructure Fund", category: "Education", amount: "৳ 2,50,000", date: "2026-07-20", status: "completed" },
  { id: "CSR-002", project: "Employee Matching Program", category: "CSR Match", amount: "৳ 1,00,000", date: "2026-07-01", status: "completed" },
  { id: "CSR-003", project: "Winter Relief Corporate Drive", category: "Relief", amount: "৳ 50,000", date: "2026-06-15", status: "completed" },
  { id: "CSR-004", project: "Clean Water Solar Tube-Wells", category: "WASH", amount: "৳ 4,00,000", date: "2026-05-10", status: "completed" },
];

export default function CorporateDonationsPage() {
  const columns: Column<(typeof corporateDonationsData)[0]>[] = [
    {
      header: "CSR Initiative",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.project}</div>
          <div className="text-xs text-muted-foreground font-mono">Ref: {row.id}</div>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20">
          {row.category}
        </span>
      ),
    },
    { header: "Contribution", cell: (row) => <span className="font-extrabold text-primary">{row.amount}</span> },
    { header: "Date", accessorKey: "date" },
    {
      header: "Status",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total CSR Donated" value="৳ 10.3L" change="Annual corporate giving" icon={HandCoins} />
        <StatCard title="Employee Matching" value="৳ 300K" change="Matched contributions" icon={Building2} />
        <StatCard title="CSR Budget Utilized" value="52%" change="৳ 20L allocated" icon={TrendingUp} />
        <StatCard title="Primary Channel" value="Bank Wire" change="Tax-exempt receipted" icon={CreditCard} />
      </div>

      {/* Corporate Donation History Table */}
      <DataTable
        title="Corporate CSR Giving Ledger"
        description="Comprehensive audit trail of corporate social responsibility grants and employee matching funds"
        columns={columns}
        data={corporateDonationsData}
        searchPlaceholder="Search CSR projects or references..."
        searchField="project"
      />
    </div>
  );
}