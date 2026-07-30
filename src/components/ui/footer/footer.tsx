import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-[#051108] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top 4 Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          {/*About Us*/}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase mb-6 text-white">About Us</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition">Our Mission</Link></li>
              <li><Link href="#" className="hover:text-white transition">Organization Structure</Link></li>
              <li><Link href="#" className="hover:text-white transition">Leadership Team</Link></li>
              <li><Link href="#" className="hover:text-white transition">Annual Reports</Link></li>
            </ul>
          </div>

          {/*Get Involved*/}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase mb-6 text-white">Get Involved</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition">Donate Now</Link></li>
              <li><Link href="#" className="hover:text-white transition">Become a Volunteer</Link></li>
              <li><Link href="#" className="hover:text-white transition">Corporate Partnership</Link></li>
              <li><Link href="#" className="hover:text-white transition">Fundraise for Us</Link></li>
            </ul>
          </div>
          {/*Programs*/}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase mb-6 text-white">Programs</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition">Emergency Relief</Link></li>
              <li><Link href="#" className="hover:text-white transition">Education Support</Link></li>
              <li><Link href="#" className="hover:text-white transition">Medical Assistance</Link></li>
              <li><Link href="#" className="hover:text-white transition">Food Distribution</Link></li>
            </ul>
          </div>

          {/*Support*/}
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase mb-6 text-white">Support</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Down Section */}
      <div className='max-w-[91.666667%] mx-auto'>
        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>
        
        <div className="py-8">
          <h3 className="font-semibold text-white mb-2">Stay Connected</h3>
          <p className="text-gray-400 text-sm mb-4">Get updates on our campaigns, impact stories, and ways to help.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-[#0f1d12] border border-gray-700 text-sm rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 w-full"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-6 py-3 rounded-md transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom Footer*/}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
          {/*Logo*/}
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2.5 rounded-lg text-white flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div>
              <h2 className="font-bold tracking-wider text-white text-lg">ASHRAY</h2>
              <p className="text-xs text-gray-400">Smart Foundation & Donation Management</p>
            </div>
          </div>
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-[#112214] hover:bg-green-600 flex items-center justify-center text-gray-300 hover:text-white transition">
              <span className="text-sm font-bold">f</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#112214] hover:bg-green-600 flex items-center justify-center text-gray-300 hover:text-white transition">
              <span className="text-sm font-bold">𝕏</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#112214] hover:bg-green-600 flex items-center justify-center text-gray-300 hover:text-white transition">
              <span className="text-sm font-bold">in</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#112214] hover:bg-green-600 flex items-center justify-center text-gray-300 hover:text-white transition">
              <span className="text-sm font-bold">ig</span>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#112214] hover:bg-green-600 flex items-center justify-center text-gray-300 hover:text-white transition">
              <span className="text-sm font-bold">▶</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center md:text-right">
            © 2026 ASHRAY Foundation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;