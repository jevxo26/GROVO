import React from 'react';
import ReferralCard from '../Components/ReferralCard/ReferralCard';
import ReferStatCard from '../Components/ReferStatCard/ReferStatCard';
// Donation টাইপটি এখানে ইমপোর্ট করুন
import DonationTable, { Donation } from '../Components/DonationTable/DonationTable'; 

// এখন myDonors এর জন্য Donation টাইপটি সঠিকভাবে কাজ করবে
const myDonors: Donation[] = [
  { id: 1, name: "Nasrin Akhter", email: "nasrin@email.com", joined: "2026-06-10", donated: "৳ 12,000", status: "active", reward: "+500 pts" },
  { id: 2, name: "Hasan Mahmud", email: "hasan@email.com", joined: "2026-05-15", donated: "৳ 8,500", status: "active", reward: "+500 pts" },
];

const statsData = [
  {
    id: 1,
    label: "Total Referred",
    value: "4",
  },
  {
    id: 2,
    label: "Active Donors",
    value: "3",
  },
  {
    id: 3,
    label: "Their Donations",
    value: "25,500",
    prefix: "৳",
    valueColor: "text-[#0D7A70]", // ছবির সেই বিশেষ ডার্ক টিল কালার
  }
];

const RefarelPage = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
            <ReferralCard code="ASHRAY-KAMAL-0847" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {statsData.map((stat) => (
                    <ReferStatCard
                        key={stat.id}
                        label={stat.label}
                        value={stat.value}
                        prefix={stat.prefix}
                        valueColor={stat.valueColor}
                    />
                ))}
            </div>
            <DonationTable data={myDonors} />
        </div>
    );
};

export default RefarelPage;