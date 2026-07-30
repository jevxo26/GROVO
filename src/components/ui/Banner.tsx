import React from 'react';
import { ShieldCheck, QrCode, FileText, CheckCircle, Heart, ArrowRight, Mouse } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 md:p-16 text-white bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')`,
      }}
    >
      {/* Main Content Area */}
      <div className="max-w-2xl mt-8 md:mt-12 space-y-6">
        
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs md:text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-gray-200">Trusted by 48,500+ donors nationwide</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight leading-tight">
          Building Hope, <br />
          <span className="text-[#84cc16]">Changing Lives</span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
          ASHRAY is a modern foundation operating system that brings
          unprecedented transparency, accountability, and efficiency to
          humanitarian service across Bangladesh.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button className="flex items-center gap-2 bg-[#00a639] hover:bg-[#008e30] text-white px-6 py-3 rounded-full font-medium text-sm transition-all shadow-lg hover:shadow-green-900/40">
            <Heart className="w-4 h-4 fill-white" />
            <span>Donate Now</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button className="flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white px-6 py-3 rounded-full font-medium text-sm border border-white/20 transition-all backdrop-blur-sm">
            <span>Explore Campaigns</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Feature Badges Grid */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs md:text-sm text-gray-300">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Transparency</span>
          </div>

          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/5">
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>QR Verified Donations</span>
          </div>

          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/5">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Instant Receipts</span>
          </div>

          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/5 col-span-1">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Audited Financials</span>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex flex-col items-center justify-center self-center text-center mt-8 text-gray-400 text-xs tracking-widest uppercase">
        <span className="mb-1 text-[10px]">SCROLL</span>
        <Mouse className="w-5 h-5 animate-bounce text-gray-300" />
      </div>

    </div>
  );
};

export default Banner;