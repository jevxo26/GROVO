import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CampaignCardProps {
  category: string;
  status: string;
  title: string;
  progress: number; // 0 to 100
  donatedCount: number;
  totalAmount: string;
  lastDate: string;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ 
  category, status, title, progress, donatedCount, totalAmount, lastDate 
}) => {
  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 bg-[#d1ede6] dark:bg-[#1b2a21] text-[#006d5b] dark:text-[#6ba97e] rounded-full text-xs font-medium">
          {category}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
          {status}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
      
      {/* Progress */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500 dark:text-gray-400">Progress</span>
        <span className="font-bold text-gray-900 dark:text-gray-100">{progress}%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-[#2f2824] h-2 rounded-full mb-6">
        <div className="bg-[#009688] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Details */}
      <div className="flex justify-between text-sm mb-6">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Donated {donatedCount}x</p>
          <p className="text-gray-500 dark:text-gray-400">Last: {lastDate}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 dark:text-gray-400">Total: {totalAmount}</p>
        </div>
      </div>

      <button className="flex items-center gap-2 text-[#8b4513] dark:text-[#d7a075] font-semibold text-sm hover:underline">
        View Campaign <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};