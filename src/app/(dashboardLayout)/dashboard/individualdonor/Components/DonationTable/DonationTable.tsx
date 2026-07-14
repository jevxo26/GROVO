import React from 'react';

// ডাটা টাইপ ডিফাইন করা
export interface Donation {
  id: number;
  name: string;
  email: string;
  joined: string;
  donated: string;
  status: 'active' | 'pending';
  reward: string;
}

interface DonationTableProps {
  data: Donation[];
}

const DonationTable: React.FC<DonationTableProps> = ({ data }) => {
  return (
    <div className="w-full bg-[#FAF9F6] border border-stone-200 rounded-2xl p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs uppercase text-[#A0826C] font-bold tracking-wider">
            <th className="pb-6 px-2">Name</th>
            <th className="pb-6">Joined</th>
            <th className="pb-6">Total Donated</th>
            <th className="pb-6">Status</th>
            <th className="pb-6">Your Reward</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {data.map((row) => (
            <tr key={row.id} className="text-sm text-stone-900">
              <td className="py-5 px-2">
                <div className="font-semibold">{row.name}</div>
                <div className="text-stone-500 text-xs">{row.email}</div>
              </td>
              <td className="py-5 text-stone-700">{row.joined}</td>
              <td className="py-5 font-semibold">{row.donated}</td>
              <td className="py-5">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  row.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {row.status}
                </span>
              </td>
              <td className="py-5 font-semibold text-emerald-800">{row.reward}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationTable;