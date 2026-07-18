"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, Flag, HandCoins, ArrowLeft, Award, 
  LayoutGrid, Folder, BarChart3, X, UserPlus, SquareCheck, 
  Building2, Wallet, HeartPulse, CornerUpRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

export type UserRole = 
  | "member" 
  | "corporate" 
  | "executivemember" 
  | "volunteer" 
  | "staf" 
  | "individualdonor";

export const sidebarNavigation = {
  member: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/dashboard/profile", icon: Users },
    { name: "My Donations", href: "/dashboard/donations", icon: HandCoins },
    { name: "My Campaigns", href: "/dashboard/campaigns", icon: Flag },
    { name: "Certificates", href: "/dashboard/certificates", icon: Award },
  ],
  corporate: [
    { name: "Overview", href: "/dashboard", icon: LayoutGrid },
    { name: "Donations", href: "/dashboard/donations", icon: HandCoins },
    { name: "Projects", href: "/dashboard/projects", icon: Folder },
    { name: "CSR Reports", href: "/dashboard/reports", icon: BarChart3 },
  ],
  executivemember: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/dashboard/profile", icon: Users },
    { name: "My Donations", href: "/dashboard/donations", icon: HandCoins },
    { name: "My Campaigns", href: "/dashboard/campaigns", icon: Flag },
    { name: "Certificates", href: "/dashboard/certificates", icon: Award },
  ],
  volunteer: [
    { name: "Overview", href: "/dashboard", icon: LayoutGrid },
    { name: "Register Members", href: "/dashboard/registermember", icon: UserPlus },
    { name: "My Activities", href: "/dashboard/activities", icon: SquareCheck },
    { name: "Performance", href: "/dashboard/performance", icon: BarChart3 },
  ],
  staf: [
    { name: "Overview", href: "/dashboard", icon: LayoutGrid },
    { name: "My Tasks", href: "/dashboard/mytask", icon: SquareCheck },
    { name: "Branch Info", href: "/dashboard/branchinfo", icon: Building2 },
  ],
  individualdonor: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/dashboard/profile", icon: Users },
    { name: "My Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "My Donations", href: "/dashboard/donations", icon: HandCoins },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Flag },
    { name: "My Impact", href: "/dashboard/impact", icon: HeartPulse },
    { name: "Certificates", href: "/dashboard/certificates", icon: Award },
    { name: "Referals", href: "/dashboard/referal", icon: CornerUpRight },
  ],
};

export function Sidebar({
  onClose,
  role = "individualdonor",
}: {
  onClose?: () => void;
  role?: UserRole;
}) {
  const pathname = usePathname();
  const links = sidebarNavigation[role];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-colors duration-300 relative">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-sidebar-primary p-2 rounded-lg">
          <HandCoins className="w-6 h-6 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-sidebar-foreground font-sans tracking-tight">
            ASHRAY
          </h1>
          <p className="text-xs text-sidebar-foreground/70 capitalize">
            {role.replace(/([A-Z])/g, " $1")} Panel
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden ml-auto p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isOverview = link.name === "Overview";
          const isActive = isOverview ? pathname === link.href : pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <link.icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70"
                )}
              />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}