import React from 'react';

const BudgetUtilization = ({ percentage = 79, spent = '198,000', total = '250,000' }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Monthly Budget Utilization</h3>
        <span className="font-bold text-gray-900 dark:text-white">{percentage}%</span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-orange-100 dark:bg-gray-800 rounded-full h-3 mb-4 overflow-hidden">
        <div 
          className="bg-orange-800 dark:bg-orange-500 h-full rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Footer Details */}
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Spent: ৳ {spent}</span>
        <span>Budget: ৳ {total}</span>
      </div>
    </div>
  );
};

export default BudgetUtilization;