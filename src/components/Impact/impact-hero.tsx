import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { impactStatsData } from '@/data/impact-data';

export const ImpactHero = ({
  fadeInUp,
  staggerContainer,
}: {
  fadeInUp: any;
  staggerContainer: any;
}) => (
  <section className="px-6 py-16 md:py-20 max-w-6xl mx-auto">
    
    {/* Header */}
    <motion.div variants={fadeInUp} className="text-left mb-12">
      
      {/* Badge */}
      <div className="
        inline-flex items-center gap-2 
        bg-green-100/70 text-[#058235]
        dark:bg-[#0f2e1c] dark:text-green-400
        px-3.5 py-1 rounded-full text-xs font-semibold 
        uppercase tracking-wider mb-4
        transition-colors
      ">
        <TrendingUp className="w-3.5 h-3.5" /> Transparency & Impact
      </div>

      {/* Title */}
      <h1 className="
        text-4xl sm:text-5xl md:text-6xl 
        font-serif font-bold leading-tight
        text-gray-900 dark:text-gray-100
      ">
        Where Every <span className="text-[#058235] dark:text-green-400">Taka</span> Goes
      </h1>

      {/* Description */}
      <p className="
        mt-4 text-base sm:text-lg max-w-2xl leading-relaxed
        text-gray-600 dark:text-gray-400
      ">
        We believe in 100% transparency. Explore how donations are allocated,
        what projects they fund, and the lives they change.
      </p>
    </motion.div>

    {/* Cards */}
    <motion.div
      variants={staggerContainer}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10"
    >
      {impactStatsData.map((stat) => {
        const IconComponent = stat.icon;

        return (
          <motion.div
            key={stat.id}
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.03 }}
            className="
              p-6 md:p-8 rounded-2xl flex flex-col items-center text-center space-y-3
              
              bg-[#F4F2EB]/80 dark:bg-[#111814]
              border border-black/5 dark:border-white/10
              shadow-sm hover:shadow-lg
              
              transition-all duration-300
            "
          >
            {/* Icon */}
            <div className="
              w-10 h-10 rounded-xl flex items-center justify-center
              bg-white dark:bg-[#1a2a22]
              shadow-sm
            ">
              <IconComponent className="w-5 h-5 text-[#058235] dark:text-green-400" />
            </div>

            {/* Value */}
            <h3 className="
              text-2xl md:text-3xl font-serif font-bold
              text-[#058235] dark:text-green-400
            ">
              {stat.value}
            </h3>

            {/* Label */}
            <p className="
              text-xs sm:text-sm font-medium
              text-gray-500 dark:text-gray-400
            ">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);