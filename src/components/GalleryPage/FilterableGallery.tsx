"use client";

import { categories, GalleryItem, galleryItems } from "@/data/Gallery/galleryData";
import Image from "next/image";
import React, { useState } from "react";

const FilterableGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredItems: GalleryItem[] =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="w-full bg-background py-10 px-4 md:px-8 lg:px-12 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((category: string) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium 
                  transition-all duration-200

                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item: GalleryItem) => (
            <div
              key={item.id}
              className="
                relative overflow-hidden rounded-xl
                bg-card border border-border
                shadow-sm hover:shadow-md
                transition-all duration-300
                aspect-[4/3]
              "
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No images found for this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterableGallery;