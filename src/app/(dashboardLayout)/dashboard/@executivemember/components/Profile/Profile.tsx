"use client";

import { Pencil, User, Shield, Mail, Phone, Calendar, CreditCard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";

export const Profile = () => {
  const { data: profileRes } = useGetUserProfileQuery();
  const user = profileRes?.data || profileRes;

  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User Profile";
  const email = user?.email || "user@ashray.org";
  const phone = user?.phoneNumber || "+880 1700-000000";
  const memberNo = user?.membership?.[0]?.membershipCardNumber || user?.membershipCardNumber || "ASH-MEM-2026-0847";
  const memberType = user?.role || "Member";
  const userInitials = fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "US";

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-card text-card-foreground p-6 md:p-8 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-24 h-24 border-2 border-primary/20 shadow-md">
          <AvatarImage src={user?.profilePhoto} alt={fullName} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
            {userInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{fullName}</h1>
              <p className="text-sm font-semibold text-muted-foreground capitalize mt-0.5">
                {memberType} · <span className="font-mono text-primary">{memberNo}</span>
              </p>
            </div>
            <Button variant="outline" className="gap-2 rounded-xl border-border">
              <Pencil className="w-4 h-4" /> Edit Profile
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
            {["Verified Member", "Monthly Donor", "Education Supporter"].map((b) => (
              <span key={b} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold">
                ✓ {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-foreground text-base flex items-center gap-2 border-b border-border/50 pb-3">
            <User className="w-4 h-4 text-primary" /> Personal Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground flex items-center gap-2"><Mail className="w-4 h-4" /> Email:</span>
              <span className="font-semibold text-foreground">{email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground flex items-center gap-2"><Phone className="w-4 h-4" /> Phone:</span>
              <span className="font-semibold text-foreground">{phone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground flex items-center gap-2"><Shield className="w-4 h-4" /> Status:</span>
              <span className="font-bold text-emerald-600 uppercase text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Active Verified</span>
            </div>
          </div>
        </div>

        {/* Membership Details */}
        <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-foreground text-base flex items-center gap-2 border-b border-border/50 pb-3">
            <CreditCard className="w-4 h-4 text-primary" /> Membership Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Joined:</span>
              <span className="font-semibold text-foreground">2024-03-15</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Valid Until:</span>
              <span className="font-semibold text-foreground">2027-03-15</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Membership Tier:</span>
              <span className="font-bold text-primary uppercase text-xs px-2 py-0.5 rounded bg-primary/10 border border-primary/20">{memberType}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};