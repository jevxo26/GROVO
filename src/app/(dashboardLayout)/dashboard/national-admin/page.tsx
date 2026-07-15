"use client";

// import { StatCard } from "./_components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Users, UserCheck, Flag, HandCoins, HeartHandshake, Building2, PieChart } from "lucide-react";
import { StatCard } from "../admin/_components/StatCard";

const trendData = [
  { name: 'Jan', raised: 4000, distributed: 2400 },
  { name: 'Feb', raised: 3000, distributed: 1398 },
  { name: 'Mar', raised: 2000, distributed: 9800 },
  { name: 'Apr', raised: 2780, distributed: 3908 },
  { name: 'May', raised: 1890, distributed: 4800 },
  { name: 'Jun', raised: 2390, distributed: 3800 },
  { name: 'Jul', raised: 3490, distributed: 4300 },
];

const categoryData = [
  { name: 'Emergency Relief', percentage: 34, color: "bg-teal-500" },
  { name: 'Education', percentage: 23, color: "bg-teal-500" },
  { name: 'Food', percentage: 17, color: "bg-peach-200" },
  { name: 'Medical', percentage: 12, color: "bg-peach-200" },
  { name: 'Orphan Support', percentage: 8, color: "bg-teal-500" },
  { name: 'Winter Relief', percentage: 6, color: "bg-teal-500" },
];

const quickLinks = [
  { name: "Members", icon: Users, href: "/dashboard/admin/members" },
  { name: "Volunteers", icon: UserCheck, href: "/dashboard/admin/volunteers" },
  { name: "Campaigns", icon: Flag, href: "/dashboard/admin/campaigns" },
  { name: "Donations", icon: HandCoins, href: "/dashboard/admin/donations" },
  { name: "Beneficiaries", icon: HeartHandshake, href: "/dashboard/admin/beneficiaries" },
  { name: "Branches", icon: Building2, href: "/dashboard/admin/branches" },
  { name: "Finance", icon: PieChart, href: "/dashboard/admin/finance", disabled: true },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="MEMBERS" value="48,500" subtext="+847 this month" />
        <StatCard title="VOLUNTEERS" value="3,200" subtext="2,890 active" />
        <StatCard title="CAMPAIGNS" value="6" subtext="12 total" subtextColor="green" />
        <StatCard title="TOTAL DONATIONS" value="1.25 Cr" subtext="+324k this month" subtextColor="green" />
        <StatCard title="BENEFICIARIES" value="156,000" subtext="All time" />
        <StatCard title="PENDING" value="156" subtext="Needs review" subtextColor="green" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <Card className="lg:col-span-2 shadow-sm border-border bg-card px-4 py-3">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Monthly Fundraising Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} barSize={32}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-muted-foreground" />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="raised" stackId="a" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="distributed" stackId="a" fill="#e2c0b0" radius={[0, 0, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#14b8a6]"></span> Raised
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#e2c0b0]"></span> Distributed
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Progress */}
        <Card className="shadow-sm border-border bg-card px-4 py-3">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Funds by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {categoryData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className="font-bold text-foreground">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2 bg-muted [&>div]:bg-teal-500" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 pt-4">
        {quickLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl transition-all duration-200 hover:shadow-md hover:border-primary/50 group ${link.disabled ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <div className="bg-primary/10 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <link.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
