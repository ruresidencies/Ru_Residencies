'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

// Using valid Unsplash URLs without query parameters
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Elegant Design",
    description: "Modern architecture with golden accents",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
  },
  {
    id: 2,
    title: "Luxury Interior",
    description: "Sophisticated living spaces",
    category: "Interior",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
  },
  {
    id: 3,
    title: "Minimalist Space",
    description: "Clean and contemporary design",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb"
  },
  {
    id: 4,
    title: "Modern Luxury",
    description: "Contemporary elegance",
    category: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];
  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // 3D rotation effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && is3DMode) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 2;
        const y = ((e.clientY - top) / height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    if (is3DMode) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (is3DMode) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [is3DMode]);

  // Handle gallery button click
  const handleViewAllGallery = () => {
    router.push('/gallery'); // Change this to your actual gallery page route
  };

  // Only render floating particles on client side
  const FloatingParticles = () => {
    if (!isClient) return null;

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-gold/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section ref={containerRef} className="relative min-h-screen py-20 bg-gradient-to-b from-base-offwhite to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-gold/5 to-accent-goldDark/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-accent-gold/5 to-accent-goldDark/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm tracking-luxury text-accent-gold uppercase">
              Our Portfolio
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-serif text-ink-primary">
              Experience <span className="text-gradient" style={{backgroundImage: 'var(--gradient-gold)'}}>Excellence</span>
            </h2>
            <p className="mt-6 text-lg text-ink-secondary max-w-2xl mx-auto">
              Discover our curated collection of premium designs and luxury spaces
            </p>
          </motion.div>
        </div>

        {/* 3D Mode Toggle */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className="group relative px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-goldDark opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="flex items-center gap-2 relative z-10">
              <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${is3DMode ? 'bg-accent-gold' : 'bg-ink-muted'}`} />
              <span className="text-sm tracking-wide">
                {is3DMode ? '3D Mode: ON' : '3D Mode: OFF'}
              </span>
            </div>
            <div className="absolute inset-0 border border-accent-gold/20 rounded-full pointer-events-none" />
          </button>
        </div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 relative overflow-hidden group ${
                activeCategory === category 
                  ? 'text-base-white' 
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-goldDark"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 text-sm font-medium tracking-wide">
                {category}
              </span>
              <div className="absolute inset-0 border border-accent-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            transform: is3DMode 
              ? `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`
              : 'none',
            transition: is3DMode ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
          }}
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateX: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }
                }}
                exit={{ opacity: 0, scale: 0.8, rotateX: -45 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: is3DMode ? 10 : 0,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`relative group cursor-pointer ${is3DMode ? 'will-change-transform' : ''}`}
              >
                {/* Card */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden glass-effect hover-3d">
                  {/* Image Container */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shimmer Effect */}
                    {hoveredItem === item.id && (
                      <div className="absolute inset-0 shimmer-effect animate-shimmer" />
                    )}
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-base-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="mb-2">
                      <span className="text-xs tracking-luxury text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif mb-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-accent-gold to-accent-goldDark opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                    <div className="absolute inset-2 border border-base-white/30 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Gallery Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button 
            onClick={handleViewAllGallery}
            className="group relative px-8 py-4 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-goldDark"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 text-base-white text-sm font-medium tracking-wider">
              View All Gallery
            </span>
            <div className="absolute inset-0 border border-accent-gold/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Arrow icon */}
            <svg 
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-white opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles />
    </section>
  );
}