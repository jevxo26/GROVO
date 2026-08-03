import {
  ArrowRight,
  CheckCircle,
  FileText,
  Heart,
  Mouse,
  QrCode,
  ShieldCheck,
} from "lucide-react";

const Banner = () => {
  return (
    <div className="mt-10 relative min-h-screen w-full flex flex-col justify-between p-6 md:p-16 text-white bg-cover bg-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* 🌙 Overlay (Light + Dark अलग) */}
      <div className="absolute inset-0 z-0">
        {/* Light Mode (same as before) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20 dark:hidden" />

        {/* Dark Mode (stronger for readability) */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mt-8 md:mt-12 space-y-6">
        
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs md:text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-gray-200">
            Trusted by 48,500+ donors nationwide
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight leading-tight">
          Building Hope, <br />
          <span className="text-[#84cc16]">Changing Lives</span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
          ASHRAY is a modern foundation operating system that brings
          unprecedented transparency, accountability, and efficiency to
          humanitarian service across Bangladesh.
        </p>

        {/* Buttons */}
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

        {/* Features */}
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

          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Audited Financials</span>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="relative z-10 flex flex-col items-center justify-center self-center text-center mt-8 text-gray-400 text-xs tracking-widest uppercase">
        <span className="mb-1 text-[10px]">SCROLL</span>
        <Mouse className="w-5 h-5 animate-bounce text-gray-300" />
      </div>
    </div>
  );
};

export default Banner;