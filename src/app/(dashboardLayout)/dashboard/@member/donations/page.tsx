"use client";

import React from "react";
import { HandCoins, CreditCard, CalendarCheck, FileText } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const donationHistory = [
  { id: "DON-2026-9921", campaign: "Sylhet Flood Emergency Appeal", amount: "৳ 5,000", method: "bKash", date: "2026-07-28", status: "completed" },
  { id: "DON-2026-9812", campaign: "Orphan Child Education Sponsorship", amount: "৳ 2,500", method: "Nagad", date: "2026-07-01", status: "completed" },
  { id: "DON-2026-9654", campaign: "Winter Warmth Blanket Distribution", amount: "৳ 3,000", method: "Visa / Mastercard", date: "2026-06-15", status: "completed" },
  { id: "DON-2026-9430", campaign: "Ramadan Food Basket Drive", amount: "৳ 10,000", method: "Bank Transfer", date: "2026-03-20", status: "completed" },
  { id: "DON-2026-9112", campaign: "Emergency Medical Relief Fund", amount: "৳ 1,500", method: "bKash", date: "2026-01-10", status: "completed" },
];

export default function MemberDonationsPage() {
  const columns: Column<(typeof donationHistory)[0]>[] = [
    {
      header: "Transaction ID",
      accessorKey: "id",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.id}</span>,
    },
    {
      header: "Campaign Title",
      accessorKey: "campaign",
      cell: (row) => <span className="font-bold text-foreground text-sm">{row.campaign}</span>,
    },
    {
      header: "Amount Contributed",
      accessorKey: "amount",
      cell: (row) => <span className="font-extrabold text-foreground">{row.amount}</span>,
    },
    { header: "Payment Gateway", accessorKey: "method" },
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
        <StatCard title="Total Contributed" value="৳ 22,000" change="All-time giving" icon={HandCoins} />
        <StatCard title="Donations Count" value={donationHistory.length} change="Verified receipts" icon={FileText} />
        <StatCard title="Last Donation" value="৳ 5,000" change="2026-07-28" icon={CalendarCheck} />
        <StatCard title="Primary Gateway" value="bKash" change="80% of txns" icon={CreditCard} />
      </div>

      {/* Donation Ledger Table */}
      <DataTable
        title="My Personal Donation Ledger & Tax Receipts"
        description="Official history of your verified contributions to Ashray Foundation appeals"
        columns={columns}
        data={donationHistory}
        searchPlaceholder="Search donation transactions..."
        searchField="campaign"
      />
    </div>
  );
}