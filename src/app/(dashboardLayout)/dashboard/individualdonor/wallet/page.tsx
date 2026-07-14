import React from 'react';
import { BalanceCard } from '../Components/BalanceCard/BalanceCard';

const WalletPage = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8 bg-[#fcfaf9] dark:bg-[#12100f] min-h-screen transition-colors duration-300">
            <BalanceCard
                availableBalance="-9,800"
                rewardPoints={2450}
                monthlyPledge={2000}
            />
        </div>
    );
};

export default WalletPage;