import React from "react";
import { Heart } from "lucide-react";

interface UserWelcomeProps {
  name: string;
  memberSince: string;
  memberId: string;
  onDonationClick: () => void;
  // নতুন প্রপ: ব্যাকগ্রাউন্ড কালারের জন্য
  bgColor?: string; 
}

const UserWelcomeSection: React.FC<UserWelcomeProps> = ({ 
  name, 
  memberSince, 
  memberId, 
  onDonationClick,
  bgColor = "bg-[#8b4513]" // ডিফল্ট কালার
}) => {
  return (
    // ডাইনামিক ক্লাস ব্যবহার করা হয়েছে
    <section className={`${bgColor} text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-lg gap-4`}>
      <div>
        <p className="text-sm opacity-90 font-medium">Welcome back</p>
        <h1 className="text-3xl font-bold font-serif">{name}</h1>
        <p className="text-sm opacity-80 mt-1">
          Member since {memberSince} · {memberId}
        </p>
      </div>
      <button 
        onClick={onDonationClick}
        className="bg-white text-slate-800 px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition shadow-sm"
      >
        <Heart className="w-4 h-4 text-red-500" /> Make a Donation
      </button>
    </section>
  );
};

export default UserWelcomeSection;