import React from 'react';

interface InfoItem {
  label: string;
  value: string;
}

interface InfoCardProps {
  title: string;
  data: InfoItem[];
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, data }) => (
  <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm">
    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-wider text-sm">{title}</h3>
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);