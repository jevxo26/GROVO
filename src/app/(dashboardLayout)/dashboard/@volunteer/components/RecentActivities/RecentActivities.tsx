import React from 'react';
import { Check } from 'lucide-react';

interface Activity {
  title: string;
  date: string;
  location: string;
  points: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => (
  <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm flex-1">
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-bold text-gray-900 dark:text-gray-100">Recent Activities</h2>
      <button className="text-sm text-[#009688] hover:underline">View All</button>
    </div>
    <div className="space-y-4">
      {activities.map((act, i) => (
        <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-100 dark:border-[#2f2824] last:border-0">
          <div className="p-2 bg-gray-100 dark:bg-[#2f2824] rounded-lg">
            <Check className="w-4 h-4 text-[#009688]" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">{act.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {act.date} · {act.location} · <span className="font-semibold text-[#009688]">{act.points}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);