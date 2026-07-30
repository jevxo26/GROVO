"use client";

import React from "react";
import {
  HeartHandshake,
  Heart,
  BookOpen,
  Building2,
  Utensils,
  Siren,
  CloudSnow,
  Home,
  ArrowRight,
} from "lucide-react";

export interface CategoryCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const categories: CategoryCard[] = [
  {
    id: "zakat",
    title: "Zakat",
    description: "Fulfill your Zakat obligation with full transparency and tracking",
    icon: <HeartHandshake className="w-5 h-5 text-[#4ade80]" />,
  },
  {
    id: "sadaqah",
    title: "Sadaqah",
    description: "Voluntary charity that brings blessings and continuous reward",
    icon: <Heart className="w-5 h-5 text-[#4ade80]" />,
  },
  {
    id: "education",
    title: "Education Support",
    description: "Help build schools and provide educational materials",
    icon: <BookOpen className="w-5 h-5 text-[#4ade80]" />,
  },
  {
    id: "medical",
    title: "Medical Assistance",
    description: "Support free medical camps and healthcare for the poor",
    icon: <Building2 className="w-5 h-5 text-[#4ade80]" />,
  },
  {
    id: "food",
    title: "Food Distribution",
    description: "Provide daily meals to orphanages and impoverished families",
    icon: <Utensils className="w-5 h-5 text-[#4ade80]" />,
  },
  {
    id: "emergency",
    title: "Emergency Relief",
    description: "Respond quickly to disasters and humanitarian crises",
    icon: <Siren className="w-5 h-5 text-[#4ade80]" />,
  },
  {
    id: "winter",
    title: "Winter Campaign",
    description: "Warm blankets and clothing for those facing harsh winters",
    icon: <CloudSnow className="w-5 h-5 text-[#4ade80]" />,
  },
  {
    id: "orphan",
    title: "Orphan Support",
    description: "Housing, education, and care for orphaned children",
    icon: <Home className="w-5 h-5 text-[#4ade80]" />,
  },
];

export const WaysToGiveSection: React.FC = () => {
  return (
    <section className="w-full bg-[#031505] py-20 px-6 sm:px-12 lg:px-20 text-white flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#1b3d1b] bg-[#072008] text-xs font-semibold tracking-wider uppercase text-gray-300 mb-6">
          <Heart className="w-3.5 h-3.5 text-[#4ade80]" />
          <span>WAYS TO GIVE</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight max-w-3xl mb-4">
          Start Your Journey of <span className="text-[#a3e635]">Giving Today</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed mb-12">
          Choose from a variety of donation categories. Every contribution is tracked,
          verified, and reported back to you with complete transparency.
        </p>

        {/* 8-Card Grid (4x2 on desktop, 2x4 on tablet, 1x8 on mobile) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {categories.map((card) => (
            <div
              key={card.id}
              className="bg-[#081f0b] border border-[#1b3d1b] hover:border-[#2a5d2a] transition-all duration-300 rounded-2xl p-6 flex flex-col items-center text-center group cursor-pointer shadow-lg hover:-translate-y-1"
            >
              {/* Icon Box */}
              <div className="w-12 h-12 rounded-xl bg-[#0e3012] border border-[#1a4a1f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="inline-flex items-center gap-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-emerald-900/40">
          <HeartHandshake className="w-4 h-4" />
          <span>Make a Donation</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </section>
  );
};

export default WaysToGiveSection;