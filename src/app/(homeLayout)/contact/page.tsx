import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen mt-2 bg-background text-foreground pb-12 transition-colors duration-300">
      
      {/* Top Section */}
      <div className="w-full bg-muted/40 border-b border-border py-12 mb-12 transition-colors duration-300">
        <div className="max-w-[91.666667%] mx-auto py-16 sm:py-20 px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>CONTACT US</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 tracking-tight">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
            Have questions about donations, volunteering, or partnerships? We are here to help.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 mt-12 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Side Info Cards */}
          <div className="space-y-6">
            
            {/* Email */}
            <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">contact@ashray.org</p>
              <p className="text-muted-foreground text-sm">support@ashray.org</p>
            </div>

            {/* Phone */}
            <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm">+880 1XXX-XXXXXX</p>
              <p className="text-muted-foreground text-sm">+880 1XXX-XXXXXX</p>
            </div>

            {/* Head Office */}
            <div className="bg-card text-card-foreground p-6 rounded-3xl border border-border shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Head Office</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                House #12, Road #5, Block B<br />
                Banani, Dhaka 1213<br />
                Bangladesh
              </p>
            </div>

          </div>

          {/* Right Side Form */}
          <div className="lg:col-span-2 bg-card text-card-foreground p-6 sm:p-8 md:p-10 rounded-3xl border border-border shadow-sm transition-all duration-300">
            <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-background border border-input rounded-xl px-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-background border border-input rounded-xl px-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full bg-background border border-input rounded-xl px-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Subject
                  </label>
                  <select className="w-full bg-background border border-input rounded-xl px-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition">
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full bg-background border border-input rounded-xl p-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                ></textarea>
                <div className="text-right text-xs text-muted-foreground mt-1">0/500</div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:opacity-90 text-primary-foreground font-medium py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
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