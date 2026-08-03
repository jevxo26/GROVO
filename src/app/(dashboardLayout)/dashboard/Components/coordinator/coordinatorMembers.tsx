"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Check, Eye } from "lucide-react";

export default function CoordinatorMembers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const membersData = [
    { name: "Md. Rafiqul Islam", email: "rafiq@email.com", membershipNo: "ASH-MEM-2026-1201", type: "General Member", union: "Tetuljhora", status: "pending", joined: "2026-07-10" },
    { name: "Nasrin Akhter", email: "nasrin@email.com", membershipNo: "ASH-MEM-2026-1202", type: "General Member", union: "Ashulia", status: "active", joined: "2026-06-15" },
    { name: "Kabir Hossain", email: "kabir@email.com", membershipNo: "ASH-MEM-2026-1203", type: "Individual Donor", union: "Dhamrai", status: "active", joined: "2026-05-20" },
    { name: "Rokeya Begum", email: "rokeya@email.com", membershipNo: "ASH-MEM-2026-1204", type: "General Member", union: "Tetuljhora", status: "pending", joined: "2026-07-08" },
    { name: "Shahinur Rahman", email: "shahin@email.com", membershipNo: "ASH-MEM-2026-1205", type: "Volunteer", union: "Savar", status: "active", joined: "2026-04-10" },
    { name: "Fatema Khatun", email: "fatema@email.com", membershipNo: "ASH-MEM-2026-1206", type: "General Member", union: "Ashulia", status: "active", joined: "2026-03-25" },
    { name: "Abdul Karim", email: "karim@email.com", membershipNo: "ASH-MEM-2026-1207", type: "Individual Donor", union: "Dhamrai", status: "suspended", joined: "2026-02-15" },
  ];

  const filteredMembers = membersData.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase()) || m.membershipNo.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === "All Status") return matchesSearch;
    return matchesSearch && m.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Members</span>
      </div>

      <div className="bg-card text-card-foreground p-4 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
          />
        </div>
        <div className="relative w-full sm:w-48 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none bg-background border border-input px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground cursor-pointer pr-10"
          >
            <option value="All Status">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-accent/40">
                <th className="py-3.5 px-6">Member</th>
                <th className="py-3.5 px-6">Membership No.</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Union</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Joined</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filteredMembers.map((member, index) => (
                <tr key={index} className="hover:bg-accent/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-foreground">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.email}</div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground font-mono text-xs">{member.membershipNo}</td>
                  <td className="py-4 px-6 text-muted-foreground">{member.type}</td>
                  <td className="py-4 px-6 text-muted-foreground">{member.union}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider border ${
                      member.status === "active" 
                        ? "bg-primary/15 text-primary border-primary/20" 
                        : member.status === "pending" 
                        ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900" 
                        : "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900"
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground text-xs">{member.joined}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {member.status === "pending" && (
                        <button className="w-8 h-8 rounded-xl bg-primary text-primary-foreground hover:opacity-90 flex items-center justify-center transition-opacity cursor-pointer shadow-xs" title="Approve">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button className="w-8 h-8 rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all cursor-pointer shadow-xs" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground text-sm">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}