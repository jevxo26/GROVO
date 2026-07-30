"use client";

import React, { useEffect, useRef, useState } from 'react';
import { HandHeart, Users, UserCheck, Smile, LucideIcon } from 'lucide-react';

interface StatItem {
  id: number;
  icon: LucideIcon;
  targetNumber: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  {
    id: 1,
    icon: HandHeart,
    prefix: 'BDT ',
    targetNumber: 1.3,
    decimals: 1,
    suffix: 'Cr',
    label: 'Total Donations Raised',
  },
  {
    id: 2,
    icon: Users,
    targetNumber: 49,
    decimals: 0,
    suffix: 'K+',
    label: 'Active Donors',
  },
  {
    id: 3,
    icon: UserCheck,
    targetNumber: 3,
    decimals: 0,
    suffix: 'K+',
    label: 'Active Volunteers',
  },
  {
    id: 4,
    icon: Smile,
    targetNumber: 1.6,
    decimals: 1,
    suffix: 'L+',
    label: 'Lives Impacted',
  },
];

// কাউন্ট-আপ এনিমেশনের জন্য কাস্টম কম্পোনেন্ট
function AnimatedCounter({
  target,
  decimals = 0,
  duration = 2000,
}: {
  target: number;
  decimals?: number;
  duration?: number;
}) {
  const [count, setCount] = useState<number>(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease-out effect
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            
            setCount(easeOutProgress * target);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={countRef}>{count.toFixed(decimals)}</span>;
}

export default function ImpactSection() {
  return (
    <section className="bg-[#FAF9F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#136139] bg-[#EAF5EF] px-3 py-1 rounded-md mb-4">
          <span className="w-2 h-2 rounded-full bg-[#136139]" />
          OUR IMPACT IN NUMBERS
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-serif">
          Making a Difference,{' '}
          <span className="text-[#136139]">One Life at a Time</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
          Every number represents a story of hope, a life touched, and a community transformed.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-full bg-[#EAF5EF] flex items-center justify-center text-[#136139] mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Number/Value with Count Up Animation */}
                <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight font-serif">
                  {item.prefix}
                  <AnimatedCounter target={item.targetNumber} decimals={item.decimals} />
                  {item.suffix}
                </h3>

                {/* Label */}
                <p className="text-gray-500 text-sm font-medium">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}