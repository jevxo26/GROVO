export interface CampaignStatistics {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalTargetAmount: number;
  totalRaisedAmount: number;
}

export interface CampaignStatisticsResponse {
  success: boolean;
  message: string;
  data: CampaignStatistics;
}