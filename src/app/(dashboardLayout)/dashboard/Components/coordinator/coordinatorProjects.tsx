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
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Projects
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-lime-700"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Title & Status */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {project.code}
                </p>
              </div>
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider ${
                  project.status === "active"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                    : "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Progress Bar & Percentage */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-10 text-right">
                  {project.progress}%
                </span>
              </div>
            </div>

            {/* 3 Separate Mini Cards for Budget, Beneficiaries, Volunteers */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {project.budget}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5 font-medium">
                  Budget
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {project.beneficiaries}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5 font-medium">
                  Beneficiaries
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {project.volunteers}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5 font-medium">
                  Volunteers
                </div>
              </div>
            </div>

            {/* Footer Date & Details */}
            <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>{project.dateRange}</span>
              <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                Details
              </button>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-2 text-center py-8 text-slate-400 text-sm">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}