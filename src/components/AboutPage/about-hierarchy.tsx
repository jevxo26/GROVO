'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, ChevronRight } from 'lucide-react';
import { hierarchyData } from '@/data/about-data';

export const AboutHierarchy = ({
  fadeInUp,
  staggerContainer,
}: {
  fadeInUp: any;
  staggerContainer: any;
}) => (
  <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto text-center">

    {/* Header */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="inline-flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-4">
        <Network className="w-4 h-4" />
        Structure
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
        Organizational <span className="text-primary">Hierarchy</span>
      </h2>

      <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-10 md:mb-12">
        From the national level down to union coordinators, our structured hierarchy ensures efficient governance and accountability at every level.
      </p>
    </motion.div>

    {/* List */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="space-y-3 sm:space-y-4"
    >
      {hierarchyData.map((item) => (
        <motion.div
          key={item.id}
          variants={fadeInUp}
          whileHover={{ scale: 1.03, y: -2 }}
          className="group bg-card hover:bg-accent transition-all duration-300 p-4 sm:p-5 rounded-xl flex items-center justify-between border border-border shadow-sm hover:shadow-md cursor-pointer"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-sm sm:text-base shadow-sm group-hover:scale-110 transition">
              {item.id}
            </span>

            <span className="font-semibold text-foreground text-sm sm:text-base md:text-lg">
              {item.title}
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right">
              <span className="text-primary font-bold text-base sm:text-lg block">
                {item.positions}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider block -mt-1">
                positions
              </span>
            </div>

            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
);