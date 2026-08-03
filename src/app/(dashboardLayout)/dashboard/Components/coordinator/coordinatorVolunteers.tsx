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
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Volunteers</span>
      </div>

      <div className="bg-card text-card-foreground p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search volunteers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
          />
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-accent/40">
                <th className="py-3.5 px-6">Volunteer</th>
                <th className="py-3.5 px-6">Code</th>
                <th className="py-3.5 px-6">Union</th>
                <th className="py-3.5 px-6">Members</th>
                <th className="py-3.5 px-6">Performance</th>
                <th className="py-3.5 px-6">Rank</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filteredVolunteers.map((vol, index) => (
                <tr key={index} className="hover:bg-accent/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">{vol.name}</td>
                  <td className="py-4 px-6 text-muted-foreground font-mono text-xs">{vol.code}</td>
                  <td className="py-4 px-6 text-muted-foreground">{vol.union}</td>
                  <td className="py-4 px-6 text-muted-foreground">{vol.members}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-accent rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${vol.performance}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-foreground">{vol.performance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      vol.rank === "Gold" ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900" :
                      vol.rank === "Silver" ? "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700" :
                      vol.rank === "Bronze" ? "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-900" :
                      "bg-primary/15 text-primary border-primary/20"
                    }`}>
                      {vol.rank}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all cursor-pointer shadow-xs" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-8 h-8 rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all cursor-pointer shadow-xs" title="Verify">
                        <CheckSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVolunteers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground text-sm">No volunteers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}