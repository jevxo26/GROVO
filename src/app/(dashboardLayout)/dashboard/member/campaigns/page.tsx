import React from 'react';
import { CampaignCard } from '../components/CampaignCard/CampaignCard';

const campaignsData = [
  { category: "Emergency Relief", status: "active", title: "Emergency Flood Relief – Sylhet", progress: 68, donatedCount: 3, totalAmount: "৳ 15,000", lastDate: "2026-07-08" },
  { category: "Education", status: "active", title: "Education for Every Child", progress: 62, donatedCount: 2, totalAmount: "৳ 6,000", lastDate: "2026-06-25" },
  { category: "Food", status: "active", title: "Food Security – Daily Meals", progress: 89, donatedCount: 3, totalAmount: "৳ 7,500", lastDate: "2026-06-15" },
  { category: "Medical", status: "active", title: "Free Medical Camp", progress: 78, donatedCount: 1, totalAmount: "৳ 1,500", lastDate: "2026-05-20" },
  { category: "Orphan Support", status: "active", title: "Orphan Support Fund", progress: 44, donatedCount: 3, totalAmount: "৳ 15,000", lastDate: "2026-04-15" },
  { category: "Winter Relief", status: "active", title: "Winter Warmth Drive", progress: 59, donatedCount: 2, totalAmount: "৳ 3,500", lastDate: "2026-05-01" },
];

const Campaigns = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignsData.map((c, index) => (
          <CampaignCard key={index} {...c} />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;