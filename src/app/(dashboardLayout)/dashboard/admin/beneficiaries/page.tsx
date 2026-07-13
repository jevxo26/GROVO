

"use client";

import { useState } from "react";
import { beneficiariesData } from "@/data/beneficiariesData"; 

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
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

import AddBeneficiaryModal from "@/components/shared/modals/addBeneficiaryModal";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import EditBeneficiaryModal from "@/components/shared/modals/EditBeneficiaryModal";
import { Beneficiary } from "@/type";

export default function BeneficiariesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isBeneficiaryOpen, setIsBeneficiaryOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [beneficiaryToDelete, setBeneficiaryToDelete] = useState<Beneficiary | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

  const filteredBeneficiaries = beneficiariesData.filter(
    (beneficiary) =>
      beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEdit = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              Total
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-foreground font-serif">
              {beneficiariesData.length}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              Active
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-teal-600 font-serif">
              {beneficiariesData.filter(b => b.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              Assisted
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-teal-600 font-serif">
              {beneficiariesData.filter(b => b.status === "assisted").length}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              Pending
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-amber-700 font-serif">
              {beneficiariesData.filter(b => b.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search beneficiaries..."
            className="pl-9 bg-card border-border shadow-sm rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block">
            {filteredBeneficiaries.length} beneficiaries
          </span>
          <Button
            onClick={() => setIsBeneficiaryOpen(true)}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Beneficiary
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-semibold text-foreground">NAME</TableHead>
                <TableHead className="font-semibold text-foreground">CODE</TableHead>
                <TableHead className="font-semibold text-foreground">CATEGORY</TableHead>
                <TableHead className="font-semibold text-foreground">LOCATION</TableHead>
                <TableHead className="font-semibold text-foreground">STATUS</TableHead>
                <TableHead className="font-semibold text-foreground">REGISTERED</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-6">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBeneficiaries.map((beneficiary) => (
                <TableRow
                  key={beneficiary.id}
                  className="hover:bg-muted/50 border-border group transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="font-bold text-foreground">{beneficiary.name}</div>
                    <div className="text-sm text-muted-foreground">{beneficiary.phone}</div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{beneficiary.code}</TableCell>
                  <TableCell className="text-muted-foreground">{beneficiary.category}</TableCell>
                  <TableCell className="text-muted-foreground">{beneficiary.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      capitalize font-medium border-transparent
                      ${beneficiary.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                      ${beneficiary.status === "assisted" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500" : ""}
                      ${beneficiary.status === "pending" ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" : ""}
                    `}
                    >
                      {beneficiary.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{beneficiary.registered}</TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2 ">
                      <Button
                        onClick={() => handleEdit(beneficiary)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setBeneficiaryToDelete(beneficiary);
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
      <AddBeneficiaryModal
        isOpen={isBeneficiaryOpen}
        onClose={() => setIsBeneficiaryOpen(false)}
      />
      <EditBeneficiaryModal
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updatedData) => {
          console.log("Updated:", updatedData);
          setIsEditModalOpen(false);
        }}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          console.log("Deleting beneficiary:", beneficiaryToDelete?.id);
        }}
        title="Delete Beneficiary"
        message={`Are you sure you want to delete ${beneficiaryToDelete?.name ?? "this beneficiary"}?`}
        confirmLabel="Delete Forever"
      />
    </div>
  );
}