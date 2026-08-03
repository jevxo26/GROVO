'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ImpactHero } from '@/components/Impact/impact-hero';
import { ImpactAllocation } from '@/components/Impact/impact-allocation';
import { ImpactReports } from '@/components/Impact/impact-reports';
import { ImpactGallery } from '@/components/Impact/impact-gallery';

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

export default function ImpactPage() {
  return (
    <div
      className="
        py-10
        min-h-screen 
        bg-[#FAF9F5] text-gray-800
        dark:bg-[#0B0F0C] dark:text-gray-100
        font-sans 
        transition-colors duration-300
      "
    >
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <ImpactHero fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
      </motion.div>

      {/* Allocation */}
      <div className="mt-16">
        <ImpactAllocation fadeInUp={fadeInUp} />
      </div>

      {/* Reports */}
      <div className="mt-16">
        <ImpactReports fadeInUp={fadeInUp} />
      </div>

      {/* Gallery */}
      <div className="mt-16">
        <ImpactGallery
          fadeInUp={fadeInUp}
          staggerContainer={staggerContainer}
        />
      </div>
    </div>
  );
}