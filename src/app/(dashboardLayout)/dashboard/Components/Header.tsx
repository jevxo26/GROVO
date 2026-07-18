"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { usePathname } from "next/navigation";
import { UserRole } from "./Sidebar";

export function Header({
  onMenuClick,
  role = "admin",
}: {
  onMenuClick?: () => void;
  role?: UserRole;
}) {
  const pathname = usePathname();

  const getPageTitle = (path: string, userRole: UserRole) => {
    // Member Dashboard
    if (userRole === "member") {
      if (path === "/dashboard") return "Member Dashboard";
      if (path === "/dashboard/profile") return "My Profile";
      if (path === "/dashboard/donations") return "My Donations";
      if (path === "/dashboard/campaigns") return "My Campaigns";
      if (path === "/dashboard/certificates") return "Certificates & Badges";
    }

    // Corporate Dashboard
    if (userRole === "corporate") {
      if (path === "/dashboard") return "Corporate Dashboard";
      if (path === "/dashboard/donations") return "Donations";
      if (path === "/dashboard/projects") return "Projects";
      if (path === "/dashboard/reports") return "CSR Reports";
    }

    // Executive Dashboard
    if (userRole === "executivemember") {
      if (path === "/dashboard") return "Executive Dashboard";
      if (path === "/dashboard/profile") return "My Profile";
      if (path === "/dashboard/donations") return "My Donations";
      if (path === "/dashboard/campaigns") return "My Campaigns";
      if (path === "/dashboar/certificates") return "Certificates & Badges";
    }

    // Volunteer Dashboard
    if (userRole === "volunteer") {
      if (path === "/dashboard") return "Volunteer Dashboard";
      if (path === "/dashboard/registermember") return "Register New Members";
      if (path === "/dashboard/activities") return "My Activities";
      if (path === "/dashboard/performance") return "Performance Tracking";
    }

    // Staff Routes
    if (userRole === "staf") {
      if (path === "/dashboard") return "Staff Dashboard";
      if (path === "/dashboard/mytask") return "My Tasks";
      if (path === "/dashboard/branchinfo") return "Branch Information";
    }

    // Individual Donor Routes
    if (userRole === "individualdonor") {
      if (path === "/dashboard") return "Individual Donor";
      if (path === "/dashboard/profile") return "My Profile";
      if (path === "/dashboard/wallet") return "My Wallet";
      if (path === "/dashboard/donations") return "My Donations";
      if (path === "/dashboard/campaigns") return "Campaigns";
      if (path === "/dashboard/impact") return "My Impact";
      if (path === "/dashboard/certificates") return "Certificates";
      if (path === "/dashboard/referal") return "Referals";
    }

    // Admin Routes
    if (userRole === "admin") {
      if (path === "/dashboard") return "Admin Dashboard";
      if (path === "/dashboard/members") return "Manage Members";
      if (path === "/dashboard/volunteers") return "Manage Volunteers";
      if (path === "/dashboard/campaigns") return "Manage Campaigns";
      if (path === "/dashboard/donations") return "Manage Donations";
      if (path === "/dashboard/beneficiaries") return "Manage Beneficiaries";
      if (path === "/dashboard/branches") return "Manage Branches";
      if (path === "/dashboard/finance") return "Financial Management";
      if (path === "/dashboard/analytics") return "Analytics";
      if (path === "/dashboard/events") return "Events";
      if (path === "/dashboard/gallery") return "Gallery & Media";
      if (path === "/dashboard/notifications") return "Notifications";
    }

    // National Admin Routes
    if (userRole === "nationaladmin") {
      if (path === "/dashboard") return "Admin Dashboard";
      if (path === "/dashboard/members") return "Manage Members";
      if (path === "/dashboard/volunteers") return "Manage Volunteers";
      if (path === "/dashboard/campaigns") return "Manage Campaigns";
      if (path === "/dashboard/donations") return "Manage Donations";
      if (path === "/dashboard/beneficiaries") return "Manage Beneficiaries";
      if (path === "/dashboard/branches") return "Manage Branches";
      if (path === "/dashboard/finance") return "Financial Management";
      if (path === "/dashboard/analytics") return "Analytics";
      if (path === "/dashboard/events") return "Events";
      if (path === "/dashboard/gallery") return "Gallery & Media";
      if (path === "/dashboard/notifications") return "Notifications";
    }

    return "Dashboard";
  };

  const title = getPageTitle(pathname, role);

  return (
    <header className="h-16 md:h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
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

        <div className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-lg hover:bg-accent transition-colors">
          <Avatar className="w-8 h-8 md:w-9 md:h-9 border border-border">
            <AvatarImage
              src="https://i.pravatar.cc/150?u=abdul"
              alt="Antor Mia"
            />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              AM
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            Antor Mia
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
