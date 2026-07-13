export interface StatItem {
  title: string;
  value: string;
  color?: string; // নির্দিষ্ট কালার চাইলে ব্যবহার করা যাবে
}

export const statsData: StatItem[] = [
  { title: "TOTAL CORPORATE", value: "৳ 1,025,000" },
  { title: "EMPLOYEE MATCH", value: "৳ 300,000", color: "text-[#006d5b]" },
  { title: "COMBINED IMPACT", value: "৳ 1,325,000", color: "text-[#6d7946]" },
];