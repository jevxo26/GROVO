"use client";

import React, { useState } from "react";

export default function CoordinatorDistribution() {
  const [activeTab, setActiveTab] = useState("Schedule");

  const scheduleData = [
    {
      campaign: "Savar Flood Relief",
      location: "Tetuljhora Union Center",
      date: "2026-07-15",
      items: "Rice 50kg, Lentils 20kg, Oil 10L",
      families: 120,
      status: "scheduled",
    },
    {
      campaign: "Education Materials",
      location: "Ashulia School Ground",
      date: "2026-07-18",
      items: "Books, Pens, Bags - 200 sets",
      families: 200,
      status: "scheduled",
    },
    {
      campaign: "Medical Camp",
      location: "Dhamrai Health Complex",
      date: "2026-07-20",
      items: "Medicines, Checkup kits",
      families: 350,
      status: "scheduled",
    },
    {
      campaign: "Eid Food Package",
      location: "All Union Centers",
      date: "2026-07-12",
      items: "Full food package per family",
      families: 500,
      status: "in progress",
    },
  ];

  const verificationData = [
    {
      campaign: "Winter Blanket Drive",
      location: "Savar Upazila Hall",
      date: "2026-06-30",
      verifiedBy: "Shahinur Rahman",
      beneficiaries: 180,
      status: "Verified",
    },
    {
      campaign: "Iftar Distribution",
      location: "Tetuljhora Madrasa",
      date: "2026-03-25",
      verifiedBy: "Rokeya Begum",
      beneficiaries: 250,
      status: "Verified",
    },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Distribution</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-card text-card-foreground p-1.5 rounded-2xl border border-border shadow-sm w-fit">
        <button
          onClick={() => setActiveTab("Schedule")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "Schedule"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Schedule
        </button>
        <button
          onClick={() => setActiveTab("Verification")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "Verification"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Verification
        </button>
      </div>

      {/* Tables based on active tab */}
      {activeTab === "Schedule" ? (
        <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-accent/50">
                  <th className="py-3.5 px-6">Campaign</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Items</th>
                  <th className="py-3.5 px-6">Families</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {scheduleData.map((item, index) => (
                  <tr key={index} className="hover:bg-accent/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-foreground">{item.campaign}</td>
                    <td className="py-4 px-6 text-muted-foreground">{item.location}</td>
                    <td className="py-4 px-6 text-muted-foreground text-xs">{item.date}</td>
                    <td className="py-4 px-6 text-muted-foreground text-xs max-w-xs">{item.items}</td>
                    <td className="py-4 px-6 text-foreground font-semibold">{item.families}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        item.status === "in progress" 
                          ? "bg-primary/15 text-primary border-primary/20" 
                          : "bg-accent text-accent-foreground border-border"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-accent/50">
                  <th className="py-3.5 px-6">Campaign</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Verified By</th>
                  <th className="py-3.5 px-6">Beneficiaries</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {verificationData.map((item, index) => (
                  <tr key={index} className="hover:bg-accent/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-foreground">{item.campaign}</td>
                    <td className="py-4 px-6 text-muted-foreground">{item.location}</td>
                    <td className="py-4 px-6 text-muted-foreground text-xs">{item.date}</td>
                    <td className="py-4 px-6 text-muted-foreground">{item.verifiedBy}</td>
                    <td className="py-4 px-6 text-foreground font-semibold">{item.beneficiaries}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/20">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}