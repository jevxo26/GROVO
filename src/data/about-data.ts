import { HeartHandshake, Users, UserCheck, Globe, MapPin, Flag, LucideIcon } from 'lucide-react';

export interface StatCard {
  id: number;
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface HierarchyItem {
  id: number;
  title: string;
  positions: string;
}

export const statsData: StatCard[] = [
  { id: 1, value: 'BDT 125.0L+', label: 'Total Donations', icon: HeartHandshake },
  { id: 2, value: '48.5K+', label: 'Donors', icon: Users },
  { id: 3, value: '3,200+', label: 'Volunteers', icon: UserCheck },
  { id: 4, value: '156K+', label: 'Beneficiaries', icon: Globe },
  { id: 5, value: '42', label: 'Active Branches', icon: MapPin },
  { id: 6, value: '6', label: 'Campaigns', icon: Flag },
];

export const hierarchyData: HierarchyItem[] = [
  { id: 1, title: 'Chairman', positions: '1' },
  { id: 2, title: 'Board of Directors', positions: '7' },
  { id: 3, title: 'National Admin', positions: '1' },
  { id: 4, title: 'Division Coordinators', positions: '8' },
  { id: 5, title: 'District Coordinators', positions: '64' },
  { id: 6, title: 'Upazila Coordinators', positions: '492' },
  { id: 7, title: 'Union Coordinators', positions: '3,200' },
  { id: 8, title: 'Volunteers', positions: '12,500' },
];