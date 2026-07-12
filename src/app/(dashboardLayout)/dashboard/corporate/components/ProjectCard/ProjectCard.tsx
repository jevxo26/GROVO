import { Project } from '@/data/project';
import React from 'react';

export const ProjectCard = ({ project }: { project: Project }) => {
  const isCompleted = project.status === 'completed';

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#efe9e6] shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-[#2a2a2a]">{project.title}</h3>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isCompleted ? 'bg-[#eef2ef] text-[#4a7c59]' : 'bg-[#eef2ef] text-[#4a7c59]'}`}>
          {project.status}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-4">{project.dateRange}</p>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2 rounded-full mb-6 overflow-hidden">
        <div className="bg-[#6d7946] h-full" style={{ width: `${project.progress}%` }}></div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        <div className="bg-[#fdfcf9] py-2 rounded-lg"><p className="text-sm font-bold">{project.budget}</p><p className="text-[10px] text-gray-400">Budget</p></div>
        <div className="bg-[#fdfcf9] py-2 rounded-lg"><p className="text-sm font-bold">{project.beneficiaries}</p><p className="text-[10px] text-gray-400">Beneficiaries</p></div>
        <div className="bg-[#fdfcf9] py-2 rounded-lg"><p className="text-sm font-bold">{project.volunteers}</p><p className="text-[10px] text-gray-400">Volunteers</p></div>
      </div>

      <button className="w-full py-2 bg-[#eef2ef] text-[#4a7c59] font-medium rounded-lg hover:bg-[#dce6dc] transition">
        View Project Details
      </button>
    </div>
  );
};