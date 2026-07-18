import React from 'react';
import { StatsSection } from '../../@member/components/StatsSection/StatsSection';
import { DonationTable } from '../../@member/components/DonationTable/DonationTable';

const Donations = () => {
    return (
        <div className="space-y-6 p-4 md:p-8">
            <StatsSection />
            <DonationTable />
        </div>
    );
};

export default Donations;