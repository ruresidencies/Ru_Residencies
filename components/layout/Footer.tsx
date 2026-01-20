'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaFacebook, FaClock, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-base-offwhite to-white text-ink-primary overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-gold/5 to-accent-goldDark/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-accent-gold/5 to-accent-goldDark/10 rounded-full blur-3xl" />
        
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo & Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div 
              className="relative w-48 h-48 mx-auto lg:mx-0"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/images/ru residencies logo (1).png"
                alt="RU Residencies Luxury Living"
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 768px) 192px, 256px"
                priority
              />
              
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 to-transparent rounded-full blur-lg" />
            </motion.div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-serif tracking-luxury text-center lg:text-left">
                Elevating Urban Living
              </h3>
              <p className="text-ink-secondary leading-relaxed text-center lg:text-left">
                Redefining luxury living in Colombo with unparalleled craftsmanship 
                and sophisticated design.
              </p>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
                  <span className="text-sm text-ink-muted">Premium Quality</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-xl font-semibold text-ink-primary text-center lg:text-left">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              {[
                { 
                  icon: FaMapMarkerAlt, 
                  label: "Location",
                  value: "Chapel Lane, Nugegoda",
                  href: null
                },
                { 
                  icon: FaPhone, 
                  label: "Telephone",
                  value: "+94 773 711 444",
                  href: "tel:+94773711444"
                },
                { 
                  icon: FaEnvelope, 
                  label: "Email",
                  value: "sales@ruresidencieslk.com",
                  href: "mailto:sales@ruresidencieslk.com"
                },
                { 
                  icon: FaClock, 
                  label: "Working Hours",
                  value: "9:00 AM - 5:00 PM",
                  href: null
                },
              ].map((contact, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent-gold/10 rounded-full blur-sm group-hover:bg-accent-gold/20 transition-all duration-300" />
                    <contact.icon className="relative text-accent-gold text-lg z-10" />
                  </div>
                  <div>
                    <p className="font-medium text-ink-primary text-sm">{contact.label}</p>
                    {contact.href ? (
                      <a 
                        href={contact.href}
                        className="text-ink-secondary hover:text-accent-gold transition-colors duration-300 text-base"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-ink-secondary text-base">{contact.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-xl font-semibold text-ink-primary text-center lg:text-left">
              Quick Links
            </h3>
            
            <div className="space-y-3">
              {['Premium Properties', 'Investment Portfolio', 'Virtual Tours', 'Client Testimonials', 'About Us', 'Strategic Locations'].map((link, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ x: 5, color: '#a8843a' }}
                  className="block text-ink-secondary hover:text-accent-gold transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent-gold/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{link}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-ink-primary text-center lg:text-left">
                Stay Connected
              </h3>
              
              {/* Social Media */}
              <div className="flex justify-center lg:justify-start gap-4">
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-base-offwhite rounded-lg border border-line hover:border-accent-gold/30 transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-ink-secondary group-hover:text-accent-gold transition-colors duration-300" />
                </motion.a>
              </div>
              
              {/* Newsletter */}
              <div className="space-y-3">
                <p className="text-ink-secondary text-sm">Subscribe for updates</p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none text-ink-primary placeholder-ink-muted transition-all duration-300"
                  />
                  <button className="absolute right-2 top-2 px-4 py-1 bg-gradient-to-r from-accent-gold to-accent-goldDark text-white font-medium rounded-md hover:shadow-md transition-all duration-300">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="my-12 h-px bg-gradient-to-r from-transparent via-line to-transparent"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-center lg:text-left space-y-2">
            <p className="text-ink-muted text-sm">
              © Copyright {new Date().getFullYear()} Ru Residencies. All Rights Reserved.
            </p>
            <p className="text-ink-muted/60 text-xs">
              Designed with excellence by{' '}
              <motion.a
                href="https://caelusk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold font-medium hover:text-accent-goldDark transition-colors duration-300 inline-flex items-center gap-1 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative">
                  caelusk digital
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-accent-gold group-hover:w-full transition-all duration-300"></span>
                </span>
                <svg 
                  className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </p>
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, idx) => (
              <a
                key={idx}
                href="#"
                className="text-ink-muted hover:text-ink-primary transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white border border-line rounded-lg hover:border-accent-gold/30 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <FaChevronUp className="text-ink-secondary group-hover:text-accent-gold transition-colors duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Live status indicator */}
      <div className="flex items-center justify-center gap-2 py-4 border-t border-line text-xs text-ink-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span>Live</span>
        </div>
        <span>•</span>
        <span>Ru Residencies</span>
      </div>
    </footer>
  );
};

export default Footer;