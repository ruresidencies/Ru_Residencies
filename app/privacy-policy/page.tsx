'use client';

import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserLock, FaDatabase, FaEye } from 'react-icons/fa';

export default function PrivacyPolicy() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const sections = [
    {
      title: "Information We Collect",
      icon: FaDatabase,
      points: [
        "Personal identification information (name, email address, phone number)",
        "Property preferences and requirements for personalized service",
        "Communication records and consultation notes",
        "Website usage data through cookies and analytics"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: FaEye,
      points: [
        "To provide personalized real estate consultation and services",
        "To communicate about available properties matching your criteria",
        "To schedule property viewings and consultations",
        "To send relevant market updates and investment opportunities",
        "To improve our services and website experience"
      ]
    },
    {
      title: "Data Protection",
      icon: FaShieldAlt,
      points: [
        "Encryption of sensitive personal information",
        "Secure servers with restricted access",
        "Regular security audits and updates",
        "Staff training on data protection protocols"
      ]
    },
    {
      title: "Your Rights",
      icon: FaUserLock,
      points: [
        "Right to access your personal data",
        "Right to correct inaccurate information",
        "Right to request deletion of your data",
        "Right to object to data processing",
        "Right to data portability"
      ]
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
            Legal Documentation
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif text-ink-primary">
            Privacy <span className="text-gradient" style={{backgroundImage: 'var(--gradient-gold)'}}>Policy</span>
          </h1>
          <p className="mt-6 text-lg text-ink-secondary max-w-3xl mx-auto">
            Your privacy is of utmost importance to us. This policy outlines how we collect, 
            use, and protect your personal information in accordance with data protection laws.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-6 bg-white border border-line rounded-2xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ink-primary">Policy Effective Date</h3>
              <p className="text-ink-muted">Last Updated: {formattedDate}</p>
            </div>
            <div className="px-4 py-2 bg-accent-gold/10 rounded-lg">
              <span className="text-accent-gold font-medium">Version 2.1</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 p-8 bg-white rounded-2xl border border-line shadow-sm"
          >
            <h2 className="text-2xl font-serif text-ink-primary mb-4">Our Commitment</h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              At RU Residencies, we are committed to protecting your privacy and ensuring 
              the security of your personal information. We process your data transparently 
              and in compliance with applicable data protection regulations.
            </p>
            <p className="text-ink-secondary leading-relaxed">
              This privacy policy applies to all information collected through our website 
              and during our real estate consultation services.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-8 bg-white rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-accent-gold/10 rounded-lg">
                    <section.icon className="text-accent-gold text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink-primary">{section.title}</h3>
                </div>
                
                <ul className="space-y-3">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0" />
                      <span className="text-ink-secondary">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Section - UPDATED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-8 bg-gradient-to-r from-accent-gold/5 to-accent-goldDark/5 rounded-2xl border border-accent-gold/20"
          >
            <h3 className="text-2xl font-serif text-ink-primary mb-6 text-center">
              Contact Us Directly
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Hotline */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 mx-auto bg-accent-gold/10 rounded-full">
                  <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-primary mb-2">Hotline</h4>
                  <a 
                    href="tel:+94772112117" 
                    className="text-2xl font-semibold text-accent-gold hover:text-accent-goldDark transition-colors duration-300"
                  >
                    077 211 2117
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 mx-auto bg-accent-gold/10 rounded-full">
                  <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-primary mb-2">Email</h4>
                  <a 
                    href="mailto:info@ruresidencies.com" 
                    className="text-xl text-accent-gold hover:text-accent-goldDark transition-colors duration-300 break-all"
                  >
                    info@ruresidencies.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}