

"use client";

import { useState } from "react";
import { campaignsData } from "@/data/campaignsData";

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

import DeleteCampaignModal from "@/components/shared/modals/deleteCampaignModal";
import EditCampaignModal from "@/components/shared/modals/editCampaignModal";
import CreateCampaignModal from "@/components/shared/modals/createCampaignModal";
import { Campaign } from "@/type";

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

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredCampaigns = campaignsData.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEditClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            className="pl-9 bg-card border-border shadow-sm rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground font-medium hidden sm:inline-block">
            {filteredCampaigns.length} campaigns
          </span>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> New Campaign
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-semibold text-foreground">CAMPAIGN</TableHead>
                <TableHead className="font-semibold text-foreground">CATEGORY</TableHead>
                <TableHead className="font-semibold text-foreground">TARGET</TableHead>
                <TableHead className="font-semibold text-foreground">RAISED</TableHead>
                <TableHead className="font-semibold text-foreground w-[150px]">PROGRESS</TableHead>
                <TableHead className="font-semibold text-foreground">DONORS</TableHead>
                <TableHead className="font-semibold text-foreground">STATUS</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-6">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow
                  key={campaign.id}
                  className="hover:bg-muted/50 border-border group transition-colors"
                >
                  <TableCell className="py-4">
                    <div className="font-bold text-foreground">{campaign.name}</div>
                    <div className="text-sm text-muted-foreground">{campaign.code}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{campaign.category}</TableCell>
                  <TableCell className="font-bold text-foreground">
                    {formatCurrency(campaign.target)}
                  </TableCell>
                  <TableCell className="font-bold text-teal-600 dark:text-teal-400">
                    {formatCurrency(campaign.raised)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={campaign.progress}
                        className="h-1.5 bg-muted [&>div]:bg-teal-600"
                      />
                      <span className="text-sm font-bold text-foreground w-8">
                        {campaign.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {campaign.donors.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                      capitalize font-medium border-transparent
                      ${campaign.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                      ${campaign.status === "completed" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : ""}
                    `}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleEditClick(campaign)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setCampaignToDelete(campaign);
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
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(data) => {
          console.log("Add new campaign", data);
          setIsCreateModalOpen(false);
        }}
      />
      
      <EditCampaignModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultData={selectedCampaign}
        onSave={(updatedData) => {
          console.log("Campaign updated:", updatedData);
          setIsEditModalOpen(false);
        }}
      />

      <DeleteCampaignModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          console.log("Deleting campaign:", campaignToDelete?.id);
        }}
      />
    </div>
  );
}