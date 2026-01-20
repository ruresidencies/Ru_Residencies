'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MessageSquare, Check } from 'lucide-react';

export default function Form3D() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formVariants = {
    hidden: { rotateX: -15, opacity: 0 },
    visible: {
      rotateX: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(30, 58, 138, 0.2)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="perspective-1000"
    >
      <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-xl border border-slate-200 p-6 md:p-8 transform-style-3d">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-navy-800/20 to-blue-700/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-serif text-slate-900 mb-1">Quick Inquiry</h3>
              <p className="text-sm text-slate-600">We'll respond within 2 hours</p>
            </div>
            <motion.div
              animate={{ rotate: isSubmitting ? 360 : 0 }}
              transition={{ duration: 2, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
              className="p-2 rounded-lg bg-gradient-to-r from-navy-800/10 to-blue-700/10"
            >
              <MessageSquare className="w-5 h-5 text-navy-800" />
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileFocus="focus" variants={inputVariants}>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-navy-800 transition-colors duration-300"
                  />
                </div>
              </motion.div>

              <motion.div whileFocus="focus" variants={inputVariants}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-navy-800 transition-colors duration-300"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div whileFocus="focus" variants={inputVariants}>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-navy-800 transition-colors duration-300"
                />
              </div>
            </motion.div>

            <motion.div whileFocus="focus" variants={inputVariants}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={3}
                required
                className="w-full px-4 py-3 bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-navy-800 transition-colors duration-300 resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-navy-800 to-blue-700 text-white hover:shadow-lg hover:shadow-navy-800/30'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>

            <p className="text-xs text-center text-slate-500 pt-2">
              By submitting, you agree to our privacy policy
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}