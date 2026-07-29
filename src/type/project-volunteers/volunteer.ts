export interface ProjectVolunteer {
  id?: string;
  projectId: string;
  volunteerId: string;
  assignedDate?: string;
  assignedEndDate?: string;
  completionStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VolunteerResponse {
  success: boolean;
  message: string;
  data: ProjectVolunteer | ProjectVolunteer[];
}