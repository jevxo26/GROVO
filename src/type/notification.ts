

export type NotificationType = 
  | "donation" 
  | "event" 
  | "campaign" 
  | "certificate" 
  | "membership" 
  | "volunteer" 
  | "tax" 
  | "meeting" 
  | "report";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  type: NotificationType;
}