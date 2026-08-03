"use client";

import { CampaignFilters } from "@/components/dashboard/campaigns/campaign-filter";
import { CampaignTable } from "@/components/dashboard/campaigns/campaign-table";
import { useState } from "react";

export default function CampaignsPage() {
  const { data, isLoading, error, refetch } = useCampaigns(); // Your custom hook
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">
        Campaign Management
      </h1>

      <CampaignFilters
        searchQuery={search}
        setSearchQuery={setSearch}
        statusFilter={status}
        setStatusFilter={setStatus}
        disabled={isLoading || !!error}
      />

      <CampaignTable
        campaigns={data}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </div>
  );
}
