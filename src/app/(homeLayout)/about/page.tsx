'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AboutHero } from '@/components/AboutPage/about-hero';
import { AboutMission } from '@/components/AboutPage/about-mission';
import { AboutStats } from '@/components/AboutPage/about-stats';
import { AboutHierarchy } from '@/components/AboutPage/about-hierarchy';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <AboutHero fadeInUp={fadeInUp} />
      </motion.div>

      {/* Sections */}
      <AboutMission fadeInUp={fadeInUp} />

      <AboutStats
        fadeInUp={fadeInUp}
        staggerContainer={staggerContainer}
      />

      <AboutHierarchy
        fadeInUp={fadeInUp}
        staggerContainer={staggerContainer}
      />

    </div>
  );
}