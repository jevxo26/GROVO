import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bgColor: string; // আইকন ব্যাকগ্রাউন্ডের জন্য
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, bgColor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
      <div className={`p-3 rounded-xl mb-4 ${bgColor}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};