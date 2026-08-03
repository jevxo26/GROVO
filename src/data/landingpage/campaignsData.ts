import { CampaignProps } from "@/components/shared/CampaignCard";

// Details Page এর অতিরিক্ত ডাটা টাইপ
export interface CampaignDetailProps extends CampaignProps {
  beneficiaries?: string;
  recentSupporters?: {
    id: number;
    name: string;
    amount: string;
  }[];
}

export const categories: string[] = [
  "All",
  "Emergency Relief",
  "Education",
  "Medical",
  "Food",
  "Winter Relief",
  "Orphan Support",
];

export const allCampaigns: CampaignDetailProps[] = [
  {
    id: "1",
    title: "Emergency Flood Relief – Sylhet Division",
    description:
      "Providing immediate food, clean water, shelter materials, and medical aid to families affected by severe flooding in the Sylhet region. Your contribution directly reaches those in desperate need.",
    category: "Emergency Relief",
    isUrgent: true,
    raised: "BDT 342,750",
    goal: "BDT 500,000",
    percentage: 69,
    daysLeft: 15,
    helpedCount: "12,500",
    beneficiaries: "12,500",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000",
    recentSupporters: [
      { id: 1, name: "Ahmed K.", amount: "BDT 5,000" },
      { id: 2, name: "Fatima R.", amount: "BDT 10,000" },
      { id: 3, name: "Anonymous", amount: "BDT 25,000" },
      { id: 4, name: "Rahman Foundation", amount: "BDT 50,000" },
      { id: 5, name: "Kamala B.", amount: "BDT 3,000" },
      { id: 6, name: "Anonymous", amount: "BDT 15,000" },
    ],
  },
  {
    id: "2",
    title: "Education for Every Child – Rural Schools Program",
    description:
      "Building classrooms, providing textbooks, school supplies, and scholarships for underprivileged rural students across northern districts.",
    category: "Education",
    isUrgent: false,
    raised: "BDT 219,000",
    goal: "BDT 350,000",
    percentage: 62,
    daysLeft: 24,
    helpedCount: "8,500",
    beneficiaries: "8,500",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000",
    recentSupporters: [
      { id: 1, name: "Tanvir H.", amount: "BDT 2,000" },
      { id: 2, name: "Nusrat Jahan", amount: "BDT 5,000" },
      { id: 3, name: "Anonymous", amount: "BDT 10,000" },
    ],
  },
  {
    id: "3",
    title: "Free Medical Camp – Rural Health Access",
    description:
      "Setting up mobile medical camps in remote villages to provide free checkups, essential medicines, and basic healthcare services.",
    category: "Medical",
    isUrgent: false,
    raised: "BDT 156,000",
    goal: "BDT 200,000",
    percentage: 78,
    daysLeft: 8,
    helpedCount: "3,400",
    beneficiaries: "3,400",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000",
    recentSupporters: [
      { id: 1, name: "Dr. Alim", amount: "BDT 15,000" },
      { id: 2, name: "Care Corp", amount: "BDT 30,000" },
    ],
  },
  {
    id: "4",
    title: "Nutritious Food Packages for Families",
    description:
      "Distributing monthly dry ration food packs containing rice, lentils, oil, and essentials to needy households.",
    category: "Food",
    isUrgent: false,
    raised: "BDT 90,000",
    goal: "BDT 150,000",
    percentage: 60,
    daysLeft: 15,
    helpedCount: "500",
    beneficiaries: "500",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000",
    recentSupporters: [
      { id: 1, name: "Sajid M.", amount: "BDT 1,500" },
      { id: 2, name: "Anonymous", amount: "BDT 5,000" },
    ],
  },
  {
    id: "5",
    title: "Winter Warmth Campaign – Warm Clothes",
    description:
      "Distributing heavy blankets and warm winter clothing to cold-stricken northern districts of Bangladesh.",
    category: "Winter Relief",
    isUrgent: false,
    raised: "BDT 110,000",
    goal: "BDT 250,000",
    percentage: 44,
    daysLeft: 18,
    helpedCount: "920",
    beneficiaries: "920",
    image:
      "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2000",
    recentSupporters: [
      { id: 1, name: "Rafiq A.", amount: "BDT 4,000" },
    ],
  },
  {
    id: "6",
    title: "Orphan Education & Support Fund",
    description:
      "Sponsoring living costs, accommodation, healthcare, and formal education for orphaned children.",
    category: "Orphan Support",
    isUrgent: false,
    raised: "BDT 280,000",
    goal: "BDT 400,000",
    percentage: 70,
    daysLeft: 30,
    helpedCount: "150",
    beneficiaries: "150",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2000",
    recentSupporters: [
      { id: 1, name: "Kazi Family", amount: "BDT 20,000" },
      { id: 2, name: "Anonymous", amount: "BDT 50,000" },
    ],
  },
];