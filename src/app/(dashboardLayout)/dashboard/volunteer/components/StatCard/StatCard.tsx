import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;      // '?' যোগ করা হয়েছে
  icon?: LucideIcon;      // '?' যোগ করা হয়েছে
  iconBg?: string;        // '?' যোগ করা হয়েছে
  iconColor?: string;     // '?' যোগ করা হয়েছে
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconBg, 
  iconColor 
}) => {
  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm flex items-center gap-4 transition-colors">
      {Icon && (
        <div className={`p-3 rounded-xl ${iconBg || 'bg-gray-100'}`}>
          <Icon className={`w-6 h-6 ${iconColor || 'text-gray-600'}`} />
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};