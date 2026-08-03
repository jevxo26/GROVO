// src/components/ui/NotificationIcon.tsx
import React from "react";
import { NotificationType } from "@/type/notification";
import { 
  HeartHandshake, 
  Calendar, 
  Megaphone, 
  Award, 
  UserCheck, 
  Users, 
  FileText, 
  Clock, 
  BarChart3 
} from "lucide-react";

interface Props {
  type: NotificationType;
}

export const NotificationIcon = ({ type }: Props) => {
  const iconMap: Record<NotificationType, { icon: React.ReactNode; bg: string; color: string }> = {
    donation: {
      icon: <HeartHandshake className="w-5 h-5" />,
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    event: {
      icon: <Calendar className="w-5 h-5" />,
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    campaign: {
      icon: <Megaphone className="w-5 h-5" />,
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    certificate: {
      icon: <Award className="w-5 h-5" />,
      bg: "bg-amber-100 dark:bg-amber-950/40",
      color: "text-amber-600 dark:text-amber-400",
    },
    membership: {
      icon: <UserCheck className="w-5 h-5" />,
      bg: "bg-slate-100 dark:bg-slate-800",
      color: "text-slate-600 dark:text-slate-400",
    },
    volunteer: {
      icon: <Users className="w-5 h-5" />,
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    tax: {
      icon: <FileText className="w-5 h-5" />,
      bg: "bg-slate-100 dark:bg-slate-800",
      color: "text-slate-600 dark:text-slate-400",
    },
    meeting: {
      icon: <Clock className="w-5 h-5" />,
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    report: {
      icon: <BarChart3 className="w-5 h-5" />,
      bg: "bg-emerald-100 dark:bg-emerald-950/40",
      color: "text-emerald-600 dark:text-emerald-400",
    },
  };

  const config = iconMap[type] || iconMap.donation;

  return (
    <div className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 ${config.bg} ${config.color}`}>
      {config.icon}
    </div>
  );
};