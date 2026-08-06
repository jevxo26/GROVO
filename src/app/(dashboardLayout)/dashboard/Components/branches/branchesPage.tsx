"use client";

import { useState } from "react";
import { Building2, MapPin, CheckCircle, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { useGetAllBranchsQuery } from "@/redux/slices/branchSlice";

export default function BranchesPage() {
  const { data: apiResponse, isLoading } = useGetAllBranchsQuery();

  const fallbackBranches = [
    {
      id: "1",
      name: "ASHRAY National Headquarters",
      address: "Plot 12, Road 5, Savar",
      code: "BR-HQ-001",
      type: "Head Office",
      location: "Savar, Dhaka",
      status: "active",
      established: "2023-06-01",
    },
    {
      id: "2",
      name: "ASHRAY Chattogram Division",
      address: "House 45, Station Road",
      code: "BR-CTG-002",
      type: "Division",
      location: "Pahartali, Chattogram",
      status: "active",
      established: "2023-09-15",
    },
    {
      id: "3",
      name: "ASHRAY Sylhet District",
      address: "Bade Golapganj",
      code: "BR-SYL-003",
      type: "District",
      location: "Golapganj, Sylhet",
      status: "active",
      established: "2024-01-10",
    },
  ];

  const rawData = apiResponse?.data || apiResponse;
  const branchList = Array.isArray(rawData) && rawData.length > 0
    ? rawData.map((b: any, idx: number) => ({
        id: b.id || String(idx + 1),
        name: b.branchName || b.name || "Branch Office",
        address: b.address || "Branch Address",
        code: b.branchCode || b.code || `BR-${100 + idx}`,
        type: b.branchType || b.type || "District Branch",
        location: b.location || b.district || "Dhaka",
        status: b.status?.toLowerCase() || "active",
        established: b.createdAt ? new Date(b.createdAt).toISOString().split("T")[0] : "2024-01-01",
      }))
    : fallbackBranches;

  const columns: Column<(typeof branchList)[0]>[] = [
    {
      header: "Branch Name",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.address}</div>
        </div>
      ),
    },
    {
      header: "Code",
      accessorKey: "code",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.code}</span>,
    },
    { header: "Type", accessorKey: "type" },
    { header: "Territory / Location", accessorKey: "location" },
    { header: "Established Date", accessorKey: "established" },
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
        <StatCard title="Total Branches" value={branchList.length} change="Nationwide Network" icon={Building2} />
        <StatCard title="Active Operational" value={branchList.filter((b) => b.status === "active").length} change="100% active" icon={CheckCircle} />
        <StatCard title="Divisions Covered" value="8 Divisions" change="Full Bangladesh coverage" icon={MapPin} />
        <StatCard title="Pending Setup" value="0" change="All clear" isPositive={true} icon={Clock} />
      </div>

      {/* Data Table */}
      <DataTable
        title="Multi-Branch & Territory Network"
        description="Monitor regional divisional, district, upazila and union branch offices"
        columns={columns}
        data={branchList}
        isLoading={isLoading}
        searchPlaceholder="Search branch by name, code or location..."
        searchField="name"
      />
    </div>
  );
}