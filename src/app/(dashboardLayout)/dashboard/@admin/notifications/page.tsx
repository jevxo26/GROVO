// import React from 'react';
// import NotificationsPage from '../../Components/notifications/notificationsPage';

// const page = () => {
//   return <NotificationsPage />
// };

// export default page;

// src/app/(dashboardLayout)/dashboard/notifications/page.tsx

// old code


"use client";

import { useState } from "react";
import { dummyNotifications } from "@/data/notificationsData";
import { NotificationItem } from "@/type/notification";
import { CheckCheck } from "lucide-react";
import { NotificationIcon } from "@/components/ui/notification-page/NotificationIcon";

export default function NotificationsPage() {
  // TODO: Replace dummyNotifications with API / Redux state when ready
  // const { data: notifications, isLoading } = useGetNotificationsQuery();
  const [notifications, setNotifications] = useState<NotificationItem[]>(dummyNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  // Filtering Logic
  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread") return !item.isRead;
    return true;
  });

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const handleMarkAllAsRead = () => {
    // API Call placeholder: await markAllReadApi();
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={handleMarkAllAsRead}
          className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          Mark All Read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${
            filter === "all"
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-1.5 text-sm rounded-md font-medium transition-colors ${
            filter === "unread"
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 text-slate-500 border rounded-lg bg-slate-50/50">
            No notifications to display.
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                !notification.isRead
                  ? "bg-emerald-50/20 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/30"
                  : "bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800"
              }`}
            >
              <NotificationIcon type={notification.type} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {notification.description}
                </p>

                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 block">
                  {notification.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}