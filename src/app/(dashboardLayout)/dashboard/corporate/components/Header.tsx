"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
  if (pathname === "/corporate") return "Corporate Dashboard";
  if (pathname.includes("/corporate/donations")) return "Donations";
  if (pathname.includes("/corporate/projects")) return "Projects";
  if (pathname.includes("/corporate/reports")) return "CSR Reports";
  return "Corporate Dashboard";
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
