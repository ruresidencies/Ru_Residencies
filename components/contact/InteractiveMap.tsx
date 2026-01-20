'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Maximize2, Compass, Target, ExternalLink, X } from 'lucide-react';

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showLocationCard, setShowLocationCard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const loadMap = () => {
      if (!mapRef.current) return;

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.506981343949!2d79.8914143!3d6.8646997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b1c71e6e7e1%3A0xf2d1c5b8e7e1f1f!2s6C%20Pelawatta%20Rd%2C%20Nugegoda!5e0!3m2!1sen!2slk!4v1700000000000&zoom=17&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:landscape|color:0xf8f9fa&style=feature:poi|visibility:off&style=feature:road|color:0x1e40af&style=feature:transit|visibility:off&style=feature:water|color:0x3b82f6`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = '0';
      iframe.style.borderRadius = '12px';
      iframe.style.filter = `
        contrast(115%) 
        brightness(95%)
        saturate(110%)
        hue-rotate(185deg)
      `;
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.onload = () => {
        setIsLoaded(true);
        setTimeout(() => {
          iframe.style.filter = iframe.style.filter + ' grayscale(0%)';
        }, 500);
      };
      
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    };

    loadMap();

    // Handle mouse movement for parallax effect (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isMobile) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 20;
        const y = ((e.clientY - top) / height - 0.5) * 15;
        setMousePosition({ x, y });
      }
    };

    // Handle touch for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches.length === 1) {
        const touch = e.touches[0];
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((touch.clientX - left) / width - 0.5) * 10;
        const y = ((touch.clientY - top) / height - 0.5) * 8;
        setMousePosition({ x, y });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const goToLocation = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setShowLocationCard(true);
    
    // In a real app, you would update the map iframe URL with the new coordinates
    // For this example, we'll just simulate the action
    console.log(`Navigating to: ${lat}, ${lng}`);
    
    // Scroll to map on mobile
    if (isMobile) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom map marker with navy blue styling
  const MapMarker = ({ onClick }: { onClick?: () => void }) => (
    <motion.div
      initial={{ scale: 0, y: -20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring" as const }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, type: "tween" as const }}
        className="relative"
      >
        {/* Main marker - clickable on mobile */}
        <button
          onClick={onClick}
          className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-navy-700 via-blue-800 to-navy-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white active:scale-95 transition-transform ${isMobile ? 'cursor-pointer touch-manipulation' : ''}`}
          aria-label="Go to location"
        >
          <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 text-navy-700" />
          </div>
        </button>
        
        {/* Outer pulse rings */}
        <motion.div
          className="absolute inset-0 border-4 border-navy-700/30 rounded-full pointer-events-none"
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5, type: "tween" as const }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-blue-600/40 rounded-full pointer-events-none"
          animate={{ scale: [1, 2], opacity: [0.4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.8, type: "tween" as const }}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative w-full">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "tween" as const }}
        className="relative w-full h-[300px] sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
        style={{
          transform: isMobile 
            ? 'none' 
            : `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
          transition: isMobile ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Custom border and glow effects */}
        <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-navy-700/30 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-700/10 via-blue-700/10 to-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Map container with custom overlay */}
        <div className="relative w-full h-full">
          {/* Loading overlay with navy theme */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-50 to-blue-50 z-30">
              <div className="flex flex-col items-center gap-4 md:gap-6">
                <div className="relative">
                  <Compass className="w-12 h-12 md:w-16 md:h-16 text-navy-700 animate-spin" />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-700/20 to-blue-800/20 blur-xl rounded-full" />
                </div>
                <div className="text-center px-4">
                  <p className="text-navy-900 font-semibold text-base md:text-lg mb-2">Loading Interactive Map</p>
                  <p className="text-navy-600 text-xs md:text-sm">Loading premium navigation experience...</p>
                </div>
              </div>
            </div>
          )}

          {/* Map container */}
          <div
            ref={mapRef}
            className={`w-full h-full transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          <MapMarker onClick={() => goToLocation(6.8647, 79.8914)} />

          {/* Interactive controls */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2 md:gap-3 z-20">
            {/* GPS Coordinates Display - Hidden on small mobile */}
            {!isMobile && (
              <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg hidden sm:block">
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  <span>6.8647° N, 79.8914° E</span>
                </div>
              </div>
            )}
            
            {/* Control buttons */}
            <motion.button
              whileHover={!isMobile ? { scale: 1.1, y: -2 } : {}}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFullscreen}
              className="p-2 md:p-3 bg-white/95 backdrop-blur-sm rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 group/btn touch-manipulation"
              aria-label="Toggle fullscreen"
            >
              <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-navy-700 group-hover/btn:text-blue-600" />
            </motion.button>
            
            <motion.a
              whileHover={!isMobile ? { scale: 1.1, y: -2 } : {}}
              whileTap={{ scale: 0.95 }}
              href="https://maps.google.com/?q=6C+Pelawatta+Rd,+Nugegoda"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 md:p-3 bg-gradient-to-r from-navy-700 to-blue-800 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group/btn flex items-center gap-1 md:gap-2 touch-manipulation"
              aria-label="Open in Google Maps"
            >
              <Navigation className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:rotate-12 transition-transform" />
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </motion.a>
          </div>

          {/* Navigation hint - Hidden on mobile */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 2, duration: 3, repeat: Infinity, type: "tween" as const }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20 pointer-events-none z-10"
            >
              <div className="bg-black/90 backdrop-blur-sm text-white text-sm px-5 py-3 rounded-full whitespace-nowrap shadow-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-navy-700 to-blue-800 flex items-center justify-center">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Drag to explore • Scroll to zoom</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-1 md:gap-2 z-10">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-navy-700 to-blue-800 rounded-full animate-pulse" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent-gold rounded-full animate-pulse" />
          <div className="w-1 h-1 md:w-1 md:h-1 bg-blue-600 rounded-full animate-pulse" />
        </div>

        {/* Brand watermark - Smaller on mobile */}
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center gap-1 md:gap-2 text-xs text-white/70 font-mono z-10">
          <div className="w-1 h-1 bg-accent-gold rounded-full" />
          <span className="text-[10px] md:text-xs">RU MAP</span>
          <div className="w-1 h-1 bg-accent-gold rounded-full" />
        </div>
      </motion.div>

      {/* Location info card - Now positioned below on mobile */}
      <AnimatePresence>
        {(showLocationCard || !isMobile) && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: isMobile ? 0.95 : 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "tween" as const }}
            className={`${isMobile ? 'mt-4' : 'absolute bottom-6 left-6'} ${isMobile ? 'w-full' : 'max-w-xs md:max-w-sm'} bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 z-30`}
          >
            <div className={`p-4 md:p-5 ${isMobile ? 'relative' : ''}`}>
              {isMobile && (
                <button
                  onClick={() => setShowLocationCard(false)}
                  className="absolute top-3 right-3 p-1.5 bg-navy-700/10 rounded-full z-10 touch-manipulation"
                  aria-label="Close card"
                >
                  <X className="w-4 h-4 text-navy-700" />
                </button>
              )}
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-2.5 bg-gradient-to-r from-navy-700 to-blue-800 rounded-lg shadow-md flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-bold text-navy-900 text-base md:text-lg truncate">Ru Residencies HQ</h4>
                    <span className="px-2 py-1 bg-green-500/10 text-green-700 text-xs rounded-full font-medium flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Open Now
                      </div>
                    </span>
                  </div>
                  <p className="text-navy-700 text-sm md:text-base mb-3">6C Pelawatta Road, Nugegoda, Sri Lanka</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="text-sm">
                      <p className="text-navy-500 mb-1 text-xs md:text-sm">Hours:</p>
                      <p className="font-medium text-navy-800 text-sm md:text-base">9:00 AM - 6:00 PM</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-navy-500 mb-1 text-xs md:text-sm">Parking:</p>
                      <p className="font-medium text-navy-800 text-sm md:text-base">Dedicated Spaces</p>
                    </div>
                  </div>
                  {/* Additional mobile-only action button */}
                  {isMobile && (
                    <button
                      onClick={() => goToLocation(6.8647, 79.8914)}
                      className="mt-4 w-full py-2.5 bg-gradient-to-r from-navy-700 to-blue-800 text-white rounded-lg font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-transform"
                    >
                      <Navigation className="w-4 h-4" />
                      Navigate Here
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick action buttons for mobile */}
      {isMobile && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => goToLocation(6.8647, 79.8914)}
            className="flex-1 py-3 bg-gradient-to-r from-navy-700 to-blue-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Navigation className="w-5 h-5" />
            Navigate
          </button>
          <a
            href="https://maps.google.com/?q=6C+Pelawatta+Rd,+Nugegoda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 bg-white border border-navy-200 text-navy-700 rounded-xl font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-transform"
          >
            <ExternalLink className="w-5 h-5" />
            Open Maps
          </a>
        </div>
      )}
    </div>
  );
}