import React from 'react';

const BudgetUtilization = ({ percentage = 79, spent = '198,000', total = '250,000' }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Monthly Budget Utilization</h3>
        <span className="font-bold text-gray-900">{percentage}%</span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-orange-100 rounded-full h-3 mb-4 overflow-hidden">
        <div 
          className="bg-orange-800 h-full rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Footer Details */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>Spent: ৳ {spent}</span>
        <span>Budget: ৳ {total}</span>
      </div>
    </div>
  );
};

export default BudgetUtilization;