import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { statsData } from '@/data/about-data';

export const AboutStats = ({ fadeInUp, staggerContainer }: { fadeInUp: any; staggerContainer: any }) => (
  <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto text-center">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
      <div className="inline-flex items-center gap-2 bg-green-100/70 px-4 py-1.5 rounded-full text-xs font-semibold text-[#058235] uppercase tracking-wider mb-4">
        <Globe className="w-4 h-4" /> At a Glance
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-12">
        Organization in <span className="text-[#058235]">Numbers</span>
      </h2>
    </motion.div>

    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
      {statsData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <motion.div key={stat.id} variants={fadeInUp} whileHover={{ scale: 1.05 }} className="bg-[#F4F2EB] p-6 rounded-2xl flex flex-col items-center text-center space-y-3 shadow-sm">
            <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center mb-1 shadow-sm">
              <IconComponent className="w-5 h-5 text-[#058235]" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#058235]">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);