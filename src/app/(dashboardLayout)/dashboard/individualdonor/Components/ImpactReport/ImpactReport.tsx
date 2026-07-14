import React from 'react';
import { Download } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  meta: string;
  amount: string;
}

interface ImpactReportProps {
  reports: Report[];
}

export const ImpactReportList: React.FC<ImpactReportProps> = ({ reports }) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Impact Reports</h2>
      
      <div className="space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="flex justify-between items-center border-b border-gray-50 pb-6 last:border-0 last:pb-0">
            <div>
              <h3 className="font-semibold text-gray-900">{report.title}</h3>
              <p className="text-sm text-gray-500">{report.meta}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="font-bold text-gray-900">{report.amount}</span>
              <button className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <Download size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};