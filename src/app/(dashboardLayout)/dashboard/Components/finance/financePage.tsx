"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Building, Clock, Download, FileText } from "lucide-react";

export default function FinancePage() {
  const gateways = [
    { name: "bKash", count: "4,520 txn", amount: "৳ 48.5L", progress: 85, color: "bg-teal-500" },
    { name: "Nagad", count: "3,280 txn", amount: "৳ 31.2L", progress: 65, color: "bg-teal-500" },
    { name: "SSLCommerz", count: "2,100 txn", amount: "৳ 28.5L", progress: 55, color: "bg-teal-500" },
    { name: "Stripe", count: "890 txn", amount: "৳ 12.5L", progress: 25, color: "bg-teal-500" },
    { name: "PayPal", count: "340 txn", amount: "৳ 4.5L", progress: 10, color: "bg-teal-500" },
  ];

  const funds = [
    { name: "Emergency Fund", amount: "৳ 1250K", used: "88%", progress: 88, color: "bg-amber-700" },
    { name: "Education Fund", amount: "৳ 980K", used: "63%", progress: 63, color: "bg-amber-700" },
    { name: "Medical Fund", amount: "৳ 750K", used: "64%", progress: 64, color: "bg-amber-700" },
    { name: "Food Fund", amount: "৳ 620K", used: "63%", progress: 63, color: "bg-amber-700" },
    { name: "Orphan Fund", amount: "৳ 450K", used: "62%", progress: 62, color: "bg-amber-700" },
    { name: "General Fund", amount: "৳ 210K", used: "71%", progress: 71, color: "bg-amber-700" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-border shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TOTAL INCOME</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif">৳ 12.50Cr</div>
        </Card>
        <Card className="p-6 bg-card border-border shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TOTAL EXPENSE</span>
            <div className="w-8 h-8 rounded-full bg-rose-100/10 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4 text-rose-500" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif">৳ 10.50Cr</div>
        </Card>
        <Card className="p-6 bg-card border-border shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">NET BALANCE</span>
            <div className="w-8 h-8 rounded-full bg-teal-100/10 flex items-center justify-center">
              <Building className="w-4 h-4 text-teal-500" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-teal-600 dark:text-teal-400">৳ 2.00Cr</div>
        </Card>
        <Card className="p-6 bg-card border-border shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">PENDING</span>
            <div className="w-8 h-8 rounded-full bg-amber-100/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-teal-600 dark:text-teal-400">৳ 850K</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gateway Transactions */}
        <Card className="p-6 bg-card border-border shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Gateway Transactions</h3>
          <div className="space-y-6">
            {gateways.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground text-xs">{item.count}</span>
                    <span className="font-medium text-foreground">{item.amount}</span>
                  </div>
                </div>
                <Progress value={item.progress} className={`h-2 [&>div]:${item.color}`} />
              </div>
            ))}
          </div>
        </Card>

        {/* Fund Balances */}
        <Card className="p-6 bg-card border-border shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Fund Balances</h3>
          <div className="space-y-6">
            {funds.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <div className="flex gap-2">
                    <span className="font-medium text-foreground">{item.amount}</span>
                    <span className="text-muted-foreground text-xs">({item.used} used)</span>
                  </div>
                </div>
                <Progress value={item.progress} className={`h-2 [&>div]:${item.color}`} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Button className="bg-amber-700 hover:bg-amber-800 text-white gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
        <Button variant="outline" className="gap-2">
          <FileText className="w-4 h-4" />
          Audit Logs
        </Button>
      </div>
    </div>
  );
}
