"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HandHeart, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

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

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-background/80 backdrop-blur-md text-foreground border-b border-border shadow-sm">
      <div className="py-4 px-4 sm:px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 group hover:scale-[1.02] transition"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:shadow-md transition">
            <HandHeart className="group-hover:rotate-12 transition" />
          </div>
          <span className="text-2xl font-black tracking-wider font-serif">
            ASHRAY
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`relative text-sm font-semibold transition ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* 🌗 Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border bg-muted hover:bg-accent transition"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-border text-sm font-semibold hover:bg-accent transition"
            >
              Login
            </Link>

            <Link
              href="/donate"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition shadow"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border px-6 py-5 flex flex-col space-y-4 shadow-md">

          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-semibold ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-border flex flex-col gap-2 sm:hidden">
            <Link
              href="/login"
              className="text-center py-2 rounded-full border border-border hover:bg-accent transition"
            >
              Login
            </Link>

            <Link
              href="/donate"
              className="text-center py-2 rounded-full bg-primary text-primary-foreground font-bold"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}