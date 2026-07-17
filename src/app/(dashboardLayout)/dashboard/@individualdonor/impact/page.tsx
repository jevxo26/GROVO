"use client";

import React from 'react';
import { DollarSign, Users, Flag, HeartHandshake, DollarSign as DollarSignIcon, Building2, HeartPulse } from 'lucide-react';
import { StatCard } from '../Components/StatCard/StatCard';
import { DonationFlow } from '../Components/DonationFlow/DonationFlow';
import { ImpactReportList } from '../Components/ImpactReport/ImpactReport';
import { reportData } from '@/data/report';

const statsData = [
    { icon: <DollarSign size={20} className="text-teal-600 dark:text-teal-400" />, value: "৳ 19,000", label: "Total Donated", bgColor: "bg-teal-50 dark:bg-teal-950" },
    { icon: <Users size={20} className="text-orange-600 dark:text-orange-400" />, value: "54+", label: "Lives Impacted", bgColor: "bg-orange-50 dark:bg-orange-950" },
    { icon: <Flag size={20} className="text-lime-700 dark:text-lime-400" />, value: "6", label: "Donations Made", bgColor: "bg-lime-50 dark:bg-lime-950" },
    { icon: <HeartHandshake size={20} className="text-cyan-800 dark:text-cyan-400" />, value: "6", label: "Campaigns Supported", bgColor: "bg-cyan-50 dark:bg-cyan-950" },
];

const flowData = [
    { icon: <DollarSignIcon size={24} />, title: "Your Donation", subtitle: "৳ 19,000", bgColor: "bg-teal-100 dark:bg-teal-900" },
    { icon: <Building2 size={24} />, title: "Fund Allocation", subtitle: "6 Categories", bgColor: "bg-orange-100 dark:bg-orange-900" },
    { icon: <HeartPulse size={24} />, title: "Beneficiaries", subtitle: "54+ People", bgColor: "bg-lime-100 dark:bg-lime-900" },
];

const ImpactPage = () => {
    return (
        <div className='space-y-8 p-4 md:p-8 min-h-screen bg-background text-foreground'>
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                        bgColor={stat.bgColor}
                    />
                ))}
            </div>
            <DonationFlow steps={flowData} />
            <ImpactReportList reports={reportData} />
        </div>
    );
};

export default ImpactPage;