import { Filter, Search } from "lucide-react";

interface CampaignFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  disabled?: boolean;
}

export function CampaignFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  disabled,
}: CampaignFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="relative w-full sm:w-72">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          disabled={disabled}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-border bg-background text-foreground rounded-md focus:ring-2 focus:ring-ring focus:outline-none disabled:opacity-50 sm:text-sm transition-shadow"
          placeholder="Search by code or title..."
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <select
          disabled={disabled}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="block w-full sm:w-48 py-2 px-3 border border-border bg-background text-foreground rounded-md focus:ring-2 focus:ring-ring focus:outline-none disabled:opacity-50 sm:text-sm"
        >
          <option value="ALL">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  );
}
