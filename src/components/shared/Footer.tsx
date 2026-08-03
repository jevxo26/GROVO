"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-background text-foreground pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">

          {/* About */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase mb-6">
              About Us
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Our Mission", "Organization Structure", "Leadership Team", "Annual Reports"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase mb-6">
              Get Involved
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Donate Now", "Become a Volunteer", "Corporate Partnership", "Fundraise for Us"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase mb-6">
              Programs
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Emergency Relief", "Education Support", "Medical Assistance", "Food Distribution"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase mb-6">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Divider */}
        <div className="border-t border-border my-6"></div>

        {/* Newsletter */}
        <div className="py-6">
          <h3 className="font-semibold mb-2">Stay Connected</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Get updates on our campaigns, impact stories, and ways to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-muted border border-border text-sm rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary w-full"
            />
            <button className="bg-primary text-primary-foreground font-medium text-sm px-6 py-3 rounded-md hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-6"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2.5 rounded-lg text-primary-foreground shadow-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            <div>
              <h2 className="font-bold tracking-wider text-lg">ASHRAY</h2>
              <p className="text-xs text-muted-foreground">
                Smart Foundation & Donation Management
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {["f", "𝕏", "in", "ig", "▶"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary flex items-center justify-center text-muted-foreground hover:text-primary-foreground transition"
              >
                <span className="text-sm font-bold">{icon}</span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground text-center md:text-right">
            © 2026 ASHRAY Foundation. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;