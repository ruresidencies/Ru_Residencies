'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Globe, Send, MessageSquare, Building, Navigation, Shield, Zap, Award, ChevronRight, Compass, Maximize2, Users, Target, Briefcase } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = {
    phone: {
      sriLanka: '+94 773 711 444',
      uk: '+44 7765807964',
      hours: 'Monday-Friday (9am-6pm) • Saturday (10am-4pm)'
    },
    email: 'sales@ruresidencieslk.com',
    website: 'www.ruresidencieslk.com',
    locations: {
      sriLanka: 'No.6C, Pelawatte Road, Nugegoda, Sri Lanka',
      uk: 'No.17 The Dingle, Uxbridge, UB10 0DQ, United Kingdom'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const Features = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {[
        { icon: Shield, title: 'Privacy Guaranteed', desc: '100% confidential luxury consultation' },
        { icon: Zap, title: 'Fast Response', desc: 'Guaranteed response within 2 hours' },
        { icon: Award, title: 'Premium Service', desc: 'Dedicated luxury property advisors' },
      ].map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group relative p-6 rounded-2xl bg-white border border-line hover:border-navy-600/30 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-navy-600/5 via-transparent to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          <div className="relative">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-navy-700/10 to-blue-800/10 mb-4">
              <feature.icon className="w-6 h-6 text-navy-700" />
            </div>
            <h4 className="text-lg font-semibold text-navy-900 mb-2">{feature.title}</h4>
            <p className="text-sm text-navy-600">{feature.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 bg-gradient-to-b from-base-offwhite via-white to-base-offwhite">
      {/* Background decorative elements - Navy & Gold */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-navy-700/5 via-blue-700/5 to-navy-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-l from-accent-gold/5 to-accent-goldDark/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-transparent via-navy-700/3 to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm tracking-luxury text-navy-700 uppercase mb-4 px-4 py-2 bg-navy-50 rounded-full">
            <Briefcase className="w-4 h-4" />
            Premium Concierge
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mb-6">
            Connect with <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)' }}>Excellence</span>
          </h2>
          <p className="text-lg text-navy-700/80 max-w-2xl mx-auto">
            Direct access to our luxury property specialists. Experience white-glove service reserved for discerning clients.
          </p>
        </motion.div>

        <Features />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative p-6 rounded-2xl bg-white border border-line hover:border-navy-600 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-navy-700/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-navy-700 to-blue-800 shadow-md">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Direct Contact</h3>
                      <p className="text-sm text-navy-600">Premium support available</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-navy-500 mb-2">Sri Lanka Office</p>
                      <a 
                        href={`tel:${contactInfo.phone.sriLanka}`}
                        className="text-2xl font-semibold text-navy-900 hover:text-blue-700 transition-colors duration-300 group-hover:translate-x-2 inline-block"
                      >
                        {contactInfo.phone.sriLanka}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-navy-500 mb-2">UK Office</p>
                      <a 
                        href={`tel:${contactInfo.phone.uk}`}
                        className="text-xl font-semibold text-navy-900 hover:text-blue-700 transition-colors duration-300 group-hover:translate-x-2 inline-block"
                      >
                        {contactInfo.phone.uk}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-navy-600 pt-4 mt-4 border-t border-navy-100">
                    <Clock className="w-4 h-4" />
                    <span>{contactInfo.phone.hours}</span>
                  </div>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative p-6 rounded-2xl bg-white border border-line hover:border-navy-600 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 to-accent-goldDark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-accent-gold to-accent-goldDark shadow-md">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Digital Correspondence</h3>
                      <p className="text-sm text-navy-600">Secure encrypted communication</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="block text-xl font-semibold text-navy-900 hover:text-blue-700 transition-colors duration-300 group-hover:translate-x-2"
                    >
                      {contactInfo.email}
                    </a>
                    <a 
                      href={`https://${contactInfo.website}`}
                      className="inline-flex items-center gap-2 text-navy-600 hover:text-accent-gold transition-colors duration-300 group-hover:translate-x-2"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">{contactInfo.website}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="md:col-span-2 group relative p-6 rounded-2xl bg-white border border-line hover:border-navy-600 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-navy-700/5 via-blue-700/5 to-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-navy-700 to-blue-800 shadow-md">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">Global Presence</h3>
                      <p className="text-sm text-navy-600">Prime strategic locations worldwide</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <div className="absolute -left-4 top-0 w-0.5 h-full bg-gradient-to-b from-navy-700 to-blue-700" />
                      <h4 className="text-lg font-semibold text-navy-900 mb-3 flex items-center gap-2">
                        <Building className="w-4 h-4 text-navy-700" />
                        Sri Lanka Headquarters
                      </h4>
                      <p className="text-navy-600 leading-relaxed">{contactInfo.locations.sriLanka}</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-4 top-0 w-0.5 h-full bg-gradient-to-b from-accent-gold to-accent-goldDark" />
                      <h4 className="text-lg font-semibold text-navy-900 mb-3 flex items-center gap-2">
                        <Building className="w-4 h-4 text-accent-gold" />
                        UK European Office
                      </h4>
                      <p className="text-navy-600 leading-relaxed">{contactInfo.locations.uk}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative rounded-2xl overflow-hidden"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-navy-700 to-blue-800 shadow-md">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900">Prime Location</h3>
                    <p className="text-sm text-navy-600">Navigate to our prestigious headquarters</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full">
                    <Target className="w-3 h-3" />
                    <span className="font-medium">GPS: 6.8647° N, 79.8914° E</span>
                  </div>
                </div>
              </div>

              {/* Interactive Map Component */}
              <InteractiveMap />

              {/* Additional Location Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gradient-to-r from-navy-50 to-blue-50 rounded-xl border border-navy-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Compass className="w-4 h-4 text-navy-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-900">Parking Available</p>
                      <p className="text-xs text-navy-600">Dedicated visitor parking</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 rounded-xl border border-accent-gold/20 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Users className="w-4 h-4 text-accent-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-900">Meeting Rooms</p>
                      <p className="text-xs text-navy-600">Private consultation suites available</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <div className="sticky top-6">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-navy-100">
                {/* Form Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-700/5 via-blue-700/5 to-accent-gold/5" />
                <div className="relative z-10 p-8">
                  {/* Form Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-navy-700 to-blue-800 shadow-md">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-serif text-navy-900">Priority Inquiry</h3>
                      </div>
                      <p className="text-navy-600">Direct access to our luxury property advisors</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-full blur opacity-30" />
                      <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-navy-700 to-blue-800 flex items-center justify-center shadow-md">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Premium Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="block text-sm font-medium text-navy-700 mb-2">Full Name *</label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="relative w-full px-4 py-3.5 bg-base-offwhite border border-navy-200 rounded-lg focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500"
                            placeholder="Johnathan Smith"
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-navy-700 mb-2">Email Address *</label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="relative w-full px-4 py-3.5 bg-base-offwhite border border-navy-200 rounded-lg focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500"
                            placeholder="johnathan@domain.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-navy-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="relative w-full px-4 py-3.5 bg-base-offwhite border border-navy-200 rounded-lg focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500"
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-navy-700 mb-2">Message *</label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          className="relative w-full px-4 py-3.5 bg-base-offwhite border border-navy-200 rounded-lg focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500 resize-none"
                          placeholder="Describe your luxury property requirements, investment goals, and timeline..."
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-lg font-semibold transition-all duration-500 relative overflow-hidden group ${
                        isSubmitted 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gradient-to-r from-navy-700 to-blue-800 text-white hover:shadow-lg hover:shadow-navy-700/30'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitted ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-bold">Inquiry Submitted</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span className="font-bold">Submit Priority Inquiry</span>
                          </>
                        )}
                      </span>
                    </motion.button>

                    <p className="text-xs text-center text-navy-500 pt-4">
                      <Shield className="w-3 h-3 inline-block mr-1" />
                      Your information is encrypted and handled with utmost confidentiality
                    </p>
                  </form>

                  {/* Quick Contact Bar */}
                  <div className="mt-8 pt-6 border-t border-navy-100">
                    <div className="flex flex-wrap gap-3 justify-center">
                      <a
                        href={`tel:${contactInfo.phone.sriLanka}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-gradient-to-r from-navy-700/5 to-blue-800/5 hover:from-navy-700/10 hover:to-blue-800/10 text-navy-700 rounded-lg transition-all duration-300 hover:scale-105 border border-navy-200 hover:border-navy-700/30"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">Immediate Call</span>
                      </a>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 hover:from-accent-gold/20 hover:to-accent-goldDark/20 text-accent-gold rounded-lg transition-all duration-300 hover:scale-105 border border-accent-gold/20"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="font-medium">Express Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 pt-8 border-t border-navy-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-full blur opacity-30" />
                <div className="relative p-2 rounded-lg bg-gradient-to-r from-navy-700 to-blue-800 shadow-md">
                  <Building className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-serif text-navy-900 mb-1">Rure Residencies</h4>
                <p className="text-sm text-navy-600">Redefining Luxury Living Standards Worldwide</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-navy-600 mb-2">Premium Global Concierge Service</p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href={`tel:${contactInfo.phone.sriLanka}`}
                  className="text-lg font-semibold text-navy-900 hover:text-blue-700 transition-colors duration-300"
                >
                  {contactInfo.phone.sriLanka}
                </a>
                <span className="text-navy-300 hidden sm:inline">•</span>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-base font-medium text-navy-700 hover:text-accent-gold transition-colors duration-300"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}