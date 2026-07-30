"use client";

import React from "react";
import { Heart } from "lucide-react";

export interface Donation {
  id: string;
  donorName: string;
  amount: string;
  campaign: string;
  quote?: string;
}

interface LiveDonationFeedProps {
  donations?: Donation[];
}

const defaultDonations: Donation[] = [
  {
    id: "1",
    donorName: "Kamala B.",
    amount: "BDT 3,000",
    campaign: "Winter Warmth",
    quote: "Stay warm everyone",
  },
  {
    id: "2",
    donorName: "Anonymous Donor",
    amount: "BDT 15,000",
    campaign: "Orphan Support",
  },
  {
    id: "3",
    donorName: "Syed Corp Ltd.",
    amount: "BDT 100,000",
    campaign: "Emergency Flood Relief",
    quote: "Corporate CSR contribution",
  },
  {
    id: "4",
    donorName: "Nusrat J.",
    amount: "BDT 7,500",
    campaign: "Education for Every Child",
    quote: "Education is the key",
  },
  {
    id: "5",
    donorName: "Ahmed K.",
    amount: "BDT 5,000",
    campaign: "Emergency Flood Relief",
    quote: "May Allah accept",
  },
  {
    id: "6",
    donorName: "Fatima R.",
    amount: "BDT 10,000",
    campaign: "Education for Every Child",
    quote: "For the children",
  },
];

export const LiveDonationFeed: React.FC<LiveDonationFeedProps> = ({
  donations = defaultDonations,
}) => {
  // Infinite scroll-এর জন্য ডাটা ডাবল করা হয়েছে
  const doubleDonations = [...donations, ...donations];

  return (
    <div className="w-full bg-[#031505] pt-6 pb-0 text-white flex flex-col gap-6 overflow-hidden select-none">
      {/* Live Badge Header */}
      <div className="flex items-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#234220] bg-[#072008] text-xs font-semibold tracking-wider uppercase text-[#a3e635]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3e635]"></span>
          </span>
          LIVE DONATION FEED
        </div>
      </div>

      {/* Infinite Auto-Scrolling Container */}
      <div className="group relative flex overflow-hidden">
        <div className="flex gap-4 animate-marquee whitespace-nowrap group-hover:paused">
          {doubleDonations.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="shrink-0 min-w-72.5 max-w-[320px] bg-[#081f0b] border border-[#1b3d1b] rounded-xl p-4 flex items-start gap-3 shadow-md"
            >
              {/* Heart Icon */}
              <div className="shrink-0 w-9 h-9 rounded-lg bg-[#0e3012] border border-[#1a4a1f] flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#4ade80] fill-[#4ade80]" />
              </div>

              {/* Donation Details */}
              <div className="flex flex-col text-sm space-y-0.5 overflow-hidden">
                <h4 className="font-bold text-white leading-snug truncate">
                  {item.donorName}
                </h4>
                <p className="text-xs text-gray-300">
                  donated{" "}
                  <span className="font-bold text-[#4ade80]">{item.amount}</span>{" "}
                  to {item.campaign}
                </p>
                {item.quote && (
                  <p className="text-xs italic text-gray-400 pt-1 truncate">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Track / Progress Bar */}
      <div className="w-full bg-[#D3CEBE] overflow-hidden relative">
        <div className="absolute inset-0 bg-white/40 animate-pulse" />
      </div>

      {/* Tailwind Animation CSS Injector */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveDonationFeed;