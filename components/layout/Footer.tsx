'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaFacebook, FaClock, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logo float animation
    const animateLogo = () => {
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
      }
    };

    const animationId = setInterval(animateLogo, 16);
    return () => clearInterval(animationId);
  }, []);

  return (
    <footer className="relative bg-ink-primary text-base-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Shimmer effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent animate-shimmer" />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Logo & Brand Section */}
          <div className="space-y-8">
            <div 
              ref={logoRef}
              className="relative w-48 h-48 mx-auto lg:mx-0 transition-transform duration-300 hover-3d will-change-transform"
              style={{ transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <Image
                src="/images/ru residencies logo (1).png"
                alt="RU Residencies Luxury Living"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 192px, 256px"
                priority
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-transparent rounded-full blur-xl" />
            </div>
            
            <div ref={textRef} className="space-y-4 animate-slideUp">
              <h3 className="text-2xl font-serif tracking-luxury text-center lg:text-left">
                Elevating Urban Living
              </h3>
              <p className="text-ink-muted leading-relaxed text-center lg:text-left">
                Redefining luxury living in Colombo with unparalleled craftsmanship 
                and sophisticated design.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-serif tracking-luxury text-center lg:text-left">
              Connect With Us
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <FaMapMarkerAlt className="relative text-accent-gold text-xl z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-ink-muted group-hover:text-base-white transition-colors duration-300">
                    Chapel Lane, Nugegoda
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <FaPhone className="relative text-accent-gold text-xl z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="font-semibold">Telephone</p>
                  <a 
                    href="tel:+94773711444"
                    className="text-ink-muted hover:text-accent-gold transition-colors duration-300 hover:underline"
                  >
                    +94 773 711 444
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <FaEnvelope className="relative text-accent-gold text-xl z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <a 
                    href="mailto:sales@ruresidencieslk.com"
                    className="text-ink-muted hover:text-accent-gold transition-colors duration-300 hover:underline"
                  >
                    sales@ruresidencieslk.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <FaClock className="relative text-accent-gold text-xl z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="font-semibold">Working Hours</p>
                  <p className="text-ink-muted group-hover:text-base-white transition-colors duration-300">
                    9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-serif tracking-luxury mb-6">
                Follow Our Journey
              </h3>
              
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-base-white/5 hover:bg-base-white/10 px-6 py-3 rounded-full transition-all duration-300 group glass-effect"
              >
                <FaFacebook className="text-accent-gold text-2xl group-hover:scale-125 transition-transform duration-300" />
                <span className="font-medium group-hover:text-accent-gold transition-colors duration-300">
                  Join Our Community
                </span>
              </a>
            </div>

            <div className="pt-8 border-t border-line/20">
              <p className="text-ink-muted text-sm text-center lg:text-left">
                © Copyright {new Date().getFullYear()} . All Rights Reserved
              </p>
              <p className="text-ink-muted/60 text-xs mt-2 text-center lg:text-left">
                Designed with excellence by{' '}
                <span className="text-accent-gold font-medium">caelusk digital</span>
              </p>
              
              {/* Micro-interaction element */}
              <div className="mt-6 flex justify-center lg:justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
                  <span className="text-xs text-ink-muted">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-white to-transparent opacity-50 animate-pulse" />
      </div>
    </footer>
  );
};

export default Footer;