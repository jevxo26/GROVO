import React from 'react';
import GalleryHero from './../../../components/GalleryPage/GalleryHero';
import FilterableGallery from '@/components/GalleryPage/FilterableGallery';

const GalleryPage = () => {
  return (
    <div
      className="
        min-h-screen 
        bg-white text-gray-900 
        dark:bg-gray-900 dark:text-gray-100 
        transition-colors duration-300
      "
    >
      <GalleryHero />
      <FilterableGallery />
    </div>
  );
};

export default GalleryPage;