"use client";
import React, { useState } from 'react';
import MyTask from '../Components/MyTask/MyTask';

const MyTaskPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'In Progress', 'Pending'];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeTab === tab
                ? 'bg-[#f5ece7] text-[#8c6d57] font-medium'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <MyTask activeTab={activeTab} />
    </div>
  );
};

export default MyTaskPage;