import React from 'react';

interface BalanceCardProps {
  availableBalance: string | number;
  rewardPoints: string | number;
  monthlyPledge: string | number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  availableBalance,
  rewardPoints,
  monthlyPledge,
}) => {
  return (
    <div className="w-full bg-[#00897b] p-8 rounded-2xl text-white shadow-lg">
      <p className="text-sm font-medium opacity-90 mb-1">Available Balance</p>
      <h2 className="text-4xl font-bold mb-8">৳ {availableBalance}</h2>
      
      <div className="flex items-center gap-8 border-t border-white/20 pt-4">
        <div>
          <p className="text-xs opacity-70 mb-1">Reward Points</p>
          <p className="font-semibold text-lg">{rewardPoints}</p>
        </div>
        <div className="h-8 w-0.5 bg-white/20"></div>
        <div>
          <p className="text-xs opacity-70 mb-1">Monthly Pledge</p>
          <p className="font-semibold text-lg">৳ {monthlyPledge}</p>
        </div>
      </div>
    </div>
  );
};