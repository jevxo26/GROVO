// ==============================
// Main API Response
// ==============================
export interface GetCampaignByIdResponse {
  success: boolean;
  message: string;
  data: Campaign;
}

// ==============================
// Main Campaign
// ==============================
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

  status: "ACTIVE" | "INACTIVE" | "COMPLETED" | string;

  createdBy: string | null;
  createdAt: string;
  updatedAt: string;

  // relations
  category: Category;
  goals: Goal[];
  milestones: Milestone[];
  media: Media[];
  emergencyDetails: EmergencyDetails | null;
  projects: Project[];

  _count: Count;

  // computed
  progressPercentage: number;
}

// ==============================
// Category
// ==============================
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
}

// ==============================
// Goals
// ==============================
export interface Goal {
  id: string;
  campaignId: string;
  goalTitle: string;
  targetAmount: number;
  currentAmount: number;
  progressPercentage: number;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
}

// ==============================
// Milestones
// ==============================
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

// ==============================
// Media
// ==============================
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

// ==============================
// Emergency Details
// ==============================
export interface EmergencyDetails {
  id: string;
  campaignId: string;
  emergencyType: "FLOOD" | "FIRE" | "EARTHQUAKE" | string;
  priority: "LOW" | "MEDIUM" | "HIGH" | string;
  affectedArea: string;
  requiredAmount: number;
  currentAmount: number;
  status: "ACTIVE" | "RESOLVED" | string;
  createdAt: string;
  updatedAt: string;
}

// ==============================
// Projects
// ==============================
export interface Project {
  id: string;
  projectCode: string;
  projectName: string;
  status: "PLANNED" | "ONGOING" | "COMPLETED" | string;
}

// ==============================
// Count
// ==============================
export interface Count {
  donations: number;
}