"use client";

import React, { useState } from "react";
import { X, Eye, Edit3, Trash2, CheckCircle2, AlertTriangle, ShieldCheck, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CampaignActionModalProps {
  campaign: any;
  mode: "view" | "edit" | "delete" | null;
  onClose: () => void;
  onSave?: (updated: any) => void;
  onDelete?: (id: string | number) => void;
}

export function CampaignActionModal({
  campaign,
  mode,
  onClose,
  onSave,
  onDelete,
}: CampaignActionModalProps) {
  const [formData, setFormData] = useState({
    title: campaign?.title || "",
    category: campaign?.category || "Emergency Relief",
    target: campaign?.target || "5,00,000",
    urgency: campaign?.urgency || "normal",
    status: campaign?.status || "active",
  });

  if (!mode || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground w-full max-w-xl rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              mode === "delete" ? "bg-rose-500/10 text-rose-500" : "bg-primary/10 text-primary"
            }`}>
              {mode === "view" && <Eye className="w-5 h-5" />}
              {mode === "edit" && <Edit3 className="w-5 h-5" />}
              {mode === "delete" && <Trash2 className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-foreground">
                {mode === "view" && "Campaign Inspection"}
                {mode === "edit" && "Edit Campaign Appeal"}
                {mode === "delete" && "Delete Campaign Confirmation"}
              </h2>
              <p className="text-xs text-muted-foreground">ID: {campaign.id || campaign.code || "CAMP-2026"}</p>
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
              <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20">
                  {campaign.category}
                </span>
                <h3 className="text-base font-extrabold text-foreground">{campaign.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Verified humanitarian appeal. Goal progress: {campaign.percentage || 75}%. Target Goal: {campaign.target}. Amount Raised: {campaign.raised}.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-background border border-border">
                  <span className="text-muted-foreground block text-[10px]">Beneficiaries Impacted</span>
                  <span className="font-bold text-foreground text-sm">{campaign.beneficiaries || 12500} People</span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border">
                  <span className="text-muted-foreground block text-[10px]">Urgency Status</span>
                  <span className="font-bold text-primary text-sm uppercase">{campaign.urgency || "Normal"}</span>
                </div>
              </div>
            </div>
          )}

          {mode === "edit" && (
            <form onSubmit={(e) => { e.preventDefault(); onSave?.({ ...campaign, ...formData }); onClose(); }} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 block">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-foreground mb-1 block">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-foreground mb-1 block">Target Goal (BDT)</label>
                  <input
                    type="text"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={onClose} className="rounded-xl text-xs font-bold">Cancel</Button>
                <Button type="submit" className="bg-primary text-primary-foreground text-xs font-bold rounded-xl px-5">Save Changes</Button>
              </div>
            </form>
          )}

          {mode === "delete" && (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">Delete Campaign Appeal?</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                  Are you sure you want to delete <span className="font-bold text-foreground">"{campaign.title}"</span>? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="outline" onClick={onClose} className="rounded-xl text-xs font-bold">Cancel</Button>
                <Button
                  onClick={() => { onDelete?.(campaign.id); onClose(); }}
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
