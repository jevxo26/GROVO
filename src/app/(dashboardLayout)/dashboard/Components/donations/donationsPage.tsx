

"use client";

import { useState } from "react";
import { donationsData } from "@/data/donationsData";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Trash2 } from "lucide-react";

import RecordDonationModal from "@/components/shared/modals/recordDonationModal";
import DeleteDonationModal from "@/components/shared/modals/deleteDonationModal";
import { Donation } from "@/type";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("BDT", "৳");
};

export default function DonationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState<Donation | null>(null);


  const filteredDonations = donationsData.filter(
    (donation) =>
      donation.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.receipt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.campaign.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  
  const totalDonationsCount = donationsData.length;
  const totalDonationsAmount = donationsData.reduce((sum, item) => sum + item.amount, 0);
  const pendingDonationsCount = donationsData.filter((d) => d.status === "pending").length;

  return (
    <div className="p-4 space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wider mb-2">
              Total Donations
            </h3>
            <div className="text-3xl font-bold text-foreground font-serif">
              {totalDonationsCount}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wider mb-2">
              Total Amount
            </h3>
            <div className="text-3xl font-bold text-foreground font-serif">
              {formatCurrency(totalDonationsAmount)}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wider mb-2">
              Pending
            </h3>
            <div className="text-3xl font-bold text-teal-600 font-serif">
              {pendingDonationsCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search donations..."
            className="pl-9 bg-card border-border shadow-sm rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block">
            {filteredDonations.length} donations
          </span>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm"
          >
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
              {filteredDonations.map((donation) => (
                <TableRow
                  key={donation.id}
                  className="hover:bg-muted/50 border-border group transition-colors"
                >
                  <TableCell className="py-4 font-bold text-foreground">
                    {donation.receipt}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{donation.donor}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.campaign}</TableCell>
                  <TableCell className="font-bold text-foreground">
                    {formatCurrency(donation.amount)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{donation.type}</TableCell>
                  <TableCell className="text-muted-foreground">{donation.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      capitalize font-medium border-transparent
                      ${donation.status === "completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                      ${donation.status === "pending" ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" : ""}
                    `}
                    >
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => {
                          setDonationToDelete(donation);
                          setIsDeleteModalOpen(true);
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
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

      {/* Modals */}
      <RecordDonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <DeleteDonationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          console.log("Deleting donation:", donationToDelete?.id);
        }}
      />
    </div>
  );
}