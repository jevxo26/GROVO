"use client";

import React from "react";
import { Star, ShieldCheck, Award, Trophy, Download, QrCode } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import { Button } from "@/components/ui/button";

const certsData = [
  { icon: Star, title: "Monthly Donor Recognition", description: "Recognized for consistent monthly donations throughout the fiscal year 2026", date: "2026-07-01" },
  { icon: ShieldCheck, title: "Education Champion Badge", description: "Awarded for exceptional support to rural primary education programs", date: "2026-03-15" },
  { icon: Award, title: "Emergency Responder Certificate", description: "Contributed significantly to Sylhet flood emergency relief campaigns", date: "2026-02-28" },
  { icon: Trophy, title: "Annual Philanthropy Award", description: "Top individual member recognition award for fiscal year 2025", date: "2025-12-31" },
];

export default function MemberCertificatesPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Certificates" value={certsData.length} change="Verified awards" icon={Award} />
        <StatCard title="Highest Honor" value="Gold Medalist" change="Philanthropy 2025" icon={Trophy} />
        <StatCard title="Digital QR Card" value="ACTIVE" change="Scannable ID" icon={QrCode} />
        <StatCard title="Verification Status" value="100% Valid" change="Blockchain verified" icon={ShieldCheck} />
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certsData.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <div
              key={index}
              className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cert.description}</p>
                  <span className="inline-block text-[11px] font-semibold text-primary mt-2">Issued: {cert.date}</span>
                </div>
              </div>
              <div className="flex justify-end pt-2 border-t border-border/50">
                <Button variant="outline" size="sm" className="gap-2 rounded-xl text-xs">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}