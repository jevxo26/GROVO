import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
}

export const StatsCardFoter: React.FC<StatsCardProps> = ({ title, value, valueColor }) => {
  return (
    <div className="bg-white dark:bg-[#1f1d1c] p-6 rounded-2xl border border-gray-100 dark:border-[#333] shadow-sm flex flex-col items-center justify-center transition-colors duration-300">
      <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h3>
      <p className={`text-2xl font-bold font-serif ${valueColor || "text-black dark:text-white"}`}>
        {value}
      </p>
    </div>
  );
};