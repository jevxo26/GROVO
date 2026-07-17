import React from 'react';
import { statsData } from '@/data/stats';
import { cn } from '@/lib/utils';

export const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsData.map((stat, index) => (
        <div 
          key={index} 
          className="bg-[#fdfcf9] p-6 rounded-2xl border border-[#efe9e6] shadow-sm"
        >
          {/* টাইটেল: আপারকেস এবং ছোট ফন্ট সাইজ */}
          <p className="text-[10px] md:text-[12px] tracking-widest font-bold text-[#a0522d] mb-2">
            {stat.title}
          </p>
          
          {/* ভ্যালু: ইমেজের স্টাইল অনুযায়ী কালার এবং সাইজ */}
          <h3 className={cn("text-3xl font-bold font-serif","text-[#2a2a2a]")}>
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
};