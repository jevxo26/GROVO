"use client";
import React from 'react';
import { HiOutlineCheckCircle, HiOutlineDocumentReport, HiOutlineDatabase, HiOutlineLink, HiOutlineFolder } from 'react-icons/hi';

interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'in progress' | 'pending';
  assignedBy: string;
  due: string;
}

const tasks: Task[] = [
  { id: 1, title: 'Process 34 pending membership applications', priority: 'high', status: 'in progress', assignedBy: 'Abdul Karim', due: '2026-07-13' },
  { id: 2, title: 'Prepare monthly donation reconciliation report', priority: 'high', status: 'pending', assignedBy: 'Fatema Rahman', due: '2026-07-15' },
  { id: 3, title: 'Update beneficiary database - Savar division', priority: 'medium', status: 'pending', assignedBy: 'Abdul Karim', due: '2026-07-18' },
  { id: 4, title: 'Coordinate Eid food package logistics', priority: 'high', status: 'in progress', assignedBy: 'National Admin', due: '2026-07-16' },
  { id: 5, title: 'Archive completed project documents', priority: 'low', status: 'pending', assignedBy: 'System', due: '2026-07-25' },
];

const getIcon = (id: number) => {
  switch (id) {
    case 1: return <HiOutlineCheckCircle />;
    case 2: return <HiOutlineDocumentReport />;
    case 3: return <HiOutlineDatabase />;
    case 4: return <HiOutlineLink />;
    default: return <HiOutlineFolder />;
  }
};

const MyTask = ({ activeTab }: { activeTab: string }) => {
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'In Progress') return task.status === 'in progress';
    return task.status === 'pending';
  });

  return (
    <div className="flex flex-col gap-4">
      {filteredTasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg text-gray-500 text-xl">
              {getIcon(task.id)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <span className="text-[10px] uppercase px-2 py-0.5 bg-orange-50 text-orange-600 rounded">
                  {task.priority}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Assigned by: {task.assignedBy} · Due: {task.due}</p>
            </div>
          </div>

          <div>
            {task.status === 'in progress' ? (
              <span className="text-xs text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase">in progress</span>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase">pending</span>
                <button className="text-xs text-teal-600 bg-teal-50 px-4 py-1 rounded hover:bg-teal-100">Start</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTask;