import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, value, label }) => (
  <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm flex flex-col items-center justify-center transition-colors">
    <div className="p-3 bg-[#d1ede6] dark:bg-[#1b2a21] text-[#009688] rounded-xl mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
  </div>
);