"use client";
import { DollarSign, Users, User, PieChart } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { QuickActions } from "./components/QuickActions/QuickActions";
import { BadgesSection } from "./components/BadgesSection/BadgesSection";
import UserWelcomeSection from "../Components/UserWelcomeSection";
import SupportedCampaigns from "../Components/SupportedCampaigns";
import { campaigns } from "@/data/campaigns"; // ডেটা ইম্পোর্ট করা হয়েছে
import { RecentDonations } from "../Components/RecentDonations";
import { donations } from "@/data/donations";

const myBadges = ["Corporate Partner", "Matching Donor", "Platinum CSR"];

const CorporateDashboard: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
      <UserWelcomeSection
        name="Kamal Hossain"
        memberSince="2024-03-15"
        memberId="ASH-MEM-2024-0847"
        onDonationClick={() => {}}
        bgColor="bg-emerald-800"
        btnTextColor="text-emerald-800"
      />

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
        <RecentDonations title="Recent Donations" donations={donations} />
        {/* এখানে campaigns ভেরিয়েবলটি ব্যবহার করা হয়েছে */}
        <SupportedCampaigns title="Active Campaigns" campaigns={campaigns} />
      </div>

      <div>
        <QuickActions />
      </div>
    </div>
  );
};

export default CorporateDashboard;
