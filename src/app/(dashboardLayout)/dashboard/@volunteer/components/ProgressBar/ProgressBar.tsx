import React from 'react';

interface ProgressBarProps {
  score: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ score }) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xs font-semibold text-gray-400 tracking-wider">PERFORMANCE SCORE</h2>
      <span className="bg-[#d1ede6] text-[#006d5b] dark:bg-[#1b2a21] dark:text-[#6ba97e] px-3 py-1 rounded-full text-sm font-semibold">Gold Rank</span>
    </div>
    
    <div className="mb-2">
      <span className="text-5xl font-light text-gray-900 dark:text-gray-100">{score}</span>
      <span className="text-lg text-gray-400 ml-1">/ 100</span>
    </div>

    {/* Bar */}
    <div className="flex h-2 w-full gap-1 mt-6">
      <div className="flex-1 bg-[#b36b4d] rounded-full" />
      <div className="flex-1 bg-[#dcd7ce] rounded-full" />
      <div className="flex-1 bg-[#009688] rounded-full" />
      <div className="flex-1 bg-[#00796b] rounded-full" />
      <div className="flex-1 bg-[#efe9e6] dark:bg-[#2f2824] rounded-full" />
    </div>
    
    <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
      <span>0</span>
      <span>Bronze</span>
      <span>Silver</span>
      <span>Gold</span>
      <span>Platinum</span>
    </div>
  </div>
);