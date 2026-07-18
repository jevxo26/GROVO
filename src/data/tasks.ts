import { Task } from "@/app/(dashboardLayout)/dashboard/@staf/Components/TaskList/TaskList";
import { RefreshCw, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

export const myTasksData: Task[] = [
  { 
    id: 1, 
    icon: RefreshCw, 
    title: "Process 34 pending membership applications", 
    assignedBy: "Abdul Karim", 
    dueDate: "2026-07-13", 
    priority: "high" 
  },
  { 
    id: 2, 
    icon: Clock, 
    title: "Prepare monthly donation reconciliation report", 
    assignedBy: "Fatema Rahman", 
    dueDate: "2026-07-15", 
    priority: "high" 
  },
  { 
    id: 3, 
    icon: AlertCircle, 
    title: "Update beneficiary database - Savar division", 
    assignedBy: "Abdul Karim", 
    dueDate: "2026-07-18", 
    priority: "medium" 
  },
  { 
    id: 4, 
    icon: RefreshCw, 
    title: "Coordinate Eid food package logistics", 
    assignedBy: "National Admin", 
    dueDate: "2026-07-16", 
    priority: "high" 
  },
  { 
    id: 5, 
    icon: CheckCircle2, 
    title: "Review volunteer training manual", 
    assignedBy: "Fatema Rahman", 
    dueDate: "2026-07-20", 
    priority: "low" 
  },
];
