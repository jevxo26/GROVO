import React from "react";

const GalleryHero = () => {
  // ছবির আর্ট গ্যালারির ব্যাকগ্রাউন্ডের সাথে মিল রেখে Unsplash URL
  const bgImageUrl =
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1920&auto=format&fit=crop";

  return (
    <section
      className="
        relative w-full 
        h-[350px] md:h-[450px] lg:h-[500px] 
        bg-cover bg-center 
        flex items-center justify-center
      "
      style={{
        backgroundImage: `url('${bgImageUrl}')`,
      }}
    >
      {/* Dark Overlay (যেমনটি ছবিতে দেখা যাচ্ছে) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title */}
        <h1
          className="
          text-4xl md:text-6xl lg:text-7xl 
          font-serif font-semibold 
          tracking-wide mb-4 
          text-white
        "
        >
          Gallery
        </h1>

        {/* Subtitle */}
        <p
          className="
          text-base md:text-xl lg:text-2xl 
          font-light 
          text-gray-200 dark:text-gray-300 
          tracking-normal
        "
        >
          Moments of compassion, community, and change captured across Bangladesh
        </p>
      </div>
    </section>
  );
};

export default GalleryHero;