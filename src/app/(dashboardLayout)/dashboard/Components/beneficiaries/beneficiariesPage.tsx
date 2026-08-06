"use client";

import { useState } from "react";
import { HeartHandshake, CheckCircle, Clock, Award } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { useGetAllBeneficiariesQuery } from "@/redux/slices/beneficiarySlice";

export default function BeneficiariesPage() {
  const { data: apiResponse, isLoading } = useGetAllBeneficiariesQuery();

  const fallbackBeneficiaries = [
    {
      id: "1",
      name: "Rokeya Begum",
      phone: "+880 1712-111222",
      code: "BEN-2026-0147",
      category: "Flood Victim",
      location: "Savar, Dhaka",
      status: "active",
      registered: "2026-06-20",
    },
    {
      id: "2",
      name: "Md. Sohag Mia",
      phone: "+880 1812-333444",
      code: "BEN-2026-0148",
      category: "Orphan",
      location: "Golapganj, Sylhet",
      status: "active",
      registered: "2026-06-22",
    },
    {
      id: "3",
      name: "Ayesha Akhter",
      phone: "+880 1912-555666",
      code: "BEN-2026-0149",
      category: "Medical Need",
      location: "Pahartali, Chattogram",
      status: "active",
      registered: "2026-06-25",
    },
  ];

  const rawData = apiResponse?.data || apiResponse;
  const beneficiaryList = Array.isArray(rawData) && rawData.length > 0
    ? rawData.map((b: any, idx: number) => ({
        id: b.id || String(idx + 1),
        name: [b.firstName, b.lastName].filter(Boolean).join(" ") || b.fullName || b.name || "Beneficiary",
        phone: b.phoneNumber || b.phone || "+880 1700000000",
        code: b.beneficiaryCode || b.code || `BEN-${1000 + idx}`,
        category: b.category || "Emergency Relief",
        location: b.presentAddress || b.location || "Dhaka",
        status: b.status?.toLowerCase() || "active",
        registered: b.createdAt ? new Date(b.createdAt).toISOString().split("T")[0] : "2026-01-01",
      }))
    : fallbackBeneficiaries;

  const columns: Column<(typeof beneficiaryList)[0]>[] = [
    {
      header: "Beneficiary Name",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.phone}</div>
        </div>
      ),
    },
    {
      header: "Beneficiary ID Code",
      accessorKey: "code",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.code}</span>,
    },
    { header: "Need Category", accessorKey: "category" },
    { header: "Location / Territory", accessorKey: "location" },
    { header: "Registration Date", accessorKey: "registered" },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "active"
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
        <StatCard title="Total Beneficiaries" value={beneficiaryList.length} change="Registered families" icon={HeartHandshake} />
        <StatCard title="Active Enrolled" value={beneficiaryList.filter((b) => b.status === "active").length} change="Relief eligible" icon={CheckCircle} />
        <StatCard title="Relief Package Deliveries" value="156,000" change="Nationwide" icon={Award} />
        <StatCard title="Under Assessment" value="12" change="Needs review" isPositive={false} icon={Clock} />
      </div>

      {/* Data Table */}
      <DataTable
        title="Beneficiary & Relief Master Registry"
        description="Search, manage and verify beneficiary eligibility for humanitarian distributions"
        columns={columns}
        data={beneficiaryList}
        isLoading={isLoading}
        searchPlaceholder="Search beneficiary by name, code or category..."
        searchField="name"
      />
    </div>
  );
}