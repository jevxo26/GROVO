import React from 'react';
import Link from 'next/link';
import volunteerImg from '@/app/(homeLayout)/volunteer/components/volunteer.jpg'
import {
  UserCheck,
  IdCard,
  Award,
  TrendingUp,
  Calendar,
  Users,
  Gift,
  Star,
  UserRoundPlus
} from 'lucide-react';

const VolunteerPage = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#051108] transition-colors duration-300">
      {/* 1. top Section */}
      <div className="w-full bg-[#FBF9F5] mt-4 dark:bg-[#09170e] py-12 md:py-20 mb-16">
        <div className="max-w-[91.666667%] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-start text-left w-full">
              <div className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold text-[11px] sm:text-xs tracking-wider uppercase bg-[#EFECE4] dark:bg-green-900/30 px-3.5 py-1.5 rounded-full border border-green-200/60 dark:border-green-900/50 mb-5 sm:mb-6">
                <UserRoundPlus className="w-3.5 h-3.5" />
                <span>BECOME A VOLUNTEER</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-5 sm:mb-6 tracking-tight leading-[1.15]">
                Be the <span className="text-green-600">Change</span> You Want <br className="hidden lg:inline" /> to See
              </h1>
              <p className="text-slate-600 dark:text-gray-300 text-base sm:text-lg md:text-xl w-full mb-8 leading-relaxed">
                Join thousands of volunteers across Bangladesh who are making a real difference in their communities. From registering new members to distributing relief supplies, your time and effort create lasting impact.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link
                  href="#register"
                  className="bg-green-600 hover:bg-green-700 text-white font-medium text-base px-8 py-4 rounded-4xl transition flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 text-center"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Register as Volunteer</span>
                </Link>
                <Link
                  href="#contact"
                  className="bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-300 dark:border-gray-700 font-medium text-base px-8 py-4 rounded-4xl transition text-center"
                >
                  Contact Coordinator
                </Link>
              </div>
            </div>

            {/* Right Section */}
            <div className="relative w-full mt-4 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-gray-800 aspect-[4/3] w-full">
                <img
                  src={volunteerImg.src}
                  alt="Volunteers helping"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. How It Works Section */}
      <div className="max-w-[91.666667%] mx-auto px-4 sm:px-6 lg:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold text-xs tracking-wider uppercase bg-[#EFECE4] dark:bg-green-900/30 px-3.5 py-1.5 rounded-full border border-green-200/60 dark:border-green-900/50 mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>PROCESS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            How It <span className="text-green-600">Works</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-base">
            Four simple steps to becoming an active ASHRAY volunteer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Register", desc: "Create your account and select Volunteer membership." },
            { step: "2", title: "Get Verified", desc: "Complete your profile and identity verification." },
            { step: "3", title: "Get Assigned", desc: "Receive area assignment from your coordinator." },
            { step: "4", title: "Start Helping", desc: "Register members, onboard donors, submit reports." },
          ].map((item, idx) => (
            <div key={idx} className="bg-transparent border-0 shadow-none p-8 text-center relative group">
              <div className="w-14 h-14 rounded-xl bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-6 shadow-md shadow-green-600/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-700">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Volunteer Benefits Section */}
      <div className="w-full bg-[#FBF9F5] dark:bg-[#0b1f13] py-16 md:py-24">
        <div className="max-w-[91.666667%] mx-auto px-4 sm:px-6 lg:px-20">

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold text-[11px] sm:text-xs tracking-wider uppercase bg-[#EFECE4] dark:bg-green-900/30 px-3.5 py-1.5 rounded-full border border-green-200/60 dark:border-green-900/50 mb-4">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>BENEFITS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              Volunteer <span className="text-green-600">Benefits</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base">
              We value our volunteers and provide meaningful recognition and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: <IdCard className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300" />, title: "Digital ID Card", desc: "Receive a verified digital volunteer card with QR code." },
              { icon: <Award className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300" />, title: "Certificates", desc: "Earn certificates and badges for your contributions." },
              { icon: <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300" />, title: "Track Impact", desc: "Monitor your field activities and see your real impact." },
              { icon: <Calendar className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300" />, title: "Events & Training", desc: "Access exclusive volunteer events and training programs." },
              { icon: <Users className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300" />, title: "Community", desc: "Join a nationwide network of humanitarian volunteers." },
              { icon: <Gift className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white transition-colors duration-300" />, title: "Rewards", desc: "Receive appreciation gifts and recognition for excellence." },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f1d12] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start text-left group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/30 group-hover:bg-green-600 flex items-center justify-center mb-6 transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Down Section */}
      <div className='w-full bg-[#07140b] dark:bg-[#051108] flex items-center justify-center py-16 transition-colors duration-300'>
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-20 flex justify-center">
          <div className="max-w-2xl py-4 mx-auto relative z-10 w-full flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Make a <span className="text-green-500">Difference?</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              Thousands of communities across Bangladesh are waiting for your help. Register today and start your journey as an ASHRAY volunteer.
            </p>
            <Link
              href="#register"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-base px-8 py-4 rounded-4xl transition shadow-lg shadow-green-600/30"
            >
              <UserCheck className="w-5 h-5" />
              <span>Join as Volunteer</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VolunteerPage;
