"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HandHeart } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Campaigns", path: "/campaigns" },
  { name: "Impact", path: "/impact" },
  { name: "Volunteer", path: "/volunteer" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-[#ecebde] text-[#1b2a21] shadow-sm">
      {/* Logo with Home Link & Hover Animation */}
      <Link
        href="/"
        className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-[1.02]"
      >
        <div className="w-10 h-10 rounded-xl bg-[#008a3e] flex items-center justify-center text-white shadow-sm group-hover:bg-[#007333] group-hover:shadow-md transition-all duration-300">
          <HandHeart
            size={22}
            className="stroke-[2.5] group-hover:rotate-12 transition-transform duration-300"
          />
        </div>
        <span className="text-2xl font-black tracking-wider text-[#0a1a11] font-serif">
          ASHRAY
        </span>
      </Link>

      {/* Navigation Menu with Active State & Hover Effect */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative py-1 text-sm font-semibold transition-all duration-300 group flex flex-col items-center ${
                isActive
                  ? "text-[#008a3e]"
                  : "text-[#4d5c52] hover:text-[#008a3e]"
              }`}
            >
              <span className="group-hover:-translate-y-0.5 transition-transform duration-200">
                {item.name}
              </span>

              {/* Active Underline & Hover Animated Line */}
              <span
                className={`absolute -bottom-1.5 rounded-full bg-[#008a3e] transition-all duration-300 ${
                  isActive
                    ? "w-4 h-[2.5px]"
                    : "w-0 h-[2.5px] group-hover:w-4"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Login Link */}
        <Link
          href="/login"
          className="px-6 py-2 rounded-full border border-[#b8c2ba] text-[#1b2a21] text-sm font-semibold hover:bg-[#008a3e] hover:text-white hover:border-[#008a3e] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
        >
          Login
        </Link>

        {/* Donate Now Link */}
        <Link
          href="/donate"
          className="px-6 py-2 rounded-full bg-[#008a3e] text-white text-sm font-bold shadow-sm hover:bg-[#007333] hover:shadow-md hover:shadow-emerald-900/20 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
        >
          Donate Now
        </Link>
      </div>
    </header>
  );
}