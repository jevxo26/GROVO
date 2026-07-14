// src/data/stats.ts

export interface StatItem {
  title: string;
  value: string | number;
  description?: string;
  valueColor?: string; // এখন এটিই সব জায়গায় ব্যবহৃত হবে
}

export const statsData: StatItem[] = [
  { title: "TOTAL CORPORATE", value: "৳ 1,025,000" },
  { title: "EMPLOYEE MATCH", value: "৳ 300,000", valueColor: "text-[#006d5b]" },
  { title: "COMBINED IMPACT", value: "৳ 1,325,000", valueColor: "text-[#6d7946]" },
];

export const stafstatedata: StatItem[] = [
  { title: "TOTAL TASKS", value: 5, description: "Assigned to you", valueColor: "text-black" },
  { title: "IN PROGRESS", value: 2, description: "Currently active", valueColor: "text-teal-600" },
  { title: "PENDING", value: 3, description: "Not started", valueColor: "text-amber-700" },
  { title: "MEMBERS", value: "49K", description: "In branch", valueColor: "text-black" },
];

export const summaryStats = [
  { title: "Members", value: "48.5K" },
  { title: "Volunteers", value: "3.2K" },
  { title: "Campaigns", value: 6 },
  { title: "Monthly Budget", value: "৳ 250K" },
  { title: "Staff", value: 24 },
  { title: "Pending Tasks", value: 12, valueColor: "text-teal-600" },
];