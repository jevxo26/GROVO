import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen mt-2 bg-white dark:bg-[#051108] pb-12 transition-colors duration-300">
            {/* Top Section */}
            <div className="w-full bg-[#F5F2EB] dark:bg-[#0f1d12] border-b border-slate-200/80 dark:border-gray-800 py-12 mb-12">
                <div className="max-w-[91.666667%] mx-auto py-20 px-6">
                    <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-500 font-semibold text-xs tracking-wider uppercase bg-green-50 dark:bg-green-900/30 px-3.5 py-1.5 rounded-full border border-green-200 dark:border-green-900/50 mb-4">
                        <Mail className="w-3.5 h-3.5" />
                        <span>CONTACT US</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Get in <span className="text-green-600">Touch</span>
                    </h1>
                    <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl">
                        Have questions about donations, volunteering, or partnerships? We are here to help.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Side */}
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="bg-[#F5F2EB] dark:bg-[#0f1d12] p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-4">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Email</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-sm">contact@ashray.org</p>
                            <p className="text-slate-600 dark:text-gray-400 text-sm">support@ashray.org</p>
                        </div>

                        {/* Phone */}
                        <div className="bg-[#F5F2EB] dark:bg-[#0f1d12] p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-4">
                                <Phone className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Phone</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-sm">+880 1XXX-XXXXXX</p>
                            <p className="text-slate-600 dark:text-gray-400 text-sm">+880 1XXX-XXXXXX</p>
                        </div>

                        {/* Head Office */}
                        <div className="bg-[#F5F2EB] dark:bg-[#0f1d12] p-6 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-4">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Head Office</h3>
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                House #12, Road #5, Block B<br />
                                Banani, Dhaka 1213<br />
                                Bangladesh
                            </p>
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div className="lg:col-span-2 bg-[#F5F2EB] dark:bg-[#0f1d12] p-8 md:p-10 rounded-3xl border border-slate-200/80 dark:border-gray-800 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full bg-white dark:bg-[#142618] border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-green-600 transition"
                                    />
                                </div>
                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-white dark:bg-[#142618] border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-green-600 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2">Phone</label>
                                    <input
                                        type="text"
                                        placeholder="+880 1XXX-XXXXXX"
                                        className="w-full bg-white dark:bg-[#142618] border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-green-600 transition"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2">Subject</label>
                                    <select className="w-full bg-white dark:bg-[#142618] border border-slate-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-green-600 transition">
                                        <option value="">Select a subject</option>
                                        <option value="donation">Donation Query</option>
                                        <option value="volunteer">Volunteer Inquiry</option>
                                        <option value="partnership">Corporate Partnership</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help you?"
                                    className="w-full bg-white dark:bg-[#142618] border border-slate-200 dark:border-gray-700 rounded-xl p-4 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-green-600 transition resize-none"
                                ></textarea>
                                <div className="text-right text-xs text-slate-400 mt-1">0/500</div>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                            >
                                <span>Send Message</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;