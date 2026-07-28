"use client";

import React, { useState } from "react";
import { Search, Eye, CheckSquare } from "lucide-react";

export default function CoordinatorVolunteers() {
  const [searchQuery, setSearchQuery] = useState("");

  const volunteersData = [
    { name: "Shahinur Rahman", code: "VOL-SAV-001", union: "Tetuljhora", members: 34, performance: 88, rank: "Gold" },
    { name: "Rokeya Begum", code: "VOL-SAV-002", union: "Ashulia", members: 28, performance: 82, rank: "Silver" },
    { name: "Kabir Hossain", code: "VOL-SAV-003", union: "Dhamrai", members: 22, performance: 75, rank: "Bronze" },
    { name: "Fatema Khatun", code: "VOL-SAV-004", union: "Savar", members: 0, performance: 0, rank: "New" },
  ];

  const filteredVolunteers = volunteersData.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.union.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Volunteers
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search volunteers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-lime-700"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-3.5 px-6">Volunteer</th>
                <th className="py-3.5 px-6">Code</th>
                <th className="py-3.5 px-6">Union</th>
                <th className="py-3.5 px-6">Members</th>
                <th className="py-3.5 px-6">Performance</th>
                <th className="py-3.5 px-6">Rank</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredVolunteers.map((vol, index) => (
                <tr key={index} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">{vol.name}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-mono text-xs">{vol.code}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{vol.union}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{vol.members}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${vol.performance}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{vol.performance}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      vol.rank === "Gold" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400" :
                      vol.rank === "Silver" ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" :
                      vol.rank === "Bronze" ? "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400" :
                      "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                    }`}>
                      {vol.rank}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="Verify">
                        <CheckSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVolunteers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 text-sm">No volunteers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}