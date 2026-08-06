"use client";

import React, { useState } from "react";
import { X, Eye, Edit3, Trash2, CheckCircle2, XCircle, UserCheck, Shield, Phone, Mail, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemberActionModalProps {
  member: any;
  mode: "view" | "edit" | "delete" | "approve" | "reject" | null;
  onClose: () => void;
  onSave?: (updated: any) => void;
  onDelete?: (id: string | number) => void;
  onStatusChange?: (id: string | number, newStatus: string) => void;
}

export function MemberActionModal({
  member,
  mode,
  onClose,
  onSave,
  onDelete,
  onStatusChange,
}: MemberActionModalProps) {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    phone: member?.phone || "",
    email: member?.email || "",
    type: member?.type || "General Member",
    district: member?.district || "Dhaka",
    status: member?.status || "active",
  });

  if (!mode || !member) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground w-full max-w-xl rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                mode === "delete" || mode === "reject"
                  ? "bg-rose-500/10 text-rose-500"
                  : mode === "approve"
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {mode === "view" && <Eye className="w-5 h-5" />}
              {mode === "edit" && <Edit3 className="w-5 h-5" />}
              {mode === "delete" && <Trash2 className="w-5 h-5" />}
              {mode === "approve" && <CheckCircle2 className="w-5 h-5" />}
              {mode === "reject" && <XCircle className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-foreground">
                {mode === "view" && "Member Profile Details"}
                {mode === "edit" && "Edit Member Information"}
                {mode === "delete" && "Delete Member Record"}
                {mode === "approve" && "Approve Membership Application"}
                {mode === "reject" && "Reject Membership Application"}
              </h2>
              <p className="text-xs text-muted-foreground font-mono">
                {member.membership || `ASH-MEM-${member.id}`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          {mode === "view" && (
            <div className="space-y-4 text-xs">
              {/* Member Badge Header */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-foreground">{member.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20">
                      {member.type}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        member.status === "active"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : member.status === "pending"
                          ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-md shadow-primary/25">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-background border border-border flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Phone Number</span>
                    <span className="font-semibold text-foreground">{member.phone}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground block">District / Location</span>
                    <span className="font-semibold text-foreground">{member.district}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Membership ID</span>
                    <span className="font-mono font-bold text-primary">{member.membership}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Joined Date</span>
                    <span className="font-semibold text-foreground">{member.joined}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === "edit" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSave?.({ ...member, ...formData });
                onClose();
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 block">Member Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-foreground mb-1 block">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-foreground mb-1 block">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-foreground mb-1 block">Membership Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                  >
                    <option value="General Member">General Member</option>
                    <option value="Executive Member">Executive Member</option>
                    <option value="Individual Donor">Individual Donor</option>
                    <option value="Corporate Donor">Corporate Donor</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-foreground mb-1 block">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={onClose} className="rounded-xl text-xs font-bold">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground text-xs font-bold rounded-xl px-5">
                  Save Member Changes
                </Button>
              </div>
            </form>
          )}

          {(mode === "approve" || mode === "reject") && (
            <div className="space-y-4 text-center py-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                  mode === "approve" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-500"
                }`}
              >
                {mode === "approve" ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">
                  {mode === "approve" ? "Approve Member Application?" : "Reject Membership Application?"}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                  {mode === "approve"
                    ? `Approve ${member.name}'s application for ${member.type}? This will generate their official digital membership ID and card.`
                    : `Reject ${member.name}'s application? The applicant will be notified of the status decision.`}
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="outline" onClick={onClose} className="rounded-xl text-xs font-bold">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onStatusChange?.(member.id, mode === "approve" ? "active" : "suspended");
                    onClose();
                  }}
                  className={`text-white text-xs font-bold rounded-xl px-5 ${
                    mode === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  Confirm {mode === "approve" ? "Approval" : "Rejection"}
                </Button>
              </div>
            </div>
          )}

          {mode === "delete" && (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">Delete Member Account?</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                  Are you sure you want to permanently delete member <span className="font-bold text-foreground">"{member.name}"</span> ({member.membership})?
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="outline" onClick={onClose} className="rounded-xl text-xs font-bold">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onDelete?.(member.id);
                    onClose();
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl px-5"
                >
                  Confirm Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
