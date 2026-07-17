import React from 'react';

interface PerformanceData {
  month: string;
  points: number;
  acts: number;
  mem: number;
  don: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  // সর্বোচ্চ পয়েন্ট খুঁজে বের করা যাতে প্রোগ্রেস বার ক্যালকুলেট করা যায়
  const maxPoints = Math.max(...data.map(d => d.points));

  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm transition-colors">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-8">
        Monthly Performance History
      </h2>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-20 text-sm text-gray-500 dark:text-gray-400 font-medium">
              {item.month}
            </span>
            
            <div className="flex-1 h-10 bg-gray-100 dark:bg-[#2f2824] rounded-full relative overflow-hidden flex items-center px-4">
              {/* প্রোগ্রেস বার */}
              <div 
                className="absolute left-0 top-0 h-full bg-[#009688] rounded-full transition-all duration-500"
                style={{ width: `${(item.points / maxPoints) * 100}%` }}
              />
              
              {/* কন্টেন্ট */}
              <span className="relative z-10 text-xs font-bold text-white whitespace-nowrap">
                {item.points} pts
              </span>
              <span className="relative z-10 text-xs text-white/90 ml-auto whitespace-nowrap">
                {item.acts} acts · {item.mem} mem · {item.don} don
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};