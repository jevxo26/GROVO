import React from 'react';
import GalleryHero from './../../../components/GalleryPage/GalleryHero';
import FilterableGallery from '@/components/GalleryPage/FilterableGallery';

const GalleryPage = () => {
  return (
    <div
      className="
        min-h-screen
        bg-background text-foreground
        transition-colors duration-300
      "
    >
      <GalleryHero />
      <FilterableGallery />
    </div>
  );
};

export default GalleryPage;