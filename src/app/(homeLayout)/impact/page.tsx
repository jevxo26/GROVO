'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ImpactHero } from '@/components/ui/impact/impact-hero';
import { ImpactAllocation } from '@/components/ui/impact/impact-allocation';
import { ImpactReports } from '@/components/ui/impact/impact-reports';
import { ImpactGallery } from '@/components/ui/impact/impact-gallery';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-gray-800 font-sans overflow-hidden">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        <ImpactHero fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
      </motion.div>

      <ImpactAllocation fadeInUp={fadeInUp} />

      <ImpactReports fadeInUp={fadeInUp} />

      <ImpactGallery fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
    </div>
  );
}
