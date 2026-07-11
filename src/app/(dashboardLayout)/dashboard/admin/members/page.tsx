"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

const membersData = [
  { id: "1", name: "Kamal Hossain", phone: "+880 1712-345678", membership: "ASH-MEM-2024-0847", type: "General Member", district: "Dhaka", status: "active", joined: "2024-03-15" },
  { id: "2", name: "Fatima Rahman", phone: "+880 1812-456789", membership: "ASH-MEM-2024-1156", type: "Individual Donor", district: "Chattogram", status: "active", joined: "2024-06-20" },
  { id: "3", name: "Rahim Industries Ltd.", phone: "+880 2555-7890", membership: "ASH-MEM-2024-0923", type: "Corporate Donor", district: "Dhaka", status: "active", joined: "2024-04-10" },
  { id: "4", name: "Nasrin Akhter", phone: "+880 1912-345678", membership: "ASH-MEM-2025-0234", type: "General Member", district: "Rajshahi", status: "active", joined: "2025-02-05" },
  { id: "5", name: "Dr. Imran Khan", phone: "+880 1612-567890", membership: "ASH-MEM-2025-0456", type: "Individual Donor", district: "Sylhet", status: "pending", joined: "2025-07-01" },
  { id: "6", name: "Ayesha Siddiqua", phone: "+880 1715-678901", membership: "ASH-MEM-2023-0789", type: "General Member", district: "Khulna", status: "suspended", joined: "2023-11-20" },
  { id: "7", name: "Square Pharmaceuticals", phone: "+880 2888-1234", membership: "ASH-MEM-2025-0678", type: "Corporate Donor", district: "Dhaka", status: "active", joined: "2025-05-15" },
  { id: "8", name: "Hasan Mahmud", phone: "+880 1818-789012", membership: "ASH-MEM-2024-1345", type: "General Member", district: "Barishal", status: "active", joined: "2024-08-30" },
];

import { useState } from "react";
import AddMemberModal from "@/components/shared/modals/addMemberModal";

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMemberOpen, setIsMemberOpen] = useState(false); 

  const filteredMembers = membersData.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.membership.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search members..." 
            className="pl-9 bg-card border-border shadow-sm rounded-xl" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block">8 members</span>
          <Button
            onClick={() => setIsMemberOpen(true)}
           className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Member
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-semibold text-foreground">MEMBER</TableHead>
                <TableHead className="font-semibold text-foreground">MEMBERSHIP</TableHead>
                <TableHead className="font-semibold text-foreground">TYPE</TableHead>
                <TableHead className="font-semibold text-foreground">DISTRICT</TableHead>
                <TableHead className="font-semibold text-foreground">STATUS</TableHead>
                <TableHead className="font-semibold text-foreground">JOINED</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-6">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/50 border-border group transition-colors">
                  <TableCell className="py-4">
                    <div className="font-bold text-foreground">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.phone}</div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{member.membership}</TableCell>
                  <TableCell className="text-muted-foreground">{member.type}</TableCell>
                  <TableCell className="text-muted-foreground">{member.district}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                      capitalize font-medium border-transparent
                      ${member.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                      ${member.status === 'pending' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400' : ''}
                      ${member.status === 'suspended' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                    `}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.joined}</TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Pencil className="w-4 h-4" />
                      </Button>
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
      <AddMemberModal
      isOpen={isMemberOpen}
        onClose={() => setIsMemberOpen(false)}
      ></AddMemberModal>
    </div>
  );
}
