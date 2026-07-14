
"use client";

import AddBranchModal from "@/components/shared/modals/addBranchModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

import DeleteBranchModal from "@/components/shared/modals/deleteBranchModal";

const branchesData = [
  {
    id: "1",
    name: "ASHRAY National Headquarters",
    address: "Plot 12, Road 5, Savar",
    code: "BR-HQ-001",
    type: "Head Office",
    location: "Savar, Dhaka, Dhaka",
    status: "active",
    established: "2023-06-01",
  },
  {
    id: "2",
    name: "ASHRAY Chattogram Division",
    address: "House 45, Station Road",
    code: "BR-CTG-002",
    type: "Division",
    location: "Pahartali, Chattogram, Chattogram",
    status: "active",
    established: "2023-09-15",
  },
  {
    id: "3",
    name: "ASHRAY Sylhet District",
    address: "Village: Bade Golapganj, Near Mosque",
    code: "BR-SYL-003",
    type: "District",
    location: "Golapganj, Sylhet, Sylhet",
    status: "active",
    established: "2024-01-10",
  },
  {
    id: "4",
    name: "ASHRAY Rajshahi District",
    address: "Paba Bazar, Main Road",
    code: "BR-RAJ-004",
    type: "District",
    location: "Paba, Rajshahi, Rajshahi",
    status: "active",
    established: "2024-03-20",
  },
  {
    id: "5",
    name: "ASHRAY Khulna District",
    address: "Dumuria Upazila Road, Near Bank",
    code: "BR-KHU-005",
    type: "District",
    location: "Dumuria, Khulna, Khulna",
    status: "active",
    established: "2024-06-05",
  },
  {
    id: "6",
    name: "ASHRAY Savar Upazila",
    address: "Savar Bazar, Holding 78",
    code: "BR-DHK-006",
    type: "Upazila",
    location: "Savar, Dhaka, Dhaka",
    status: "active",
    established: "2024-08-12",
  },
  {
    id: "7",
    name: "ASHRAY Rangpur District",
    address: "Pirgacha Main Road, Block C",
    code: "BR-RNG-007",
    type: "District",
    location: "Pirgacha, Rangpur, Rangpur",
    status: "pending",
    established: "2025-05-01",
  },
  {
    id: "8",
    name: "ASHRAY Barishal District",
    address: "Bakerganj Sadar Road",
    code: "BR-BAR-008",
    type: "District",
    location: "Bakerganj, Barishal, Barishal",
    status: "active",
    established: "2025-02-18",
  },
];

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);

  // সার্চিং ফিল্টার লজিক
  const filteredBranches = branchesData.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // সামারি সেকশনের জন্য ডায়নামিক ক্যালকুলেশন লজিক
  const totalBranchesCount = branchesData.length;
  const activeBranchesCount = branchesData.filter((b) => b.status === "active").length;
  const pendingBranchesCount = branchesData.filter((b) => b.status === "pending").length;

  // লোকেশন স্ট্রিং থেকে ইউনিক বিভাগ (Division) সংখ্যা বের করার লজিক
  const divisionsCoveredCount = new Set(
    branchesData.map((b) => {
      const parts = b.location.split(",");
      return parts[parts.length - 1]?.trim();
    })
  ).size;

  const handleEditClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
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
                <TableHead className="font-semibold text-foreground">BRANCH</TableHead>
                <TableHead className="font-semibold text-foreground">CODE</TableHead>
                <TableHead className="font-semibold text-foreground">TYPE</TableHead>
                <TableHead className="font-semibold text-foreground">LOCATION</TableHead>
                <TableHead className="font-semibold text-foreground">ESTABLISHED</TableHead>
                <TableHead className="font-semibold text-foreground">STATUS</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-6">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBranches.map((branch) => (
                <TableRow
                  key={branch.id}
                  className="hover:bg-muted/50 border-border group transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="font-bold text-foreground">{branch.name}</div>
                    <div className="text-sm text-muted-foreground">{branch.address}</div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{branch.code}</TableCell>
                  <TableCell className="text-muted-foreground">{branch.type}</TableCell>
                  <TableCell className="text-muted-foreground">{branch.location}</TableCell>
                  <TableCell className="text-muted-foreground">{branch.established}</TableCell>
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
        defaultData={selectedBranch}
        onSave={(updatedData) => {
          console.log("Branch updated:", updatedData);
          setIsEditModalOpen(false);
        }}
      />

      <DeleteBranchModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          console.log("Deleting branch:", branchToDelete?.id);
        }}
      />
    </div>
  );
}