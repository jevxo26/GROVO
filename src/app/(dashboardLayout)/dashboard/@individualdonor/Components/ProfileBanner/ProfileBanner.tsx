import React from 'react';
import Image from 'next/image';

interface ProfileBannerProps {
  name: string;
  memberId: string;
  memberSince: string;
  userType: string;
  totalDonated: string;
  rewardPoints: number | string;
  imageUrl?: string;
  bgColor?: string;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  name,
  memberId,
  memberSince,
  userType,
  totalDonated,
  rewardPoints,
  imageUrl = "/default-avatar.png",
  bgColor = "bg-[#8b4513]",
}) => {
  return (
    <div className={`relative w-full ${bgColor} p-8 rounded-2xl text-white overflow-hidden`}>
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন - ইমেজের মতো কর্নারে হালকা সার্কেল */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/5 rounded-full"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>

      <div className="flex flex-col gap-6">
        {/* প্রোফাইল ইমেজ এবং নাম */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
            <Image 
              src={imageUrl} 
              alt={name} 
              width={64} 
              height={64} 
              className="object-cover" 
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm opacity-90 font-medium tracking-wide">{memberId}</p>
          </div>
        </div>

        {/* ডেটা গ্রিড - ইমেজের লেআউট অনুযায়ী */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <p className="text-xs opacity-80 mb-1">Member Since</p>
            <p className="font-bold text-xl">{memberSince}</p>
          </div>
          <div>
            <p className="text-xs opacity-80 mb-1">Type</p>
            <p className="font-bold text-xl">{userType}</p>
          </div>
          <div>
            <p className="text-xs opacity-80 mb-1">Total Donated</p>
            <p className="font-bold text-xl">{totalDonated}</p>
          </div>
          <div>
            <p className="text-xs opacity-80 mb-1">Reward Points</p>
            <p className="font-bold text-xl">{rewardPoints}</p>
          </div>
        </div>
      </div>
    </div>
  );
};