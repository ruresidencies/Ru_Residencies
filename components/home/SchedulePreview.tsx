'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, MapPin, Target, ArrowRight } from 'lucide-react';
import InteractiveMap from '@/components/contact/InteractiveMap';
import { sendScheduleEmail } from '@/lib/email-service';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

export default function SchedulePreview() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Refs for animations
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const formInView = useInView(formRef, { once: true, amount: 0.3 });
  const mapInView = useInView(mapRef, { once: true, amount: 0.3 });
  
  const controls = useAnimation();
  const formControls = useAnimation();
  const mapControls = useAnimation();

  // Predefined time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Get next 4 working days
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays
      if (date.getDay() === 0) continue;
      
      const formattedDate = date.toISOString().split('T')[0];
      const displayDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      days.push({
        value: formattedDate,
        display: displayDate
      });
      
      if (days.length === 4) break;
    }
    
    return days;
  }

  const days = getNextDays();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (formInView) {
      formControls.start('visible');
    }
  }, [formInView, formControls]);

  useEffect(() => {
    if (mapInView) {
      mapControls.start('visible');
    }
  }, [mapInView, mapControls]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await sendScheduleEmail({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        selectedDate,
        selectedTime,
        source: 'homepage'
      });
      
      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error('Email failed but showing success to user');
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Animation variants - FIXED: Use proper easing values
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const // Changed from number array to valid easing
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const // Fixed easing
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const // Fixed easing
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const // Fixed easing
      }
    }
  };

  const buttonHover = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    hover: { 
      scale: 1.02, 
      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      transition: { type: "spring" as const, stiffness: 400, damping: 17 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className="bg-white pt-8 md:pt-12 overflow-hidden"
    >
      {/* Hero Section with animation */}
      <motion.div 
        className="bg-black text-white py-8 md:py-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-2xl md:text-3xl font-light mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Schedule a Private Viewing
            </motion.h1>
            <motion.p 
              className="text-gray-300 text-sm md:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Experience RU Residencies firsthand. Our team will guide you personally.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        <motion.div 
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Left Column - Form */}
          <motion.div 
            ref={formRef}
            variants={slideInRight}
            className="space-y-8"
          >
            <div>
              <motion.div 
                variants={fadeInUp}
                className="mb-6 md:mb-8"
              >
                <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-2">
                  Book Your Visit
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Fill the form below. We'll confirm your slot.
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-green-50 rounded-xl border border-green-200 p-6 md:p-8 text-center"
                  >
                    <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-500 mx-auto mb-3 md:mb-4" />
                    <h3 className="text-lg md:text-xl font-light text-gray-900 mb-2">
                      Tour Request Submitted
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                      We've received your request and will contact you shortly to confirm details.
                    </p>
                    <div className="bg-white rounded-lg p-3 md:p-4 inline-block border border-green-100">
                      <p className="text-xs md:text-sm text-gray-500 mb-1">Your Requested Slot</p>
                      <p className="font-medium text-sm md:text-base">
                        {new Date(selectedDate).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })} at {selectedTime}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6"
                  >
                    {/* Personal Information */}
                    <motion.div 
                      variants={fadeInUp}
                      className="space-y-3 md:space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                          Name *
                        </label>
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
                        >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black text-sm md:text-base transition-all duration-300 hover:border-gray-400"
                            placeholder="Your name"
                          />
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                            Phone *
                          </label>
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
                          >
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black text-sm md:text-base transition-all duration-300 hover:border-gray-400"
                              placeholder="Your phone number"
                            />
                          </motion.div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                            Email
                          </label>
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
                          >
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-black text-sm md:text-base transition-all duration-300 hover:border-gray-400"
                              placeholder="Your email (optional)"
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Date Selection */}
                    <motion.div variants={fadeInUp}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                        Select Date *
                      </label>
                      <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-2 gap-2"
                      >
                        {days.map(day => (
                          <motion.button
                            key={day.value}
                            type="button"
                            onClick={() => setSelectedDate(day.value)}
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonHover}
                            className={`py-2.5 md:py-3 rounded-lg border text-sm transition-all ${
                              selectedDate === day.value
                                ? 'bg-black text-white border-black shadow-lg'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {day.display}
                          </motion.button>
                        ))}
                      </motion.div>
                    </motion.div>
                    
                    {/* Time Selection */}
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          Select Time *
                        </label>
                        <motion.div 
                          variants={staggerContainer}
                          className="grid grid-cols-2 gap-2"
                        >
                          {timeSlots.map(time => (
                            <motion.button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              whileHover="hover"
                              whileTap="tap"
                              variants={buttonHover}
                              className={`py-2.5 md:py-3 rounded-lg border text-sm transition-all ${
                                selectedTime === time
                                  ? 'bg-black text-white border-black shadow-lg'
                                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
                              }`}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
                        backgroundColor: "rgba(0,0,0,0.9)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={!selectedDate || !selectedTime || isLoading}
                      className="w-full bg-black text-white py-3 md:py-3.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm md:text-base relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Request Private Tour
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    <motion.p 
                      variants={fadeInUp}
                      className="text-xs text-gray-500 text-center pt-2"
                    >
                      Submit your details. Our team will confirm availability within 24 hours.
                    </motion.p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Feature Cards */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
                  transition: { type: "spring" as const, stiffness: 400, damping: 17 }
                }}
                className="p-5 rounded-xl bg-gradient-to-r from-navy-50 to-blue-50 border border-navy-100 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 rounded-lg bg-white shadow-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="w-5 h-5 text-navy-700" />
                  </motion.div>
                  <div>
                    <p className="text-base font-bold text-navy-900">Flexible Scheduling</p>
                    <p className="text-sm text-navy-600 font-light">Multiple time slots available daily</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 20px 40px rgba(245,158,11,0.1)",
                  transition: { type: "spring" as const, stiffness: 400, damping: 17 }
                }}
                className="p-5 rounded-xl bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 border border-accent-gold/20 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 rounded-lg bg-white shadow-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <User className="w-5 h-5 text-accent-gold" />
                  </motion.div>
                  <div>
                    <p className="text-base font-bold text-navy-900">Personal Tour</p>
                    <p className="text-sm text-navy-600 font-light">One-on-one with property specialists</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Preparation Tips */}
            <motion.div 
              variants={slideInLeft}
              className="border border-gray-200 rounded-xl p-5 md:p-6"
            >
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                Preparation Tips
              </h3>
              <ul className="space-y-1.5 md:space-y-2">
                {[
                  { icon: Clock, text: "Arrive 10 minutes before your scheduled time" },
                 
                  { text: "Wear comfortable shoes for property tours" },
                  { text: "Prepare questions for our specialists" }
                ].map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-xs md:text-sm text-gray-600 flex items-start gap-2"
                  >
                    {tip.icon ? (
                      <tip.icon className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                    ) : (
                      <div className="w-3 h-3 md:w-4 md:h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gray-500">•</span>
                      </div>
                    )}
                    <span>{tip.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Questions About Scheduling? */}
            <motion.div 
              variants={fadeInUp}
              className="pt-6 border-t border-gray-200"
            >
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-light text-gray-900 mb-3 md:mb-4">
                  Questions About Scheduling?
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
                  Call us directly for immediate assistance
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.a
                    href="tel:0772112117" 
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonHover}
                    className="inline-flex items-center gap-2 bg-black text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base group relative overflow-hidden"
                  >
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                    Call Now: 077 211 2117
                  </motion.a>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonHover}
                  >
                    <Link 
                      href="/schedule-viewing" 
                      className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm md:text-base group"
                    >
                      View Full Scheduling Page
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div 
            ref={mapRef}
            variants={slideInLeft}
            className="space-y-8"
          >
            {/* Contact Information */}
            <motion.div 
              variants={scaleIn}
              className="bg-black text-white rounded-xl p-6 md:p-8 overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-light mb-4 md:mb-6">
                  Contact Us Directly
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { icon: Phone, label: "Hotline", value: "077 211 2117", href: "tel:0772112117" },
                    { icon: Mail, label: "Email", value: "info@ruresidencies.com", href: "mailto:info@ruresidencies.com" }
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-3 md:gap-4 group/contact"
                    >
                      <contact.icon className="w-4 h-4 md:w-5 md:h-5 group-hover/contact:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-300">{contact.label}</p>
                        <a href={contact.href} className="font-medium text-base md:text-lg hover:text-gray-300 transition-colors inline-block">
                          {contact.value}
                          <span className="block h-px bg-white/30 scale-x-0 group-hover/contact:scale-x-100 transition-transform origin-left duration-300" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-2"
                  >
                    <p className="text-xs md:text-sm text-gray-300 mb-2">WhatsApp</p>
                    <motion.a
                      href="https://wa.me/94772112117" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, backgroundColor: "#25D366" }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-300 text-sm shadow-lg hover:shadow-xl"
                    >
                      <span>Chat on WhatsApp</span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* MAP SECTION */}
            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              {/* Map header with GPS on the right */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="p-3 rounded-lg bg-gradient-to-r from-navy-700 to-blue-800 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-serif text-navy-900">Prime Location Navigation</h3>
                    <p className="text-sm text-navy-600 font-light">Interactive access to our prestigious headquarters</p>
                  </div>
                </motion.div>
                
                {/* GPS Coordinates */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-gold/10 to-accent-goldDark/10 rounded-full border border-accent-gold/20 shadow-sm"
                >
                  <Target className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm font-medium text-navy-900">GPS: 6.8647° N, 79.8914° E</span>
                  <motion.div 
                    className="w-1.5 h-1.5 bg-accent-gold rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </motion.div>
              </div>
              
              {/* Interactive Map Container */}
              <motion.div 
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.01,
                  boxShadow: "0px 30px 60px rgba(0,0,0,0.15)",
                  transition: { type: "spring" as const, stiffness: 400, damping: 17 }
                }}
                className="relative rounded-2xl overflow-hidden border border-navy-100 bg-white shadow-xl"
              >
                <InteractiveMap />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}