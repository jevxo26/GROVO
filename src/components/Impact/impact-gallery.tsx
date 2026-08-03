import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { galleryImagesData } from '@/data/impact-data';

export const ImpactGallery = ({
  fadeInUp,
  staggerContainer,
}: {
  fadeInUp: any;
  staggerContainer: any;
}) => (
  <section className="px-6 py-16 max-w-6xl mx-auto">
    
    {/* Header */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-center mb-12"
    >
      <div className="
        inline-flex items-center gap-2 
        bg-green-100/70 dark:bg-green-900/30
        px-3.5 py-1 rounded-full 
        text-xs font-semibold 
        text-[#058235] dark:text-green-400 
        uppercase tracking-wider mb-3
      ">
        <ImageIcon className="w-3.5 h-3.5" /> Gallery
      </div>

      <h2 className="
        text-3xl sm:text-4xl md:text-5xl 
        font-serif font-bold 
        text-gray-900 dark:text-gray-100 
        mb-3
      ">
        Impact in <span className="text-[#058235] dark:text-green-400">Pictures</span>
      </h2>

      <p className="
        text-gray-600 dark:text-gray-300 
        text-sm sm:text-base 
        max-w-xl mx-auto
      ">
        Real photos from our field operations showing the direct impact of your donations.
      </p>
    </motion.div>

    {/* Gallery Grid */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {galleryImagesData.map((item) => (
        <motion.div
          key={item.id}
          variants={fadeInUp}
          whileHover={{ scale: 1.03 }}
          className="
            relative group overflow-hidden 
            rounded-2xl h-52 
            shadow-sm 
            bg-gray-100 dark:bg-gray-800
          "
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Overlay */}
          <div className="
            absolute inset-0 
            bg-gradient-to-t 
            from-black/70 via-transparent to-transparent 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 
            flex items-end p-4
          ">
            <span className="text-white font-medium text-sm">
              {item.title}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>

  </section>
);