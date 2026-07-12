import React from 'react';
import { actionItems } from '@/data/quickActions';

export const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actionItems.map((item, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          {/* ইমেজের মতো আইকন কন্টেইনার */}
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${item.bg}`}>
            <item.icon className={`w-6 h-6 ${item.text}`} />
          </div>
          
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};