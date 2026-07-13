"use client";
import { HandCoins, Flag, Award, Crown, Heart } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { RecentDonations } from "./components/RecentDonations/RecentDonations";
import { SupportedCampaigns } from "./components/SupportedCampaigns/SupportedCampaigns";
import { QuickActions } from "./components/QuickActions/QuickActions";

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
      <section className="bg-[#8b4513] text-white p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-lg gap-4">
        <div>
          <p className="text-sm opacity-90 font-medium">Welcome back</p>
          <h1 className="text-3xl font-bold font-serif">Kamal Hossain</h1>
          <p className="text-sm opacity-80 mt-1">
            Member since 2024-03-15 · ASH-MEM-2024-0847
          </p>
        </div>
        <button className="bg-white text-[#8b4513] px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition shadow-sm">
          <Heart className="w-4 h-4" /> Make a Donation
        </button>
      </section>

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
          <RecentDonations />
          <SupportedCampaigns />
        </div>
        <div>
          <QuickActions></QuickActions>
        </div>
      </section>
    </div>
  );
};

export default MemberDashboard;
