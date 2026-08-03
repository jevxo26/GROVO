"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, QrCode, BarChart3, Network, ArrowRight } from "lucide-react";

export const TrustSection: React.FC = () => {
  return (
    <section className="w-full bg-background py-16 px-6 md:px-12 lg:px-20 text-foreground">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Image */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop"
              alt="Volunteers packing supplies"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-6 right-2 sm:right-6 bg-card/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-border flex flex-col gap-1 min-w-[170px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                ACTIVE BRANCHES
              </span>
            </div>

            <div className="text-4xl font-extrabold text-primary tracking-tight">
              42
            </div>

            <p className="text-xs text-muted-foreground font-medium">
              Across Bangladesh
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-7 flex flex-col space-y-6 pt-6 lg:pt-0">
          
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight">
            A Foundation Built on <br />
            <span className="text-primary">Trust & Transparency</span>
          </h2>

          {/* Description */}
          <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-foreground font-semibold">ASHRAY</strong> is a modern Foundation Operating System designed to digitize and simplify the complete management of non-profit organizations.
            </p>
            <p>
              The platform centralizes membership management, volunteer operations, donor engagement, fundraising campaigns, financial transparency, and project execution within a scalable ecosystem.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            
            {[
              {
                icon: ShieldCheck,
                title: "Verified Impact",
                desc: "Track every donation with full transparency.",
              },
              {
                icon: QrCode,
                title: "Digital Membership",
                desc: "QR-based identity cards for members.",
              },
              {
                icon: BarChart3,
                title: "Live Analytics",
                desc: "Real-time dashboards for fund tracking.",
              },
              {
                icon: Network,
                title: "Nationwide Network",
                desc: "42 branches across all regions.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3.5 group">
                
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition">
                  <item.icon className="w-5 h-5" />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>

          {/* Button */}
          <div className="pt-4">
            <button className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
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