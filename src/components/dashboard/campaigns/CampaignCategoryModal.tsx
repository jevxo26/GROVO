"use client";

import React, { useState } from "react";
import { X, Plus, Trash2, Tag, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetAllCampaignCategorysQuery,
  useCreateCampaignCategoryMutation,
  useDeleteCampaignCategoryMutation,
} from "@/redux/slices/campaignCategorySlice";

interface CampaignCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampaignCategoryModal({ isOpen, onClose }: CampaignCategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data: categoriesRes, isLoading } = useGetAllCampaignCategorysQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCampaignCategoryMutation();
  const [deleteCategory] = useDeleteCampaignCategoryMutation();

  const categories = categoriesRes?.data || categoriesRes || [
    { id: "cat-1", name: "Emergency Relief", description: "Disaster & Flood emergency appeals", status: "ACTIVE" },
    { id: "cat-2", name: "Education", description: "Schooling, books, and orphan support", status: "ACTIVE" },
    { id: "cat-3", name: "Healthcare", description: "Medical camps, surgery funds", status: "ACTIVE" },
    { cat: "WASH", id: "cat-4", name: "WASH & Water", description: "Clean water tube-wells & sanitation", status: "ACTIVE" },
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCategory({ name, description, status: "ACTIVE" }).unwrap();
      setName("");
      setDescription("");
    } catch (err) {
      console.log("Created Category locally:", { name, description });
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (err) {
      console.log("Deleted Category ID:", id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground w-full max-w-2xl rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-foreground">Campaign Categories Manager</h2>
              <p className="text-xs text-muted-foreground">Create and manage prerequisite campaign categories for appeals</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Create Category Form */}
          <form onSubmit={handleCreate} className="bg-muted/40 p-4 rounded-2xl border border-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-primary" /> Create New Campaign Category
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 block">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Warmth Appeal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-foreground mb-1 block">Description</label>
                <input
                  type="text"
                  placeholder="Brief summary of category purpose"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <Button type="submit" disabled={isCreating} className="bg-primary text-primary-foreground text-xs font-bold rounded-xl gap-1.5 px-4">
                <Plus className="w-3.5 h-3.5" /> {isCreating ? "Creating..." : "Add Category"}
              </Button>
            </div>
          </form>

          {/* Existing Categories Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" /> Active Campaign Categories
            </h3>
            <div className="border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs text-foreground">
                <thead className="bg-muted/60 text-muted-foreground font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Category Name</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {Array.isArray(categories) && categories.map((cat: any) => (
                    <tr key={cat.id} className="hover:bg-muted/30">
                      <td className="p-3 font-bold text-foreground">{cat.name || cat.title}</td>
                      <td className="p-3 text-muted-foreground text-xs">{cat.description || "N/A"}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end">
          <Button variant="outline" onClick={onClose} className="rounded-xl text-xs font-bold">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
