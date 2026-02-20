'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

export default function ResidenciesPreview() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // New floor plan data structure
  const floorPlans = [
    {
      type: 'B',
      floors: '1st B – 2nd Floor',
      size: '1,460 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Room & Toilet',
      category: 'Premium',
      image: '/images/B.png',
    },
    {
      type: 'B',
      floors: '5th B – 6th Floor',
      size: '1,460 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Room & Toilet',
      category: 'Premium',
      image: '/images/B.png',
    },
    {
      type: 'C',
      floors: '5th C – 6th Floor',
      size: '1,406 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Room & Toilet',
      category: 'Premium',
      image: '/images/C.png',
    },
    {
      type: 'D',
      floors: '1st D – 2nd Floor',
      size: '1,377 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Toilet',
      category: 'Standard',
      image: '/images/D.png',
    },
    {
      type: 'D',
      floors: '2nd D – 3rd Floor',
      size: '1,377 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Toilet',
      category: 'Standard',
      image: '/images/D.png',
    },
    {
      type: 'D',
      floors: '3rd D – 4th Floor',
      size: '1,377 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Toilet',
      category: 'Standard',
      image: '/images/D.png',
    },
    {
      type: 'D',
      floors: '5th D – 6th Floor',
      size: '1,377 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Toilet',
      category: 'Standard',
      image: '/images/D.png',
    },
    {
      type: 'D',
      floors: '6th D – 7th Floor',
      size: '1,377 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Toilet',
      category: 'Standard',
      image: '/images/D.png',
    },
    {
      type: 'E',
      floors: '1st E – 2nd Floor',
      size: '1,439 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Toilet',
      category: 'Premium',
      image: '/images/E.png',
    },
    {
      type: 'G',
      floors: '6th G – 7th Floor',
      size: '1,219 sq. ft.',
      layout: '3 Bedrooms, 2 Bathrooms',
      category: 'Compact',
      image: '/images/G.png',
    },
    {
      type: 'H',
      floors: '3rd H – 4th Floor',
      size: '1,252 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Room & Toilet',
      category: 'Premium Compact',
      image: '/images/H.png',
    },
    {
      type: 'H',
      floors: '5th H – 6th Floor',
      size: '1,252 sq. ft.',
      layout: '3 Bed, 2 Bath, Maid\'s Room & Toilet',
      category: 'Premium Compact',
      image: '/images/H.png',
    }
  ];

  // Category definitions
  const categories = [
    {
      id: 'all',
      name: 'All Residences',
      description: 'Complete collection of thoughtfully designed homes',
      count: floorPlans.length
    },
    {
      id: 'premium',
      name: 'Premium Series',
      description: 'Spacious living with maid\'s quarters',
      features: ['Maid\'s Room with Toilet', '1,406 - 1,460 sq. ft.', 'Premium Finishes'],
      count: floorPlans.filter(p => p.category === 'Premium').length
    },
    {
      id: 'standard',
      name: 'Standard Series',
      description: 'Efficient family homes with maid\'s toilet',
      features: ['Maid\'s Toilet', '1,377 sq. ft.', 'Optimized Layout'],
      count: floorPlans.filter(p => p.category === 'Standard').length
    },
    {
      id: 'compact',
      name: 'Compact Series',
      description: 'Smart, space-efficient designs',
      features: ['1,219 - 1,252 sq. ft.', '3 Bedrooms', 'Modern Configuration'],
      count: floorPlans.filter(p => ['Compact', 'Premium Compact'].includes(p.category)).length
    }
  ];

  // Filter floor plans based on active category
  const filteredPlans = activeCategory === 'all' 
    ? floorPlans 
    : floorPlans.filter(plan => {
        if (activeCategory === 'premium') return plan.category === 'Premium';
        if (activeCategory === 'standard') return plan.category === 'Standard';
        if (activeCategory === 'compact') return ['Compact', 'Premium Compact'].includes(plan.category);
        return true;
      });

  // Update active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // Properly typed variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0, rotateY: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.4
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-50/20 to-purple-50/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-4 w-96 h-96 bg-gradient-to-br from-gray-50/10 to-gray-100/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-8 md:mb-12"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block text-xs sm:text-sm tracking-[0.3em] text-gray-500 mb-3 md:mb-4"
          >
            RESIDENCES
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="
              font-serif text-3xl sm:text-4xl lg:text-5xl 
              font-light text-gray-900 
              mb-4 md:mb-6
              px-4 sm:px-0
            "
          >
            Choose Your Perfect Home
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-4 sm:px-0"
          >
            From compact efficiency to premium spaciousness, find the residence 
            that matches your lifestyle.
          </motion.p>
        </motion.div>

        {/* Category Explanation Section - Fixed for mobile */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16 px-2 sm:px-0"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(category.id)}
              className={`
                relative p-4 md:p-6 rounded-xl md:rounded-2xl text-left transition-all duration-300
                border overflow-hidden group w-full
                ${activeCategory === category.id
                  ? 'bg-white border-gray-300 shadow-lg'
                  : 'bg-white/50 border-gray-200 hover:bg-white hover:shadow-md'
                }
              `}
            >
              {/* Animated background */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-gray-900/5 to-black/5 
                translate-x-[-100%] group-hover:translate-x-0
                transition-transform duration-500
                ${activeCategory === category.id ? 'translate-x-0' : ''}
              `} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-base md:text-lg font-medium text-gray-900">
                    {category.name}
                  </h3>
                  <span className="
                    text-xs md:text-sm px-2 py-0.5 md:px-2 md:py-1 rounded-full
                    bg-gray-100 text-gray-700
                  ">
                    {category.count}
                  </span>
                </div>
                
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2">
                  {category.description}
                </p>

                {category.features && (
                  <div className="space-y-1 md:space-y-2">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-gray-500">
                        <div className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active indicator */}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-900 to-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Floor Plan Details */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            {/* Floor Plan Selector - Now showing filtered plans */}
            <motion.div 
              variants={itemVariants} 
              className="space-y-3 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2 md:pr-4"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#888 #f1f1f1'
              }}
            >
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {filteredPlans.map((plan, index) => (
                  <motion.button
                    key={`${plan.type}-${plan.floors}`}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    variants={cardVariants}
                    className={`
                      p-3 md:p-5 rounded-lg md:rounded-xl border transition-all duration-300
                      relative overflow-hidden group text-left
                      ${activeIndex === index 
                        ? 'bg-white border-gray-300 shadow-md' 
                        : 'bg-gray-50/50 border-gray-200 hover:bg-white hover:shadow-sm'
                      }
                    `}
                  >
                    {/* Animated background */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-gray-900/5 to-black/5 
                      translate-x-[-100%] group-hover:translate-x-0
                      transition-transform duration-500
                      ${activeIndex === index ? 'translate-x-0' : ''}
                    `} />
                    
                    <div className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 md:mb-2 gap-2">
                        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                          <span className="text-base md:text-lg font-light text-gray-900">
                            Type {plan.type}
                          </span>
                          <span className="text-[10px] md:text-xs px-2 py-0.5 md:px-2 md:py-1 bg-gray-100 rounded-full text-gray-600">
                            {plan.floors}
                          </span>
                        </div>
                        <span className={`
                          text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1 rounded-full w-fit
                          transition-all duration-300
                          ${activeIndex === index 
                            ? 'text-white bg-gradient-to-r from-gray-900 to-black' 
                            : 'text-gray-700 bg-gray-100'
                          }
                        `}>
                          {plan.size}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">
                        {plan.layout}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Active Plan Details */}
            {filteredPlans.length > 0 && (
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
                    <div>
                      <motion.h3 
                        key={activeIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl md:text-2xl font-light text-gray-900 mb-1"
                      >
                        Type {filteredPlans[activeIndex].type} Residence
                      </motion.h3>
                      <motion.p 
                        key={`floor-${activeIndex}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-xs md:text-sm text-gray-500"
                      >
                        {filteredPlans[activeIndex].floors}
                      </motion.p>
                    </div>
                    <motion.span 
                      key={`size-${activeIndex}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="
                        bg-gradient-to-r from-gray-900 to-black
                        text-white
                        px-3 py-1.5 md:px-4 md:py-2
                        rounded-full
                        text-xs md:text-sm font-medium
                        shadow-md
                        w-fit
                      "
                    >
                      {filteredPlans[activeIndex].size}
                    </motion.span>
                  </div>

                  <motion.div 
                    key={`layout-${activeIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl mb-4 md:mb-6"
                  >
                    <p className="text-sm md:text-base text-gray-700">
                      {filteredPlans[activeIndex].layout}
                    </p>
                  </motion.div>

                  <Link href="/residences" className="block">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        group inline-flex items-center gap-2
                        text-gray-900 font-medium
                        px-4 py-2.5 md:px-6 md:py-3
                        bg-gray-50
                        rounded-full
                        border border-gray-200
                        transition-all duration-300
                        hover:bg-gray-100 hover:border-gray-300
                        hover:shadow-md
                        cursor-pointer
                        w-full justify-center
                        relative overflow-hidden
                        text-sm md:text-base
                      "
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                      <span className="relative z-10">View All Floor Plans</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative z-10"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Floor Plan Image */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative order-1 lg:order-2 mb-4 lg:mb-0"
          >
            {filteredPlans.length > 0 && (
              <motion.div
                variants={imageVariants}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="
                  relative 
                  aspect-[4/3] lg:aspect-square
                  rounded-2xl md:rounded-3xl 
                  overflow-hidden
                  shadow-xl md:shadow-2xl
                  group
                  bg-gradient-to-br from-gray-50 to-white
                  border border-gray-200
                "
              >
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={filteredPlans[activeIndex].image}
                    alt={`Type ${filteredPlans[activeIndex].type} floor plan - ${filteredPlans[activeIndex].size}`}
                    fill
                    className="object-contain p-4 md:p-8 transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={activeIndex === 0}
                  />
                </motion.div>
                
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Interactive Dots - Hidden on mobile */}
                <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 md:gap-2">
                  {filteredPlans.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`
                        w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300
                        ${activeIndex === index 
                          ? 'bg-gray-900 w-3 md:w-4' 
                          : 'bg-gray-400 hover:bg-gray-600'
                        }
                      `}
                      aria-label={`View floor plan ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Decorative floating elements - Hidden on mobile */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="
                absolute -top-4 -right-4 
                w-16 h-16 md:w-24 md:h-24 
                bg-gradient-to-br from-gray-900/5 to-black/5 
                rounded-xl md:rounded-2xl 
                -z-10
                hidden lg:block
                border border-gray-200/20
              "
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="
                absolute -bottom-6 -left-6 
                w-24 h-24 md:w-36 md:h-36 
                bg-gradient-to-br from-gray-900/3 to-black/3 
                rounded-2xl md:rounded-3xl 
                -z-10
                hidden lg:block
                border border-gray-200/20
              "
            />
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="
            mt-12 md:mt-20
            grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8
            text-center
          "
        >
          {[
            { value: '12', label: 'Floor Plan Options' },
            { value: '5', label: 'Unit Types' },
            { value: '1,219 - 1,460', label: 'Square Feet Range' },
            { value: '7', label: 'Floor Levels' }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="space-y-1.5 md:space-y-3 p-4 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-b from-white to-gray-50/50 border border-gray-100 shadow-sm"
            >
              <motion.div
                className="
                  font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl 
                  font-light text-gray-900
                  bg-gradient-to-r from-gray-900 to-black
                  bg-clip-text text-transparent
                "
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {stat.value}
              </motion.div>
              <p className="text-xs md:text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, duration: 0.5 }
            }
          }}
          className="mt-10 md:mt-16 text-center px-4 sm:px-0"
        >
          <Link href="/residences" className="inline-block w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                group relative
                inline-flex items-center justify-center
                rounded-full
                px-6 py-3 md:px-12 md:py-4
                text-sm md:text-base font-medium
                text-gray-900
                overflow-hidden
                transition-all duration-500
                border-2 border-gray-900
                cursor-pointer
                w-full sm:w-auto
              "
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[2px] bg-white rounded-full" />
              
              <motion.span 
                className="relative z-10 flex items-center gap-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Schedule a Viewing
                <span className="
                  inline-block transform transition-transform duration-500
                  group-hover:translate-x-2 group-hover:scale-110
                ">
                  →
                </span>
              </motion.span>
              
              {/* Particle effects - Hidden on mobile */}
              <motion.div
                className="absolute -top-1 -left-1 w-2 h-2 md:w-3 md:h-3 bg-gray-900 rounded-full hidden sm:block"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}