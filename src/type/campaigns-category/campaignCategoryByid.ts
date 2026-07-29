/**
 * Single Campaign (adjust fields later if needed)
 */
export interface Campaign {
  id: string;
  title?: string;
  description?: string;
  goalAmount?: number;
  raisedAmount?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Campaign Category Data
 */
export interface CampaignCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  campaigns: Campaign[];
}

/**
 * Main API Response
 */
export interface CampaignCategoryResponse {
  success: boolean;
  message: string;
  data: CampaignCategory;
}