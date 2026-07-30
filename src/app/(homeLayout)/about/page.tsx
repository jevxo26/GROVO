
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AboutHero } from '@/components/ui/about-page/about-hero';
import { AboutMission } from '@/components/ui/about-page/about-mission';
import { AboutStats } from '@/components/ui/about-page/about-stats';
import { AboutHierarchy } from '@/components/ui/about-page/about-hierarchy';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-gray-800 font-sans overflow-hidden">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        <AboutHero fadeInUp={fadeInUp} />
      </motion.div>
      
      <AboutMission fadeInUp={fadeInUp} />
      
      <AboutStats fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
      
      <AboutHierarchy fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
    </div>
  );
}