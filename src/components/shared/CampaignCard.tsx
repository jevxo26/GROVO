"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";

export interface CampaignProps {
  id: number | string;
  image: string;
  category: string;
  isUrgent?: boolean;
  raised: string;
  goal: string;
  title: string;
  description: string;
  percentage: number;
  daysLeft: number;
  helpedCount: string;
}

export default function CampaignCard({
  campaign,
}: {
  campaign: CampaignProps;
}) {
  const {
    id,
    image,
    category,
    isUrgent,
    title,
    description,
    percentage,
    daysLeft,
    helpedCount,
  } = campaign;

  const detailsUrl = `/campaigns/${id}`;

  return (
    <div className="bg-card text-card-foreground rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      {/* Image */}
      <Link
        href={detailsUrl}
        className="relative h-56 w-full bg-muted block overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <span className="bg-background/80 backdrop-blur-md text-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {category}
          </span>

          {isUrgent && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              URGENT
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col grow justify-between">
        <div>
          {/* Title */}
          <Link href={detailsUrl}>
            <h3 className="text-lg font-bold mb-1.5 line-clamp-1 font-serif hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Progress */}
          <div className="mb-5">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-sm font-extrabold">{percentage}%</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                FUNDED
              </span>
            </div>

            {/* Premium Progress */}
            <div className="relative group/progress cursor-pointer">
              {/* Tooltip */}
              <div
                className="
      absolute -top-8 left-1/2 -translate-x-1/2
      opacity-0 group-hover/progress:opacity-100
      translate-y-1 group-hover/progress:-translate-y-1
      transition-all duration-300
      "
              >
                <div
                  className="px-3 py-1.5 rounded-md text-[11px] font-semibold 
        bg-foreground text-background shadow-lg backdrop-blur-md"
                >
                  {percentage}% funded
                </div>

                {/* Arrow */}
                <div className="w-2 h-2 bg-foreground rotate-45 mx-auto -mt-1"></div>
              </div>

              {/* Bar Container */}
              <div className="flex gap-1 h-2 w-full transition-all duration-300 group-hover/progress:scale-[1.01]">
                {[...Array(10)].map((_, i) => {
                  const stepPercent = (i + 1) * 10;
                  const isFilled = percentage >= stepPercent;

                  return (
                    <div
                      key={i}
                      className={`
              h-full flex-1 rounded-full transition-all duration-500
              ${
                isFilled
                  ? "bg-primary shadow-[0_0_6px_var(--color-primary)]"
                  : "bg-muted"
              }
            `}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground mb-6 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold leading-none text-foreground">
                  {daysLeft}
                </p>
                <p className="text-[10px] uppercase tracking-tight">
                  DAYS LEFT
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold leading-none text-foreground">
                  {helpedCount}
                </p>
                <p className="text-[10px] uppercase tracking-tight">HELPED</p>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          href={detailsUrl}
          className="w-full bg-primary hover:opacity-90 text-primary-foreground font-medium py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition"
        >
          Support This Campaign
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
