"use client";

import { useState } from "react";
import { Flag, Target, HeartHandshake, AlertCircle, Grid, List, Plus, Tag, Eye, Edit3, Trash2 } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import SupportedCampaigns from "@/components/dashboard/SupportedCampaigns";
import { CampaignModalForm } from "@/components/dashboard/campaigns/CampaignModalForm";
import { CampaignCategoryModal } from "@/components/dashboard/campaigns/CampaignCategoryModal";
import { CampaignActionModal } from "@/components/dashboard/campaigns/CampaignActionModal";
import { Button } from "@/components/ui/button";
import {
  useGetCampaignCategoriesQuery,
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
} from "@/redux/slices/campaignSlice";

export default function CampaignsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Selected campaign for Action Modal
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [actionMode, setActionMode] = useState<"view" | "edit" | "delete" | null>(null);

  // RTK Query hooks
  const { data: apiResponse, isLoading } = useGetCampaignCategoriesQuery();
  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
  const [deleteCampaignApi] = useDeleteCampaignMutation();

  const [localCampaigns, setLocalCampaigns] = useState([
    { id: "1", title: "Sylhet Emergency Flood Relief 2026", category: "Emergency Relief", percentage: 85, raised: "8,50,000", target: "10,00,000", beneficiaries: 12500, urgency: "emergency" },
    { id: "2", title: "Orphan Child Education & Boarding Fund", category: "Education", percentage: 62, raised: "3,10,000", target: "5,00,000", beneficiaries: 450, urgency: "normal" },
    { id: "3", title: "Free Medical Camp & Medicine Distribution", category: "Healthcare", percentage: 90, raised: "4,50,000", target: "5,00,000", beneficiaries: 3200, urgency: "urgent" },
    { id: "4", title: "Daily Food Security & Iftar Package Drive", category: "Food Security", percentage: 78, raised: "7,80,000", target: "10,00,000", beneficiaries: 8500, urgency: "normal" },
    { id: "5", title: "Clean Water Deep Tube-Well Installation", category: "Sanitation", percentage: 44, raised: "2,20,000", target: "5,00,000", beneficiaries: 1800, urgency: "normal" },
    { id: "6", title: "Winter Warmth Blanket Distribution", category: "Winter Relief", percentage: 95, raised: "9,50,000", target: "10,00,000", beneficiaries: 5400, urgency: "urgent" },
  ]);

  const rawData = apiResponse;
  const campaignsList = Array.isArray(rawData) && rawData.length > 0
    ? rawData.map((c: any, idx: number) => ({
        id: String(c.id || idx + 1),
        title: c.title || c.name || "Humanitarian Appeal",
        code: `CAMP-${100 + idx}`,
        category: c.category || "Emergency Relief",
        target: c.goal ? `৳ ${c.goal.toLocaleString()}` : "৳ 5,00,000",
        raised: c.raised ? `৳ ${c.raised.toLocaleString()}` : "৳ 3,50,000",
        percentage: c.percentage || Math.floor(Math.random() * 40) + 60,
        beneficiaries: c.helpedCount || 1200,
        urgency: c.isEmergency ? "emergency" : "normal",
        status: "active",
      }))
    : localCampaigns;

  const categories = ["All", "Emergency Relief", "Education", "Healthcare", "Food Security", "Sanitation", "Winter Relief"];

  const filteredCampaigns = activeCategory === "All"
    ? campaignsList
    : campaignsList.filter((c: any) => c.category?.toLowerCase() === activeCategory.toLowerCase());

  const handleAction = (campaign: any, mode: "view" | "edit" | "delete") => {
    setSelectedCampaign(campaign);
    setActionMode(mode);
  };

  const handleDeleteCampaign = async (id: string | number) => {
    try {
      await deleteCampaignApi(id as any).unwrap();
    } catch (err) {
      setLocalCampaigns((prev) => prev.filter((c) => String(c.id) !== String(id)));
    }
  };

  const handleSaveCampaign = (updated: any) => {
    setLocalCampaigns((prev) =>
      prev.map((c) => (String(c.id) === String(updated.id) ? { ...c, ...updated } : c))
    );
  };

  const columns: Column<(typeof campaignsList)[0]>[] = [
    {
      header: "Campaign Name",
      cell: (row: any) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.title}</div>
          <div className="text-xs text-muted-foreground font-mono">{row.code || "CAMP-2026"}</div>
        </div>
      ),
    },
    { header: "Category", accessorKey: "category" },
    {
      header: "Target Goal",
      cell: (row: any) => <span className="font-bold text-foreground">{row.target}</span>,
    },
    {
      header: "Amount Raised",
      cell: (row: any) => <span className="font-bold text-primary">{row.raised}</span>,
    },
    {
      header: "Progress",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-muted h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${row.percentage}%` }} />
          </div>
          <span className="font-bold text-xs">{row.percentage}%</span>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (row: any) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.urgency === "emergency"
              ? "bg-red-500/10 text-red-600 border border-red-500/20"
              : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
          }`}
        >
          {row.urgency === "emergency" ? "Emergency" : "Active"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (row: any) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleAction(row, "view")}
            className="p-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
            title="Inspect Campaign Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleAction(row, "edit")}
            className="p-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
            title="Edit Campaign"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleAction(row, "delete")}
            className="p-1.5 rounded-lg bg-muted hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground transition-colors"
            title="Delete Campaign"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  const handleCreate = async (formData: Record<string, any>) => {
    try {
      await createCampaign(formData as any).unwrap();
    } catch (err) {
      setLocalCampaigns((prev) => [
        {
          id: String(Date.now()),
          title: formData.title || "New Humanitarian Appeal",
          category: formData.category || "Emergency Relief",
          percentage: 0,
          raised: "0",
          target: formData.targetAmount || "5,00,000",
          beneficiaries: 0,
          urgency: "normal",
        },
        ...prev,
      ]);
    } finally {
      setIsLaunchModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Campaigns" value={campaignsList.length} change="Verified appeals" icon={Flag} />
        <StatCard title="Total Funds Raised" value="৳ 1.25 Cr" change="+324k this month" icon={Target} />
        <StatCard title="Emergency Appeals" value="2 Urgent" change="Requires immediate action" isPositive={false} icon={AlertCircle} />
        <StatCard title="Total Beneficiaries" value="156,000" change="Nationwide coverage" icon={HeartHandshake} />
      </div>

      {/* Toolbar: Category Chips & View Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-3xl border border-border shadow-sm">
        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "table" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsCategoryModalOpen(true)}
            className="rounded-xl font-bold text-xs gap-1.5 border-border hover:bg-muted"
          >
            <Tag className="w-3.5 h-3.5 text-primary" /> Manage Categories
          </Button>

          <Button
            onClick={() => setIsLaunchModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl font-bold text-xs shadow-md shadow-primary/20"
          >
            <Plus className="w-4 h-4" /> Launch Campaign
          </Button>
        </div>
      </div>

      {/* View Content */}
      {viewMode === "grid" ? (
        <SupportedCampaigns
          layout="grid"
          title={`${activeCategory === "All" ? "All Active" : activeCategory} Campaigns & Appeals`}
          campaigns={filteredCampaigns}
        />
      ) : (
        <DataTable
          title="Humanitarian Campaigns & Appeals Master Table"
          description="Monitor emergency relief campaigns, fundraising progress, and goals"
          columns={columns}
          data={filteredCampaigns}
          isLoading={isLoading}
          searchPlaceholder="Search campaign by name, category or code..."
          searchField="title"
        />
      )}

      {/* Campaign Launch Form Modal */}
      <CampaignModalForm
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />

      {/* Prerequisite Campaign Category Manager Modal */}
      <CampaignCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />

      {/* Campaign Action Modal (View / Edit / Delete) */}
      <CampaignActionModal
        campaign={selectedCampaign}
        mode={actionMode}
        onClose={() => { setActionMode(null); setSelectedCampaign(null); }}
        onSave={handleSaveCampaign}
        onDelete={handleDeleteCampaign}
      />
    </div>
  );
}