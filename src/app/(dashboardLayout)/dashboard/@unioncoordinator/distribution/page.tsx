"use client";

import React from "react";
import { Truck, Package, CheckCircle, MapPin } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const distributionData = [
  { id: "1", item: "Emergency Food Basket Package", quantity: "500 units", location: "Tetuljhora Ward 3", date: "2026-07-28", status: "delivered" },
  { id: "2", item: "Winter Blanket & Warm Clothing", quantity: "300 units", location: "Ashulia Union", date: "2026-07-15", status: "delivered" },
  { id: "3", item: "Medicine & First Aid Kit", quantity: "150 units", location: "Savar Upazila Hospital", date: "2026-07-10", status: "in_transit" },
  { id: "4", item: "School Supplies & Textbooks", quantity: "200 sets", location: "Dhamrai Primary Schools", date: "2026-07-01", status: "scheduled" },
];

export default function CoordinatorDistributionPage() {
  const columns: Column<(typeof distributionData)[0]>[] = [
    { header: "Distribution Item", cell: (row) => <span className="font-bold text-foreground text-sm">{row.item}</span> },
    { header: "Quantity", cell: (row) => <span className="font-bold text-foreground">{row.quantity}</span> },
    { header: "Location", cell: (row) => <span className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3 text-muted-foreground" /> {row.location}</span> },
    { header: "Date", accessorKey: "date" },
    { header: "Status", cell: (row) => <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${row.status === "delivered" ? "bg-emerald-500/10 text-emerald-600" : row.status === "in_transit" ? "bg-blue-500/10 text-blue-600" : "bg-amber-500/10 text-amber-600"}`}>{row.status.replace("_", " ")}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Distributions" value={distributionData.length} change="This quarter" icon={Truck} />
        <StatCard title="Delivered" value={distributionData.filter((d) => d.status === "delivered").length} change="Confirmed" icon={CheckCircle} />
        <StatCard title="Items Distributed" value="1,150" change="Units shipped" icon={Package} />
        <StatCard title="Coverage Areas" value="4 Unions" change="Full territory" icon={MapPin} />
      </div>
      <DataTable title="Relief Distribution Tracker" description="Track humanitarian aid packages, delivery logistics, and beneficiary distributions" columns={columns} data={distributionData} searchPlaceholder="Search distributions..." searchField="item" />
    </div>
  );
}