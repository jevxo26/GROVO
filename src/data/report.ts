export interface Report {
  id: string;
  title: string;
  description: string;
  amount: string;
}

export const reports: Report[] = [
  { id: '1', title: "Q2 2026 CSR Report", description: "Apr - Jun 2026 · School supplies for 480 students, clean water for 1,200 people", amount: "৳ 350,000" },
  { id: '2', title: "Q1 2026 CSR Report", description: "Jan - Mar 2026 · Medical camps served 850 patients, training for 120 women", amount: "৳ 250,000" },
  { id: '3', title: "Annual CSR Report 2025", description: "Jan - Dec 2025 · Total beneficiaries: 3,420 across 12 projects", amount: "৳ 850,000" },
];

export const reportData = [
  { id: '1', title: "Q2 2026 Impact Report", meta: "Apr - Jun 2026 · 45 beneficiaries · 3 projects", amount: "৳ 12,000" },
  { id: '2', title: "Q1 2026 Impact Report", meta: "Jan - Mar 2026 · 62 beneficiaries · 4 projects", amount: "৳ 15,000" },
  { id: '3', title: "Annual Impact Report 2025", meta: "Jan - Dec 2025 · 128 beneficiaries · 8 projects", amount: "৳ 21,500" },
];


