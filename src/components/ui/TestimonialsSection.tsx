"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, Star, Quote } from "lucide-react";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarLetter: string;
  rating: number;
  image: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "ASHRAY has completely changed how I approach charity. I can see exactly where every taka goes, receive monthly impact reports, and know that my donations are creating real change in communities that need it most.",
    name: "Mohammad Ali",
    role: "Monthly Donor since 2024",
    avatarLetter: "M",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    quote: "The digital membership card with QR verification makes volunteer activities so seamless and trustworthy. Truly a next-gen foundation platform.",
    name: "Nusrat Jahan",
    role: "Volunteer Lead",
    avatarLetter: "N",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    quote: "Complete financial transparency and live impact tracking. Exactly what Bangladesh's non-profit ecosystem was missing.",
    name: "Tanvir Ahmed",
    role: "Corporate Partner",
    avatarLetter: "T",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = defaultTestimonials[activeIndex];

  return (
    <section className="w-full bg-[#FAF7EE] py-20 px-6 sm:px-12 lg:px-20 text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#DCD5C3] bg-[#EFE9D7] text-[11px] font-bold tracking-widest uppercase text-[#52603C] mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-[#15803d]" />
          <span>TESTIMONIALS</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111827] text-center leading-tight mb-16">
          Voices of <span className="text-[#15803d]">Hope &amp; Trust</span>
        </h2>

        {/* Main Testimonial Card Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Side: Quote, Author & Dots */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            {/* Quote Icon */}
            <div>
              <Quote className="w-16 h-16 text-[#A0D9A9]/50 fill-[#A0D9A9]/20 -scale-x-100" />
            </div>

            {/* Quote Text */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[#111827] leading-snug">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Author Details & Rating */}
            <div className="flex items-center justify-between pt-4 border-t border-transparent">
              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#E2F0D9] border border-[#BDE0B0] flex items-center justify-center text-[#15803d] font-bold text-lg">
                  {current.avatarLetter}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">
                    {current.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {current.role}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#659B27] text-[#659B27]"
                  />
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 pt-2">
              {defaultTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-8 bg-[#15803d]"
                      : "w-2.5 bg-[#D8D2C2] hover:bg-[#BDB6A3]"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Side: Portrait Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-105 aspect-[4/4.2] rounded-[32px] overflow-hidden shadow-xl border border-black/5">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;