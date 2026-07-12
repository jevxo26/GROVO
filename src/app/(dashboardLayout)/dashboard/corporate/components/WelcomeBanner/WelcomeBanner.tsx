import React from "react";
import { Heart } from "lucide-react";

interface WelcomeBannerProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
  bgColor?: string; // ব্যাকগ্রাউন্ড কালার কাস্টমাইজ করার জন্য
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  title,
  subtitle,
  buttonText = "Corporate Donation",
  onButtonClick,
  bgColor = "bg-[#6d7946]", // ডিফল্ট অলিভ কালার
}) => {
  return (
    <section
      className={`${bgColor} text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-lg gap-6`}
    >
      <div>
        <p className="text-sm opacity-90 font-medium">Welcome back</p>
        <h1 className="text-3xl font-bold font-serif">{title}</h1>
        <p className="text-sm opacity-80 mt-1">· {subtitle}</p>
      </div>

      <button
        onClick={onButtonClick}
        className="bg-white text-[#6d7946] px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition shadow-sm"
      >
        <Heart className="w-4 h-4" />
        {buttonText}
      </button>
    </section>
  );
};