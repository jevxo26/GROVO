import React from 'react';
import { Download, LucideIcon } from 'lucide-react';

interface CertificateCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  date: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ 
  icon: Icon, title, description, date 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white dark:bg-[#1a1716] border border-[#d1ede6] dark:border-[#2f2824] rounded-2xl shadow-sm transition-colors duration-300 gap-4">
      <div className="flex items-center gap-4 w-full">
        <div className="p-3 bg-[#d1ede6] dark:bg-[#1b2a21] text-[#006d5b] dark:text-[#6ba97e] rounded-xl">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-sm w-full md:w-auto justify-between md:justify-end">
        <span className="text-gray-500 dark:text-gray-400">{date}</span>
        <button className="flex items-center gap-2 text-[#8b4513] dark:text-[#d7a075] font-semibold hover:underline">
          <Download className="w-4 h-4" /> Download
        </button>
      </div>
    </div>
  );
};