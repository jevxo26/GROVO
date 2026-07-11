import React from 'react';
import { CreditCard, ReceiptText, Award, HeartPulse } from 'lucide-react';

const actions = [
  { title: "Membership Card", desc: "View your digital membership card", icon: CreditCard, bg: "bg-teal-100 dark:bg-teal-900", text: "text-teal-700 dark:text-teal-300" },
  { title: "Donation Receipts", desc: "Download your tax receipts", icon: ReceiptText, bg: "bg-orange-100 dark:bg-orange-900", text: "text-orange-700 dark:text-orange-300" },
  { title: "Certificates", desc: "View your achievements", icon: Award, bg: "bg-green-100 dark:bg-green-900", text: "text-green-700 dark:text-green-300" },
  { title: "My Impact", desc: "See lives you've changed", icon: HeartPulse, bg: "bg-teal-100 dark:bg-teal-900", text: "text-teal-700 dark:text-teal-300" },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((item, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${item.bg}`}>
            <item.icon className={`w-6 h-6 ${item.text}`} />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};