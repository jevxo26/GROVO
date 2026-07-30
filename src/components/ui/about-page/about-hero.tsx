import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export const AboutHero = ({ fadeInUp }: { fadeInUp: any }) => (
  <motion.section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-green-100/70 px-4 py-1.5 rounded-full text-xs font-semibold text-[#058235] uppercase tracking-wider mb-6">
      <Info className="w-4 h-4" /> About Us
    </motion.div>
    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight max-w-4xl">
      Building a Transparent Future for <span className="text-[#058235]">Humanitarian Work</span>
    </motion.h1>
    <motion.p variants={fadeInUp} className="mt-6 text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
     ASHRAY is a modern Foundation Operating System that digitizes and simplifies the complete management of non-profit organizations, charities, and humanitarian foundations across Bangladesh.
    </motion.p>
  </motion.section>
);