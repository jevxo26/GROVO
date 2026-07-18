import React from "react";
import { HandCoins, Download } from "lucide-react";

interface MembershipCardProps {
  memberName: string;
  memberNo: string;
  memberType: string;
  validUntil: string;
  status?: string; // '?' মানে এটি অপশনাল
}
export const MembershipCard: React.FC<MembershipCardProps> = ({ 
  memberName, 
  memberNo, 
  memberType, 
  validUntil, 
  status = "Active" 
}) => {
  return (
    <div className="bg-[#8b4513] dark:bg-[#5d2e0a] p-8 rounded-3xl text-white shadow-xl transition-colors duration-300">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <HandCoins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-xl tracking-wide">ASHRAY</h2>
            <p className="text-sm opacity-80">Digital Membership Card</p>
          </div>
        </div>
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
          {status}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
        <div>
          <p className="text-xs opacity-70 uppercase tracking-wider mb-1">
            Member Name
          </p>
          <p className="font-bold text-lg">{memberName}</p>
        </div>
        <div>
          <p className="text-xs opacity-70 uppercase tracking-wider mb-1">
            Member No.
          </p>
          <p className="font-bold text-lg">{memberNo}</p>
        </div>
        <div>
          <p className="text-xs opacity-70 uppercase tracking-wider mb-1">
            Type
          </p>
          <p className="font-bold text-lg">{memberType}</p>
        </div>
        <div>
          <p className="text-xs opacity-70 uppercase tracking-wider mb-1">
            Valid Until
          </p>
          <p className="font-bold text-lg">{validUntil}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs opacity-70">
          This is a digital membership card. Present when needed.
        </p>
        <button className="bg-white text-[#8b4513] px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition shadow-sm text-sm">
          <Download className="w-4 h-4" /> Download Card
        </button>
      </div>
    </div>
  );
};
