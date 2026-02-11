'use client';

import { motion } from 'framer-motion';
import { FaCookie, FaCog, FaChartLine, FaUserCog } from 'react-icons/fa';
import { useState } from 'react';

export default function CookiePolicy() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    performance: true,
    functional: true,
    marketing: false
  });

  const cookieTypes = [
    {
      type: "Essential Cookies",
      icon: FaCog,
      description: "Required for basic website functionality and cannot be disabled.",
      purpose: "Enable core functionality like security, network management, and accessibility.",
      examples: ["Session management", "Security tokens", "Load balancing"]
    },
    {
      type: "Performance Cookies",
      icon: FaChartLine,
      description: "Help us understand how visitors interact with our website.",
      purpose: "Collect information about website usage to improve performance and user experience.",
      examples: ["Google Analytics", "Heatmaps", "Page load times"]
    },
    {
      type: "Functional Cookies",
      icon: FaUserCog,
      description: "Remember your preferences and personalize your experience.",
      purpose: "Enable enhanced functionality and personalization across visits.",
      examples: ["Language preferences", "Property favorites", "Form autofill"]
    },
    {
      type: "Marketing Cookies",
      icon: FaCookie,
      description: "Used to track visitors across websites for advertising purposes.",
      purpose: "Display relevant advertisements based on your interests and browsing behavior.",
      examples: ["Facebook Pixel", "Google Ads", "Retargeting campaigns"]
    }
  ];

  const toggleCookiePreference = (type: string) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

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
            Website Technology
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif text-ink-primary">
            Cookie <span className="text-gradient" style={{backgroundImage: 'var(--gradient-gold)'}}>Policy</span>
          </h1>
          <p className="mt-6 text-lg text-ink-secondary max-w-3xl mx-auto">
            This policy explains how RU Residencies uses cookies and similar technologies 
            to enhance your browsing experience on our website.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-6 bg-white border border-line rounded-2xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ink-primary">Policy Effective Date</h3>
              <p className="text-ink-muted">Last Updated: {formattedDate}</p>
            </div>
            <div className="px-4 py-2 bg-accent-gold/10 rounded-lg">
              <span className="text-accent-gold font-medium">Version 1.0</span>
            </div>
          </div>
        </motion.div>

        {/* What are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12 p-8 bg-white rounded-2xl border border-line shadow-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent-gold/10 rounded-lg">
              <FaCookie className="text-accent-gold text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-ink-primary">What Are Cookies?</h2>
              <p className="text-ink-muted">Small text files stored on your device</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ink-primary">Purpose</h3>
              <p className="text-ink-secondary leading-relaxed">
                Cookies help websites remember your preferences, understand how you use the site, 
                and provide you with a better, more personalized experience.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-ink-primary">Types We Use</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                  <span className="text-ink-secondary">Session Cookies (temporary)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                  <span className="text-ink-secondary">Persistent Cookies (long-term)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full" />
                  <span className="text-ink-secondary">First & Third Party Cookies</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Cookie Types */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-serif text-ink-primary mb-8 text-center">
            Types of Cookies We Use
          </h2>
          
          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.type}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white rounded-xl border border-line hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex items-start gap-4 md:w-1/3">
                    <div className="p-3 bg-accent-gold/10 rounded-lg">
                      <cookie.icon className="text-accent-gold text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-ink-primary">{cookie.type}</h3>
                      <p className="text-sm text-ink-muted mt-1">{cookie.description}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-ink-primary mb-2">Purpose</h4>
                        <p className="text-ink-secondary text-sm">{cookie.purpose}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-ink-primary mb-2">Examples</h4>
                        <div className="flex flex-wrap gap-2">
                          {cookie.examples.map((example, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1 bg-base-offwhite text-ink-secondary text-xs rounded-full border border-line"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cookie Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto mb-12 p-8 bg-gradient-to-r from-accent-gold/5 to-accent-goldDark/5 rounded-2xl border border-accent-gold/20"
        >
          <h2 className="text-2xl font-serif text-ink-primary mb-6 text-center">
            Manage Your Cookie Preferences
          </h2>
          
          <div className="space-y-4 mb-8">
            {Object.entries(cookiePreferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-white rounded-lg border border-line">
                <div>
                  <h3 className="font-medium text-ink-primary capitalize">{key} Cookies</h3>
                  <p className="text-sm text-ink-muted">
                    {key === 'essential' 
                      ? 'Required for website functionality'
                      : value ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleCookiePreference(key)}
                    disabled={key === 'essential'}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-accent-gold' : 'bg-gray-300'
                    } ${key === 'essential' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                  <span className="text-sm font-medium text-ink-primary">
                    {value ? 'On' : 'Off'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => {
                setCookiePreferences({
                  essential: true,
                  performance: true,
                  functional: true,
                  marketing: false
                });
              }}
              className="px-6 py-3 bg-white border border-accent-gold text-accent-gold rounded-lg hover:bg-accent-gold/5 transition-colors duration-300"
            >
              Reset to Default
            </button>
          </div>
        </motion.div>

        {/* Contact Section - UPDATED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-4xl mx-auto p-8 bg-white rounded-2xl border border-line"
        >
          <h3 className="text-2xl font-serif text-ink-primary mb-6 text-center">
            Need Assistance?
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
            <p className="text-ink-muted text-sm mb-4">
              For more information about cookies and how to manage them, visit{" "}
              <a 
                href="https://www.allaboutcookies.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent-gold hover:text-accent-goldDark transition-colors duration-300"
              >
                All About Cookies
              </a>
            </p>
            <a 
              href="/privacy-policy" 
              className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-goldDark transition-colors duration-300"
            >
              View our Privacy Policy
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}