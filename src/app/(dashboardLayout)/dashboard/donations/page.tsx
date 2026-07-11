"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Trash2 } from "lucide-react";

const donationsData = [
  { id: "1", receipt: "DON-2026-0847", donor: "Kamal Hossain", campaign: "Emergency Flood Relief", amount: 5000, type: "One Time", date: "2026-07-08", status: "completed" },
  { id: "2", receipt: "DON-2026-0846", donor: "Rahim Industries", campaign: "Education Program", amount: 50000, type: "One Time", date: "2026-07-08", status: "completed" },
  { id: "3", receipt: "DON-2026-0845", donor: "Fatima Rahman", campaign: "Food Security", amount: 2500, type: "Monthly", date: "2026-07-07", status: "completed" },
  { id: "4", receipt: "DON-2026-0844", donor: "Anonymous", campaign: "Orphan Support", amount: 15000, type: "One Time", date: "2026-07-07", status: "completed" },
  { id: "5", receipt: "DON-2026-0843", donor: "Syed Corp Ltd.", campaign: "Emergency Flood Relief", amount: 100000, type: "One Time", date: "2026-07-06", status: "completed" },
  { id: "6", receipt: "DON-2026-0842", donor: "Nasrin Akhter", campaign: "Medical Camp", amount: 1500, type: "One Time", date: "2026-07-06", status: "completed" },
  { id: "7", receipt: "DON-2026-0841", donor: "Hasan Mahmud", campaign: "Winter Warmth", amount: 2000, type: "One Time", date: "2026-07-05", status: "pending" },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('BDT', '৳');
};

export default function DonationsPage() {
  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wider mb-2">Total Donations</h3>
            <div className="text-3xl font-bold text-foreground font-serif">8</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wider mb-2">Total Amount</h3>
            <div className="text-3xl font-bold text-foreground font-serif">{formatCurrency(177500)}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wider mb-2">Pending</h3>
            <div className="text-3xl font-bold text-teal-600 font-serif">1</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search donations..." className="pl-9 bg-card border-border shadow-sm rounded-xl" />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block">8 donations</span>
          <Button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Record Donation
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-semibold text-foreground">RECEIPT</TableHead>
                <TableHead className="font-semibold text-foreground">DONOR</TableHead>
                <TableHead className="font-semibold text-foreground">CAMPAIGN</TableHead>
                <TableHead className="font-semibold text-foreground">AMOUNT</TableHead>
                <TableHead className="font-semibold text-foreground">TYPE</TableHead>
                <TableHead className="font-semibold text-foreground">DATE</TableHead>
                <TableHead className="font-semibold text-foreground">STATUS</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-6">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationsData.map((donation) => (
                <TableRow key={donation.id} className="hover:bg-muted/50 border-border group transition-colors">
                  <TableCell className="py-4 font-bold text-foreground">{donation.receipt}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.donor}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.campaign}</TableCell>
                  <TableCell className="font-bold text-foreground">{formatCurrency(donation.amount)}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.type}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                      capitalize font-medium border-transparent
                      ${donation.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                      ${donation.status === 'pending' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : ''}
                    `}>
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
