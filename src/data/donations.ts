// data/donations.ts
export interface Donation {
  title: string;
  date: string;
  id: string;
  amount: string;
  status: string;
}

export const donations: Donation[] = [
  { title: "Emergency Flood Relief – Sylhet", date: "2026-07-08", id: "DON-2026-0847", amount: "৳ 5,000", status: "completed" },
  { title: "Education for Every Child", date: "2026-06-25", id: "DON-2026-0782", amount: "৳ 3,000", status: "completed" },
  { title: "Food Security – Daily Meals", date: "2026-06-15", id: "DON-2026-0691", amount: "৳ 2,500", status: "completed" },
  { title: "Free Medical Camp", date: "2026-05-20", id: "DON-2026-0603", amount: "৳ 1,500", status: "completed" },
];