import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  valueColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  valueColor 
}) => {
  return (
    <div className="bg-white dark:bg-[#1f1d1c] p-6 rounded-2xl border border-gray-100 dark:border-[#333] shadow-sm transition-colors duration-300">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className={`text-3xl font-bold font-serif ${valueColor || "text-black dark:text-white"}`}>
        {value}
      </p>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  );
};