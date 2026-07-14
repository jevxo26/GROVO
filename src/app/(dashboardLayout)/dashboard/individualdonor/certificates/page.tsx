import React from 'react';
import BadgeCard from '../Components/BadgeCard/BadgeCard';

const badgeData = [
  { id: 1, icon: "🏅", title: "Monthly Donor Recognition", desc: "Recognized for consistent monthly donations", date: "2026-07-01", color: "border-teal-200 bg-teal-50 dark:border-teal-900 dark:bg-teal-950/30" },
  { id: 2, icon: "🏆", title: "Education Champion Badge", desc: "Awarded for exceptional support", date: "2026-03-15", color: "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30" },
  { id: 3, icon: "📄", title: "Emergency Responder Certificate", desc: "Contributed significantly to relief", date: "2026-02-28", color: "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/30" },
  { id: 4, icon: "⭐", title: "Annual Philanthropy Award", desc: "Top donor recognition for 2025", date: "2025-12-31", color: "border-teal-200 bg-teal-50 dark:border-teal-900 dark:bg-teal-950/30" },
];

const Certificates = () => {
  return (
    <div className="p-4 md:p-8 space-y-4 min-h-screen bg-background text-foreground">
      <h2 className="text-xl font-bold mb-6">Certificates & Badges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badgeData.map((item) => (
          <BadgeCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;