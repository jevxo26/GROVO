"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HandHeart, Menu, X } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full relative bg-[#ecebde] text-[#1b2a21] shadow-sm z-50">
      <div className="py-4 px-4 sm:px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo with Home Link & Hover Animation */}
        <Link
          href="/"
          className="flex items-center space-x-2 sm:space-x-3 group transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#008a3e] flex items-center justify-center text-white shadow-sm group-hover:bg-[#007333] group-hover:shadow-md transition-all duration-300">
            <HandHeart
              size={20}
              className="stroke-[2.5] group-hover:rotate-12 transition-transform duration-300 sm:w-5.5 sm:h-5.5"
            />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-wider text-[#0a1a11] font-serif">
            ASHRAY
          </span>
        </Link>

        {/* Desktop Navigation Menu */}
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

        {/* Action Buttons (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Login Link */}
          <Link
            href="/login"
            className="px-5 sm:px-6 py-2 rounded-full border border-[#b8c2ba] text-[#1b2a21] text-sm font-semibold hover:bg-[#008a3e] hover:text-white hover:border-[#008a3e] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
          >
            Login
          </Link>

          {/* Donate Now Link */}
          <Link
            href="/donate"
            className="px-5 sm:px-6 py-2 rounded-full bg-[#008a3e] text-white text-sm font-bold shadow-sm hover:bg-[#007333] hover:shadow-md hover:shadow-emerald-900/20 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-[#1b2a21] hover:bg-[#dedccf] transition-colors"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#ecebde] border-t border-[#dedccf] px-6 py-5 flex flex-col space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-md">
          {/* Nav Items */}
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-semibold py-1.5 transition-colors ${
                    isActive
                      ? "text-[#008a3e] font-bold"
                      : "text-[#4d5c52] hover:text-[#008a3e]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Buttons (Visible only on small screens) */}
          <div className="pt-3 border-t border-[#dedccf] flex flex-col gap-2.5 sm:hidden">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full border border-[#b8c2ba] text-[#1b2a21] text-sm font-semibold hover:bg-[#008a3e] hover:text-white transition-all"
            >
              Login
            </Link>

            <Link
              href="/donate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#008a3e] text-white text-sm font-bold shadow-sm hover:bg-[#007333] transition-all"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}