import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

export const AboutMission = ({ fadeInUp }: { fadeInUp: any }) => (
  <section className="px-6 py-12 max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* Mission Card */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        whileHover={{ y: -5 }}
        className="bg-[#F4F2EB] p-8 md:p-10 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Target className="w-6 h-6 text-[#058235]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          To create a transparent, accountable, and efficient ecosystem for humanitarian service delivery. We believe every donor deserves to know exactly how their contribution creates impact, and every beneficiary deserves dignified access to aid without discrimination.
        </p>
      </motion.div>

      {/* Vision Card */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        whileHover={{ y: -5 }}
        className="bg-[#F4F2EB] p-8 md:p-10 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <Eye className="w-6 h-6 text-[#058235]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Our Vision</h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          A world where charitable giving is powered by technology, trust, and transparency. Where foundations operate with the efficiency of modern enterprises while maintaining the compassion and humanity that drives their purpose. Every contribution tracked, every life impacted, every hope renewed.
        </p>
      </motion.div>

    </div>
  </section>
);