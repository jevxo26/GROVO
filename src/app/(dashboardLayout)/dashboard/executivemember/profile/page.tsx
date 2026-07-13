"use client";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { InfoCard } from "../components/InfoCard/InfoCard";
import { MembershipCard } from "../components/MembershipCard/MembershipCard";

// ব্যাজগুলোর জন্য টাইপ
const badges: string[] = [
  "Early Supporter",
  "Monthly Donor",
  "Education Champion",
  "Emergency Responder",
];

// ইনফরমেশন টাইপ ইন্টারফেস
interface InfoItem {
  label: string;
  value: string;
}

const Profile = () => {
  const personalInfo: InfoItem[] = [
    { label: "Full Name", value: "Dr. Imran Hossain" },
    { label: "Email", value: "afljafsdkj@gamil.com" },
    { label: "Phone", value: "+880 1712-345678" },
  ];

  const membershipInfo: InfoItem[] = [
    { label: "Type", value: "Executive Member" },
    { label: "Number", value: "ASH-MEM-2024-0847" },
    { label: "Joined", value: "2024-03-15" },
    { label: "Expiry", value: "2027-03-15" },
    { label: "Monthly Contribution", value: "৳ 1,000" },
  ];

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-[#1a1716] p-6 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-24 h-24">
          <Image
            src="/image.jpg" // পাবলিক ফোল্ডারের ফাইল এভাবে দিতে হয়
            alt="Kamal Hossain"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Dr. Imran Hossain
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Executive Member · ASH-MEM-2024-0847
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#2f2824] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {badges.map((b) => (
              <span
                key={b}
                className="px-3 py-1 bg-[#d1ede6] dark:bg-[#1b2a21] text-[#006d5b] dark:text-[#6ba97e] rounded-full text-xs font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Personal Info" data={personalInfo} />
        <InfoCard title="Membership Info" data={membershipInfo} />
      </div>
      <div>
        <MembershipCard
          memberName="Rahim Ahmed"
          memberNo="ASH-MEM-2024-0848"
          memberType="Life Member"
          validUntil="2030-12-31"
        />
      </div>
    </div>
  );
};

export default Profile;
