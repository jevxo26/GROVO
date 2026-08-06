import React from "react";
import { Heart, Sparkles } from "lucide-react";

interface UserWelcomeProps {
  name: string;
  memberSince?: string;
  memberId?: string;
  onDonationClick?: () => void;
  bgColor?: string;
  btnTextColor?: string;
}

export const UserWelcomeSection: React.FC<UserWelcomeProps> = ({
  name,
  memberSince = "2024",
  memberId = "#ASH-8821",
  onDonationClick,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#136139] to-[#1e824c] p-8 text-white shadow-xl shadow-[#136139]/15 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="z-10 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wide backdrop-blur-md mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Welcome to Ashray Foundation
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans tracking-tight">
          Welcome back, {name}!
        </h1>
        <p className="text-sm opacity-90 mt-1 font-medium">
          Member ID: <span className="font-mono bg-white/20 px-2 py-0.5 rounded">{memberId}</span> • Member since {memberSince}
        </p>
      </div>

      <button
        onClick={onDonationClick}
        className="z-10 bg-white text-[#136139] hover:bg-white/90 px-6 py-3 rounded-2xl font-bold flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/10 shrink-0 cursor-pointer"
      >
        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        <span>Make a Donation</span>
      </button>
    </section>
  );
};

export default UserWelcomeSection;
