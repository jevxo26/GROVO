"use client";

import React, { useState } from "react";
import { CheckCircle, Clock, Plus, Activity, Award, MapPin } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { Button } from "@/components/ui/button";
import { VolunteerModalForm } from "@/components/dashboard/volunteers/VolunteerModalForm";

const activitiesData = [
  { id: "1", title: "Registered 5 new members in Savar Union", date: "2026-07-09", location: "Savar, Dhaka", points: 50, status: "approved" },
  { id: "2", title: "Secured 3 new monthly donors for Education Campaign", date: "2026-07-07", location: "Dhamrai, Dhaka", points: 45, status: "approved" },
  { id: "3", title: "Beneficiary verification visit - 12 families assessed", date: "2026-07-05", location: "Ashulia, Dhaka", points: 60, status: "approved" },
  { id: "4", title: "Assisted in Winter Warmth blanket distribution", date: "2026-06-28", location: "Savar, Dhaka", points: 80, status: "approved" },
  { id: "5", title: "Uploaded 47 photos from Medical Camp event", date: "2026-06-20", location: "Dhamrai, Dhaka", points: 25, status: "pending" },
];

export default function VolunteerActivitiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: Column<(typeof activitiesData)[0]>[] = [
    {
      header: "Activity Description",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.title}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {row.location}
          </div>
        </div>
      ),
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Points Earned",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
          +{row.points} pts
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "approved"
              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
              : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
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
        <StatCard title="Total Activities" value={activitiesData.length} change="Field assignments" icon={Activity} />
        <StatCard title="Total Points" value="445 pts" change="Gold Tier" icon={Award} />
        <StatCard title="Approved Reports" value={activitiesData.filter((a) => a.status === "approved").length} change="Verified by coordinator" icon={CheckCircle} />
        <StatCard title="Pending Review" value={activitiesData.filter((a) => a.status === "pending").length} change="Needs review" isPositive={false} icon={Clock} />
      </div>

      {/* Activities Table */}
      <DataTable
        title="Field Activity Reports & Check-ins"
        description="Track your field assignments, member registrations, and volunteer check-ins"
        columns={columns}
        data={activitiesData}
        searchPlaceholder="Search activities..."
        searchField="title"
        onAddClick={() => setIsModalOpen(true)}
        addButtonLabel="Submit Activity Report"
      />

      <VolunteerModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          console.log("Submitting volunteer report:", data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}