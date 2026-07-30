import React from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  IdCard, 
  Award, 
  TrendingUp, 
  Calendar, 
  Users, 
  Gift,
  Sparkles,
  Settings,
  Heart
} from 'lucide-react';

const VolunteerPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#051108] pb-16 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <div className="w-full bg-[#F5F2EB] dark:bg-[#0f1d12] border-b border-slate-200/80 dark:border-gray-800 py-16 mb-16">
        <div className="max-w-[91.666667%] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-500 font-semibold text-xs tracking-wider uppercase bg-green-50 dark:bg-green-900/30 px-3.5 py-1.5 rounded-full border border-green-200 dark:border-green-900/50 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BECOME A VOLUNTEER</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                Be the <span className="text-green-600">Change</span> You Want to See
              </h1>
              <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
                Join thousands of volunteers across Bangladesh who are making a real difference in their communities. From registering new members to distributing relief supplies, your time and effort create lasting impact.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="#register" 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium text-base px-8 py-4 rounded-xl transition flex items-center gap-2 shadow-lg shadow-green-600/20"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Register as Volunteer</span>
                </Link>
                <Link 
                  href="#contact" 
                  className="bg-transparent hover:bg-slate-200/50 dark:hover:bg-gray-800 text-slate-900 dark:text-white border border-slate-300 dark:border-gray-700 font-medium text-base px-8 py-4 rounded-xl transition"
                >
                  Contact Coordinator
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-gray-800 aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000" 
                  alt="Volunteers helping" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. How It Works Section */}
      <div className="max-w-[91.666667%] mx-auto px-6 lg:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-500 font-semibold text-xs tracking-wider uppercase bg-green-50 dark:bg-green-900/30 px-3.5 py-1.5 rounded-full border border-green-200 dark:border-green-900/50 mb-4">
            <Settings className="w-3.5 h-3.5" />
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
            <div key={idx} className="bg-[#F5F2EB] dark:bg-[#0f1d12] p-8 rounded-3xl border border-slate-200/80 dark:border-gray-800 text-center relative shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-6 shadow-md shadow-green-600/30">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Volunteer Benefits Section */}
      <div className="max-w-[91.666667%] mx-auto px-6 lg:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-500 font-semibold text-xs tracking-wider uppercase bg-green-50 dark:bg-green-900/30 px-3.5 py-1.5 rounded-full border border-green-200 dark:border-green-900/50 mb-4">
            <Heart className="w-3.5 h-3.5" />
            <span>BENEFITS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Volunteer <span className="text-green-600">Benefits</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-base">
            We value our volunteers and provide meaningful recognition and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <IdCard className="w-6 h-6 text-green-600" />, title: "Digital ID Card", desc: "Receive a verified digital volunteer card with QR code." },
            { icon: <Award className="w-6 h-6 text-green-600" />, title: "Certificates", desc: "Earn certificates and badges for your contributions." },
            { icon: <TrendingUp className="w-6 h-6 text-green-600" />, title: "Track Impact", desc: "Monitor your field activities and see your real impact." },
            { icon: <Calendar className="w-6 h-6 text-green-600" />, title: "Events & Training", desc: "Access exclusive volunteer events and training programs." },
            { icon: <Users className="w-6 h-6 text-green-600" />, title: "Community", desc: "Join a nationwide network of humanitarian volunteers." },
            { icon: <Gift className="w-6 h-6 text-green-600" />, title: "Rewards", desc: "Receive appreciation gifts and recognition for excellence." },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-[#F5F2EB] dark:bg-[#0f1d12] p-8 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{benefit.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Dark Banner Area */}
      <div className="max-w-[91.666667%] mx-auto px-6 lg:px-20">
        <div className="bg-[#0b1f11] dark:bg-[#0a180e] rounded-3xl p-10 md:p-16 text-center border border-green-900/40 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Make a <span className="text-green-500">Difference?</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              Thousands of communities across Bangladesh are waiting for your help. Register today and start your journey as an ASHRAY volunteer.
            </p>
            <Link 
              href="#register" 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-base px-8 py-4 rounded-xl transition shadow-lg shadow-green-600/30"
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