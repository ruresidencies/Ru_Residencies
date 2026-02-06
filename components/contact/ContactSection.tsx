'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Globe, Send, MessageSquare, 
  Building, Navigation, Shield, Zap, Award, ChevronRight, 
  Compass, Maximize2, Users, Target, Briefcase, User, 
  Smartphone, Globe as GlobeIcon, Map, Star, CheckCircle,
  ExternalLink, ArrowRight, Sparkles, Crown, Lock, Gem
} from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeContact, setActiveContact] = useState('phone');
  const [hoveredField, setHoveredField] = useState<string | null>(null);

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

  const inquiryTypes = [
    { id: 'general', label: 'General Inquiry', icon: MessageSquare, gradient: 'from-navy-700/20 to-transparent' },
    { id: 'investment', label: 'Investment Opportunity', icon: Briefcase, gradient: 'from-accent-gold/20 to-transparent' },
    { id: 'viewing', label: 'Property Viewing', icon: MapPin, gradient: 'from-navy-700/20 to-accent-gold/20' },
    { id: 'consultation', label: 'Private Consultation', icon: Users, gradient: 'from-accent-gold/20 to-navy-700/20' }
  ];

  const luxuryFeatures = [
    { icon: Crown, title: 'VIP Treatment', desc: 'Personal concierge service', color: 'text-accent-gold' },
    { icon: Lock, title: 'Complete Privacy', desc: 'Discrete communication channels', color: 'text-navy-700' },
    { icon: Zap, title: '24/7 Availability', desc: 'Round-the-clock support', color: 'text-accent-gold' },
    { icon: Gem, title: 'Exclusive Access', desc: 'First-view properties', color: 'text-navy-700' },
    { icon: Shield, title: 'Secure Processing', desc: 'Encrypted documentation', color: 'text-accent-gold' },
    { icon: Target, title: 'Precision Matching', desc: 'Tailored property selection', color: 'text-navy-700' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-base-offwhite via-white to-base-offwhite">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, transparent 45%, #D4AF37 45%, #D4AF37 55%, transparent 55%),
                             linear-gradient(-45deg, transparent 45%, #1e3a8a 45%, #1e3a8a 55%, transparent 55%)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Animated Gold Particles */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/5 rounded-full blur-2xl"
        />
        
        {/* Navy Wave Pattern */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-navy-700/5 via-navy-900/5 to-navy-700/5 rounded-full blur-2xl"
        />
        
        {/* Gold Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Luxury Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-navy-100 mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-goldDark rounded-full blur-sm" />
              <div className="relative p-2 bg-gradient-to-r from-accent-gold to-accent-goldDark rounded-full">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-sm font-semibold tracking-wider text-navy-700 uppercase">
              Prestige Concierge
            </span>
            <Sparkles className="w-4 h-4 text-accent-gold" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-serif text-navy-900 mb-6">
            <span className="relative inline-block">
              <span className="text-gradient bg-clip-text bg-gradient-to-r from-navy-900 via-navy-700 to-navy-900">
                Exclusive
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent-gold via-accent-goldDark to-accent-gold rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
            <span className="block mt-2">Connection</span>
          </h1>
          
          <p className="text-xl text-navy-700/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Your direct line to luxury property specialists. Experience white-glove service 
            reserved for our most discerning clients.
          </p>
          
          {/* Animated Divider */}
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-navy-700/30" />
            <Gem className="w-4 h-4 text-accent-gold" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-navy-700/30" />
          </motion.div>
        </motion.div>

        {/* Interactive Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Luxury Contact Methods */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { 
                  id: 'phone', 
                  icon: Phone, 
                  label: 'Direct Line', 
                  subLabel: 'Immediate Response',
                  color: 'border-navy-700',
                  hover: 'bg-gradient-to-br from-navy-700 to-navy-900',
                  iconBg: 'from-navy-700 to-navy-900'
                },
                { 
                  id: 'email', 
                  icon: Mail, 
                  label: 'Secure Email', 
                  subLabel: 'Encrypted Channel',
                  color: 'border-accent-gold/50',
                  hover: 'bg-gradient-to-br from-accent-gold to-accent-goldDark',
                  iconBg: 'from-accent-gold to-accent-goldDark'
                },
                { 
                  id: 'visit', 
                  icon: MapPin, 
                  label: 'Private Visit', 
                  subLabel: 'By Appointment',
                  color: 'border-navy-700/50',
                  hover: 'bg-gradient-to-br from-navy-700 via-accent-gold/20 to-navy-900',
                  iconBg: 'from-navy-700 via-accent-gold to-navy-900'
                }
              ].map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveContact(method.id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${
                    activeContact === method.id 
                      ? `${method.color} ${method.hover} text-white shadow-2xl`
                      : 'border-navy-100 bg-white hover:border-navy-300'
                  }`}
                >
                  {/* Background Glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                    method.id === 'phone' ? 'bg-navy-700' : 
                    method.id === 'email' ? 'bg-accent-gold' : 
                    'bg-gradient-to-r from-navy-700 via-accent-gold to-navy-900'
                  }`} />
                  
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${method.iconBg} shadow-lg`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        activeContact === method.id ? 'text-white' : 'text-navy-900'
                      }`}>
                        {method.label}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        activeContact === method.id ? 'text-white/90' : 'text-navy-600'
                      }`}>
                        {method.subLabel}
                      </p>
                    </div>
                  </div>
                  
                  {/* Active Indicator */}
                  {activeContact === method.id && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-accent-gold to-accent-goldDark rounded-t-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Dynamic Contact Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-navy-100 overflow-hidden"
              >
                <div className="p-8">
                  {activeContact === 'phone' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-navy-700 to-navy-900 shadow-lg">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif text-navy-900">Exclusive Phone Lines</h3>
                          <p className="text-navy-600">Speak directly with our directors</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-6 rounded-xl border-2 border-navy-100 hover:border-navy-700/30 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-navy-700 rounded-full" />
                            <span className="text-sm font-medium text-navy-700">Sri Lanka Office</span>
                          </div>
                          <a 
                            href={`tel:${contactInfo.phone.sriLanka}`}
                            className="block text-2xl font-bold text-navy-900 hover:text-navy-700 transition-colors duration-300 group"
                          >
                            {contactInfo.phone.sriLanka}
                            <ArrowRight className="w-4 h-4 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </motion.div>
                        
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-6 rounded-xl border-2 border-accent-gold/20 hover:border-accent-gold/40 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-accent-gold rounded-full" />
                            <span className="text-sm font-medium text-navy-700">UK Office</span>
                          </div>
                          <a 
                            href={`tel:${contactInfo.phone.uk}`}
                            className="block text-2xl font-bold text-navy-900 hover:text-accent-gold transition-colors duration-300 group"
                          >
                            {contactInfo.phone.uk}
                            <ArrowRight className="w-4 h-4 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </motion.div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-navy-50 to-navy-100/50 rounded-xl border border-navy-100">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-navy-700" />
                          <span className="text-sm font-medium text-navy-700">{contactInfo.phone.hours}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeContact === 'email' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-accent-gold to-accent-goldDark shadow-lg">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif text-navy-900">Secure Correspondence</h3>
                          <p className="text-navy-600">Encrypted communication channel</p>
                        </div>
                      </div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-xl border-2 border-accent-gold/20 hover:border-accent-gold/40 transition-all duration-300"
                      >
                        <a 
                          href={`mailto:${contactInfo.email}`}
                          className="block text-2xl font-bold text-navy-900 hover:text-accent-gold transition-colors duration-300 group"
                        >
                          {contactInfo.email}
                          <ExternalLink className="w-5 h-5 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </motion.div>
                      
                      <div className="p-4 bg-gradient-to-r from-accent-gold/5 to-accent-goldDark/5 rounded-xl border border-accent-gold/20">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-accent-gold" />
                          <span className="text-sm font-medium text-navy-700">All communications are end-to-end encrypted</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeContact === 'visit' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-navy-700 via-accent-gold/20 to-navy-900 shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif text-navy-900">Private Appointments</h3>
                          <p className="text-navy-600">Exclusive viewing experiences</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-6 rounded-xl border-2 border-navy-100 hover:border-navy-700/30 transition-all duration-300"
                        >
                          <h4 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Sri Lanka Headquarters
                          </h4>
                          <p className="text-navy-600 leading-relaxed">{contactInfo.locations.sriLanka}</p>
                        </motion.div>
                        
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-6 rounded-xl border-2 border-accent-gold/20 hover:border-accent-gold/40 transition-all duration-300"
                        >
                          <h4 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
                            <Building className="w-4 h-4 text-accent-gold" />
                            UK European Office
                          </h4>
                          <p className="text-navy-600 leading-relaxed">{contactInfo.locations.uk}</p>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Luxury Features Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="sticky top-6">
              <div className="bg-gradient-to-b from-white to-base-offwhite rounded-2xl shadow-xl border border-navy-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-navy-700 to-navy-900">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-5 h-5 text-accent-gold" />
                    <h3 className="text-xl font-semibold text-white">Prestige Benefits</h3>
                  </div>
                  <p className="text-sm text-white/80">Exclusive advantages for our clients</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {luxuryFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -4 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-white to-base-offwhite border border-navy-100 hover:border-accent-gold/30 transition-all duration-300 shadow-sm"
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br from-navy-700/10 to-accent-gold/10 ${feature.color}`}>
                            <feature.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-navy-900 mb-1">{feature.title}</h4>
                            <p className="text-xs text-navy-600">{feature.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Luxury Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-white to-base-offwhite shadow-2xl border border-navy-100">
            {/* Form Header */}
            <div className="relative p-8 md:p-12 border-b border-navy-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold via-accent-goldDark to-accent-gold" />
              
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-navy-900 rounded-full blur" />
                      <div className="relative p-3 rounded-xl bg-gradient-to-r from-navy-700 to-navy-900 shadow-lg">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif text-navy-900">Priority Inquiry</h2>
                      <p className="text-navy-600">Direct access to our luxury specialists</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-accent-gold/10 rounded-full">
                  <Shield className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm font-medium text-navy-700">Secure & Confidential</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Content */}
                <div>
                  {/* Inquiry Type Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-navy-700 mb-4">Select Inquiry Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {inquiryTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          type="button"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({...formData, inquiryType: type.id})}
                          onMouseEnter={() => setHoveredField(type.id)}
                          onMouseLeave={() => setHoveredField(null)}
                          className={`relative p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                            formData.inquiryType === type.id
                              ? 'border-navy-700 shadow-lg'
                              : 'border-navy-200 hover:border-navy-300'
                          }`}
                        >
                          {/* Animated Background */}
                          <motion.div 
                            className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 ${
                              hoveredField === type.id || formData.inquiryType === type.id ? 'opacity-100' : ''
                            }`}
                            initial={false}
                            animate={{ 
                              scale: hoveredField === type.id || formData.inquiryType === type.id ? 1 : 0.8 
                            }}
                          />
                          
                          <div className="relative z-10 flex flex-col items-center gap-2">
                            <type.icon className={`w-5 h-5 ${
                              formData.inquiryType === type.id ? 'text-navy-900' : 'text-navy-600'
                            }`} />
                            <span className={`text-sm font-medium ${
                              formData.inquiryType === type.id ? 'text-navy-900' : 'text-navy-700'
                            }`}>
                              {type.label}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-sm font-medium text-navy-700 mb-2">Full Name *</label>
                        <div 
                          className="relative group"
                          onMouseEnter={() => setHoveredField('name')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          <div className={`absolute -inset-0.5 bg-gradient-to-r from-navy-700 to-accent-gold rounded-lg opacity-0 ${
                            hoveredField === 'name' ? 'opacity-10' : ''
                          } blur transition duration-300`} />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="relative w-full px-4 py-3 bg-white border-2 border-navy-200 rounded-lg focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500"
                            placeholder="Johnathan Smith"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium text-navy-700 mb-2">Email Address *</label>
                        <div 
                          className="relative group"
                          onMouseEnter={() => setHoveredField('email')}
                          onMouseLeave={() => setHoveredField(null)}
                        >
                          <div className={`absolute -inset-0.5 bg-gradient-to-r from-navy-700 to-accent-gold rounded-lg opacity-0 ${
                            hoveredField === 'email' ? 'opacity-10' : ''
                          } blur transition duration-300`} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="relative w-full px-4 py-3 bg-white border-2 border-navy-200 rounded-lg focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500"
                            placeholder="johnathan@domain.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-navy-700 mb-2">Phone Number</label>
                      <div 
                        className="relative group"
                        onMouseEnter={() => setHoveredField('phone')}
                        onMouseLeave={() => setHoveredField(null)}
                      >
                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-navy-700 to-accent-gold rounded-lg opacity-0 ${
                          hoveredField === 'phone' ? 'opacity-10' : ''
                        } blur transition duration-300`} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="relative w-full px-4 py-3 bg-white border-2 border-navy-200 rounded-lg focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500"
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-navy-700 mb-2">Message *</label>
                      <div 
                        className="relative group"
                        onMouseEnter={() => setHoveredField('message')}
                        onMouseLeave={() => setHoveredField(null)}
                      >
                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-navy-700 to-accent-gold rounded-lg opacity-0 ${
                          hoveredField === 'message' ? 'opacity-10' : ''
                        } blur transition duration-300`} />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          className="relative w-full px-4 py-3 bg-white border-2 border-navy-200 rounded-lg focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20 outline-none transition-all duration-300 text-navy-900 placeholder-navy-500 resize-none"
                          placeholder="Describe your vision for luxury living, investment objectives, and timeline..."
                        />
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-xl font-semibold transition-all duration-500 relative overflow-hidden group ${
                        isSubmitted 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg' 
                          : 'bg-gradient-to-r from-navy-700 via-navy-800 to-navy-900 text-white hover:shadow-xl hover:shadow-navy-900/30'
                      }`}
                    >
                      {/* Gold Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/0 via-accent-gold/20 to-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-200%] group-hover:translate-x-[200%]" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitted ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-bold">Message Received</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span className="font-bold">Submit Priority Inquiry</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </span>
                      
                      {/* Gold Border Effect */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-gold/30 rounded-xl transition-all duration-500" />
                    </motion.button>
                  </form>
                </div>

                {/* Interactive Map & Quick Contact */}
                <div className="lg:pl-8 lg:border-l border-navy-100">
                  <div className="sticky top-6 space-y-8">
                    {/* Interactive Map */}
                    <div className="rounded-2xl overflow-hidden border border-navy-100 shadow-lg">
                      <div className="p-4 bg-gradient-to-r from-navy-700 to-navy-900">
                        <div className="flex items-center gap-3">
                          <Navigation className="w-5 h-5 text-accent-gold" />
                          <h3 className="text-lg font-semibold text-white">Global Headquarters</h3>
                        </div>
                      </div>
                      <div className="relative h-48">
                        <InteractiveMap />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Quick Contact Bar */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-gold/5 to-accent-goldDark/5 border border-accent-gold/20">
                      <h4 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent-gold" />
                        Immediate Assistance
                      </h4>
                      
                      <div className="space-y-3">
                        <a
                          href={`tel:${contactInfo.phone.sriLanka}`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-navy-50 transition-colors duration-300 group"
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-r from-navy-700 to-navy-900">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-navy-900">Direct Call</p>
                            <p className="text-xs text-navy-600">Immediate connection</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-navy-400 group-hover:text-accent-gold transition-colors" />
                        </a>
                        
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-navy-50 transition-colors duration-300 group"
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-r from-accent-gold to-accent-goldDark">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-navy-900">Express Email</p>
                            <p className="text-xs text-navy-600">Guaranteed 2-hour reply</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-navy-400 group-hover:text-accent-gold transition-colors" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Luxury Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-navy-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-700 to-navy-900 rounded-full blur opacity-30" />
                <div className="relative p-3 rounded-xl bg-gradient-to-r from-navy-700 to-navy-900 shadow-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-serif text-navy-900 mb-1">Ru Residencies</h4>
                <p className="text-sm text-navy-600">Redefining Luxury Living Standards Worldwide</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-end">
                <Sparkles className="w-4 h-4 text-accent-gold" />
                <p className="text-sm font-medium text-navy-700">Premium Global Concierge Service</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href={`tel:${contactInfo.phone.sriLanka}`}
                  className="text-lg font-semibold text-navy-900 hover:text-navy-700 transition-colors duration-300"
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