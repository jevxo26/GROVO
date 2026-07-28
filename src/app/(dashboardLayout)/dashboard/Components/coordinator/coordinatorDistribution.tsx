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
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Distribution
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm w-fit">
        <button
          onClick={() => setActiveTab("Schedule")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "Schedule"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Schedule
        </button>
        <button
          onClick={() => setActiveTab("Verification")}
          className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "Verification"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Verification
        </button>
      </div>

      {/* Tables based on active tab */}
      {activeTab === "Schedule" ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="py-3.5 px-6">Campaign</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Items</th>
                  <th className="py-3.5 px-6">Families</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {scheduleData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">{item.campaign}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{item.location}</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">{item.date}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300 text-xs max-w-xs">{item.items}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-semibold">{item.families}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.status === "in progress" 
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400" 
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
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
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="py-3.5 px-6">Campaign</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Verified By</th>
                  <th className="py-3.5 px-6">Beneficiaries</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {verificationData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">{item.campaign}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{item.location}</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">{item.date}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">{item.verifiedBy}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-semibold">{item.beneficiaries}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
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