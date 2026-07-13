import React from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import { LucideIcon } from "lucide-react"; // lucide-react থেকে টাইপটি ইম্পোর্ট করুন

export interface Task {
  id: string | number;
  icon: LucideIcon; // এখানে any এর পরিবর্তে LucideIcon ব্যবহার করুন
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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 flex justify-between items-center border-b border-gray-100">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <button className="text-sm text-gray-600 hover:text-gray-900">View All</button>
      </div>
      <div>
        {tasks.map((task) => (
          // এখানে সঠিকভাবে টাইপ করা task পাস হচ্ছে
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};