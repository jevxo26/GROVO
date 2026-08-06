"use client";

import React from "react";
import { Settings, Shield, Bell, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoordinatorSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-foreground tracking-tight">
            Jurisdiction & Account Settings
          </h2>
          <p className="text-xs text-muted-foreground">Manage administrative preferences, security settings, and notifications</p>
        </div>
      </div>

      {/* Security & Access */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm space-y-4">
        <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Security & Two-Factor Authentication
        </h3>
        <p className="text-xs text-muted-foreground">Configure multi-factor login verification for coordinator account safety</p>
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <span className="text-sm font-medium text-foreground">Two-Factor Authentication (2FA)</span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Enabled</span>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm space-y-4">
        <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" /> Notification Alerts
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-1 border-b border-border/30">
            <span className="text-foreground">Member Registration Alerts</span>
            <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
          </div>
          <div className="flex items-center justify-between py-1 border-b border-border/30">
            <span className="text-foreground">Emergency Appeal Broadcasts</span>
            <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-foreground">Daily Activity Digest</span>
            <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-6">
          Save Settings
        </Button>
      </div>
    </div>
  );
}