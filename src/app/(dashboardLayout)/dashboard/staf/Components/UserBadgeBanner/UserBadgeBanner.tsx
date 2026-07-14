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
      // ডার্ক মোডে কালার একটু অ্যাডজাস্ট করার জন্য 'dark:bg-opacity-90' বা ডার্ক কালার ব্যবহার করা হয়েছে
      className={`${bgColor} dark:bg-[#2a1e1b] text-white p-6 md:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg transition-colors duration-300 gap-4`}
    >
      <div>
        <p className="text-sm opacity-80 font-medium">Welcome back</p>
        <h1 className="text-2xl md:text-3xl font-bold font-serif">{name}</h1>
        <p className="text-sm opacity-90 mt-1">{role}</p>
      </div>

      <div className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm">
        {badgeText}
      </div>
    </section>
  );
};