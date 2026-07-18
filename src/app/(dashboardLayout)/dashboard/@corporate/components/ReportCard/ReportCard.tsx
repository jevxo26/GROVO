import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Report } from '@/data/report'; // নিশ্চিত করুন আপনার ইন্টারফেসের পাথ ঠিক আছে

interface ReportCardProps {
  report: Report;
}

export const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-[#1a1716] border border-[#efe9e6] dark:border-[#2f2824] rounded-2xl shadow-sm mb-4">
      <div className="flex items-start gap-4 mb-4 md:mb-0">
        <div className="bg-[#fdfcf9] dark:bg-[#2f2824] p-2 rounded-lg border border-[#efe9e6] dark:border-[#3d3530]">
          <FileText className="w-5 h-5 text-[#a0522d]" />
        </div>
        <div>
          <h3 className="font-bold text-[#2a2a2a] dark:text-gray-100">{report.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{report.description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <span className="font-bold text-[#2a2a2a] dark:text-gray-200">{report.amount}</span>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#eef2ef] dark:bg-[#202e25] text-[#4a7c59] dark:text-[#6ba97e] rounded-lg text-sm font-medium hover:bg-[#dce6dc] dark:hover:bg-[#2d3e33] transition">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>
    </div>
  );
};