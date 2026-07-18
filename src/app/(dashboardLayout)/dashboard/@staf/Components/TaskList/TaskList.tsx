import React from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import { LucideIcon } from "lucide-react";

export interface Task {
  id: string | number;
  icon: LucideIcon;
  title: string;
  assignedBy: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

interface TaskListProps {
  title: string;
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ title, tasks }) => {
  return (
    // dark:bg-[#1f1d1c] এবং dark:border-[#333] যোগ করা হয়েছে
    <div className="bg-white dark:bg-[#1f1d1c] rounded-2xl border border-gray-100 dark:border-[#333] shadow-sm overflow-hidden transition-colors duration-300">
      
      {/* হেডার সেকশন */}
      <div className="p-5 flex justify-between items-center border-b border-gray-100 dark:border-[#333]">
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
        <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          View All
        </button>
      </div>

      {/* টাস্ক লিস্ট */}
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};