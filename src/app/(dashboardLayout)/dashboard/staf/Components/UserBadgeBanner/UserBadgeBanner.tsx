import React from "react";

interface UserBadgeBannerProps {
  name: string;
  role: string;
  badgeText: string;
  bgColor?: string;
}

export const UserBadgeBanner: React.FC<UserBadgeBannerProps> = ({
  name,
  role,
  badgeText,
  bgColor = "bg-[#3D2B26]",
}) => {
  return (
    <section
      className={`${bgColor} text-white p-8 rounded-3xl flex justify-between items-center shadow-lg`}
    >
      <div>
        <p className="text-sm opacity-80 font-medium">Welcome back</p>
        <h1 className="text-3xl font-bold font-serif">{name}</h1>
        <p className="text-sm opacity-90 mt-1">{role}</p>
      </div>

      <div className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium border border-white/20">
        {badgeText}
      </div>
    </section>
  );
};