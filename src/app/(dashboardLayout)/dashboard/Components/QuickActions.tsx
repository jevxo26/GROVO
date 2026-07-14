import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionItem {
  title: string;
  desc: string;
  icon: LucideIcon;
  bg: string; // যেমন: bg-emerald-100 dark:bg-emerald-950
  text: string; // যেমন: text-emerald-700 dark:text-emerald-400
}

interface QuickActionsProps {
  actions: ActionItem[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((item, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${item.bg}`}>
            <item.icon className={`w-6 h-6 ${item.text}`} />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-foreground mb-1">{item.title}</h3>
          <p className="text-sm text-gray-500 dark:text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};