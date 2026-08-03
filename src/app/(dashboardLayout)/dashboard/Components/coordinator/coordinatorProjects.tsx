"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function CoordinatorProjects() {
  const [searchQuery, setSearchQuery] = useState("");

  const projectsData = [
    {
      title: "Tetuljhora School Renovation",
      code: "PRJ-SAV-001",
      status: "active",
      progress: 71,
      budget: "৳ 120K",
      beneficiaries: "340",
      volunteers: "12",
      dateRange: "2026-01-15 - 2026-12-15",
    },
    {
      title: "Ashulia Drinking Water",
      code: "PRJ-SAV-002",
      status: "active",
      progress: 65,
      budget: "৳ 95K",
      beneficiaries: "560",
      volunteers: "8",
      dateRange: "2026-02-01 - 2026-10-01",
    },
    {
      title: "Dhamrai Winter Relief",
      code: "PRJ-SAV-003",
      status: "completed",
      progress: 100,
      budget: "৳ 75K",
      beneficiaries: "420",
      volunteers: "15",
      dateRange: "2025-11-01 - 2026-02-28",
    },
    {
      title: "Savar Orphan Care Center",
      code: "PRJ-SAV-004",
      status: "active",
      progress: 53,
      budget: "৳ 180K",
      beneficiaries: "85",
      volunteers: "6",
      dateRange: "2026-04-01 - 2027-03-31",
    },
  ];

  const filteredProjects = projectsData.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Projects</span>
      </div>

      {/* Search Bar */}
      <div className="bg-card text-card-foreground p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm space-y-4 transition-all hover:border-primary/40 group"
          >
            {/* Title & Status */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-foreground text-base tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {project.code}
                </p>
              </div>
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider border ${
                  project.status === "active"
                    ? "bg-primary/15 text-primary border-primary/20"
                    : "bg-accent text-muted-foreground border-border"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Progress Bar & Percentage */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-accent rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-foreground w-10 text-right">
                  {project.progress}%
                </span>
              </div>
            </div>

            {/* 3 Separate Mini Cards for Budget, Beneficiaries, Volunteers */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-accent/40 p-2.5 rounded-xl text-center border border-border">
                <div className="text-xs font-bold text-foreground">
                  {project.budget}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 font-medium">
                  Budget
                </div>
              </div>
              <div className="bg-accent/40 p-2.5 rounded-xl text-center border border-border">
                <div className="text-xs font-bold text-foreground">
                  {project.beneficiaries}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 font-medium">
                  Beneficiaries
                </div>
              </div>
              <div className="bg-accent/40 p-2.5 rounded-xl text-center border border-border">
                <div className="text-xs font-bold text-foreground">
                  {project.volunteers}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 font-medium">
                  Volunteers
                </div>
              </div>
            </div>

            {/* Footer Date & Details */}
            <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border">
              <span>{project.dateRange}</span>
              <button className="text-primary font-semibold hover:underline cursor-pointer">
                Details
              </button>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-2 text-center py-8 text-muted-foreground text-sm">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}