import React from "react";
import { Heart } from "lucide-react";

// ১. প্রপস-এর জন্য একটি ইন্টারফেস তৈরি করুন
interface UserWelcomeProps {
  name: string;
  memberSince: string;
  memberId: string;
  onDonationClick: () => void;
}

// ২. কম্পোনেন্টে ইন্টারফেসটি প্রয়োগ করুন
const UserWelcomeSection: React.FC<UserWelcomeProps> = ({ 
  name, 
  memberSince, 
  memberId, 
  onDonationClick 
}) => {
  return (
    <section className="bg-[#8b4513] text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
      <div>
        <p className="text-sm opacity-90 font-medium">Welcome back</p>
        <h1 className="text-3xl font-bold font-serif">{name}</h1>
        <p className="text-sm opacity-80 mt-1">
          Member since {memberSince} · {memberId}
        </p>
      </div>
      <button 
        onClick={onDonationClick}
        className="bg-white text-[#8b4513] px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition shadow-sm"
      >
        <Heart className="w-4 h-4" /> Make a Donation
      </button>
    </section>
  );
};

export default UserWelcomeSection;