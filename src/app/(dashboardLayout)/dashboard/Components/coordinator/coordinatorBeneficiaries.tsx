"use client";

import React, { useState } from "react";
import { Search, Eye, Check } from "lucide-react";

export default function CoordinatorBeneficiaries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const beneficiariesData = [
    { name: "Rokeya Begum", phone: "+880 1712-111222", code: "BEN-2026-0147", category: "Flood Victim", union: "Tetuljhora", status: "active" },
    { name: "Md. Sohag Mia", phone: "+880 1812-333444", code: "BEN-2026-0148", category: "Orphan", union: "Lakshanaband", status: "active" },
    { name: "Ayesha Akhter", phone: "+880 1912-555666", code: "BEN-2026-0149", category: "Medical Need", union: "North Pahartali", status: "active" },
    { name: "Abdul Karim", phone: "+880 1612-777888", code: "BEN-2026-0150", category: "Winter Relief", union: "Horian", status: "assisted" },
    { name: "Nasrin Sultana", phone: "+880 1718-999000", code: "BEN-2026-0151", category: "Education", union: "Atlia", status: "active" },
    { name: "Md. Rafiqul Islam", phone: "+880 1512-111333", code: "BEN-2026-0152", category: "Flood Victim", union: "Baniyachong", status: "active" },
    { name: "Shahinur Rahman", phone: "+880 1318-444666", code: "BEN-2026-0153", category: "Food Security", union: "Pirgacha", status: "assisted" },
    { name: "Fatema Khatun", phone: "+880 1915-777999", code: "BEN-2026-0154", category: "Medical Need", union: "Charadi", status: "pending" },
  ];

  const filteredBeneficiaries = beneficiariesData.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.union.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery);

    const matchesCategory =
      selectedCategory === "All Categories" || b.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Beneficiaries
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search beneficiaries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-lime-700"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-lime-700 text-slate-600 dark:text-slate-300"
          >
            <option value="All Categories">All Categories</option>
            <option value="Flood Victim">Flood Victim</option>
            <option value="Orphan">Orphan</option>
            <option value="Medical Need">Medical Need</option>
            <option value="Winter Relief">Winter Relief</option>
            <option value="Education">Education</option>
            <option value="Food Security">Food Security</option>
          </select>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-3.5 px-6">Beneficiary</th>
                <th className="py-3.5 px-6">Code</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Union</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredBeneficiaries.map((ben, index) => (
                <tr key={index} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900 dark:text-white">{ben.name}</div>
                    <div className="text-xs text-slate-400">{ben.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-mono text-xs">{ben.code}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{ben.category}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{ben.union}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      ben.status === "active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400" :
                      ben.status === "assisted" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400" :
                      "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                    }`}>
                      {ben.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors" title="Verify">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBeneficiaries.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 text-sm">No beneficiaries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}