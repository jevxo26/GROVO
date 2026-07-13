import React from 'react';

interface PerformanceData {
  month: string;
  points: number;
}

interface MonthlyPerformanceProps {
  data: PerformanceData[];
}

export const MonthlyPerformance: React.FC<MonthlyPerformanceProps> = ({ data }) => {
  const maxPoints = Math.max(...data.map(d => d.points));

  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm flex-1">
      <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-8">Monthly Performance</h2>
      <div className="space-y-6">
        {data.map((item) => (
          <div key={item.month} className="flex items-center gap-4">
            <span className="w-20 text-sm text-gray-500 dark:text-gray-400">{item.month}</span>
            <div className="flex-1 h-8 bg-gray-100 dark:bg-[#2f2824] rounded-full relative overflow-hidden flex items-center px-3">
              <div 
                className="absolute left-0 top-0 h-full bg-[#009688] rounded-full"
                style={{ width: `${(item.points / maxPoints) * 100}%` }}
              />
              <span className="relative z-10 text-xs font-bold text-white">{item.points}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};