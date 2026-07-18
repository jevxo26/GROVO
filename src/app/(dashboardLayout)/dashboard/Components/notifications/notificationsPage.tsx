"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Send } from "lucide-react";

export default function NotificationsPage() {
  const tabs = ["Templates", "Broadcast", "History"];
  
  const templates = [
    { id: "1", name: "New donation received", type: "push", audience: "All roles", lastUsed: "2026-07-10", status: "active" },
    { id: "2", name: "Membership approval", type: "email", audience: "Coordinators", lastUsed: "2026-07-08", status: "active" },
    { id: "3", name: "Emergency alert", type: "push", audience: "All", lastUsed: "2026-07-05", status: "active" },
    { id: "4", name: "Monthly performance report", type: "email", audience: "Volunteers", lastUsed: "2026-07-01", status: "active" },
    { id: "5", name: "Campaign milestone", type: "in_app", audience: "Donors", lastUsed: "2026-06-28", status: "draft" },
    { id: "6", name: "Distribution reminder SMS", type: "sms", audience: "Coordinators", lastUsed: "2026-06-20", status: "draft" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Toolbar */}
      <div className="flex gap-2 bg-muted/30 p-1 rounded-xl w-max border border-border">
        {tabs.map((tab, i) => (
          <button 
            key={i} 
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${i === 0 ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Template Name</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Audience</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Used</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</TableHead>
                <TableHead className="py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id} className="hover:bg-muted/50 border-border group transition-colors">
                  <TableCell className="py-4 font-bold text-foreground">{template.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-normal capitalize bg-muted/20 text-muted-foreground`}>
                      {template.type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{template.audience}</TableCell>
                  <TableCell className="text-muted-foreground">{template.lastUsed}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-normal capitalize ${
                      template.status === 'active' ? 'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-500/10 dark:border-teal-500/20' :
                      'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20'
                    }`}>
                      {template.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 ">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
