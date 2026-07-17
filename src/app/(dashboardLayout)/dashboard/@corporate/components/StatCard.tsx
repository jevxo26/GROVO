import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBg: string; // যেমন: bg-emerald-100 dark:bg-emerald-950
  iconColor: string; // যেমন: text-emerald-700 dark:text-emerald-400
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, value, icon: Icon, iconBg, iconColor 
}) => {
  return (
    <div className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-border shadow-sm flex flex-col justify-between transition-colors">
      {/* টাইটেল এবং আইকন সেকশন */}
      <div className="flex justify-between items-start mb-6">
        <p className="text-xs font-semibold text-gray-500 dark:text-muted-foreground tracking-wider uppercase">
          {title}
        </p>
        <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
          <Icon size={18} />
        </div>
      </div>
      
      {/* ভ্যালু সেকশন */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground font-serif">
        {value}
      </h3>
    </div>
  );
};