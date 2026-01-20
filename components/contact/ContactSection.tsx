'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Globe, Send, MessageSquare, Building, Navigation, Shield, Zap, Award, ChevronRight } from 'lucide-react';

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState<'info' | 'map' | 'form'>('info');
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
      hours: 'Monday-Friday (9am-5pm)'
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
        { icon: Shield, title: 'Privacy Guaranteed', desc: '100% confidential consultation' },
        { icon: Zap, title: 'Fast Response', desc: 'Response within 2 hours' },
        { icon: Award, title: 'Premium Service', desc: 'Dedicated luxury advisors' },
      ].map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group relative p-6 rounded-2xl bg-white border border-line hover:border-accent-gold/30 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          <feature.icon className="w-8 h-8 text-accent-gold mb-4 relative z-10" />
          <h4 className="text-lg font-semibold text-ink-primary mb-2 relative z-10">{feature.title}</h4>
          <p className="text-sm text-ink-secondary relative z-10">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 bg-base-offwhite">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-gold/5 to-accent-goldDark/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-l from-accent-gold/5 to-accent-goldDark/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-luxury text-accent-gold uppercase mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-ink-primary mb-6">
            Connect with <span className="text-gradient" style={{ backgroundImage: 'var(--gradient-gold)' }}>Excellence</span>
          </h2>
          <p className="text-lg text-ink-secondary max-w-2xl mx-auto">
            Reach out to our luxury property specialists for personalized consultation and premium service.
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
                className="group relative p-6 rounded-2xl bg-white border border-line hover:border-accent-gold/50 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-gold/10 to-accent-goldDark/5 border border-accent-gold/20">
                    <Phone className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink-primary mb-2">Direct Contact</h3>
                    <p className="text-sm text-ink-secondary">Premium support available</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink-muted mb-2">Sri Lanka Office</p>
                    <a 
                      href={`tel:${contactInfo.phone.sriLanka}`}
                      className="text-2xl font-light text-ink-primary hover:text-accent-gold transition-colors duration-300 group-hover:translate-x-2 inline-block"
                    >
                      {contactInfo.phone.sriLanka}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink-muted mb-2">UK Office</p>
                    <a 
                      href={`tel:${contactInfo.phone.uk}`}
                      className="text-xl font-light text-ink-primary hover:text-accent-gold transition-colors duration-300 group-hover:translate-x-2 inline-block"
                    >
                      {contactInfo.phone.uk}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-secondary pt-4 mt-4 border-t border-line">
                  <Clock className="w-4 h-4" />
                  <span>{contactInfo.phone.hours}</span>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative p-6 rounded-2xl bg-white border border-line hover:border-accent-gold/50 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-gold/10 to-accent-goldDark/5 border border-accent-gold/20">
                    <Mail className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink-primary mb-2">Digital Correspondence</h3>
                    <p className="text-sm text-ink-secondary">Secure communication</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="block text-xl font-light text-ink-primary hover:text-accent-gold transition-colors duration-300 group-hover:translate-x-2"
                  >
                    {contactInfo.email}
                  </a>
                  <a 
                    href={`https://${contactInfo.website}`}
                    className="inline-flex items-center gap-2 text-ink-secondary hover:text-accent-gold transition-colors duration-300 group-hover:translate-x-2"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{contactInfo.website}</span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="md:col-span-2 group relative p-6 rounded-2xl bg-white border border-line hover:border-accent-gold/50 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-gold/10 to-accent-goldDark/5 border border-accent-gold/20">
                    <MapPin className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink-primary mb-2">Global Presence</h3>
                    <p className="text-sm text-ink-secondary">Prime locations worldwide</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-0.5 h-full bg-gradient-to-b from-accent-gold to-transparent" />
                    <h4 className="text-lg font-semibold text-ink-primary mb-3 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Sri Lanka Office
                    </h4>
                    <p className="text-ink-secondary leading-relaxed">{contactInfo.locations.sriLanka}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-0.5 h-full bg-gradient-to-b from-accent-gold to-transparent" />
                    <h4 className="text-lg font-semibold text-ink-primary mb-3 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      UK Office
                    </h4>
                    <p className="text-ink-secondary leading-relaxed">{contactInfo.locations.uk}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-line bg-white shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 via-transparent to-accent-gold/5" />
              <div className="relative z-10 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Navigation className="w-5 h-5 text-accent-gold" />
                  <h3 className="text-lg font-semibold text-ink-primary">Global Headquarters</h3>
                </div>
                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-line">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.506981343949!2d79.8914143!3d6.8646997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b1c71e6e7e1%3A0xf2d1c5b8e7e1f1f!2s6C%20Pelawatta%20Rd%2C%20Nugegoda!5e0!3m2!1sen!2slk!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(20%) contrast(110%)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs border border-line">
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-accent-gold mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-ink-primary">Main Office</p>
                      <p className="text-xs text-ink-secondary">6C Pelawatta Rd, Nugegoda</p>
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
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-line">
                {/* Form Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-accent-gold/5" />
                <div className="relative z-10 p-8">
                  {/* Form Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-accent-gold to-accent-goldDark">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-serif text-ink-primary">Priority Inquiry</h3>
                      </div>
                      <p className="text-ink-secondary">Direct access to our luxury advisors</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-goldDark rounded-full blur opacity-30" />
                      <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-accent-gold to-accent-goldDark flex items-center justify-center">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Premium Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="block text-sm font-medium text-ink-secondary mb-2">Full Name *</label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="relative w-full px-4 py-3.5 bg-base-offwhite border border-line rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all duration-300 text-ink-primary placeholder-ink-muted"
                            placeholder="Johnathan Smith"
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-ink-secondary mb-2">Email Address *</label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="relative w-full px-4 py-3.5 bg-base-offwhite border border-line rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all duration-300 text-ink-primary placeholder-ink-muted"
                            placeholder="johnathan@domain.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-ink-secondary mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="relative w-full px-4 py-3.5 bg-base-offwhite border border-line rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all duration-300 text-ink-primary placeholder-ink-muted"
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-ink-secondary mb-2">Message *</label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          className="relative w-full px-4 py-3.5 bg-base-offwhite border border-line rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all duration-300 text-ink-primary placeholder-ink-muted resize-none"
                          placeholder="Describe your luxury property requirements..."
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
                          : 'bg-gradient-to-r from-accent-gold to-accent-goldDark text-white hover:shadow-lg hover:shadow-accent-gold/30'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitted ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-bold">Message Received</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span className="font-bold">Submit Priority Inquiry</span>
                          </>
                        )}
                      </span>
                    </motion.button>

                    <p className="text-xs text-center text-ink-muted pt-4">
                      <Shield className="w-3 h-3 inline-block mr-1" />
                      Your information is encrypted and handled with utmost confidentiality
                    </p>
                  </form>

                  {/* Quick Contact Bar */}
                  <div className="mt-8 pt-6 border-t border-line">
                    <div className="flex flex-wrap gap-3 justify-center">
                      <a
                        href={`tel:${contactInfo.phone.sriLanka}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-base-offwhite hover:bg-accent-gold/10 text-ink-primary rounded-lg transition-all duration-300 hover:scale-105 border border-line hover:border-accent-gold/30"
                      >
                        <Phone className="w-3 h-3" />
                        Immediate Call
                      </a>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 hover:from-accent-gold/20 hover:to-accent-goldDark/20 text-accent-gold rounded-lg transition-all duration-300 hover:scale-105 border border-accent-gold/20"
                      >
                        <Mail className="w-3 h-3" />
                        Express Email
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
          className="mt-16 pt-8 border-t border-line"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-goldDark rounded-full blur opacity-30" />
                <div className="relative p-2 rounded-lg bg-gradient-to-r from-accent-gold to-accent-goldDark">
                  <Building className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-serif text-ink-primary mb-1">Rure Residencies</h4>
                <p className="text-sm text-ink-secondary">Redefining Luxury Living Standards</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-ink-secondary mb-2">Premium Concierge Service</p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href={`tel:${contactInfo.phone.sriLanka}`}
                  className="text-xl font-light text-ink-primary hover:text-accent-gold transition-colors duration-300"
                >
                  {contactInfo.phone.sriLanka}
                </a>
                <span className="text-ink-muted hidden sm:inline">•</span>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-lg font-light text-ink-secondary hover:text-accent-gold transition-colors duration-300"
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