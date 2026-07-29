export interface CampaignDetailsResponse {
  success: boolean;
  message: string;
  data: Campaign;
}

export interface Campaign {
  id: string;
  campaignCode: string;
  title: string;
  slug: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  campaignType: "EMERGENCY_RELIEF" | string;
  targetAmount: number;
  raisedAmount: number;
  startDate: string;
  endDate: string;
  thumbnail: string;
  banner: string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;

  category: Category;
  goals: Goal[];
  milestones: Milestone[];
  media: Media[];
  emergencyDetails: EmergencyDetails;

  _count: {
    donations: number;
  };

  progressPercentage: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  campaignId: string;
  goalTitle: string;
  targetAmount: number;
  currentAmount: number;
  progressPercentage: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  targetAmount: number;
  achievedAt: string;
  status: "PENDING" | "COMPLETED" | string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  campaignId: string;
  mediaType: "IMAGE" | "VIDEO" | string;
  title: string;
  fileUrl: string;
  thumbnail: string | null;
  uploadedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyDetails {
  id: string;
  campaignId: string;
  emergencyType: "FLOOD" | "FIRE" | string;
  priority: "LOW" | "MEDIUM" | "HIGH" | string;
  affectedArea: string;
  requiredAmount: number;
  currentAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}