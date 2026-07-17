import React from "react";

interface BadgeProps {
  badges: string[];
}

export const BadgesSection: React.FC<BadgeProps> = ({ badges }) => {
  return (
    <section className="py-4">
      {/* টাইটেল স্টাইল */}
      <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-wide uppercase">
        YOUR BADGES
      </h2>
      
      {/* ব্যাজ গ্রিড */}
      <div className="flex flex-wrap gap-3">
        {badges.map((badge) => (
          <span
            key={badge}
            className="px-6 py-2.5 bg-[#d8ece7] text-[#006d5b] rounded-full text-sm font-medium transition-all hover:bg-[#c9e4dd]"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
};