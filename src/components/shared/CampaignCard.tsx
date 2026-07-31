import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ArrowRight } from 'lucide-react';

export interface CampaignProps {
  id: number | string;
  image: string;
  category: string;
  isUrgent?: boolean;
  raised: string;
  goal: string;
  title: string;
  description: string;
  percentage: number;
  daysLeft: number;
  helpedCount: string;
}

export default function CampaignCard({ campaign }: { campaign: CampaignProps }) {
  const {
    id,
    image,
    category,
    isUrgent,
    raised,
    goal,
    title,
    description,
    percentage,
    daysLeft,
    helpedCount,
  } = campaign;

  // dynamic details URL
  const detailsUrl = `/campaigns/${id}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
      {/* Top Banner with Image and Overlay Info */}
      <Link href={detailsUrl} className="relative h-56 w-full bg-gray-200 block overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            {category}
          </span>
          {isUrgent && (
            <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              URGENT
            </span>
          )}
        </div>

        {/* Raised vs Goal Overlay Box */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md rounded-xl p-3 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">RAISED</p>
            <p className="text-base font-extrabold text-gray-900 font-serif">{raised}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">GOAL</p>
            <p className="text-base font-extrabold text-gray-900 font-serif">{goal}</p>
          </div>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col grow justify-between">
        <div>
          {/* Title & Description */}
          <Link href={detailsUrl}>
            <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1 font-serif hover:text-[#136139] transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mb-5 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Progress Section */}
          <div className="mb-5">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-gray-900 text-sm font-extrabold">{percentage}%</span>
              <span className="text-gray-400 text-[10px] uppercase tracking-wider">FUNDED</span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="flex gap-1 h-1.5 w-full">
              {[...Array(10)].map((_, i) => {
                const stepPercent = (i + 1) * 10;
                const isFilled = percentage >= stepPercent;
                return (
                  <div
                    key={i}
                    className={`h-full flex-1 rounded-full ${
                      isFilled ? 'bg-[#136139]' : 'bg-gray-100'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Meta Info (Days Left & Helped) */}
          <div className="flex items-center gap-6 text-xs text-gray-500 mb-6 pt-2 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-[#136139]">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-none">{daysLeft}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tight">DAYS LEFT</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-[#136139]">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-none">{helpedCount}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tight">HELPED</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button - Linked to Details Page */}
        <Link
          href={detailsUrl}
          className="w-full bg-[#136139] hover:bg-[#0e482a] text-white font-medium py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors duration-200"
        >
          Support This Campaign
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}