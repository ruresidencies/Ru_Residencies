'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = () => {
      if (!mapRef.current) return;

      // Custom styled Google Maps embed
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.506981343949!2d79.8914143!3d6.8646997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b1c71e6e7e1%3A0xf2d1c5b8e7e1f1f!2s6C%20Pelawatta%20Rd%2C%20Nugegoda!5e0!3m2!1sen!2slk!4v1700000000000`;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = '0';
      iframe.style.filter = 'grayscale(30%) contrast(110%) brightness(90%)';
      iframe.allowFullScreen = true;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    };

    loadMap();
  }, []);

  return (
    <motion.div
      ref={mapRef}
      className="w-full h-64 md:h-full rounded-xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    />
  );
}