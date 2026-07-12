// data/campaigns.ts

export interface Campaign {
  title: string;
  percentage: number;
  raised: string;
  target: string;
  beneficiaries: number;
}

export const campaigns: Campaign[] = [
  { 
    title: "Rahim Industries School Building", 
    percentage: 60, 
    raised: "210,000", 
    target: "350,000", 
    beneficiaries: 480 
  },
  { 
    title: "Clean Water Initiative - Dhaka", 
    percentage: 88, 
    raised: "175,000", 
    target: "200,000", 
    beneficiaries: 1200 
  },
  { 
    title: "Women Empowerment Training", 
    percentage: 100, 
    raised: "150,000", 
    target: "150,000", 
    beneficiaries: 340 
  },
];