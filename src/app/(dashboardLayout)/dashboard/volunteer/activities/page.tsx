import React from 'react';
import { Check, Clock, Plus } from 'lucide-react';

interface Activity {
  title: string;
  date: string;
  location: string;
  points?: number;
  status: 'approved' | 'pending';
}

const activitiesData: Activity[] = [
  { title: "Registered 5 new members in Savar Union", date: "2026-07-09", location: "Savar, Dhaka", points: 50, status: 'approved' },
  { title: "Secured 3 new monthly donors for Education Campaign", date: "2026-07-07", location: "Dhamrai, Dhaka", points: 45, status: 'approved' },
  { title: "Beneficiary verification visit - 12 families assessed", date: "2026-07-05", location: "Ashulia, Dhaka", points: 60, status: 'approved' },
  { title: "Assisted in Winter Warmth blanket distribution", date: "2026-06-28", location: "Savar, Dhaka", points: 80, status: 'approved' },
  { title: "Uploaded 47 photos from Medical Camp event", date: "2026-06-20", location: "Dhamrai, Dhaka", points: 25, status: 'approved' },
  { title: "Monthly activity report for June 2026", date: "2026-07-01", location: "Dhaka District", points: 30, status: 'pending' },
];

const Activities = () => {
  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-[#120f0d] min-h-screen transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-gray-600 dark:text-gray-300">
          Total activities: <span className="font-bold text-gray-900 dark:text-white">8</span> · 
          Total points: <span className="font-bold text-gray-900 dark:text-white">445</span>
        </h1>
        <button className="flex items-center gap-2 bg-[#009688] text-white px-4 py-2 rounded-lg hover:bg-[#00796b] transition-colors">
          <Plus size={18} /> Submit Activity
        </button>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-[#1a1716] rounded-2xl border border-gray-100 dark:border-[#2f2824] shadow-sm overflow-hidden">
        {activitiesData.map((act, i) => (
          <div key={i} className="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-[#2f2824] last:border-0 hover:bg-gray-50 dark:hover:bg-[#201d1c] transition-colors">
            <div className={`p-2 rounded-lg ${act.status === 'approved' ? 'bg-green-100 dark:bg-[#1b2a21] text-green-600' : 'bg-orange-100 dark:bg-[#2a251b] text-orange-600'}`}>
              {act.status === 'approved' ? <Check size={20} /> : <Clock size={20} />}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{act.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{act.date} · {act.location}</p>
            </div>

            <div className="text-right">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${act.status === 'approved' ? 'bg-green-100 dark:bg-[#1b2a21] text-green-600' : 'bg-orange-100 dark:bg-[#2a251b] text-orange-600'}`}>
                {act.status}
              </span>
              <p className="font-bold text-[#009688] mt-1">+{act.points} pts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;