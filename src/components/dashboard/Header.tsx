"use client";

import { Bell, ChevronDown, Menu, UserCheck, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { usePathname } from "next/navigation";
import { UserRole } from "./Sidebar";
import { useGetUserProfileQuery } from "@/redux/slices/userSlice";

export function Header({
  onMenuClick,
  role = "admin",
}: {
  onMenuClick?: () => void;
  role?: UserRole;
}) {
  const pathname = usePathname();

  // Fetch active logged in user profile reactively
  const { data: profileRes } = useGetUserProfileQuery();
  const user = profileRes?.data || profileRes;

  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";
  const userInitials = fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "US";

  const getPageTitle = (path: string, userRole: UserRole) => {
    if (userRole === "member") {
      if (path === "/dashboard") return "Member Dashboard";
      if (path === "/dashboard/profile") return "My Profile";
      if (path === "/dashboard/donations") return "My Donations";
      if (path === "/dashboard/campaigns") return "My Campaigns";
      if (path === "/dashboard/certificates") return "Certificates & Badges";
    }

    if (userRole === "corporate") {
      if (path === "/dashboard") return "Corporate Dashboard";
      if (path === "/dashboard/donations") return "Donations";
      if (path === "/dashboard/projects") return "Projects";
      if (path === "/dashboard/reports") return "CSR Reports";
    }

    if (userRole === "volunteer") {
      if (path === "/dashboard") return "Volunteer Dashboard";
      if (path === "/dashboard/registermember") return "Register New Members";
      if (path === "/dashboard/activities") return "My Activities";
      if (path === "/dashboard/performance") return "Performance Tracking";
    }

    if (userRole === "staf") {
      if (path === "/dashboard") return "Staff Dashboard";
      if (path === "/dashboard/mytask") return "My Tasks";
      if (path === "/dashboard/branchinfo") return "Branch Information";
    }

    if (userRole === "individualdonor") {
      if (path === "/dashboard") return "Individual Donor Workspace";
      if (path === "/dashboard/profile") return "My Profile";
      if (path === "/dashboard/wallet") return "My Wallet";
      if (path === "/dashboard/donations") return "My Donations";
      if (path === "/dashboard/campaigns") return "Campaigns";
      if (path === "/dashboard/impact") return "My Impact";
      if (path === "/dashboard/certificates") return "Certificates";
      if (path === "/dashboard/referal") return "Referrals";
    }

    if (userRole === "admin" || userRole === "nationaladmin") {
      if (path === "/dashboard") return "Executive Command Center";
      if (path === "/dashboard/members") return "Manage Members";
      if (path === "/dashboard/volunteers") return "Manage Volunteers";
      if (path === "/dashboard/campaigns") return "Manage Campaigns";
      if (path === "/dashboard/donations") return "Manage Donations";
      if (path === "/dashboard/beneficiaries") return "Manage Beneficiaries";
      if (path === "/dashboard/branches") return "Manage Branches";
      if (path === "/dashboard/finance") return "Financial Management";
      if (path === "/dashboard/analytics") return "Analytics & Intelligence";
      if (path === "/dashboard/events") return "Events & Scheduler";
      if (path === "/dashboard/gallery") return "Gallery & Media CMS";
      if (path === "/dashboard/notifications") return "Notifications Broadcast";
    }

    return "Dashboard Workspace";
  };

  const title = getPageTitle(pathname, role);

  return (
    <header className="h-16 md:h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl md:text-2xl font-bold font-sans text-foreground truncate max-w-50 sm:max-w-full">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ModeToggle />

        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>

        {/* User Profile Summary */}
        <div className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-accent transition-colors">
          <Avatar className="w-8 h-8 md:w-9 md:h-9 border border-primary/20">
            <AvatarImage
              src={user?.profilePhoto || `https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`}
              alt={fullName}
            />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
              {fullName}
            </span>
            <span className="text-[11px] text-muted-foreground capitalize">
              {role.replace(/_/g, " ")}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
