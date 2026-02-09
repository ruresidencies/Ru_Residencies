'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Globe, Send, MessageSquare, 
  Building, Navigation, Shield, Briefcase, Target, 
  Compass, Users, ChevronRight, Map, Star, ShieldCheck,
  PhoneCall, MailOpen, Navigation as NavIcon
} from 'lucide-react';
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
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-navy-50 via-white to-navy-50">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[40rem] h-[40rem] bg-gradient-to-r from-navy-700/3 via-blue-700/3 to-navy-700/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[40rem] h-[40rem] bg-gradient-to-l from-accent-gold/3 to-accent-goldDark/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-transparent via-navy-700/2 to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-full blur opacity-20" />
              <div className="relative p-2 rounded-full bg-gradient-to-r from-navy-700 to-blue-800">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-sm tracking-[0.2em] text-navy-700 uppercase font-medium">
              Exclusive Concierge Service
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-navy-900 mb-6 leading-tight">
            Connect with{' '}
            <span className="relative inline-block">
              <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Excellence
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-accent-gold via-accent-goldDark to-transparent"></span>
            </span>
          </h2>
          <p className="text-xl text-navy-700/80 max-w-3xl mx-auto leading-relaxed">
            Your direct pathway to luxury property specialists. Experience white-glove service 
            curated for the most discerning clientele worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Elegant Contact Information */}
          <div className="space-y-12">
            {/* Enhanced Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phone Card - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-navy-100 hover:border-navy-700/30 transition-all duration-500 hover:shadow-2xl hover:shadow-navy-700/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-navy-700/0 via-blue-700/0 to-navy-700/0 group-hover:from-navy-700/5 group-hover:via-blue-700/5 group-hover:to-navy-700/5 transition-all duration-700" />
                <div className="relative p-8">
                  <div className="flex items-start gap-5 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="relative p-4 rounded-xl bg-gradient-to-br from-navy-700 to-blue-800 shadow-lg">
                        <PhoneCall className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif text-navy-900 mb-2">Direct Contact</h3>
                      <p className="text-sm text-navy-600 font-light">24/7 premium support with immediate response</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-goldDark rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                      <Star className="w-5 h-5 text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative pl-4">
                      <div className="absolute left-0 top-2 w-0.5 h-10 bg-gradient-to-b from-navy-700 to-blue-800"></div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-navy-500 mb-3">Sri Lanka Office</p>
                        <a 
                          href={`tel:${contactInfo.phone.sriLanka}`}
                          className="text-2xl font-bold text-navy-900 hover:text-blue-700 transition-all duration-300 group-hover:translate-x-2 inline-flex items-center gap-3"
                        >
                          {contactInfo.phone.sriLanka}
                          <Phone className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="relative pl-4">
                      <div className="absolute left-0 top-2 w-0.5 h-10 bg-gradient-to-b from-accent-gold to-accent-goldDark"></div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-navy-500 mb-3">UK Office</p>
                        <a 
                          href={`tel:${contactInfo.phone.uk}`}
                          className="text-xl font-semibold text-navy-900 hover:text-blue-700 transition-all duration-300 group-hover:translate-x-2 inline-flex items-center gap-3"
                        >
                          {contactInfo.phone.uk}
                          <Phone className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-navy-600 pt-6 mt-6 border-t border-navy-100 group-hover:border-navy-200 transition-colors duration-300">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{contactInfo.phone.hours}</span>
                  </div>
                </div>
              </motion.div>

              {/* Email Card - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-navy-100 hover:border-accent-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-gold/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/0 via-accent-goldDark/0 to-accent-gold/0 group-hover:from-accent-gold/5 group-hover:via-accent-goldDark/5 group-hover:to-accent-gold/5 transition-all duration-700" />
                <div className="relative p-8">
                  <div className="flex items-start gap-5 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-goldDark rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="relative p-4 rounded-xl bg-gradient-to-br from-accent-gold to-accent-goldDark shadow-lg">
                        <MailOpen className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif text-navy-900 mb-2">Digital Correspondence</h3>
                      <p className="text-sm text-navy-600 font-light">Secure encrypted communication channels</p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="space-y-6">
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="block text-xl font-bold text-navy-900 hover:text-accent-gold transition-all duration-300 group-hover:translate-x-2"
                    >
                      {contactInfo.email}
                    </a>
                    
                    <a 
                      href={`https://${contactInfo.website}`}
                      className="inline-flex items-center gap-3 text-navy-600 hover:text-accent-gold transition-all duration-300 group-hover:translate-x-2"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-navy-700/5 to-blue-800/5">
                        <Globe className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{contactInfo.website}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Location Card - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="md:col-span-2 group relative overflow-hidden rounded-2xl bg-white border border-navy-100 hover:border-navy-700/30 transition-all duration-500 hover:shadow-2xl hover:shadow-navy-700/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-navy-700/0 via-blue-700/0 to-accent-gold/0 group-hover:from-navy-700/5 group-hover:via-blue-700/5 group-hover:to-accent-gold/5 transition-all duration-700" />
                <div className="relative p-8">
                  <div className="flex items-start gap-5 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="relative p-4 rounded-xl bg-gradient-to-br from-navy-700 to-blue-800 shadow-lg">
                        <Map className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif text-navy-900 mb-2">Global Presence</h3>
                      <p className="text-sm text-navy-600 font-light">Strategic prime locations across continents</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-navy-700 to-blue-800"></div>
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-gold to-accent-goldDark"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-navy-700 via-blue-800 to-transparent"></div>
                      <div className="flex items-start gap-4 mb-4">
                        <Building className="w-5 h-5 text-navy-700 mt-1" />
                        <div>
                          <h4 className="text-xl font-bold text-navy-900 mb-3">Sri Lanka Headquarters</h4>
                          <p className="text-navy-600 leading-relaxed font-light">{contactInfo.locations.sriLanka}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-accent-gold via-accent-goldDark to-transparent"></div>
                      <div className="flex items-start gap-4 mb-4">
                        <Building className="w-5 h-5 text-accent-gold mt-1" />
                        <div>
                          <h4 className="text-xl font-bold text-navy-900 mb-3">UK European Office</h4>
                          <p className="text-navy-600 leading-relaxed font-light">{contactInfo.locations.uk}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Map Section - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              {/* Map Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-xl blur opacity-20" />
                    <div className="relative p-3 rounded-xl bg-gradient-to-r from-navy-700 to-blue-800 shadow-lg">
                      <NavIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-navy-900">Prime Location Navigation</h3>
                    <p className="text-sm text-navy-600 font-light">Interactive access to our prestigious headquarters</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 rounded-full border border-accent-gold/20">
                    <Target className="w-4 h-4 text-accent-gold" />
                    <span className="text-sm font-medium text-navy-900">GPS: 6.8647° N, 79.8914° E</span>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="relative rounded-2xl overflow-hidden border border-navy-100 bg-white shadow-xl">
                <InteractiveMap />
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-gradient-to-r from-navy-50 to-blue-50 border border-navy-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white shadow-sm">
                      <Compass className="w-5 h-5 text-navy-700" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-navy-900">Dedicated Parking</p>
                      <p className="text-sm text-navy-600 font-light">Premium visitor parking spaces available</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 border border-accent-gold/20 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white shadow-sm">
                      <Users className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-navy-900">Private Consultation</p>
                      <p className="text-sm text-navy-600 font-light">Exclusive meeting suites for clients</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Premium Contact Form (Improved Alignment) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <div className="sticky top-8">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-navy-100">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-700/5 via-blue-700/5 to-accent-gold/5" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-navy-700/10 to-transparent rounded-full blur-3xl" />
                
                <div className="relative z-10 p-10">
                  {/* Form Header - Enhanced */}
                  <div className="flex items-start justify-between mb-10">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-lg blur opacity-20" />
                          <div className="relative p-3 rounded-lg bg-gradient-to-r from-navy-700 to-blue-800 shadow-lg">
                            <MessageSquare className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-3xl font-serif text-navy-900 mb-2">Priority Inquiry</h3>
                          <p className="text-navy-600">Direct access to our executive property advisors</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-full blur opacity-30" />
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-navy-700 to-blue-800 flex items-center justify-center shadow-xl">
                        <Send className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Form */}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative group">
                        <label className="block text-sm font-semibold text-navy-700 mb-3 uppercase tracking-[0.1em]">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="relative w-full px-5 py-4 bg-white border border-navy-200 rounded-xl focus:border-navy-700 focus:ring-4 focus:ring-navy-700/10 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500/60 text-lg"
                            placeholder="Johnathan Smith"
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-semibold text-navy-700 mb-3 uppercase tracking-[0.1em]">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="relative w-full px-5 py-4 bg-white border border-navy-200 rounded-xl focus:border-navy-700 focus:ring-4 focus:ring-navy-700/10 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500/60 text-lg"
                            placeholder="johnathan@domain.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-semibold text-navy-700 mb-3 uppercase tracking-[0.1em]">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="relative w-full px-5 py-4 bg-white border border-navy-200 rounded-xl focus:border-navy-700 focus:ring-4 focus:ring-navy-700/10 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500/60 text-lg"
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-semibold text-navy-700 mb-3 uppercase tracking-[0.1em]">
                        Message *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          className="relative w-full px-5 py-4 bg-white border border-navy-200 rounded-xl focus:border-navy-700 focus:ring-4 focus:ring-navy-700/10 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500/60 text-lg resize-none leading-relaxed"
                          placeholder="Describe your luxury property requirements, investment goals, preferred timeline, and any specific amenities you're seeking..."
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className={`w-full py-5 rounded-xl font-bold transition-all duration-500 relative overflow-hidden group ${
                        isSubmitted 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl' 
                          : 'bg-gradient-to-r from-navy-700 via-blue-800 to-navy-900 text-white hover:shadow-2xl hover:shadow-navy-700/40'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                        {isSubmitted ? (
                          <>
                            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                    <div className="flex items-center justify-center gap-2 pt-6 border-t border-navy-100">
                      <ShieldCheck className="w-4 h-4 text-accent-gold" />
                      <p className="text-sm text-center text-navy-500">
                        Your information is encrypted and handled with utmost confidentiality
                      </p>
                    </div>
                  </form>

                  {/* Quick Contact Bar - Enhanced */}
                  <div className="mt-12 pt-8 border-t border-navy-100">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={`tel:${contactInfo.phone.sriLanka}`}
                        className="flex-1 p-4 rounded-xl bg-gradient-to-r from-navy-700/5 to-blue-800/5 hover:from-navy-700/10 hover:to-blue-800/10 text-navy-700 border border-navy-200 hover:border-navy-700/30 transition-all duration-300 group flex items-center justify-center gap-3 hover:scale-[1.02]"
                      >
                        <PhoneCall className="w-5 h-5 group-hover:text-blue-700 transition-colors" />
                        <span className="font-bold">Immediate Call</span>
                      </a>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="flex-1 p-4 rounded-xl bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 hover:from-accent-gold/20 hover:to-accent-goldDark/20 text-accent-gold border border-accent-gold/20 hover:border-accent-gold/40 transition-all duration-300 group flex items-center justify-center gap-3 hover:scale-[1.02]"
                      >
                        <MailOpen className="w-5 h-5" />
                        <span className="font-bold">Express Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Footer Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-20 pt-10 border-t border-navy-100"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-blue-800 rounded-xl blur opacity-20" />
                <div className="relative p-3 rounded-xl bg-gradient-to-r from-navy-700 to-blue-800 shadow-xl">
                  <Building className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-serif text-navy-900 mb-2">Ru Residencies</h4>
                <p className="text-base text-navy-600 font-light">Redefining Luxury Living Standards Worldwide</p>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <p className="text-sm text-navy-600 mb-4 uppercase tracking-[0.1em]">Premium Global Concierge</p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a 
                  href={`tel:${contactInfo.phone.sriLanka}`}
                  className="text-xl font-bold text-navy-900 hover:text-blue-700 transition-colors duration-300"
                >
                  {contactInfo.phone.sriLanka}
                </a>
                <div className="w-1 h-1 bg-navy-300 rounded-full"></div>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-lg font-medium text-navy-700 hover:text-accent-gold transition-colors duration-300"
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