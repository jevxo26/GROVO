"use client";

import { ArrowUpRight, ArrowDownRight, Building, Clock, Download, FileText } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function FinancePage() {
  const gateways = [
    { name: "bKash", count: "4,520 txn", amount: "৳ 48.5L", progress: 85 },
    { name: "Nagad", count: "3,280 txn", amount: "৳ 31.2L", progress: 65 },
    { name: "SSLCommerz", count: "2,100 txn", amount: "৳ 28.5L", progress: 55 },
    { name: "Stripe", count: "890 txn", amount: "৳ 12.5L", progress: 25 },
    { name: "PayPal", count: "340 txn", amount: "৳ 4.5L", progress: 10 },
  ];

  const funds = [
    { name: "Emergency Fund", amount: "৳ 1250K", used: "88%", progress: 88 },
    { name: "Education Fund", amount: "৳ 980K", used: "63%", progress: 63 },
    { name: "Medical Fund", amount: "৳ 750K", used: "64%", progress: 64 },
    { name: "Food Fund", amount: "৳ 620K", used: "63%", progress: 63 },
    { name: "Orphan Fund", amount: "৳ 450K", used: "62%", progress: 62 },
    { name: "General Fund", amount: "৳ 210K", used: "71%", progress: 71 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Income" value="৳ 12.50Cr" change="+14.2% YoY" icon={ArrowUpRight} />
        <StatCard title="Total Expense" value="৳ 10.50Cr" change="Program distributions" isPositive={false} icon={ArrowDownRight} />
        <StatCard title="Net Balance" value="৳ 2.00Cr" change="Reserve treasury" icon={Building} />
        <StatCard title="Pending Clearance" value="৳ 850K" change="Needs audit" isPositive={false} icon={Clock} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gateway Transactions */}
        <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm">
          <h3 className="font-bold text-foreground text-base mb-6">Payment Gateway Transactions</h3>
          <div className="space-y-6">
            {gateways.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground text-xs">{item.count}</span>
                    <span className="font-bold text-foreground">{item.amount}</span>
                  </div>
                </div>
                <Progress value={item.progress} className="h-2 bg-muted [&>div]:bg-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Fund Balances */}
        <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm">
          <h3 className="font-bold text-foreground text-base mb-6">Humanitarian Fund Allocations</h3>
          <div className="space-y-6">
            {funds.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <div className="flex gap-2">
                    <span className="font-bold text-foreground">{item.amount}</span>
                    <span className="text-muted-foreground text-xs">({item.used} used)</span>
                  </div>
                </div>
                <Progress value={item.progress} className="h-2 bg-muted [&>div]:bg-primary/80" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-4">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl">
          <Download className="w-4 h-4" />
          Export Financial Report
        </Button>
        <Button variant="outline" className="gap-2 rounded-xl border-border">
          <FileText className="w-4 h-4" />
          Audit Logs
        </Button>
      </div>
    </div>
  );
}
