'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import volunteerImg from '@/app/(homeLayout)/volunteer/components/volunteer.jpg';

import {
  UserCheck,
  IdCard,
  Award,
  TrendingUp,
  Calendar,
  Users,
  Gift,
  UserRoundPlus,
} from 'lucide-react';

const VolunteerPage = () => {
  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">

      {/* Hero Section */}
      <div className="w-full mt-4 py-12 md:py-20 mb-16 bg-muted/40 transition-colors duration-300">
        <div className="max-w-[91.666667%] mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            <div>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider bg-primary/10 px-3.5 py-1.5 rounded-full mb-6">
                <UserRoundPlus className="w-4 h-4" />
                BECOME A VOLUNTEER
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Be the <span className="text-primary">Change</span> You Want
                <br /> to See
              </h1>

              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of volunteers across Bangladesh who are making a real difference in their communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">

                <Link
                  href="#register"
                  className="bg-primary hover:opacity-90 text-primary-foreground px-8 py-4 rounded-full flex items-center gap-2 justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <UserCheck className="w-5 h-5" />
                  Register
                </Link>

                <Link
                  href="#contact"
                  className="border border-border text-foreground px-8 py-4 rounded-full text-center hover:bg-accent transition"
                >
                  Contact
                </Link>

              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl border border-border relative h-72 sm:h-96 lg:h-[400px]">
              <Image
                src={volunteerImg}
                alt="Volunteers"
                fill
                className="object-cover"
                priority
              />
            </div>

          </div>

        </div>
      </div>

      {/* Process */}
      <div className="max-w-6xl mx-auto px-4 mb-20">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          {['Register', 'Verify', 'Assign', 'Help'].map((step, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-xl border border-border bg-card text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4 font-bold">
                {i + 1}
              </div>

              <h3 className="font-bold">{step}</h3>
            </div>
          ))}

        </div>
      </div>

      {/* Benefits */}
      <div className="bg-muted/40 py-20 transition-colors">

        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">

          {[
            { icon: <IdCard className="w-8 h-8" />, title: 'ID Card' },
            { icon: <Award className="w-8 h-8" />, title: 'Certificates' },
            { icon: <TrendingUp className="w-8 h-8" />, title: 'Impact' },
            { icon: <Calendar className="w-8 h-8" />, title: 'Events' },
            { icon: <Users className="w-8 h-8" />, title: 'Community' },
            { icon: <Gift className="w-8 h-8" />, title: 'Rewards' },
          ].map((item, i) => (

            <div
              key={i}
              className="bg-card text-card-foreground p-6 rounded-2xl border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="mb-4 text-primary">
                {item.icon}
              </div>

              <h3 className="font-bold text-lg">
                {item.title}
              </h3>

            </div>

          ))}

        </div>

      </div>

      {/* CTA Section */}
      <div className="bg-accent/80 border-t border-border py-20 text-center transition-colors">

        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Ready to Make a <span className="text-primary">Difference?</span>
        </h2>

        <Link
          href="#register"
          className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-primary-foreground px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <UserCheck className="w-5 h-5" />
          Join Now
        </Link>

      </div>

    </div>
  );
};

export default VolunteerPage;