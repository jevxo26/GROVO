"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Donation, donationsData } from "@/data/landingpage/donationsData";

interface LiveDonationFeedProps {
  donations?: Donation[];
}

export const LiveDonationFeed: React.FC<LiveDonationFeedProps> = ({
  donations = donationsData,
}) => {
  const doubleDonations = [...donations, ...donations];

  return (
    <div className="w-full bg-background text-foreground pt-6 pb-0 flex flex-col gap-6 overflow-hidden select-none">

      {/* Header */}
      <div className="flex items-center px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-xs font-semibold tracking-wider uppercase text-primary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          LIVE DONATION FEED
        </div>
      </div>

      {/* Scroll */}
      <div className="group relative flex overflow-hidden">
        <div className="flex gap-4 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">

          {doubleDonations.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="shrink-0 min-w-72.5 max-w-[320px] bg-card border border-border rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Icon */}
              <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary fill-primary" />
              </div>

              {/* Content */}
              <div className="flex flex-col text-sm space-y-0.5 overflow-hidden">
                <h4 className="font-bold leading-snug truncate">
                  {item.donorName}
                </h4>

                <p className="text-xs text-muted-foreground">
                  donated{" "}
                  <span className="font-bold text-primary">
                    {item.amount}
                  </span>{" "}
                  to {item.campaign}
                </p>

                {item.quote && (
                  <p className="text-xs italic text-muted-foreground pt-1 truncate">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-muted overflow-hidden relative h-1">
        <div className="absolute inset-0 bg-primary/30 animate-pulse" />
      </div>

      {/* Animation */}
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