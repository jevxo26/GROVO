import { DataStateView } from "@/components/shared/data-state-view/data-state-view";
import { Campaign2 } from "@/type/campaigns/campaign";
import { CampaignStatusBadge } from "./campaign-status-badge";

interface CampaignTableProps {
  campaigns: Campaign2[];
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

// Reusable table skeleton
const TableSkeleton = () => (
  <div className="w-full border border-border rounded-lg overflow-hidden bg-card">
    <div className="h-12 border-b border-border bg-muted/50"></div>
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="h-16 border-b border-border bg-card p-4 flex gap-4"
      >
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-4 bg-muted rounded w-1/4"></div>
      </div>
    ))}
  </div>
);

export function CampaignTable({
  campaigns,
  isLoading,
  error,
  onRetry,
}: CampaignTableProps) {
  return (
    <DataStateView
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      skeleton={<TableSkeleton />}
    >
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full text-sm text-left text-card-foreground">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Raised / Target</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No campaigns found.
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="border-b border-border hover:bg-muted/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">
                      {campaign.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {campaign.campaignCode}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {campaign.campaignType}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">
                        ${campaign.raisedAmount.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        of ${campaign.targetAmount.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <CampaignStatusBadge status={campaign.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-foreground hover:bg-primary px-3 py-1.5 rounded-md transition-colors border border-primary/20">
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DataStateView>
  );
}
