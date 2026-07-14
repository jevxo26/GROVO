"use client";

import React from 'react';
import { DollarSign, Users, Flag, HeartHandshake, DollarSign as DollarSignIcon, Building2, HeartPulse } from 'lucide-react';
import { StatCard } from '../Components/StatCard/StatCard';
import { DonationFlow } from '../Components/DonationFlow/DonationFlow';
import { ImpactReportList } from '../Components/ImpactReport/ImpactReport';
import { reportData } from '@/data/report';

const statsData = [
    { icon: <DollarSign size={20} className="text-[#00897b]" />, value: "৳ 19,000", label: "Total Donated", bgColor: "bg-[#e0f2f1]" },
    { icon: <Users size={20} className="text-[#d84315]" />, value: "54+", label: "Lives Impacted", bgColor: "bg-[#fbeae7]" },
    { icon: <Flag size={20} className="text-[#558b2f]" />, value: "6", label: "Donations Made", bgColor: "bg-[#eff3e9]" },
    { icon: <HeartHandshake size={20} className="text-[#006064]" />, value: "6", label: "Campaigns Supported", bgColor: "bg-[#e0f7f9]" },
];

const flowData = [
    { icon: <DollarSignIcon size={24} />, title: "Your Donation", subtitle: "৳ 19,000", bgColor: "bg-[#d1f2eb]" },
    { icon: <Building2 size={24} />, title: "Fund Allocation", subtitle: "6 Categories", bgColor: "bg-[#fceae5]" },
    { icon: <HeartPulse size={24} />, title: "Beneficiaries", subtitle: "54+ People", bgColor: "bg-[#eaf2e3]" },
];

const ImpactPage = () => {
    return (
        <div className='space-y-8 p-4 md:p-8 bg-[#fcfaf9] min-h-screen'>
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