export interface Project {
  id: string;
  title: string;
  dateRange: string;
  progress: number;
  budget: string;
  beneficiaries: number;
  volunteers: number;
  status: 'active' | 'completed';
}

export const projects: Project[] = [
  { id: '1', title: "Rahim Industries School Building", dateRange: "2026-01-01 - 2026-12-31", progress: 60, budget: "৳ 350K", beneficiaries: 480, volunteers: 25, status: 'active' },
  { id: '2', title: "Clean Water Initiative - Dhaka", dateRange: "2026-02-01 - 2026-11-30", progress: 88, budget: "৳ 200K", beneficiaries: 1200, volunteers: 18, status: 'active' },
  { id: '3', title: "Women Empowerment Training", dateRange: "2025-06-01 - 2026-03-31", progress: 100, budget: "৳ 150K", beneficiaries: 340, volunteers: 12, status: 'completed' },
];