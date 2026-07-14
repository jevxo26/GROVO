import React from 'react';

// Props এর টাইপ ডিফাইন করা
interface BadgeCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  date: string;
  color: string;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ icon, title, desc, date, color }) => {
  return (
    <div className={`border ${color} p-6 rounded-2xl flex flex-col justify-between shadow-sm`}>
      <div>
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 border">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{desc}</p>
      </div>
      <div className="flex justify-between items-center mt-6">
        <span className="text-gray-500 text-sm">{date}</span>
        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium border hover:bg-gray-100 transition">
          Download
        </button>
      </div>
    </div>
  );
};

export default BadgeCard;