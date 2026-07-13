// src/components/StatsCard/StatsCard.tsx
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  valueColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  valueColor 
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className={`text-3xl font-bold font-serif ${valueColor || "text-black"}`}>
        {value}
      </p>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  );
};