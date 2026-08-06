"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const donationTrendData = [
  { month: "Jan", raised: 450000, distributed: 380000 },
  { month: "Feb", raised: 520000, distributed: 420000 },
  { month: "Mar", raised: 890000, distributed: 750000 },
  { month: "Apr", raised: 610000, distributed: 580000 },
  { month: "May", raised: 580000, distributed: 510000 },
  { month: "Jun", raised: 670000, distributed: 600000 },
  { month: "Jul", raised: 750000, distributed: 710000 },
];

const categoryData = [
  { name: "Emergency Relief", value: 34, color: "#136139" },
  { name: "Education Support", value: 23, color: "#1e824c" },
  { name: "Food Distribution", value: 17, color: "#27ae60" },
  { name: "Medical Assistance", value: 12, color: "#2ecc71" },
  { name: "Orphan Support", value: 8, color: "#f39c12" },
  { name: "Winter Relief", value: 6, color: "#e74c3c" },
];

export const OverviewCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar Chart: Monthly Trends */}
      <div className="lg:col-span-2 bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-foreground text-base">Monthly Fundraising & Relief Trends</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Raised vs Distributed Funds (BDT)</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            2026 Financial Year
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={donationTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "var(--foreground)",
                }}
              />
              <Bar dataKey="raised" fill="#136139" radius={[6, 6, 0, 0]} name="Raised (BDT)" />
              <Bar dataKey="distributed" fill="#88d8b0" radius={[6, 6, 0, 0]} name="Distributed (BDT)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Funds by Category */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-foreground text-base mb-1">Funds by Cause Category</h3>
          <p className="text-xs text-muted-foreground mb-4">Percentage allocation across programs</p>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "var(--foreground)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-border">
          {categoryData.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-muted-foreground truncate">{cat.name}</span>
              <span className="font-bold text-foreground ml-auto">{cat.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewCharts;
