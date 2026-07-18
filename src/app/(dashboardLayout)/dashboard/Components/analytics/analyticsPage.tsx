"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HandCoins, Users, UserCheck, HeartHandshake, Flag, Building2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function AnalyticsPage() {
  const chartData = [
    { name: 'Jan', Raised: 120, Distributed: 80 },
    { name: 'Feb', Raised: 90, Distributed: 60 },
    { name: 'Mar', Raised: 180, Distributed: 140 },
    { name: 'Apr', Raised: 130, Distributed: 100 },
    { name: 'May', Raised: 150, Distributed: 120 },
    { name: 'Jun', Raised: 220, Distributed: 160 },
    { name: 'Jul', Raised: 140, Distributed: 90 },
  ];

  const funds = [
    { name: "Emergency Relief", percent: "34%", progress: 34 },
    { name: "Education", percent: "23%", progress: 23 },
    { name: "Food", percent: "17%", progress: 17 },
    { name: "Medical", percent: "12%", progress: 12 },
    { name: "Orphan Support", percent: "8%", progress: 8 },
    { name: "Winter Relief", percent: "6%", progress: 6 },
  ];

  const summaryCards = [
    { title: "Donations", val: "1.25 Cr", growth: "+10.5%", icon: HandCoins, active: true },
    { title: "Members", val: "48,500", growth: "+1.7%", icon: Users },
    { title: "Volunteers", val: "3,200", growth: "+4.2%", icon: UserCheck },
    { title: "Beneficiaries", val: "156,000", growth: "+0.1%", icon: HeartHandshake },
    { title: "Campaigns", val: "12", growth: "+2", icon: Flag },
    { title: "Branches", val: "42", growth: "+3", icon: Building2 },
  ];

  const analyticsBoxes = [
    "Donations Analytics", "Campaigns Analytics", "Projects Analytics", "Volunteers Analytics", "Beneficiaries Analytics",
    "Branches Analytics", "Financial Analytics", "Memberships Analytics", "Users Analytics", "System Analytics"
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Top micro summary cards */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {summaryCards.map((card, i) => (
          <Card key={i} className={`min-w-[160px] p-4 bg-card border flex flex-col justify-between shadow-sm shrink-0 ${card.active ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/20' : 'border-border'}`}>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <card.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif">{card.val}</div>
              <div className="text-[10px] text-muted-foreground">{card.title} <span className="text-emerald-500">{card.growth}</span></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Donation Analytics summary */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Donation Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col justify-center">
            <span className="text-sm text-muted-foreground">Avg Donation</span>
            <div className="text-2xl font-bold font-serif">2,450 ৳</div>
            <span className="text-xs text-muted-foreground">Per donor this month</span>
          </Card>
          <Card className="p-6 flex flex-col justify-center">
            <span className="text-sm text-muted-foreground">Conversion</span>
            <div className="text-2xl font-bold font-serif">12.4%</div>
            <span className="text-xs text-muted-foreground">Visitors to donors</span>
          </Card>
          <Card className="p-6 flex flex-col justify-center">
            <span className="text-sm text-muted-foreground">Recurring</span>
            <div className="text-2xl font-bold font-serif">1,892</div>
            <span className="text-xs text-muted-foreground">Monthly donors</span>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="p-6 bg-card border-border shadow-sm lg:col-span-2 flex flex-col">
          <h3 className="font-semibold text-foreground mb-6">Monthly Fundraising Trends (2026)</h3>
          <div className="h-[300px] w-full flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                <Bar dataKey="Raised" stackId="a" fill="#14b8a6" radius={[0, 0, 4, 4]} barSize={20} />
                <Bar dataKey="Distributed" stackId="a" fill="#d4a373" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Funds By Category */}
        <Card className="p-6 bg-card border-border shadow-sm">
          <h3 className="font-semibold text-foreground mb-6">Funds by Category</h3>
          <div className="space-y-6">
            {funds.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium text-foreground">{item.percent}</span>
                </div>
                <Progress value={item.progress} className={`h-2 ${i % 2 === 0 ? '[&>div]:bg-amber-700' : '[&>div]:bg-teal-500'}`} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Grid of analytics tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
        {analyticsBoxes.map((box, i) => (
          <Card key={i} className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors border-border shadow-sm flex flex-col items-center justify-center min-h-[80px]">
            <span className="text-sm font-medium">{box.split(' ')[0]}</span>
            <span className="text-xs text-muted-foreground">Analytics</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
