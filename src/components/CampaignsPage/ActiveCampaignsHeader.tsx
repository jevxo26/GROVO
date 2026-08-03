"use client";

import React from "react";

export const ActiveCampaignsHeader: React.FC = () => {
  return (
    <section className="w-full bg-background py-16 mt-4 px-6 sm:px-12 lg:px-20 text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-start space-y-4">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-[11px] font-bold tracking-wider uppercase text-primary">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span>ACTIVE CAMPAIGNS</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.15] max-w-2xl">
          Make an Impact with Your{" "}
          <span className="text-primary">Donation</span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl font-normal leading-relaxed pt-1">
          Browse our active humanitarian campaigns and choose where your
          contribution creates the most meaningful change.
        </p>

      </div>
    </section>
  );
};

export default ActiveCampaignsHeader;