"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export default function CoordinatorDonors() {
  const [searchQuery, setSearchQuery] = useState("");

  const donorsData = [
    { name: "Kamal Hossain", receipt: "DON-2026-0847", campaign: "Emergency Flood Relief", amount: "৳ 5,000", type: "One Time", date: "2026-07-08" },
    { name: "Rahim Industries", receipt: "DON-2026-0846", campaign: "Education Program", amount: "৳ 50,000", type: "One Time", date: "2026-07-08" },
    { name: "Fatima Rahman", receipt: "DON-2026-0845", campaign: "Food Security", amount: "৳ 2,500", type: "Monthly", date: "2026-07-07" },
    { name: "Anonymous", receipt: "DON-2026-0844", campaign: "Orphan Support", amount: "৳ 15,000", type: "One Time", date: "2026-07-07" },
    { name: "Syed Corp Ltd.", receipt: "DON-2026-0843", campaign: "Emergency Flood Relief", amount: "৳ 100,000", type: "One Time", date: "2026-07-06" },
    { name: "Nasrin Akhter", receipt: "DON-2026-0842", campaign: "Medical Camp", amount: "৳ 1,500", type: "One Time", date: "2026-07-06" },
    { name: "Hasan Mahmud", receipt: "DON-2026-0841", campaign: "Winter Warmth", amount: "৳ 2,000", type: "One Time", date: "2026-07-05" },
    { name: "Ayesha Siddiqua", receipt: "DON-2026-0840", campaign: "Education Program", amount: "৳ 3,500", type: "Monthly", date: "2026-07-05" },
  ];

  const filteredDonors = donorsData.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.receipt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Donors</span>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Donors</div>
          <div className="text-2xl font-bold text-foreground">2,150</div>
        </div>
        <div className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Monthly Collection</div>
          <div className="text-2xl font-bold text-primary">৳ 18.5L</div>
        </div>
        <div className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Recent Total</div>
          <div className="text-2xl font-bold text-foreground">৳ 179,500</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-card text-card-foreground p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search donors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
          />
        </div>
      </div>

      {/* Donors Table */}
      <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-accent/50">
                <th className="py-3.5 px-6">Donor</th>
                <th className="py-3.5 px-6">Receipt No.</th>
                <th className="py-3.5 px-6">Campaign</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {filteredDonors.map((donor, index) => (
                <tr key={index} className="hover:bg-accent/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-foreground">{donor.name}</td>
                  <td className="py-4 px-6 text-foreground font-mono text-xs">{donor.receipt}</td>
                  <td className="py-4 px-6 text-muted-foreground">{donor.campaign}</td>
                  <td className="py-4 px-6 font-semibold text-foreground">{donor.amount}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider border ${
                      donor.type === "Monthly" 
                        ? "bg-primary/15 text-primary border-primary/20" 
                        : "bg-accent text-accent-foreground border-border"
                    }`}>
                      {donor.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground text-xs">{donor.date}</td>
                </tr>
              ))}
              {filteredDonors.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground text-sm">No donors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}