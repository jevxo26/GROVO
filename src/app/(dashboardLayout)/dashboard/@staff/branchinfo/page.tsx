import React from 'react';
import BranchInfoCard from '../Components/BranchInfoCard/BranchInfoCard';
import BudgetUtilization from '../Components/BudgetUtilization/BudgetUtilization';

const Branchinfo = () => {
    return (
        <div className='max-w-7xl mx-auto p-6 space-y-6'>
            {/* Branch Details */}
            <BranchInfoCard />
            
            {/* Budget Analytics */}
            <BudgetUtilization />
        </div>
    );
};

export default Branchinfo;