"use client";

import React from "react";
import { HandCoins, Users, TrendingUp, CreditCard } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const donorsData = [
  { id: "1", name: "Kamal Hossain", type: "Individual", amount: "৳ 48,500", frequency: "Monthly", lastDonation: "2026-07-28", status: "active" },
  { id: "2", name: "ABC Corporation", type: "Corporate", amount: "৳ 2,50,000", frequency: "Quarterly", lastDonation: "2026-07-01", status: "active" },
  { id: "3", name: "Nasrin Akhter", type: "Individual", amount: "৳ 12,000", frequency: "One-time", lastDonation: "2026-06-10", status: "active" },
  { id: "4", name: "Hasan Mahmud", type: "Individual", amount: "৳ 8,500", frequency: "Monthly", lastDonation: "2026-05-15", status: "inactive" },
];

export default function CoordinatorDonorsPage() {
  const columns: Column<(typeof donorsData)[0]>[] = [
    { header: "Donor Name", cell: (row) => <span className="font-bold text-foreground text-sm">{row.name}</span> },
    { header: "Type", cell: (row) => <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-muted/50 text-muted-foreground border border-border">{row.type}</span> },
    { header: "Total Given", cell: (row) => <span className="font-extrabold text-primary">{row.amount}</span> },
    { header: "Frequency", accessorKey: "frequency" },
    { header: "Last Donation", accessorKey: "lastDonation" },
    { header: "Status", cell: (row) => <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${row.status === "active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{row.status}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donors" value={donorsData.length} change="In jurisdiction" icon={Users} />
        <StatCard title="Monthly Revenue" value="৳ 3.2L" change="+18% vs last month" icon={TrendingUp} />
        <StatCard title="Total Collected" value="৳ 3,19,000" change="All time" icon={HandCoins} />
        <StatCard title="Primary Gateway" value="bKash" change="78% of txns" icon={CreditCard} />
      </div>
      <DataTable title="Jurisdiction Donors & Contributors" description="Track donor giving patterns, payment frequencies, and contribution history" columns={columns} data={donorsData} searchPlaceholder="Search donors..." searchField="name" />
    </div>
  );
}