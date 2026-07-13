import React from "react";
import { UserBadgeBanner } from "./Components/UserBadgeBanner/UserBadgeBanner";
import { stafstatedata } from "@/data/stats";
import { StatsCard } from "./Components/StatsCard/StatsCard";

const StafDashboard = () => {
  return (
    <div className="space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
      <UserBadgeBanner
        name="Ayesha Siddiqua"
        role="Office Manager · Administration"
        badgeText="National Headquarters"
        bgColor="bg-[#3D2B26]"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stafstatedata.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          valueColor={stat.valueColor}
        />
      ))}
      </div>
    </div>
  );
};

export default StafDashboard;
