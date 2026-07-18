import React from 'react';

interface WelcomeBannerProps {
  name: string;
  id: string;
  rank: string;
  score: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ name, id, rank, score }) => (
  <div className="bg-[#009688] p-8 rounded-3xl text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
    <div>
      <p className="text-white/80">Welcome back, Volunteer</p>
      <h1 className="text-3xl font-bold mt-1">{name}</h1>
      <div className="flex items-center gap-3 mt-3">
        <span className="text-white/90">{id}</span>
        <span className="bg-white/20 px-3 py-0.5 rounded-full text-sm">Rank: {rank}</span>
      </div>
    </div>
    <div className="mt-6 md:mt-0 text-right">
      <h2 className="text-4xl font-bold">{score}</h2>
      <p className="text-white/80">Performance Score</p>
    </div>
  </div>
);