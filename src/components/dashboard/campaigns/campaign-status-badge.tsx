import { CampaignStatus } from "@/type/campaigns/campaign";

const statusStyles: Record<CampaignStatus, string> = {
  DRAFT: "bg-muted text-muted-foreground border-border",
  PUBLISHED: "bg-primary/10 text-primary border-primary/20",
  ACTIVE:
    "bg-sidebar-primary/20 text-sidebar-primary border-sidebar-primary/30",
  COMPLETED: "bg-secondary text-secondary-foreground border-border",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
};

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusStyles[status]}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
