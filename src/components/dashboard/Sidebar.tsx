"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Flag,
  HandCoins,
  ArrowLeft,
  Award,
  LayoutGrid,
  Folder,
  BarChart3,
  X,
  UserPlus,
  SquareCheck,
  Building2,
  Wallet,
  HeartPulse,
  CornerUpRight,
  UserCheck,
  HeartHandshake,
  PieChart,
  CalendarDays,
  Image as ImageIcon,
  Bell,
  Megaphone,
  Settings,
  Shield,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type UserRole =
  | "member"
  | "corporate"
  | "executivemember"
  | "volunteer"
  | "staf"
  | "individualdonor"
  | "admin"
  | "divisioncoordinator"
  | "districtcoordinator"
  | "upazilacoordinator"
  | "unioncoordinator"
  | "nationaladmin";

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
    { name: "Referrals", href: "/dashboard/referal", icon: CornerUpRight },
  ],
  admin: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/dashboard/members", icon: Users },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: UserCheck },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Flag },
    { name: "Donations", href: "/dashboard/donations", icon: HandCoins },
    { name: "Beneficiaries", href: "/dashboard/beneficiaries", icon: HeartHandshake },
    { name: "Branches", href: "/dashboard/branches", icon: Building2 },
    { name: "Finance", href: "/dashboard/finance", icon: PieChart },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Events", href: "/dashboard/events", icon: CalendarDays },
    { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ],
  nationaladmin: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/dashboard/members", icon: Users },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: UserCheck },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Flag },
    { name: "Donations", href: "/dashboard/donations", icon: HandCoins },
    { name: "Beneficiaries", href: "/dashboard/beneficiaries", icon: HeartHandshake },
    { name: "Branches", href: "/dashboard/branches", icon: Building2 },
    { name: "Finance", href: "/dashboard/finance", icon: PieChart },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Events", href: "/dashboard/events", icon: CalendarDays },
    { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ],
  divisioncoordinator: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Donors", href: "/dashboard/donors", icon: HandCoins },
    { name: "Members", href: "/dashboard/members", icon: Users },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: UserCheck },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Flag },
    { name: "Projects", href: "/dashboard/projects", icon: Folder },
    { name: "Beneficiaries", href: "/dashboard/beneficiaries", icon: HeartHandshake },
    { name: "Distribution", href: "/dashboard/distribution", icon: Building2 },
    { name: "Field Activities", href: "/dashboard/fieldActivities", icon: SquareCheck },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Announcements", href: "/dashboard/announcements", icon: Megaphone },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  districtcoordinator: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/dashboard/members", icon: Users },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: UserCheck },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Flag },
    { name: "Beneficiaries", href: "/dashboard/beneficiaries", icon: HeartHandshake },
    { name: "Distribution", href: "/dashboard/distribution", icon: Building2 },
    { name: "Field Activities", href: "/dashboard/fieldActivities", icon: SquareCheck },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Announcements", href: "/dashboard/announcements", icon: Megaphone },
  ],
  upazilacoordinator: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: UserCheck },
    { name: "Beneficiaries", href: "/dashboard/beneficiaries", icon: HeartHandshake },
    { name: "Distribution", href: "/dashboard/distribution", icon: Building2 },
    { name: "Field Activities", href: "/dashboard/fieldActivities", icon: SquareCheck },
    { name: "Announcements", href: "/dashboard/announcements", icon: Megaphone },
  ],
  unioncoordinator: [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: UserCheck },
    { name: "Beneficiaries", href: "/dashboard/beneficiaries", icon: HeartHandshake },
    { name: "Field Activities", href: "/dashboard/fieldActivities", icon: SquareCheck },
  ],
};

export function Sidebar({
  role = "admin",
  onClose,
}: {
  role?: UserRole;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const navigation = sidebarNavigation[role] || sidebarNavigation.admin;

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col justify-between shrink-0 shadow-sm transition-colors duration-300">
      <div>
        {/* Brand Header */}
        <div className="h-16 md:h-20 flex items-center justify-between px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md shadow-primary/20">
              A
            </div>
            <div>
              <span className="font-bold text-lg text-sidebar-foreground tracking-tight block leading-none">
                ASHRAY
              </span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest block mt-0.5">
                Foundation OS
              </span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Role Badge */}
        <div className="px-4 pt-4 pb-2">
          <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary capitalize tracking-wide">
              {role.replace(/_/g, " ")} Role
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-2">
          <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Menu Navigation
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 font-semibold"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-sidebar-accent-foreground",
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Back Link */}
      <div className="p-4 border-t border-sidebar-border">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent px-3 py-2.5 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </Link>
      </div>
    </aside>
  );
}
