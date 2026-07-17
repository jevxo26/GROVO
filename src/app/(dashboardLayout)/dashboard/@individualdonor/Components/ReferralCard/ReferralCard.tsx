"use client"
import React, { useState } from 'react';

interface ReferralCardProps {
  code: string;
  title?: string;
  description?: string;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ 
  code, 
  title = "Invite Friends, Earn Rewards", 
  description = "Share your referral code and earn 500 points for every friend who joins and donates." 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-teal-700 dark:bg-teal-900 p-6 rounded-2xl text-white w-full max-w-7xl">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-teal-50 text-sm mb-6">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-teal-800/50 px-4 py-3 rounded-lg border border-teal-600 font-mono tracking-wider">
          {code}
        </div>
        <button 
          onClick={handleCopy}
          className="bg-white dark:bg-teal-100 text-teal-700 dark:text-teal-900 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 dark:hover:bg-teal-200 transition flex items-center justify-center gap-2"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ReferralCard;