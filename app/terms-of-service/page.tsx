'use client';

import { motion } from 'framer-motion';
import { FaFileContract, FaGavel, FaBalanceScale, FaHandshake } from 'react-icons/fa';

export default function TermsOfService() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const terms = [
    {
      title: "Acceptance of Terms",
      icon: FaHandshake,
      content: "By accessing and using the RU Residencies website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of our website immediately."
    },
    {
      title: "Intellectual Property Rights",
      icon: FaFileContract,
      content: "All content on this website, including but not limited to property designs, architectural plans, photographs, text, graphics, logos, and software, is the property of RU Residencies and is protected by copyright and other intellectual property laws. No content may be reproduced, distributed, or used without prior written permission."
    },
    {
      title: "Property Information Accuracy",
      icon: FaBalanceScale,
      content: "While we strive to provide accurate and up-to-date information about our properties, all details including specifications, dimensions, prices, and availability are subject to change without notice. We recommend contacting us directly for the most current information before making any decisions."
    },
    {
      title: "Consultation Services",
      icon: FaHandshake,
      content: "Our consultation services are provided for informational purposes only. They do not constitute legal, financial, or investment advice. Any decisions made based on our consultations are your sole responsibility."
    },
    {
      title: "Limitation of Liability",
      icon: FaGavel,
      content: "RU Residencies shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses."
    },
    {
      title: "Governing Law",
      icon: FaBalanceScale,
      content: "These Terms of Service shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-offwhite to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-gold/5 to-accent-goldDark/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-accent-gold/5 to-accent-goldDark/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-luxury text-accent-gold uppercase">
            Legal Agreement
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif text-ink-primary">
            Terms of <span className="text-gradient" style={{backgroundImage: 'var(--gradient-gold)'}}>Service</span>
          </h1>
          <p className="mt-6 text-lg text-ink-secondary max-w-3xl mx-auto">
            Please read these terms carefully before using our website and services. 
            These terms govern your relationship with RU Residencies.
          </p>
        </motion.div>

        {/* Effective Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-6 bg-white border border-line rounded-2xl shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-ink-primary">Effective Date</h3>
              <p className="text-ink-muted">Last Updated: {formattedDate}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-accent-gold/10 rounded-lg">
                <span className="text-accent-gold font-medium">Version 1.0</span>
              </div>
              <a 
                href="/privacy-policy" 
                className="px-4 py-2 text-accent-gold hover:text-accent-goldDark transition-colors duration-300 inline-flex items-center gap-1"
              >
                View Privacy Policy
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Terms Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {terms.map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white rounded-xl border border-line hover:border-accent-gold/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-accent-gold/10 rounded-lg group-hover:bg-accent-gold/20 transition-colors duration-300">
                    <term.icon className="text-accent-gold text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink-primary group-hover:text-accent-gold transition-colors duration-300">
                    {term.title}
                  </h3>
                </div>
                <p className="text-ink-secondary leading-relaxed pl-16">
                  {term.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12 p-8 bg-gradient-to-r from-accent-gold/5 to-accent-goldDark/5 rounded-2xl border border-accent-gold/20"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-accent-gold/20 rounded-lg">
                  <span className="text-accent-gold font-bold text-xl">!</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif text-ink-primary mb-3">Important Notice</h3>
                <p className="text-ink-secondary leading-relaxed">
                  These Terms of Service are subject to change at any time without prior notice. 
                  Continued use of our website after changes constitute acceptance of the modified terms. 
                  We recommend reviewing these terms periodically for updates.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section - UPDATED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 p-8 bg-white rounded-2xl border border-line"
          >
            <h3 className="text-2xl font-serif text-ink-primary mb-6 text-center">
              Contact Us Directly
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Hotline */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-accent-gold/10 rounded-full">
                  <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-primary mb-1">Hotline</h4>
                  <a 
                    href="tel:+94772112117" 
                    className="text-lg font-medium text-accent-gold hover:text-accent-goldDark transition-colors duration-300"
                  >
                    077 211 2117
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-accent-gold/10 rounded-full">
                  <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-primary mb-1">Email</h4>
                  <a 
                    href="mailto:info@ruresidencies.com" 
                    className="text-lg text-accent-gold hover:text-accent-goldDark transition-colors duration-300 break-all"
                  >
                    info@ruresidencies.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a 
                href="mailto:info@ruresidencies.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-goldDark text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}