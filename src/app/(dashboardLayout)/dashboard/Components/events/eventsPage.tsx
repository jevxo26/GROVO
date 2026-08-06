"use client";

import { Calendar, MapPin, Users, CalendarCheck, Clock, Star } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";

const eventsData = [
  { id: "1", name: "Annual General Meeting 2026", date: "2026-08-15", location: "National Headquarters, Dhaka", type: "meeting", attendees: "240", status: "upcoming" },
  { id: "2", name: "Volunteer Recognition Ceremony", date: "2026-07-25", location: "Savar Community Center", type: "ceremony", attendees: "450", status: "upcoming" },
  { id: "3", name: "Medical Camp - Sylhet Division", date: "2026-07-20", location: "Sylhet District Hospital", type: "camp", attendees: "1,200", status: "upcoming" },
  { id: "4", name: "Ramadan Iftar Distribution 2026", date: "2026-03-15", location: "All Branches", type: "distribution", attendees: "8,500", status: "completed" },
  { id: "5", name: "Education Scholarship Ceremony", date: "2026-01-20", location: "Chattogram Division Office", type: "ceremony", attendees: "680", status: "completed" },
];

export default function EventsPage() {
  const columns: Column<(typeof eventsData)[0]>[] = [
    {
      header: "Event Name",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {row.location}
          </div>
        </div>
      ),
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Type",
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-muted/50 text-muted-foreground border border-border">
          {row.type}
        </span>
      ),
    },
    {
      header: "Attendees",
      cell: (row) => (
        <span className="font-semibold text-foreground flex items-center gap-1">
          <Users className="w-3 h-3 text-muted-foreground" /> {row.attendees}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "upcoming"
              ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
              : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
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
        <StatCard title="Total Events" value={eventsData.length} change="This year" icon={Calendar} />
        <StatCard title="Upcoming" value={eventsData.filter((e) => e.status === "upcoming").length} change="Scheduled" icon={CalendarCheck} />
        <StatCard title="Completed" value={eventsData.filter((e) => e.status === "completed").length} change="Successfully held" icon={Star} />
        <StatCard title="Total Attendees" value="11,070" change="Across all events" icon={Users} />
      </div>

      {/* Events Table */}
      <DataTable
        title="Events & Humanitarian Activities Scheduler"
        description="Manage foundation events, campaigns, ceremonies, and community activities"
        columns={columns}
        data={eventsData}
        searchPlaceholder="Search events by name, location or type..."
        searchField="name"
      />
    </div>
  );
}
