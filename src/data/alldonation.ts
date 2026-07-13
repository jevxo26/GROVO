export interface Donation {
  id: string;
  campaign: string;
  amount: string;
  type: 'One Time' | 'Monthly';
  date: string;
  status: string;
}

export const allDonations: Donation[] = [
  { id: "DON-2026-0847", campaign: "Emergency Flood Relief – Sylhet", amount: "৳ 5,000", type: "One Time", date: "2026-07-08", status: "completed" },
  { id: "DON-2026-0782", campaign: "Education for Every Child", amount: "৳ 3,000", type: "One Time", date: "2026-06-25", status: "completed" },
  { id: "DON-2026-0691", campaign: "Food Security – Daily Meals", amount: "৳ 2,500", type: "Monthly", date: "2026-06-15", status: "completed" },
  { id: "DON-2026-0603", campaign: "Free Medical Camp", amount: "৳ 1,500", type: "One Time", date: "2026-05-20", status: "completed" },
  { id: "DON-2026-0512", campaign: "Winter Warmth Drive", amount: "৳ 2,000", type: "One Time", date: "2026-05-01", status: "completed" },
];