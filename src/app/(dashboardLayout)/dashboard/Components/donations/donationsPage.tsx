"use client";

import { useState } from "react";
import { HandCoins, DollarSign, Clock, CheckCircle } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { donationsData } from "@/data/donationsData";
import { useGetAllDonationsQuery } from "@/redux/slices/donationSlice";

export default function DonationsPage() {
  const { data: apiResponse, isLoading } = useGetAllDonationsQuery();

  const rawData = apiResponse?.data || apiResponse;
  const list = Array.isArray(rawData) && rawData.length > 0
    ? rawData.map((d: any, idx: number) => ({
        id: d.id || String(idx + 1),
        receipt: d.receiptNumber || d.receipt || `REC-${1000 + idx}`,
        donor: d.donor?.fullName || d.donorName || d.donor || "Anonymous Donor",
        campaign: d.campaign?.title || d.campaign || "General Donation",
        amount: Number(d.amount || 0),
        type: d.paymentMethod || d.type || "bKash Online",
        date: d.createdAt ? new Date(d.createdAt).toISOString().split("T")[0] : d.date || "2026-08-01",
        status: d.status?.toLowerCase() || "completed",
      }))
    : donationsData;

  const totalAmount = list.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const columns: Column<(typeof list)[0]>[] = [
    {
      header: "Receipt No",
      accessorKey: "receipt",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.receipt}</span>,
    },
    { header: "Donor Name", accessorKey: "donor" },
    { header: "Campaign / Fund", accessorKey: "campaign" },
    {
      header: "Amount",
      cell: (row) => <span className="font-bold text-foreground">৳ {Number(row.amount).toLocaleString()}</span>,
    },
    { header: "Payment Method", accessorKey: "type" },
    { header: "Date", accessorKey: "date" },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "completed"
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
        <StatCard title="Total Donations" value={list.length} change="All-time transactions" icon={HandCoins} />
        <StatCard title="Total Collected" value={`৳ ${totalAmount.toLocaleString()}`} change="+18.4% growth" icon={DollarSign} />
        <StatCard title="Successful" value={list.filter((d) => d.status === "completed").length} change="Verified" icon={CheckCircle} />
        <StatCard title="Pending" value={list.filter((d) => d.status === "pending").length} change="In verification" isPositive={false} icon={Clock} />
      </div>

      {/* Data Table */}
      <DataTable
        title="Donation & Payment Master Ledger"
        description="Monitor nationwide contributions, digital receipts, and gateway transaction statuses"
        columns={columns}
        data={list}
        isLoading={isLoading}
        searchPlaceholder="Search donation by receipt, donor name or campaign..."
        searchField="donor"
      />
    </div>
  );
}