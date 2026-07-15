import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  prefix?: React.ReactNode; 
  valueColor?: string;
}

const ReferStatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  prefix, 
  valueColor = "text-stone-900 dark:text-stone-100" 
}) => {
  return (
    <div className="bg-[#FAF9F6] dark:bg-card border border-stone-200/50 dark:border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm min-h-30 w-full">
      {/* কার্ড লেবেল */}
      <span className="text-xs font-bold tracking-wider text-[#A0826C] dark:text-muted-foreground uppercase">
        {label}
      </span>
      
      {/* কার্ড ভ্যালু */}
      <div className={`text-3xl font-serif font-bold mt-4 flex items-center gap-1.5 ${valueColor}`}>
        {prefix && <span className="text-3xl">{prefix}</span>}
        <span>{value}</span>
      </div>
    </div>
  );
};

export default ReferStatCard;