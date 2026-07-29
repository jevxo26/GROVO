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
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">Home <span className="mx-1">›</span> Members</div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-lime-700"
          />
        </div>
        <div className="relative w-full sm:w-48 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-lime-700 cursor-pointer pr-10"
          >
            <option value="All Status">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-3.5 px-6">Member</th>
                <th className="py-3.5 px-6">Membership No.</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Union</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Joined</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredMembers.map((member, index) => (
                <tr key={index} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900 dark:text-white">{member.name}</div>
                    <div className="text-xs text-slate-400">{member.email}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-mono text-xs">{member.membershipNo}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{member.type}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{member.union}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider ${member.status === "active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400" : member.status === "pending" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-xs">{member.joined}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {member.status === "pending" && (
                        <button className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors" title="Approve">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 text-sm">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}