import { Project } from '@/data/project';
import React from 'react';

export const ProjectCard = ({ project }: { project: Project }) => {
  const isCompleted = project.status === 'completed';

  return (
    <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm transition-colors duration-300">
      
      {/* Header: Title & Status */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
        <h3 className="text-lg font-bold text-[#2a2a2a] dark:text-gray-100">{project.title}</h3>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase self-start ${
          isCompleted 
            ? 'bg-[#eef2ef] dark:bg-[#1b2a21] text-[#4a7c59] dark:text-[#6ba97e]' 
            : 'bg-[#fdfcf9] dark:bg-[#2f2824] text-[#a0522d] dark:text-[#d7a077]'
        }`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{project.dateRange}</p>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 dark:bg-[#2f2824] h-2 rounded-full mb-6 overflow-hidden">
        <div className="bg-[#6d7946] h-full" style={{ width: `${project.progress}%` }}></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        {[
          { label: "Budget", value: project.budget },
          { label: "Beneficiaries", value: project.beneficiaries },
          { label: "Volunteers", value: project.volunteers },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#fdfcf9] dark:bg-[#201d1c] py-2 rounded-lg border border-[#f5f0ed] dark:border-[#2f2824]">
            <p className="text-sm font-bold text-[#2a2a2a] dark:text-gray-200">{item.value}</p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button className="w-full py-2 bg-[#eef2ef] dark:bg-[#202e25] text-[#4a7c59] dark:text-[#6ba97e] font-medium rounded-lg hover:bg-[#dce6dc] dark:hover:bg-[#2d3e33] transition-colors duration-300">
        View Project Details
      </button>
    </div>
  );
};