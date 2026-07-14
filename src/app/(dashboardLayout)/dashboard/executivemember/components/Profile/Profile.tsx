"use client";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { InfoCard } from "../InfoCard/InfoCard";
import { MembershipCard } from "../../../member/components/MembershipCard/MembershipCard";

interface InfoItem {
  label: string;
  value: string;
}

interface ProfileProps {
  user: {
    name: string;
    membershipType: string;
    memberNo: string;
    image: string;
    badges: string[];
    personalInfo: InfoItem[];
    membershipInfo: InfoItem[];
    validUntil: string;
  };
}

export const Profile = ({ user }: ProfileProps) => {
  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-24 h-24">
          <Image src={user.image} alt={user.name} fill className="rounded-2xl object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user.membershipType} · {user.memberNo}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#2f2824] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold">
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {user.badges.map((b) => (
              <span key={b} className="px-3 py-1 bg-[#d1ede6] text-[#006d5b] rounded-full text-xs font-medium">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Personal Info" data={user.personalInfo} />
        <InfoCard title="Membership Info" data={user.membershipInfo} />
      </div>

      <MembershipCard
        memberName={user.name}
        memberNo={user.memberNo}
        memberType={user.membershipType}
        validUntil={user.validUntil}
      />
    </div>
  );
};