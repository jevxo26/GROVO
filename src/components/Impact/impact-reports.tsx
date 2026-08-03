import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUpRight } from 'lucide-react';
import { monthlyReportsData } from '@/data/impact-data';

export const ImpactReports = ({ fadeInUp }: { fadeInUp: any }) => (
  <section className="px-6 py-16 max-w-5xl mx-auto">
    
    {/* Header */}
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeInUp} 
      className="text-center mb-10"
    >
      <div className="
        inline-flex items-center gap-2 
        bg-green-100/70 dark:bg-green-900/30 
        px-3.5 py-1 rounded-full 
        text-xs font-semibold 
        text-[#058235] dark:text-green-400 
        uppercase tracking-wider mb-3
      ">
        <FileText className="w-3.5 h-3.5" /> Monthly Reports
      </div>

      <h2 className="
        text-3xl sm:text-4xl md:text-5xl 
        font-serif font-bold 
        text-gray-900 dark:text-gray-100
      ">
        Monthly <span className="text-[#058235] dark:text-green-400">Transparency Reports</span>
      </h2>
    </motion.div>

    {/* Table */}
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeInUp}
      className="overflow-x-auto"
    >
      <table className="w-full text-left border-collapse">
        
        {/* Table Head */}
        <thead>
          <tr className="
            border-b border-gray-200 dark:border-gray-700 
            text-[11px] uppercase tracking-wider 
            text-gray-400 dark:text-gray-500 
            font-semibold
          ">
            <th className="py-4 px-4">Month</th>
            <th className="py-4 px-4">Donations</th>
            <th className="py-4 px-4">Expenses</th>
            <th className="py-4 px-4">Projects</th>
            <th className="py-4 px-4">Beneficiaries</th>
            <th className="py-4 px-4 text-right">Details</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-100/80 dark:divide-gray-700">
          {monthlyReportsData.map((report) => (
            <tr 
              key={report.id} 
              className="hover:bg-black/[0.02] dark:hover:bg-white/[0.05] transition-colors"
            >
              <td className="py-4 px-4 font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                {report.month}
              </td>

              <td className="py-4 px-4 font-bold text-[#058235] dark:text-green-400 text-sm sm:text-base">
                {report.donations}
              </td>

              <td className="py-4 px-4 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                {report.expenses}
              </td>

              <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {report.projects}
              </td>

              <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {report.beneficiaries}
              </td>

              <td className="py-4 px-4 text-right">
                <button className="
                  inline-flex items-center gap-1 
                  font-semibold 
                  text-[#058235] dark:text-green-400 
                  hover:underline 
                  text-xs sm:text-sm
                ">
                  View Report <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </motion.div>
  </section>
);