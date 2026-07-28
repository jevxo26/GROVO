"use client";

import React from "react";
import { Plus, Calendar, Clock, MapPin, Pencil, Send, BookOpen, Star, CalendarDays } from "lucide-react";

export default function CoordinatorAnnouncements() {
  const announcementsData = [
    {
      title: "Emergency flood relief meeting",
      priority: "high",
      date: "2026-07-12",
      time: "10:00 AM",
      location: "Savar Upazila Office",
      icon: CalendarDays,
    },
    {
      title: "Monthly volunteer training session",
      priority: "medium",
      date: "2026-07-15",
      time: "02:00 PM",
      location: "Tetuljhora Community Center",
      icon: BookOpen,
    },
    {
      title: "Eid food package distribution",
      priority: "high",
      date: "2026-07-18",
      time: "08:00 AM",
      location: "All union centers",
      icon: Star,
    },
    {
      title: "Beneficiary registration deadline",
      priority: "high",
      date: "2026-07-20",
      time: "05:00 PM",
      location: "Online",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800 dark:text-slate-100">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Home <span className="mx-1">›</span> Announcements
      </div>

      {/* Header with Title and Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">
          Upcoming Events & Announcements
        </h3>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {announcementsData.map((item, index) => {
          const LeftIcon = item.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-lime-50 dark:bg-lime-950/40 text-lime-700 dark:text-lime-400 shrink-0">
                  <LeftIcon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.priority === "high"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                  title="Send / Broadcast"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}