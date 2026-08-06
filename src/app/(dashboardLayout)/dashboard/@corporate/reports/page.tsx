"use client";

import React from "react";
import { FileText, Download, ShieldCheck, CheckCircle2 } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { Button } from "@/components/ui/button";

const reportsData = [
  { id: "REP-2026-Q2", title: "Q2 2026 Corporate Impact & Audit Report", period: "Apr - Jun 2026", status: "verified", date: "2026-07-01", pages: "24 pages" },
  { id: "REP-2026-Q1", title: "Q1 2026 Education CSR Grant Audit", period: "Jan - Mar 2026", status: "verified", date: "2026-04-01", pages: "18 pages" },
  { id: "REP-2025-ANN", title: "Annual Tax Exemption & Contribution Summary", period: "FY 2025", status: "verified", date: "2026-01-15", pages: "32 pages" },
];

export default function CorporateReportsPage() {
  const columns: Column<(typeof reportsData)[0]>[] = [
    {
      header: "CSR Document / Audit Report",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" /> {row.title}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">{row.period} · {row.pages}</div>
        </div>
      ),
    },
    { header: "Date Issued", accessorKey: "date" },
    {
      header: "Verification",
      cell: (row) => (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full w-fit">
          <CheckCircle2 className="w-3.5 h-3.5" /> Certified Audit
        </span>
      ),
    },
    {
      header: "Download",
      cell: () => (
        <Button size="sm" variant="outline" className="rounded-xl text-xs font-bold gap-1">
          <Download className="w-3.5 h-3.5" /> PDF Audit
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Available Audits" value={reportsData.length} change="Verified reports" icon={FileText} />
        <StatCard title="Tax Exemptions" value="100% Tax Credit" change="Section 44(4)" icon={ShieldCheck} />
        <StatCard title="Auditor Status" value="PwC Verified" change="Independent audit" icon={CheckCircle2} />
        <StatCard title="Report Downloads" value="48 Downloads" change="Board distribution" icon={Download} />
      </div>

      {/* CSR Reports Table */}
      <DataTable
        title="Corporate CSR Impact & Financial Audit Reports"
        description="Download certified auditor statements, tax exemption receipts, and quarterly impact reports"
        columns={columns}
        data={reportsData}
        searchPlaceholder="Search audit reports..."
        searchField="title"
      />
    </div>
  );
}