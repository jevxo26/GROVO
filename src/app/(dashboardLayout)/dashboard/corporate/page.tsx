"use client";
import { DollarSign, Users, User, PieChart } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { RecentDonations } from "./components/RecentDonations/RecentDonations";
import { SupportedCampaigns } from "./components/SupportedCampaigns/SupportedCampaigns";
import { QuickActions } from "./components/QuickActions/QuickActions";
import { WelcomeBanner } from "./components/WelcomeBanner/WelcomeBanner";
import { BadgesSection } from "./components/BadgesSection/BadgesSection";

const myBadges = ["Corporate Partner", "Matching Donor", "Platinum CSR"];

const MemberDashboard: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
      {/* Header Banner - ইমেজের স্টাইল অনুযায়ী */}
      <WelcomeBanner
        title="Rahim Industries Ltd."
        subtitle="Manufacturing"
        onButtonClick={() => console.log("Action triggered!")}
      />
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="TOTAL DONATED"
          value="৳ 10.3L"
          icon={DollarSign}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-700"
        />
        <StatCard
          title="EMPLOYEE MATCH"
          value="৳ 300K"
          icon={Users}
          iconBg="bg-teal-100"
          iconColor="text-teal-700"
        />
        <StatCard
          title="EMPLOYEES"
          value="450"
          icon={User}
          iconBg="bg-orange-100"
          iconColor="text-orange-700"
        />
        <StatCard
          title="CSR BUDGET"
          value="৳ 20.0L"
          icon={PieChart}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-700"
        />
      </section>
      <BadgesSection badges={myBadges} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentDonations />
        <SupportedCampaigns />
      </div>
      <div>
        <QuickActions></QuickActions>
      </div>
    </div>
  );
};

export default MemberDashboard;
