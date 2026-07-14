import React from "react";
import { Heart } from "lucide-react";

interface UserWelcomeProps {
  name: string;
  memberSince: string;
  memberId: string;
  onDonationClick: () => void;
  bgColor?: string; // ব্যাকগ্রাউন্ড কালার ক্লাস (যেমন: "bg-[#8b4513]")
  btnTextColor?: string; // নতুন প্রপ: বাটনের টেক্সট কালারের জন্য
}

const UserWelcomeSection: React.FC<UserWelcomeProps> = ({ 
  name, 
  memberSince, 
  memberId, 
  onDonationClick,
  bgColor = "bg-[#8b4513]", // ডিফল্ট ব্যাকগ্রাউন্ড
  btnTextColor = "text-[#8b4513]" // ডিফল্ট বাটন টেক্সট কালার
}) => {
  return (
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
        // এখানে btnTextColor ডাইনামিক্যালি ব্যবহার করা হয়েছে
        className={`bg-white ${btnTextColor} px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition shadow-sm`}
      >
        <Heart className="w-4 h-4 text-red-500" /> Make a Donation
      </button>
    </section>
  );
};

export default UserWelcomeSection;