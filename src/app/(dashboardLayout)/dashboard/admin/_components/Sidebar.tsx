"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Flag,
  HandCoins,
  HeartHandshake,
  Building2,
  PieChart,
  BarChart3,
  CalendarDays,
  Image as ImageIcon,
  Bell,
  ArrowLeft,
  LogOut,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Members", href: "/dashboard/admin/members", icon: Users },
  { name: "Volunteers", href: "/dashboard/admin/volunteers", icon: UserCheck },
  { name: "Campaigns", href: "/dashboard/admin/campaigns", icon: Flag },
  { name: "Donations", href: "/dashboard/admin/donations", icon: HandCoins },
  { name: "Beneficiaries", href: "/dashboard/admin/beneficiaries", icon: HeartHandshake },
  { name: "Branches", href: "/dashboard/admin/branches", icon: Building2 },
  { name: "Finance", href: "/dashboard/admin/finance", icon: PieChart },
  { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { name: "Events", href: "/dashboard/admin/events", icon: CalendarDays },
  { name: "Gallery", href: "/dashboard/admin/gallery", icon: ImageIcon },
  { name: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col transition-colors duration-300 relative">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-md">
            <HandCoins className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-foreground font-serif tracking-tight">ASHRAY</h1>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <link.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Website
        </Link>
        <button
          className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
