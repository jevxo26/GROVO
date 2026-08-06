"use client";

import React from "react";
import { Users, UserCheck, HandCoins, Share2, Copy } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { Button } from "@/components/ui/button";

const myDonors = [
  { id: "1", name: "Nasrin Akhter", email: "nasrin@email.com", joined: "2026-06-10", donated: "৳ 12,000", status: "active", reward: "+500 pts" },
  { id: "2", name: "Hasan Mahmud", email: "hasan@email.com", joined: "2026-05-15", donated: "৳ 8,500", status: "active", reward: "+500 pts" },
  { id: "3", name: "Kabir Hossain", email: "kabir@email.com", joined: "2026-04-01", donated: "৳ 5,000", status: "active", reward: "+500 pts" },
];

export default function DonorReferralPage() {
  const columns: Column<(typeof myDonors)[0]>[] = [
    {
      header: "Referred Member",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    { header: "Joined Date", accessorKey: "joined" },
    {
      header: "Their Total Donations",
      accessorKey: "donated",
      cell: (row) => <span className="font-bold text-foreground">{row.donated}</span>,
    },
    {
      header: "Reward Earned",
      accessorKey: "reward",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          {row.reward}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Referral Link Card */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="font-bold text-foreground text-lg flex items-center justify-center md:justify-start gap-2">
            <Share2 className="w-5 h-5 text-primary" /> Your Unique Referral Link
          </h2>
          <p className="text-xs text-muted-foreground">Share this link with friends to earn +500 reward points for every active donor onboarded</p>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-2xl border border-border w-full md:w-auto">
          <span className="font-mono text-xs font-bold text-primary px-3">ASHRAY-KAMAL-0847</span>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs gap-1 font-bold">
            <Copy className="w-3.5 h-3.5" /> Copy Link
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Referred" value="4 Members" change="+1 this month" icon={Users} />
        <StatCard title="Active Donors" value="3 Active" change="75% conversion" icon={UserCheck} />
        <StatCard title="Their Donations" value="৳ 25,500" change="Community impact" icon={HandCoins} />
      </div>

      {/* Referrals Table */}
      <DataTable
        title="Referred Donors Roster"
        description="Track friends onboarded through your link and reward points unlocked"
        columns={columns}
        data={myDonors}
        searchPlaceholder="Search referred donors..."
        searchField="name"
      />
    </div>
  );
}