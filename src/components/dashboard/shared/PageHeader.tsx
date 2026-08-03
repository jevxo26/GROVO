"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";

interface PageHeaderAction {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: PageHeaderAction;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border bg-background px-6 py-5",
        className
      )}
    >
      {/* Left: Title & Description */}
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Right: Action button or custom children */}
      <div className="flex items-center gap-3">
        {children}
        {action && (
          <Button
            variant={action.variant ?? "default"}
            onClick={action.onClick}
            className="gap-1.5 bg-green-700 hover:bg-green-800 text-white font-medium cursor-pointer py-5 "
          >
            {action.icon ?? <Plus className="size-4 text-white" />}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
