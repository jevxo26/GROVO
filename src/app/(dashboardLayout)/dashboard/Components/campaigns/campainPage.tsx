"use client";

import { useState } from "react";
import { Flag, Target, HeartHandshake, AlertCircle } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { CampaignModalForm } from "@/components/dashboard/campaigns/CampaignModalForm";
import { campaignsData } from "@/data/campaignsData";
import { useGetCampaignCategoriesQuery, useCreateCampaignMutation } from "@/redux/slices/campaignSlice";

export default function CampaignsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // RTK Query hooks
  const { data: apiResponse, isLoading } = useGetCampaignCategoriesQuery();
  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();

  const rawData = apiResponse;
  const campaignsList = Array.isArray(rawData) && rawData.length > 0
    ? rawData.map((c: any, idx: number) => ({
        id: String(c.id || idx + 1),
        name: c.title || c.name || "Campaign Title",
        code: `CAMP-${100 + idx}`,
        category: c.category || "Emergency Relief",
        target: c.goal || 500000,
        raised: c.raised || 0,
        progress: c.percentage || 0,
        donors: c.helpedCount || 0,
        status: "active",
      }))
    : campaignsData;

  const columns: Column<(typeof campaignsList)[0]>[] = [
    {
      header: "Campaign Name",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground font-mono">{row.code}</div>
        </div>
      ),
    },
    { header: "Category", accessorKey: "category" },
    {
      header: "Target Goal",
      cell: (row) => <span className="font-bold text-foreground">{row.target}</span>,
    },
    {
      header: "Amount Raised",
      cell: (row) => <span className="font-bold text-primary">{row.raised}</span>,
    },
    {
      header: "Progress",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-muted h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${row.progress}%` }} />
          </div>
          <span className="font-bold text-xs">{row.progress}%</span>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            row.status === "active"
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-amber-500/10 text-amber-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const handleCreate = async (formData: Record<string, any>) => {
    try {
      await createCampaign(formData as any).unwrap();
    } catch (err) {
      console.log("Submitting campaign:", formData);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Campaigns" value={campaignsList.length} change="12 total" icon={Flag} />
        <StatCard title="Total Raised" value="৳ 1.25 Cr" change="+324k this month" icon={Target} />
        <StatCard title="Emergency Appeals" value="3 Active" change="High Priority" isPositive={false} icon={AlertCircle} />
        <StatCard title="Total Beneficiaries" value="156,000" change="Nationwide" icon={HeartHandshake} />
      </div>

      {/* Data Table */}
      <DataTable
        title="Humanitarian Campaigns & Appeals"
        description="Create, monitor and manage emergency relief campaigns and project goals"
        columns={columns}
        data={campaignsList}
        isLoading={isLoading}
        searchPlaceholder="Search campaign by name, category or code..."
        searchField="name"
        onAddClick={() => setIsModalOpen(true)}
        addButtonLabel="Launch Campaign"
      />

      {/* Modal */}
      <CampaignModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />
    </div>
  );
}