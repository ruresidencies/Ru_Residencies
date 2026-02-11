'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function ResidenciesPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const floorPlans = [
    {
      type: 'Type A',
      size: '1,460 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Room',
      description: 'Spacious corner unit with optimal natural light and panoramic views.',
      image: '/images/A.png',
    },
    {
      type: 'Type B',
      size: '1,406 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Room',
      description: 'Efficient layout maximizing space and functionality.',
      image: '/images/B.png',
    },
    {
      type: 'Type C',
      size: '1,377 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Toilet',
      description: 'Well-proportioned family residence with ample storage.',
      image: '/images/C.png',
    },
    {
      type: 'Type D',
      size: '1,439 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Toilet',
      description: 'Corner unit featuring enhanced privacy and cross-ventilation.',
      image: '/images/D.png',
    }
  ];

  const interiorFeatures = [
    'Premium Kitchen Finishes',
    'Built-in Wardrobes',
    'Hot Water Supply',
    'Lanka Tiles Flooring',
    'A/C in All Bedrooms',
    'Premium Bathroom Fittings'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0, rotateY: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: 0.4
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    })
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section 
      ref={ref}
      className="py-24 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden relative"
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
            ease: "linear" as const
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
            ease: "linear" as const
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block text-sm tracking-[0.3em] text-gray-500 mb-4"
          >
            FLOOR PLANS
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="
              font-serif text-4xl lg:text-5xl 
              font-light text-gray-900 
              mb-6
            "
          >
            Thoughtfully Designed Residences
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Explore our diverse range of meticulously crafted apartments, 
            each designed to maximize space, light, and functionality.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Floor Plan Details */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Floor Plan Selector */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {floorPlans.map((plan, index) => (
                <motion.button
                  key={plan.type}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={cardVariants}
                  className={`
                    p-6 rounded-2xl border transition-all duration-300
                    relative overflow-hidden group
                    ${activeIndex === index 
                      ? 'bg-white border-gray-300 shadow-lg' 
                      : 'bg-gray-50/50 border-gray-200 hover:bg-white hover:shadow-md'
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
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-light text-gray-900">
                        {plan.type}
                      </h3>
                      <span className={`
                        text-sm font-medium px-3 py-1 rounded-full
                        transition-all duration-300
                        ${activeIndex === index 
                          ? 'text-white bg-gradient-to-r from-gray-900 to-black' 
                          : 'text-gray-700 bg-gray-100'
                        }
                      `}>
                        {plan.size}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      {plan.layout}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Active Plan Details */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <motion.h3 
                      key={activeIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl font-light text-gray-900 mb-2"
                    >
                      {floorPlans[activeIndex].type} Residence
                    </motion.h3>
                    <motion.p 
                      key={`layout-${activeIndex}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-gray-500 text-sm"
                    >
                      {floorPlans[activeIndex].layout}
                    </motion.p>
                  </div>
                  <motion.span 
                    key={`size-${activeIndex}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 200, damping: 15 }}
                    className="
                      bg-gradient-to-r from-gray-900 to-black
                      text-white
                      px-4 py-2
                      rounded-full
                      text-sm font-medium
                      shadow-md
                    "
                  >
                    {floorPlans[activeIndex].size}
                  </motion.span>
                </div>

                <motion.p 
                  key={`desc-${activeIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-gray-600 mb-8"
                >
                  {floorPlans[activeIndex].description}
                </motion.p>

                {/* Quick Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {interiorFeatures.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="
                        w-2 h-2 
                        rounded-full 
                        bg-gradient-to-r from-gray-900 to-black
                        flex-shrink-0
                      " />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Link href="/residences" className="block">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      group inline-flex items-center gap-2
                      text-gray-900 font-medium
                      px-6 py-3
                      bg-gray-50
                      rounded-full
                      border border-gray-200
                      transition-all duration-300
                      hover:bg-gray-100 hover:border-gray-300
                      hover:shadow-md
                      cursor-pointer
                      w-full justify-center
                      relative overflow-hidden
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
          </motion.div>

          {/* Right Column - Floor Plan Image */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative"
          >
            <motion.div
              variants={imageVariants}
              animate={floatingAnimation}
              className="
                relative 
                aspect-[4/3] lg:aspect-square
                rounded-3xl 
                overflow-hidden
                shadow-2xl
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
              >
                <Image
                  src={floorPlans[activeIndex].image}
                  alt={`${floorPlans[activeIndex].type} floor plan - ${floorPlans[activeIndex].size}`}
                  fill
                  className="object-contain p-8 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={activeIndex === 0}
                />
              </motion.div>
              
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Interactive Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {floorPlans.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      w-3 h-3 rounded-full transition-all duration-300
                      ${activeIndex === index 
                        ? 'bg-gray-900' 
                        : 'bg-gray-400 hover:bg-gray-600'
                      }
                    `}
                    aria-label={`View ${floorPlans[index].type} floor plan`}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Decorative floating elements */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut" as const
              }}
              className="
                absolute -top-4 -right-4 
                w-24 h-24 
                bg-gradient-to-br from-gray-900/5 to-black/5 
                rounded-2xl 
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
                ease: "easeInOut" as const,
                delay: 0.5
              }}
              className="
                absolute -bottom-6 -left-6 
                w-36 h-36 
                bg-gradient-to-br from-gray-900/3 to-black/3 
                rounded-3xl 
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
            mt-20
            grid md:grid-cols-3 gap-8
            text-center
          "
        >
          {[
            { value: '4', label: 'Floor Plan Types' },
            { value: '1,377 - 1,460', label: 'Square Feet Range' },
            { value: '3', label: 'Bedrooms Standard' }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              custom={index}
              variants={statsVariants}
              whileHover={{ scale: 1.05 }}
              className="space-y-3 p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50/50 border border-gray-100 shadow-sm"
            >
              <motion.div
                className="
                  font-serif text-4xl lg:text-5xl 
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
              <p className="text-gray-600">{stat.label}</p>
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
          className="mt-16 text-center"
        >
          <Link href="/residences" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                group relative
                inline-flex items-center
                rounded-full
                px-12 py-4
                text-base font-medium
                text-gray-900
                overflow-hidden
                transition-all duration-500
                border-2 border-gray-900
                cursor-pointer
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
                Explore All Residences
                <span className="
                  inline-block transform transition-transform duration-500
                  group-hover:translate-x-2 group-hover:scale-110
                ">
                  →
                </span>
              </motion.span>
              
              {/* Particle effects */}
              <motion.div
                className="absolute -top-1 -left-1 w-3 h-3 bg-gray-900 rounded-full"
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