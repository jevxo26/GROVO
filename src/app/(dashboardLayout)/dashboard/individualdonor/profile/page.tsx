import React from 'react';
import { ProfileBanner } from '../Components/ProfileBanner/ProfileBanner';

const ProfilePage = () => {
  return (
    <div className="space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
      <ProfileBanner
      name="Kamal Hossain"
      memberId="ASH-DON-2024-0847"
      memberSince="2024-03-15"
      userType="Individual Donor"
      totalDonated="৳ 48,500"
      rewardPoints={2450}
      imageUrl="/image.jpg"
    />
    </div>
  );
};

export default ProfilePage;