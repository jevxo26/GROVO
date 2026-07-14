"use client";

import React from "react";
import { ProfileBanner } from "../Components/ProfileBanner/ProfileBanner";
import { SettingsForm } from "../Components/SettingsForm/SettingsForm";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyContribution: number;
  autoRenew: boolean;
}

const ProfilePage = () => {
  const defaultValues = {
    firstName: "Kamal",
    lastName: "Hossain",
    email: "kamal.donor@email.com",
    phone: "+880 1712-345678",
    monthlyContribution: 2002,
    autoRenew: true
  };

  const handleSave = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
      {/* প্রোফাইল ব্যানার সেকশন */}
      <ProfileBanner
        name="Kamal Hossain"
        memberId="ASH-DON-2024-0847"
        memberSince="2024-03-15"
        userType="Individual Donor"
        totalDonated="৳ 48,500"
        rewardPoints={2450}
        imageUrl="/image.jpg"
      />
      <SettingsForm defaultValues={defaultValues} onSave={handleSave} />
    </div>
  );
};

export default ProfilePage;
