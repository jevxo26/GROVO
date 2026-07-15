import React, { useState } from 'react';

interface Transaction {
  id: string;
  type: 'donation' | 'reward';
  description: string;
  amount: string;
  date: string;
  status: 'completed' | 'pending';
}

interface TransactionTableProps {
  data: Transaction[];
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Donation', 'Reward'];

  const filteredData = activeTab === 'All' 
    ? data 
    : data.filter(item => item.type === activeTab.toLowerCase());

  return (
    <div className="w-full bg-white dark:bg-card p-6 rounded-2xl border border-gray-100 dark:border-border shadow-sm">
      {/* Tabs */}
      <div className="flex gap-6 mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab 
                ? 'bg-[#efe9e6] dark:bg-accent text-[#8b4513] dark:text-foreground' 
                : 'text-gray-500 dark:text-muted-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 dark:text-muted-foreground text-sm border-b border-gray-50 dark:border-border">
              <th className="pb-4 font-normal">TYPE</th>
              <th className="pb-4 font-normal">DESCRIPTION</th>
              <th className="pb-4 font-normal">AMOUNT</th>
              <th className="pb-4 font-normal">DATE</th>
              <th className="pb-4 font-normal">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-border">
            {filteredData.map((item) => (
              <tr key={item.id} className="text-sm">
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1 ${
                    item.type === 'donation' 
                      ? 'bg-[#fbeae7] dark:bg-orange-950 text-[#8b4513] dark:text-orange-400' 
                      : 'bg-[#e7f3ef] dark:bg-emerald-950 text-[#2d7d6a] dark:text-emerald-400'
                  }`}>
                    {item.type === 'donation' ? '↓ donation' : '↑ reward'}
                  </span>
                </td>
                <td className="py-4 text-gray-700 dark:text-foreground">{item.description}</td>
                <td className={`py-4 font-bold ${
                  item.type === 'donation' 
                    ? 'text-gray-900 dark:text-foreground' 
                    : 'text-[#2d7d6a] dark:text-emerald-400'
                }`}>{item.amount}</td>
                <td className="py-4 text-gray-500 dark:text-muted-foreground">{item.date}</td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-muted text-gray-600 dark:text-muted-foreground text-xs">{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};