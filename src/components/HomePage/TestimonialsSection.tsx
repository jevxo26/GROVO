"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, Star, Quote } from "lucide-react";
import { testimonialsData } from "@/data/landingpage/testimonials";

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonialsData[activeIndex];

  return (
    <section className="w-full bg-background py-20 px-6 sm:px-12 lg:px-20 text-foreground">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted text-[11px] font-bold tracking-widest uppercase text-primary mb-4">
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          <span>TESTIMONIALS</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-center leading-tight mb-16">
          Voices of <span className="text-primary">Hope &amp; Trust</span>
        </h2>

        {/* Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div className="lg:col-span-7 flex flex-col space-y-8">

            {/* Quote Icon */}
            <Quote className="w-16 h-16 text-primary/30 fill-primary/10 -scale-x-100" />

            {/* Quote */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic leading-snug">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-between pt-4 border-t border-border">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {current.avatarLetter}
                </div>

                <div>
                  <h4 className="font-bold text-sm leading-tight">
                    {current.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium">
                    {current.role}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2 pt-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-muted hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/4.2] rounded-[32px] overflow-hidden shadow-xl border border-border group">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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