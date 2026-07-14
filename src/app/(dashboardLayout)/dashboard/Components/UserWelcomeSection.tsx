import React from "react";
import { Heart } from "lucide-react";

interface UserWelcomeProps {
  name: string;
  memberSince: string;
  memberId: string;
  onDonationClick: () => void;
  bgColor?: string; 
  btnTextColor?: string; 
}

const UserWelcomeSection: React.FC<UserWelcomeProps> = ({ 
  name, 
  memberSince, 
  memberId, 
  onDonationClick,
  bgColor = "bg-[#8b4513]",
  btnTextColor = "text-[#8b4513]"
}) => {
  return (
    <section className={`${bgColor} dark:bg-orange-950 text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-lg gap-4 transition-colors`}>
      <div>
        <p className="text-sm opacity-90 font-medium">Welcome back</p>
        <h1 className="text-3xl font-bold font-serif">{name}</h1>
        <p className="text-sm opacity-80 mt-1">
          Member since {memberSince} {memberId}
        </p>
      </div>
      
      <button 
        onClick={onDonationClick}
        className={`bg-white dark:bg-slate-900 ${btnTextColor} dark:text-orange-100 px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-sm`}
      >
        <Heart className="w-4 h-4 text-red-500" /> Make a Donation
      </button>
    </section>
  );
};

export default UserWelcomeSection;