"use client";

import React from "react";
import { HandCoins, Users, Flag, HeartHandshake, ShieldCheck } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";

export default function DonorImpactPage() {
  const impactReports = [
    { title: "Sylhet Emergency Flood Relief Package Delivery", date: "2026-07-28", location: "Sunamganj Sadar", impacted: "12 Families", desc: "Dry food packages, water purification tablets, and emergency medical kits delivered." },
    { title: "Orphan Education Monthly Book & Fee Stipend", date: "2026-07-01", location: "Savar, Dhaka", impacted: "3 Students", desc: "Full semester tuition fee, school uniform, and textbook supplies provided." },
    { title: "Winter Warmth Blanket Distribution", date: "2026-06-15", location: "Panchagarh", impacted: "25 Elderly Citizens", desc: "Heavy winter blankets and warm clothing kits distributed." },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donated" value="৳ 19,000" change="Direct impact" icon={HandCoins} />
        <StatCard title="Lives Impacted" value="54+" change="Verified beneficiaries" icon={Users} />
        <StatCard title="Donations Made" value="6" change="Across 4 categories" icon={Flag} />
        <StatCard title="Campaigns Supported" value="6" change="100% fulfilled" icon={HeartHandshake} />
      </div>

      {/* Realtime Impact Audit Reports */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm space-y-4">
        <h3 className="font-bold text-foreground text-base flex items-center gap-2 border-b border-border/50 pb-3">
          <ShieldCheck className="w-5 h-5 text-primary" /> Verified Field Impact Receipts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {impactReports.map((r, i) => (
            <div key={i} className="p-5 rounded-2xl border border-border/60 bg-muted/20 space-y-2 hover:border-primary/40 transition-all">
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {r.impacted}
              </span>
              <h4 className="font-bold text-foreground text-sm leading-snug">{r.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              <div className="text-[11px] font-semibold text-primary pt-2 flex justify-between">
                <span>📍 {r.location}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}