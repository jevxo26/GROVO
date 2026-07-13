"use client";
import { useState } from "react";
import { branchesData } from "@/data/branchesData";
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

import AddBranchModal from "@/components/shared/modals/addBranchModal";
import ConfirmModal from "@/components/shared/modals/ConfirmModal";
import { Branch } from "@/type";
import EditBranchModal from "@/components/shared/modals/editBranchModal";

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);

  const filteredBranches = branchesData.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalBranchesCount = branchesData.length;
  const activeBranchesCount = branchesData.filter(
    (b) => b.status === "active",
  ).length;
  const pendingBranchesCount = branchesData.filter(
    (b) => b.status === "pending",
  ).length;

  const divisionsCoveredCount = new Set(
    branchesData.map((b) => {
      const parts = b.location.split(",");
      return parts[parts.length - 1]?.trim();
    }),
  ).size;

  const handleEditClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              Total Branches
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-foreground font-serif">
              {totalBranchesCount}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              Active
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-teal-600 font-serif">
              {activeBranchesCount}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              Divisions Covered
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-teal-600 font-serif">
              {divisionsCoveredCount}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-4 md:p-6">
            <h3 className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              Pending
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-amber-700 font-serif">
              {pendingBranchesCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search branches..."
            className="pl-9 bg-card border-border shadow-sm rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block">
            {filteredBranches.length} branches
          </span>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Branch
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-semibold text-foreground">
                  BRANCH
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  CODE
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  TYPE
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  LOCATION
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  ESTABLISHED
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  STATUS
                </TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-6">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBranches.map((branch) => (
                <TableRow
                  key={branch.id}
                  className="hover:bg-muted/50 border-border group transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="font-bold text-foreground">
                      {branch.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {branch.address}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {branch.code}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {branch.type}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {branch.location}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {branch.established}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      capitalize font-medium border-transparent
                      ${branch.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                      ${branch.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : ""}
                    `}
                    >
                      {branch.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleEditClick(branch)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setBranchToDelete(branch);
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
      <AddBranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <EditBranchModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updatedData) => {
          console.log(updatedData);
          setIsEditModalOpen(false);
        }}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          console.log("Deleting branch:", branchToDelete?.id);
        }}
        title="Delete Branch"
        message={`Are you sure you want to delete ${branchToDelete?.name ?? "this branch"}?`}
        confirmLabel="Delete Forever"
      />
    </div>
  );
}
