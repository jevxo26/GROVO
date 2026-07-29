"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, QrCode, BarChart3, Network, ArrowRight } from "lucide-react";

export const TrustSection: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfbf7] py-16 px-6 md:px-12 lg:px-20 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Image with Floating Active Branches Card */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-115 aspect-4/5 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop" 
              alt="Volunteers packing supplies"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Badge (Bottom Right Overlay) */}
          <div className="absolute -bottom-6 right-2 sm:right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-1 min-w-42.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-gray-500">
                ACTIVE BRANCHES
              </span>
            </div>
            <div className="text-4xl font-extrabold text-[#113a17] tracking-tight">
              42
            </div>
            <p className="text-xs text-gray-500 font-medium">Across Bangladesh</p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:col-span-7 flex flex-col space-y-6 pt-6 lg:pt-0">
          
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111827] leading-tight">
            A Foundation Built on <br />
            <span className="text-[#15803d]">Trust & Transparency</span>
          </h2>

          {/* Paragraph Descriptions */}
          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-gray-900 font-semibold">ASHRAY</strong> is a modern Foundation Operating System designed to digitize and simplify the complete management of non-profit organizations, charities, and humanitarian foundations. Every registered member receives a secure digital membership card with a unique QR code.
            </p>
            <p>
              The platform centralizes membership management, volunteer operations, donor engagement, fundraising campaigns, financial transparency, and project execution within a single, scalable ecosystem.
            </p>
          </div>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-gray-900">Verified Impact</h4>
                <p className="text-xs text-gray-500 leading-snug">
                  Track every donation to its destination with real-time transparency.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-gray-900">Digital Membership</h4>
                <p className="text-xs text-gray-500 leading-snug">
                  QR-based identity cards for all registered members and volunteers.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-gray-900">Live Analytics</h4>
                <p className="text-xs text-gray-500 leading-snug">
                  Real-time dashboards show exactly where funds go and who they help.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                <Network className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-gray-900">Nationwide Network</h4>
                <p className="text-xs text-gray-500 leading-snug">
                  42 branches spanning from national headquarters to union-level operations.
                </p>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#116932] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
              <span>Learn Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustSection;