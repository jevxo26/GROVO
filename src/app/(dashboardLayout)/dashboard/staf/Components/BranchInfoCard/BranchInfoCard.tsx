import React from 'react';
import { Building2 } from 'lucide-react'; // আইকনের জন্য lucide-react ব্যবহার করা হয়েছে

const BranchInfoCard = () => {
  const stats = [
    { label: 'Total Staff', value: '24' },
    { label: 'Total Members', value: '48.5K' },
    { label: 'Total Volunteers', value: '3.2K' },
    { label: 'Active Campaigns', value: '6' },
    { label: 'Monthly Budget', value: '৳ 250K' },
    { label: 'Pending Tasks', value: '12', highlight: true },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-orange-50 rounded-xl">
          <Building2 className="w-6 h-6 text-orange-900" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">National Headquarters</h2>
          <p className="text-sm text-gray-500">BR-HQ-001</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 bg-orange-50/50 rounded-xl border border-orange-50">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.highlight ? 'text-teal-600' : 'text-gray-900'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchInfoCard;