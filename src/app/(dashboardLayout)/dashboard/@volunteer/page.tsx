import React from "react";
import { Users, HandCoins, ListChecks, Award } from "lucide-react";
import { WelcomeBanner } from "./components/WelcomeBanner/WelcomeBanner";
import { InfoCard } from "./components/InfoCard/InfoCard";
import { RecentActivities } from "./components/RecentActivities/RecentActivities";
import { MonthlyPerformance } from "./components/MonthlyPerformance/MonthlyPerformance";

const recentActivitiesData = [
  { title: "Registered 5 new members in Savar Union", date: "2026-07-09", location: "Savar, Dhaka", points: "+50 pts" },
  { title: "Secured 3 new monthly donors for Education Campaign", date: "2026-07-07", location: "Dhamrai, Dhaka", points: "+45 pts" },
  { title: "Beneficiary verification visit - 12 families assessed", date: "2026-07-05", location: "Ashulia, Dhaka", points: "+60 pts" },
  { title: "Assisted in Winter Warmth blanket distribution", date: "2026-06-28", location: "Savar, Dhaka", points: "+80 pts" },
  { title: "Uploaded 47 photos from Medical Camp event", date: "2026-06-20", location: "Dhamrai, Dhaka", points: "+25 pts" },
];

// Monthly Performance এর জন্য ফেক ডেটা
const monthlyPerformanceData = [
  { month: "Jan 2026", points: 285 },
  { month: "Feb 2026", points: 320 },
  { month: "Mar 2026", points: 410 },
  { month: "Apr 2026", points: 360 },
  { month: "May 2026", points: 445 },
  { month: "Jun 2026", points: 395 },
  { month: "Jul 2026", points: 230 },
];

const VolunteerHomePage = () => {
  return (
    <div className="p-6 md:p-10 space-y-8 bg-gray-50 dark:bg-[#120f0d] min-h-screen transition-colors">
      <WelcomeBanner
        name="Dr. Sarah Hossain"
        id="VOL-DHK-0124"
        rank="Gold"
        score={94}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InfoCard icon={Users} value={87} label="Members Registered" />
        <InfoCard icon={HandCoins} value={34} label="Donors Registered" />
        <InfoCard icon={ListChecks} value={156} label="Activities Done" />
        <InfoCard icon={Award} value="Gold" label="Current Rank" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ডেটা পাস করা হয়েছে */}
        <RecentActivities activities={recentActivitiesData} />
        <MonthlyPerformance data={monthlyPerformanceData} />
      </div>
    </div>
  );
};

export default VolunteerHomePage;