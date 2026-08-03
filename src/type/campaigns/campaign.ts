// types/campaign.ts

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CampaignCount {
  donations: number;
  projects: number;
  goals: number;
}

export interface Campaign {
  id: string;
  campaignCode: string;
  title: string;
  slug: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  campaignType: string;
  targetAmount: number;
  raisedAmount: number;
  startDate: string;
  endDate: string;
  thumbnail: string;
  banner: string;
  status: string;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  _count: CampaignCount;
}

export interface CampaignMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface CampaignResponse {
  success: boolean;
  message: string;
  data: {
    meta: CampaignMeta;
    data: Campaign[];
  };
}

export type CampaignStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";
export type CampaignType = "STANDARD" | "EMERGENCY" | "RECURRING";

export interface Campaign2 {
  id: string;
  campaignCode: string;
  title: string;
  slug: string;
  categoryId: string;
  campaignType: CampaignType;
  targetAmount: number;
  raisedAmount: number;
  startDate: Date;
  endDate: Date | null;
  status: CampaignStatus;
  createdAt: Date;
}
