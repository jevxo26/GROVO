"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
  if (pathname === "/dashboard/admin") return "Admin Dashboard";
  if (pathname.includes("/members")) return "Manage Members";
  if (pathname.includes("/volunteers")) return "Manage Volunteers";
  if (pathname.includes("/campaigns")) return "Manage Campaigns";
  if (pathname.includes("/donations")) return "Manage Donations";
  if (pathname.includes("/beneficiaries")) return "Manage Beneficiaries";
  if (pathname.includes("/branches")) return "Manage Branches";
  if (pathname.includes("/finance")) return "Financial Management";
  if (pathname.includes("/analytics")) return "Analytics";
  if (pathname.includes("/events")) return "Events";
  if (pathname.includes("/gallery")) return "Gallery & Media";
  if (pathname.includes("/notifications")) return "Notifications";
  return "Dashboard";
};

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="h-16 md:h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl md:text-2xl font-bold font-serif text-foreground truncate max-w-[200px] sm:max-w-full">{title}</h2>
      </div>
      
      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2 cursor-pointer">
          <span className="text-foreground">GB</span>
          <span>EN</span>
        </div>
        <ModeToggle />
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full border-2 border-background"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar className="w-8 h-8 md:w-9 md:h-9 border border-border">
            <AvatarImage src="https://i.pravatar.cc/150?u=abdul" alt="Abdul Karim" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-foreground">
            Abdul Karim
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
