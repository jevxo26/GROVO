

"use client";

import { useState } from "react";
import { volunteersData } from "@/data/volunteersData";

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
import { Progress } from "@/components/ui/progress";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

import DeleteVolunteerModal from "@/components/shared/modals/deleteVolunteerModal";
import AddVolunteerModal from "@/components/shared/modals/addVolunteerModal";
import { Volunteer } from "@/type";
import EditVolunteerModal from "@/components/shared/modals/editValonderModal";

export default function VolunteersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState<Volunteer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] =
  useState<Volunteer | null>(null);

  const filteredVolunteers = volunteersData.filter(
    (volunteer) =>
      volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-4 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search volunteers..."
            className="pl-9 bg-card border-border shadow-sm rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block">
            {filteredVolunteers.length} volunteers
          </span>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Volunteer
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-semibold text-foreground">VOLUNTEER</TableHead>
                <TableHead className="font-semibold text-foreground">CODE</TableHead>
                <TableHead className="font-semibold text-foreground">LOCATION</TableHead>
                <TableHead className="font-semibold text-foreground">MEMBERS</TableHead>
                <TableHead className="font-semibold text-foreground w-[150px]">SCORE</TableHead>
                <TableHead className="font-semibold text-foreground">RANK</TableHead>
                <TableHead className="font-semibold text-foreground">STATUS</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-6">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.map((volunteer) => (
                <TableRow
                  key={volunteer.id}
                  className="hover:bg-muted/50 border-border group transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="font-bold text-foreground">{volunteer.name}</div>
                    <div className="text-sm text-muted-foreground">{volunteer.district}</div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{volunteer.code}</TableCell>
                  <TableCell className="text-muted-foreground">{volunteer.location}</TableCell>
                  <TableCell className="font-bold text-foreground">{volunteer.members}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={volunteer.score}
                        className="h-1.5 bg-muted [&>div]:bg-teal-600"
                      />
                      <span className="text-sm font-bold text-foreground w-6">
                        {volunteer.score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      capitalize font-medium border-transparent
                      ${volunteer.rank === "Gold" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : ""}
                      ${volunteer.rank === "Silver" ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" : ""}
                      ${volunteer.rank === "Bronze" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" : ""}
                      ${volunteer.rank === "New" ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" : ""}
                    `}
                    >
                      {volunteer.rank}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      capitalize font-medium border-transparent
                      ${volunteer.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                      ${volunteer.status === "pending" ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" : ""}
                    `}
                    >
                      {volunteer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => {
                          setSelectedVolunteer(volunteer);
                          setIsEditModalOpen(true);
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setVolunteerToDelete(volunteer);
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
      <AddVolunteerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <EditVolunteerModal
      isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedVolunteer(null);
        }}
      ></EditVolunteerModal>

      <DeleteVolunteerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          console.log("Deleting volunteer:", volunteerToDelete?.id);
        }}
      />
    </div>
  );
}