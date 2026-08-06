"use client";

import React from "react";
import { Wallet, Coins, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const transactions = [
  { id: "TXN-9081", title: "Monthly Donor Pledge Auto-Debit", type: "pledge", amount: "৳ 2,000", date: "2026-07-01", status: "completed" },
  { id: "TXN-8812", title: "Reward Points Conversion (500 pts)", type: "reward", amount: "৳ 500", date: "2026-06-25", status: "completed" },
  { id: "TXN-8540", title: "Sylhet Emergency Flood Top-up", type: "donation", amount: "৳ 5,000", date: "2026-06-10", status: "completed" },
  { id: "TXN-8112", title: "Orphan Education Monthly Fund", type: "pledge", amount: "৳ 2,500", date: "2026-06-01", status: "completed" },
];

export default function DonorWalletPage() {
  const columns: Column<(typeof transactions)[0]>[] = [
    {
      header: "Transaction ID",
      accessorKey: "id",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.id}</span>,
    },
    {
      header: "Description",
      cell: (row) => <span className="font-bold text-foreground text-sm">{row.title}</span>,
    },
    {
      header: "Type",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-muted/50 text-muted-foreground border border-border">
          {row.type}
        </span>
      ),
    },
    {
      header: "Amount",
      cell: (row) => <span className="font-extrabold text-foreground">{row.amount}</span>,
    },
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
        <StatCard title="Wallet Balance" value="৳ 9,800" change="Available credit" icon={Wallet} />
        <StatCard title="Reward Points" value="2,450 pts" change="Redeemable" icon={Coins} />
        <StatCard title="Monthly Pledge" value="৳ 2,000" change="Auto-renew active" icon={CreditCard} />
        <StatCard title="Total Transactions" value={transactions.length} change="Verified ledger" icon={ArrowUpRight} />
      </div>

      {/* Wallet Table */}
      <DataTable
        title="Donor Wallet & Reward Points Transaction Ledger"
        description="Track automated monthly pledges, reward point conversions, and wallet credits"
        columns={columns}
        data={transactions}
        searchPlaceholder="Search transactions..."
        searchField="title"
      />
    </div>
  );
}