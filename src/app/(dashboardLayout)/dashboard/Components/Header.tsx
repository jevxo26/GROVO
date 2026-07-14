"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
  // Member Dashboard
  if (pathname === "/dashboard/member") return "Member Dashboard";
  if (pathname === "/dashboard/member/profile") return "My Profile";
  if (pathname === "/dashboard/member/donations") return "My Donations";
  if (pathname === "/dashboard/member/campaigns") return "My Campaigns";
  if (pathname === "/dashboard/member/certificates") return "Certificates & Badges";

  // Corporate Dashboard
  if (pathname === "/dashboard/corporate") return "Corporate Dashboard";
  if (pathname === "/dashboard/corporate/donations") return "Donations";
  if (pathname === "/dashboard/corporate/projects") return "Projects";
  if (pathname === "/dashboard/corporate/reports") return "CSR Reports";

  // Executive Dashboard
  if (pathname === "/dashboard/executivemember") return "Executive Dashboard";
  if (pathname === "/dashboard/executivemember/profile") return "My Profile";
  if (pathname === "/dashboard/executivemember/donations") return "My Donations";
  if (pathname === "/dashboard/executivemember/campaigns") return "My Campaigns";
  if (pathname === "/dashboard/executivemember/certificates") return "Certificates & Badges";

  // Volunteer Dashboard
  if (pathname === "/dashboard/volunteer") return "Volunteer Dashboard";
  if (pathname === "/dashboard/volunteer/registermember") return "Register New Members";
  if (pathname === "/dashboard/volunteer/activities") return "My Activities";
  if (pathname === "/dashboard/volunteer/performance") return "Performance Tracking";

  // Staff Routes
  if (pathname === "/dashboard/staf") return "Staff Dashboard";
  if (pathname === "/dashboard/staf/mytask") return "My Tasks";
  if (pathname === "/dashboard/staf/branchinfo") return "Branch Information";

  // Individual Donor Routes
  if (pathname === "/dashboard/individualdonor") return "Individual Donor";
  if (pathname === "/dashboard/individualdonor/profile") return "My Profile";
  if (pathname === "/dashboard/individualdonor/wallet") return "My Wallet";
  if (pathname === "/dashboard/individualdonor/donations") return "My Donations";
  if (pathname === "/dashboard/individualdonor/campaigns") return "Campaigns";
  if (pathname === "/dashboard/individualdonor/impact") return "My Impact";
  if (pathname === "/dashboard/individualdonor/certificates") return "Certificates";
  if (pathname === "/dashboard/individualdonor/referal") return "Referals";

  return "Dashboard"; // ডিফল্ট টাইটেল
};

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="h-16 md:h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-3">
        {/* মেনু বাটন */}
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
        
        {/* নোটিফিকেশন বেল */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>
        
        {/* প্রোফাইল সেকশন */}
        <div className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-lg hover:bg-accent transition-colors">
          <Avatar className="w-8 h-8 md:w-9 md:h-9 border border-border">
            <AvatarImage src="https://i.pravatar.cc/150?u=abdul" alt="Antor Mia" />
            <AvatarFallback className="bg-secondary text-secondary-foreground">AM</AvatarFallback>
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