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
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Beneficiaries</span>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-card text-card-foreground p-4 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search beneficiaries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground cursor-pointer"
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
      <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-accent/50">
                <th className="py-3.5 px-6">Beneficiary</th>
                <th className="py-3.5 px-6">Code</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Union</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filteredBeneficiaries.map((ben, index) => (
                <tr key={index} className="hover:bg-accent/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-foreground">{ben.name}</div>
                    <div className="text-xs text-muted-foreground">{ben.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-foreground font-mono text-xs">{ben.code}</td>
                  <td className="py-4 px-6 text-muted-foreground">{ben.category}</td>
                  <td className="py-4 px-6 text-muted-foreground">{ben.union}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      ben.status === "active" ? "bg-primary/15 text-primary border-primary/20" :
                      ben.status === "assisted" ? "bg-accent text-accent-foreground border-border" :
                      "bg-accent text-muted-foreground border-border"
                    }`}>
                      {ben.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-xs cursor-pointer" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-xs cursor-pointer" title="Verify">
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBeneficiaries.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground text-sm">No beneficiaries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}