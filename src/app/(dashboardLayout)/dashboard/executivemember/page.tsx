"use client";
import { HandCoins, Flag, Award, Crown } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { QuickActions } from "./components/QuickActions/QuickActions";
import UserWelcomeSection from "../Components/UserWelcomeSection";
import SupportedCampaigns from "../Components/SupportedCampaigns";
import { campaigns } from "@/data/campaigns";
import { RecentDonations } from "../Components/RecentDonations";
import { donations } from "@/data/donations";

type Badge = string;

const MemberDashboard: React.FC = () => {
  const badges: Badge[] = [
    "Early Supporter",
    "Monthly Donor",
    "Education Champion",
    "Emergency Responder",
  ];

  return (
    <div className="space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
      {/* Header Banner - ইমেজের স্টাইল অনুযায়ী */}
      <UserWelcomeSection
        name="Dr. Imran Hossain"
        memberSince="2023-09-01"
        memberId="ASH-EX-2023-010"
        onDonationClick={() => console.log("Donation clicked!")}
        bgColor="bg-[#8b4513]"
      />

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="TOTAL DONATED"
          value="৳ 32,000"
          subtitle="All-time contributions"
          icon={HandCoins}
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />
        <StatCard
          title="CAMPAIGNS"
          value="12"
          subtitle="Campaigns supported"
          icon={Flag}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="CERTIFICATES"
          value="4"
          subtitle="Achievements earned"
          icon={Award}
          iconBg="bg-green-50"
          iconColor="text-green-700"
        />
        <StatCard
          title="MEMBERSHIP"
          value="General Member"
          subtitle="Active member"
          icon={Crown}
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />
      </section>

      {/* Badges Section */}
      <section>
        <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4 tracking-wide text-sm">
          YOUR BADGES
        </h2>
        <div className="flex flex-wrap gap-3">
          {badges.map((badge: Badge) => (
            <span
              key={badge}
              className="px-4 py-2 bg-[#d1ede6] text-[#006d5b] rounded-full text-sm font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 py-8 md:grid-cols-2 gap-6">
          <RecentDonations title="Recent Donations" donations={donations} />
          <SupportedCampaigns title="Supported Campaigns" campaigns={campaigns} />
        </div>
        <div>
          <QuickActions></QuickActions>
        </div>
      </section>
    </div>
  );
};

export default MemberDashboard;
