import React from 'react';
import { DonationCard } from '../Components/DonationCard/DonationCard';
import { donordonation } from '@/data/donordonation';

const CampaignsPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {donordonation.map((item, index) => (
          <DonationCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CampaignsPage;