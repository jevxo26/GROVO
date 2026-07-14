import { RefreshCw, Clock, AlertCircle, Folder, LucideIcon } from "lucide-react";

export interface Task {
  id: number;
  icon: LucideIcon; // আইকন যোগ করা হয়েছে
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'in progress' | 'pending';
  assignedBy: string;
  due: string;
}

export const mytask: Task[] = [
  { 
    id: 1, 
    icon: RefreshCw, 
    title: 'Process 34 pending membership applications', 
    priority: 'high', 
    status: 'in progress', 
    assignedBy: 'Abdul Karim', 
    due: '2026-07-13' 
  },
  { 
    id: 2, 
    icon: Clock, 
    title: 'Prepare monthly donation reconciliation report', 
    priority: 'high', 
    status: 'pending', 
    assignedBy: 'Fatema Rahman', 
    due: '2026-07-15' 
  },
  { 
    id: 3, 
    icon: AlertCircle, 
    title: 'Update beneficiary database - Savar division', 
    priority: 'medium', 
    status: 'pending', 
    assignedBy: 'Abdul Karim', 
    due: '2026-07-18' 
  },
  { 
    id: 4, 
    icon: RefreshCw, 
    title: 'Coordinate Eid food package logistics', 
    priority: 'high', 
    status: 'in progress', 
    assignedBy: 'National Admin', 
    due: '2026-07-16' 
  },
  { 
    id: 5, 
    icon: Folder, 
    title: 'Archive completed project documents', 
    priority: 'low', 
    status: 'pending', 
    assignedBy: 'System', 
    due: '2026-07-25' 
  },
];