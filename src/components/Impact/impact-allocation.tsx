import React from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';
import { fundAllocationData } from '@/data/impact-data';

export const ImpactAllocation = ({ fadeInUp }: { fadeInUp: any }) => (
  <section className="px-6 py-16 max-w-5xl mx-auto">
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeInUp} 
      className="text-center mb-10"
    >
      <div className="inline-flex items-center gap-2 bg-green-100/70 px-3.5 py-1 rounded-full text-xs font-semibold text-[#058235] uppercase tracking-wider mb-3">
        <PieChart className="w-3.5 h-3.5" /> Fund Allocation
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900">
        Fund Allocation <span className="text-[#058235]">Breakdown</span>
      </h2>
    </motion.div>

    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeInUp}
      className="bg-[#F4F2EB]/60 p-6 sm:p-10 rounded-3xl border border-black/5 shadow-sm space-y-8"
    >
      {/* Progress Bar Segment */}
      <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
        {fundAllocationData.map((item) => (
          <div
            key={item.id}
            style={{ width: `${item.percentage}%` }}
            className={`${item.barColor} h-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white transition-all duration-500`}
            title={`${item.category}: ${item.percentage}%`}
          >
            {item.percentage > 8 && `${item.percentage}%`}
          </div>
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 pt-2">
        {fundAllocationData.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200/60 pb-3">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${item.color}`} />
              <div>
                <p className="font-bold text-gray-800 text-sm sm:text-base">{item.category}</p>
                <p className="text-xs text-gray-500">{item.amount}</p>
              </div>
            </div>
            <span className="font-bold text-gray-700 text-sm sm:text-base">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);