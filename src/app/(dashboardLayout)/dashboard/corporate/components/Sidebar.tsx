"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,      // Overview এর জন্য
  HandCoins,       // Donations এর জন্য
  Folder,          // Projects এর জন্য
  BarChart3,       // CSR Reports এর জন্য
  ArrowLeft,
  LogOut,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

// সাইডবার লিঙ্কগুলোর তালিকা আপডেট করা হয়েছে
const sidebarLinks = [
  { name: "Overview", href: "/corporate", icon: LayoutGrid },
  { name: "Donations", href: "/corporate/donations", icon: HandCoins },
  { name: "Projects", href: "/corporate/projects", icon: Folder },
  { name: "CSR Reports", href: "/corporate/reports", icon: BarChart3 }
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-colors duration-300 relative">
      
      {/* Header Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#a0522d] p-2 rounded-lg"> {/* ইমেজের সাথে মিল রেখে কালার */}
          <HandCoins className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-gray-900 font-sans tracking-tight">ASHRAY</h1>
          <p className="text-xs text-gray-600">Corporate Panel</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden ml-auto p-1 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard/member" && pathname.startsWith(link.href));
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium",
                isActive 
                  ? "bg-[#efe9e6] text-[#6d4c41]" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Links */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
          <ArrowLeft className="w-5 h-5" />
          Back to Website
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}