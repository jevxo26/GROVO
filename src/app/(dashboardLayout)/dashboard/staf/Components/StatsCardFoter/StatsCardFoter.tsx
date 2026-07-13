interface StatsCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
}

export const StatsCardFoter: React.FC<StatsCardProps> = ({ title, value, valueColor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
      <h3 className="text-sm text-gray-500 mb-2">
        {title}
      </h3>
      <p className={`text-2xl font-bold font-serif ${valueColor || "text-black"}`}>
        {value}
      </p>
    </div>
  );
};