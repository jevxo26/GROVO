"use client";

import React, { useState } from "react";

export default function CoordinatorBranchSettings() {
  const [formData, setFormData] = useState({
    branchName: "Savar District Office",
    phone: "+880 2-7799-1234",
    address: "Plot 12, Road 5, Savar, Dhaka",
    email: "savar@ashray.org",
    workingHours: "09:00 - 17:00",
    workingDays: "Sun - Thu",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Branch settings updated successfully!");
  };

  const handleReset = () => {
    setFormData({
      branchName: "Savar District Office",
      phone: "+880 2-7799-1234",
      address: "Plot 12, Road 5, Savar, Dhaka",
      email: "savar@ashray.org",
      workingHours: "09:00 - 17:00",
      workingDays: "Sun - Thu",
    });
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-foreground max-w-4xl">
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>Home</span> <span>›</span> <span className="text-foreground font-medium">Branch Settings</span>
      </div>

      <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl border border-border shadow-sm space-y-6">
        <h3 className="font-bold text-foreground text-base border-b border-border pb-4 tracking-tight">
          Branch Information
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Branch Name
              </label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Working Hours
              </label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:w-1/2 sm:pr-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Working Days
            </label>
            <input
              type="text"
              name="workingDays"
              value={formData.workingDays}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}