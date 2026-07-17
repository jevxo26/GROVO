import React from 'react';

const stats = [
  { title: "Total Donated", value: "৳ 32,000" },
  { title: "Total Donations", value: "8" },
  { title: "Campaigns Supported", value: "6" },
];

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-border shadow-sm transition-colors duration-300"
        >
          <p className="text-sm text-gray-500 dark:text-muted-foreground mb-2">
            {stat.title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-foreground font-serif">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
};