import Image from 'next/image';
import React from 'react';

interface DonationCardProps {
    image: string;
    title: string;
    category: string;
    status: string;
    progress: number;
    yourTotal: string;
    donationsCount: number;
}

export const DonationCard: React.FC<DonationCardProps> = ({
    image,
    title,
    category,
    status,
    progress,
    yourTotal,
    donationsCount,
}) => {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-full h-48 mb-4">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                <span className="bg-[#eef2ec] text-[#4d7c0f] text-xs px-2 py-1 rounded-full uppercase font-medium">{status}</span>
            </div>

            <p className="text-gray-500 text-sm mb-4">{category}</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
                <div className="bg-[#00897b] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-right text-sm font-medium text-gray-700 mb-4">{progress}%</p>

            <div className="flex justify-between text-sm text-gray-500 mb-6">
                <p>Your total: <span className="font-bold text-gray-900">{yourTotal}</span></p>
                <p className="font-bold text-gray-900">{donationsCount} donations</p>
            </div>

            <button className="w-full py-3 bg-[#8b4513] text-white rounded-lg hover:bg-[#6e370f] transition-colors font-medium">
                Donate Again
            </button>
        </div>
    );
};