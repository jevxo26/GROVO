import { TrendingUp, Smile, CheckCircle, Building2, PieChart, FileText, Image as ImageIcon } from 'lucide-react';

export interface ImpactStat {
  id: number;
  value: string;
  label: string;
  icon: any;
}

export interface FundAllocation {
  id: number;
  category: string;
  percentage: number;
  amount: string;
  color: string;
  barColor: string;
}

export interface TransparencyReport {
  id: number;
  month: string;
  donations: string;
  expenses: string;
  projects: number;
  beneficiaries: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
}

export const impactStatsData: ImpactStat[] = [
  { id: 1, value: 'BDT 125.0L+', label: 'Total Raised', icon: TrendingUp },
  { id: 2, value: '156K+', label: 'Beneficiaries', icon: Smile },
  { id: 3, value: '120+', label: 'Projects Completed', icon: CheckCircle },
  { id: 4, value: '42', label: 'Branches Active', icon: Building2 },
];

export const fundAllocationData: FundAllocation[] = [
  { id: 1, category: 'Emergency Relief', percentage: 28, amount: 'BDT 3,500,000', color: 'bg-[#058235]', barColor: 'bg-[#058235]' },
  { id: 2, category: 'Education Support', percentage: 22, amount: 'BDT 2,750,000', color: 'bg-[#65a30d]', barColor: 'bg-[#65a30d]' },
  { id: 3, category: 'Medical Assistance', percentage: 18, amount: 'BDT 2,250,000', color: 'bg-[#16a34a]', barColor: 'bg-[#16a34a]' },
  { id: 4, category: 'Food Distribution', percentage: 15, amount: 'BDT 1,875,000', color: 'bg-[#84cc16]', barColor: 'bg-[#84cc16]' },
  { id: 5, category: 'Orphan Support', percentage: 10, amount: 'BDT 1,250,000', color: 'bg-[#a3e635]', barColor: 'bg-[#a3e635]' },
  { id: 6, category: 'Admin & Operations', percentage: 7, amount: 'BDT 875,000', color: 'bg-emerald-300', barColor: 'bg-emerald-300' },
];

export const monthlyReportsData: TransparencyReport[] = [
  { id: 1, month: 'June 2026', donations: 'BDT 1,850,000', expenses: 'BDT 1,620,000', projects: 12, beneficiaries: '18,500' },
  { id: 2, month: 'May 2026', donations: 'BDT 2,100,000', expenses: 'BDT 1,950,000', projects: 15, beneficiaries: '22,000' },
  { id: 3, month: 'April 2026', donations: 'BDT 1,750,000', expenses: 'BDT 1,580,000', projects: 10, beneficiaries: '16,800' },
  { id: 4, month: 'March 2026', donations: 'BDT 2,300,000', expenses: 'BDT 2,100,000', projects: 18, beneficiaries: '25,000' },
  { id: 5, month: 'February 2026', donations: 'BDT 1,950,000', expenses: 'BDT 1,780,000', projects: 14, beneficiaries: '19,800' },
  { id: 6, month: 'January 2026', donations: 'BDT 2,200,000', expenses: 'BDT 2,000,000', projects: 16, beneficiaries: '23,000' },
];

export const galleryImagesData: GalleryItem[] = [
  { id: 1, title: 'Relief Distribution', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Medical Camp', imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Children Education', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Shelter Support', imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Winter Clothing', imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'School Supplies', imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop' },
  { id: 7, title: 'Tree Plantation', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop' },
  { id: 8, title: 'Clean Water Project', imageUrl: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=800&auto=format&fit=crop' },
];