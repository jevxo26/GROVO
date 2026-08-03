"use client";

import React, { useState } from "react";
import { Plus, Calendar, Clock, MapPin, Pencil, Send, BookOpen, Star, CalendarDays, X } from "lucide-react";

export default function CoordinatorAnnouncements() {
  const [showForm, setShowForm] = useState(false);

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
    <div className="space-y-6 pb-12 font-sans text-foreground">
      <div className="text-sm text-muted-foreground">
        Home <span className="mx-1">›</span> <span className="text-foreground font-medium">Announcements</span>
      </div>

      {/* Header with Title and Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm">
        <h3 className="font-bold text-foreground text-base tracking-tight">
          Upcoming Events & Announcements
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-semibold transition-all hover:opacity-90 shadow-sm cursor-pointer shrink-0"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Close Form" : "New Announcement"}
        </button>
      </div>

      {/* Toggleable Create Announcement Form */}
      {showForm && (
        <div className="bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-md space-y-4 transition-all animate-in fade-in slide-in-from-top-4">
          <h4 className="font-bold text-foreground text-sm">
            Create Announcement
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              className="px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <input
              type="date"
              className="px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <input
              type="time"
              className="px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <select className="px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option>Event</option>
              <option>Announcement</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option>Medium Priority</option>
              <option>High Priority</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-semibold transition-opacity hover:opacity-90 shadow-sm cursor-pointer">
              Publish
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 bg-accent text-accent-foreground rounded-xl text-xs font-semibold transition-opacity hover:opacity-85 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-3">
        {announcementsData.map((item, index) => {
          const LeftIcon = item.icon;
          return (
            <div
              key={index}
              className="bg-card text-card-foreground p-5 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-primary/40 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-accent text-primary shrink-0 transition-transform group-hover:scale-105">
                  <LeftIcon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 className="font-bold text-foreground text-sm sm:text-base">
                      {item.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.priority === "high"
                          ? "bg-primary/15 text-primary border border-primary/20"
                          : "bg-accent text-accent-foreground border border-border"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  className="w-8 h-8 rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-xs cursor-pointer"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all shadow-xs cursor-pointer"
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