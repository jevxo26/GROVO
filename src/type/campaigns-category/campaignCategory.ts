// types/campaignCategory.ts

export type Status = "ACTIVE" | "INACTIVE";

export interface CampaignCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  _count: {
    campaigns: number;
  };
}

export interface CampaignCategoryResponse {
  success: boolean;
  message: string;
  data: CampaignCategory[];
}