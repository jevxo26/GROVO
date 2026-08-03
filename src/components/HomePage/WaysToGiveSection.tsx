"use client";

import React from "react";
import {
  HeartHandshake,
  Heart,
  BookOpen,
  Building2,
  Utensils,
  Siren,
  CloudSnow,
  Home,
  ArrowRight,
} from "lucide-react";
import { categoriesData } from "@/data/landingpage/categories";

const iconMap: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-primary" />,
  Heart: <Heart className="w-5 h-5 text-primary" />,
  BookOpen: <BookOpen className="w-5 h-5 text-primary" />,
  Building2: <Building2 className="w-5 h-5 text-primary" />,
  Utensils: <Utensils className="w-5 h-5 text-primary" />,
  Siren: <Siren className="w-5 h-5 text-primary" />,
  CloudSnow: <CloudSnow className="w-5 h-5 text-primary" />,
  Home: <Home className="w-5 h-5 text-primary" />,
};

const WaysToGiveSection: React.FC = () => {
  return (
    <section className="w-full bg-background py-20 px-6 sm:px-12 lg:px-20 text-foreground flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-muted text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-6">
          <Heart className="w-3.5 h-3.5 text-primary" />
          <span>WAYS TO GIVE</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight max-w-3xl mb-4">
          Start Your Journey of{" "}
          <span className="text-primary">Giving Today</span>
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed mb-12">
          Choose from a variety of donation categories. Every contribution is
          tracked, verified, and reported back to you with complete transparency.
        </p>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {categoriesData.map((card) => (
            <div
              key={card.id}
              className="bg-card border border-border hover:border-primary/40 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center text-center group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {iconMap[card.icon]}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold mb-2">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg">
          <HeartHandshake className="w-4 h-4" />
          <span>Make a Donation</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </section>
  );
};

export default WaysToGiveSection;