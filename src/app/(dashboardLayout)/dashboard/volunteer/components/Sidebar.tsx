"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  UserPlus,
  SquareCheck,
  BarChart3,
  ArrowLeft,
  X,
  HandCoins,
} from "lucide-react";
import { cn } from "@/lib/utils";

// সাইডবার লিঙ্কগুলোর তালিকা
const sidebarLinks = [
  { name: "Overview", href: "/dashboard/volunteer", icon: LayoutGrid },
  { name: "Register Members", href: "/dashboard/volunteer/registermember", icon: UserPlus },
  { name: "My Activities", href: "/dashboard/volunteer/activities", icon: SquareCheck },
  { name: "Performance", href: "/dashboard/volunteer/performance", icon: BarChart3 },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-colors duration-300 relative">
      
      {/* Header Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-sidebar-primary p-2 rounded-lg">
          <HandCoins className="w-6 h-6 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-sidebar-foreground font-sans tracking-tight">ASHRAY</h1>
          <p className="text-xs text-sidebar-foreground/70">Member Panel</p>
        </div>
        {/* মোবাইল ক্লোজ বাটন */}
        {onClose && (
          <button 
            onClick={onClose} 
            className="md:hidden ml-auto p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          // অ্যাক্টিভ লজিক এখানে আপডেট করা হয়েছে
          const isActive = pathname === link.href || (link.href !== "/dashboard/volunteer" && pathname.startsWith(link.href));
          
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
              <link.icon className={cn("w-5 h-5", isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70")} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Link */}
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