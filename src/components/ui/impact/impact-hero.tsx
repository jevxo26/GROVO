import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { impactStatsData } from '@/data/impact-data';

export const ImpactHero = ({ fadeInUp, staggerContainer }: { fadeInUp: any; staggerContainer: any }) => (
  <section className="px-6 py-16 md:py-20 max-w-6xl mx-auto">
    {/* Header */}
    <motion.div variants={fadeInUp} className="text-left mb-12">
      <div className="inline-flex items-center gap-2 bg-green-100/70 px-3.5 py-1 rounded-full text-xs font-semibold text-[#058235] uppercase tracking-wider mb-4">
        <TrendingUp className="w-3.5 h-3.5" /> Transparency & Impact
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
        Where Every <span className="text-[#058235]">Taka</span> Goes
      </h1>
      <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
        We believe in 100% transparency. Explore how donations are allocated, what projects they fund, and the lives they change.
      </p>
    </motion.div>

    {/* Top 4 Impact Cards */}
    <motion.div variants={staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
      {impactStatsData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={stat.id}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-[#F4F2EB]/80 p-6 md:p-8 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-sm border border-black/5"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <IconComponent className="w-5 h-5 text-[#058235]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#058235]">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);