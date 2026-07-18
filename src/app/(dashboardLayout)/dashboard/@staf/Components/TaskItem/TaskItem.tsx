import React from "react";
import { LucideIcon } from "lucide-react";

interface TaskItemProps {
  icon: LucideIcon;
  title: string;
  assignedBy: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

export const TaskItem: React.FC<TaskItemProps> = ({ icon: Icon, title, assignedBy, dueDate, priority }) => {
  const priorityColors = {
    high: "bg-orange-50 text-orange-700",
    medium: "bg-teal-50 text-teal-700",
    low: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">Assigned by: {assignedBy} · Due: {dueDate}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
        {priority}
      </span>
    </div>
  );
};