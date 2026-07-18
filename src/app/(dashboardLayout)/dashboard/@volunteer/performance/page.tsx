import React from "react";
import { ProgressBar } from "../components/ProgressBar/ProgressBar";
import { StatCard } from "../components/StatCard/StatCard";
import { PerformanceChart } from "../components/PerformanceChart/PerformanceChart";

const performanceData = [
  { month: "Jan 2026", points: 285, acts: 18, mem: 14, don: 6 },
  { month: "Feb 2026", points: 320, acts: 22, mem: 12, don: 8 },
  { month: "Mar 2026", points: 410, acts: 28, mem: 19, don: 5 },
  { month: "Apr 2026", points: 360, acts: 24, mem: 15, don: 7 },
  { month: "May 2026", points: 445, acts: 31, mem: 16, don: 4 },
  { month: "Jun 2026", points: 395, acts: 26, mem: 11, don: 4 },
  { month: "Jul 2026", points: 230, acts: 15, mem: 8, don: 3 },
];
const Performance: React.FC = () => {
  return (
    <div className="p-6 md:p-10 space-y-6 bg-gray-50 dark:bg-[#120f0d] min-h-screen transition-colors">
      {/* Top Performance Card */}
      <div className="bg-white dark:bg-[#1a1716] p-8 rounded-3xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm">
        <ProgressBar score={94} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Members Registered" value={87} />
        <StatCard title="Donors Registered" value={34} />
        <StatCard title="Activities Done" value={156} />
        <StatCard title="Next Rank" value="Platinum" />
      </div>
      <div>
        <PerformanceChart data={performanceData} />
      </div>
    </div>
  );
};

export default Performance;
