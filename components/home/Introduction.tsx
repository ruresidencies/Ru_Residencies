'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import { MapPin, Award, Building, Shield, Dumbbell, Car, Trees, Zap, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

interface IntroductionProps {
  className?: string;
}

// Color Scheme
const colors = {
  primary: '#1a365d', // Navy blue
  secondary: '#000000', // Black
  accent: '#ffffff', // White
  background: '#ffffff', // White
  text: '#1a202c', // Dark gray
  muted: '#4a5568', // Gray
  line: '#e2e8f0', // Light gray
};

// 3D Floating Building Component with scroll interaction
function FloatingBuilding({ isMobile, scrollProgress }: { isMobile: boolean; scrollProgress: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const windowRef = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation and floating
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + scrollProgress * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * (isMobile ? 0.02 : 0.05) + scrollProgress * 0.2;
      
      // Scale based on scroll
      const scale = 0.8 + scrollProgress * 0.2;
      meshRef.current.scale.setScalar(isMobile ? scale * 0.8 : scale);
      
      // Window glow effect based on scroll
      windowRef.current.forEach((window, i) => {
        if (window) {
          const glowIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05 + scrollProgress * 0.2;
          (window.material as THREE.MeshStandardMaterial).emissiveIntensity = Math.min(glowIntensity, 0.5);
        }
      });
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[isMobile ? 1.5 : 2, isMobile ? 4 : 6, isMobile ? 0.8 : 1]} />
        <meshStandardMaterial
          color={colors.primary}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      
      {[...Array(isMobile ? 4 : 6)].map((_, i) => (
        <mesh 
          key={i} 
          ref={el => { if (el) windowRef.current[i] = el; }}
          position={[(isMobile ? 0.76 : 1.01), (i - (isMobile ? 1.5 : 2.5)) * 1, 0]} 
          castShadow
        >
          <planeGeometry args={[isMobile ? 0.6 : 0.8, isMobile ? 0.4 : 0.6]} />
          <meshStandardMaterial
            color={colors.accent}
            emissive={colors.primary}
            emissiveIntensity={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// Animated Number Counter with scroll trigger
function AnimatedCounter({ value, duration = 1.5, scrollProgress }: { value: number; duration?: number; scrollProgress: number }) {
  const [count, setCount] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if ((isInView && !shouldAnimate) || scrollProgress > 0.3) {
      setShouldAnimate(true);
    }
  }, [isInView, shouldAnimate, scrollProgress]);

  useEffect(() => {
    if (!shouldAnimate) return;

    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    let animationFrameId: number;

    const animate = () => {
      start += 1;
      setCount(start);
      if (start < end) {
        animationFrameId = requestAnimationFrame(() => {
          setTimeout(animate, incrementTime);
        });
      }
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [shouldAnimate, value, duration]);

  return (
    <span ref={ref} className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary">
      {shouldAnimate ? count : 0}
    </span>
  );
}

// Glassy Stat Card with scroll-based animations
function GlassyStatCard({ value, label, index, scrollProgress }: { value: number; label: string; index: number; scrollProgress: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });
  
  const rotation = useTransform(() => scrollProgress * 5 - index * 1.5);
  const scale = useTransform(() => 0.95 + Math.min(scrollProgress * 0.2, 0.2));
  const y = useTransform(() => -Math.min(scrollProgress * 20, 20) + index * 2);

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotate: rotation,
        scale,
        y
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        y: 0 
      } : {}}
      transition={{ 
        delay: 0.2 + index * 0.1, 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -10,
        rotate: 1,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.95 }}
      className="relative text-center p-4 sm:p-6 rounded-xl overflow-hidden group"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
            `linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(240,249,255,0.9) 100%)`,
            `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-sm border border-white/50 rounded-xl" />
      
      {/* Floating particles effect */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              y: [null, '-100%'],
              x: [null, Math.random() * 20 - 10 + '%'],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
      
      {/* Inner glow */}
      <motion.div 
        className="absolute inset-0 rounded-xl shadow-[inset_0_0_30px_rgba(59,130,246,0.1)]"
        animate={{
          boxShadow: [
            'inset 0 0 30px rgba(59,130,246,0.1)',
            'inset 0 0 50px rgba(59,130,246,0.2)',
            'inset 0 0 30px rgba(59,130,246,0.1)',
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="relative z-10">
        <motion.div 
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"
          initial={{ scale: 0.5 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <AnimatedCounter value={value} scrollProgress={scrollProgress} />
          {label.includes('Hour') && (
            <motion.span 
              className="text-xl sm:text-2xl md:text-3xl font-normal ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              /
            </motion.span>
          )}
        </motion.div>
        <motion.div 
          className="text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap"
          style={{ color: colors.muted }}
          initial={{ y: 10, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {label}
        </motion.div>
      </div>

      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 rounded-xl border-2 border-transparent"
        animate={{
          borderColor: ['rgba(59,130,246,0)', 'rgba(59,130,246,0.3)', 'rgba(59,130,246,0)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
}

// Minimal Card with scroll effects
function MinimalCard({ children, className = '', scrollProgress }: { children: React.ReactNode; className?: string; scrollProgress: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  const y = useTransform(() => Math.sin(scrollProgress * Math.PI) * 10);
  const rotateX = useTransform(() => scrollProgress * 2);

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        rotateX
      }}
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateY: 0,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.5
        }
      } : {}}
      whileHover={{ 
        y: -5,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.995 }}
      className={`bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden ${className}`}
    >
      {/* Animated shadow */}
      <motion.div 
        className="absolute inset-0 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2 }}
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default function Introduction({ className = '' }: IntroductionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll animation hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress for various effects
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

  useEffect(() => {
    setIsVisible(true);
    
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const features = [
    { icon: <Building className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, text: '48 Luxury Residential Units' },
    { icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, text: 'Prime Nugegoda Location' },
    { icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, text: '24-Hour Security & CCTV' },
    { icon: <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, text: 'Modern Gymnasium' },
    { icon: <Car className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, text: 'Car Charging & Washing Area' },
    { icon: <Trees className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, text: 'Ample Garden Space' },
    { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, text: 'Central Gas System' },
    { icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />, text: '6 Floors of Luxury Living' },
  ];

  return (
    <section 
      ref={sectionRef}
      className={`relative py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden ${className}`}
      style={{
        backgroundColor: colors.background
      }}
    >
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 overflow-hidden opacity-5 md:opacity-10"
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.primary} 1px, transparent 1px),
                            linear-gradient(to bottom, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: isMobile ? '20px 20px' : '40px 40px',
        }}
      />

      {/* Parallax Floating Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
            width: Math.random() * 100 + 50 + 'px',
            height: Math.random() * 100 + 50 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, Math.sin(i) * 50],
            x: [0, Math.cos(i) * 30],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating 3D Canvas with scroll interaction */}
      {typeof window !== 'undefined' && (
        <div className={`absolute ${isMobile ? 'right-0 top-0 w-full h-48 opacity-30' : 'right-0 top-1/2 -translate-y-1/2 w-1/3 h-full'} pointer-events-none`}>
          <Canvas 
            shadows 
            camera={{ 
              position: isMobile ? [3, 2, 3] : [5, 3, 5], 
              fov: isMobile ? 40 : 50 
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={isMobile ? [5, 5, 5] : [10, 10, 10]} intensity={1} color={colors.primary} />
            <directionalLight
              position={isMobile ? [-3, 3, 3] : [-5, 5, 5]}
              intensity={0.5}
              castShadow
              shadow-mapSize-width={isMobile ? 512 : 1024}
              shadow-mapSize-height={isMobile ? 512 : 1024}
            />
            <FloatingBuilding isMobile={isMobile} scrollProgress={scrollYProgress.get()} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={isMobile ? 0.3 : 0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              enableDamping={false}
            />
            <fog attach="fog" args={[colors.background, isMobile ? 5 : 10, isMobile ? 15 : 20]} />
          </Canvas>
        </div>
      )}

      <Container className="relative z-10 px-4 sm:px-6">
        {/* Animated Header with scroll effects */}
        <motion.div
          style={{
            opacity,
            scale,
            y,
            rotateX
          }}
          className="relative mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>
          
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'tween' as const }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif font-light tracking-tight"
              style={{ color: colors.text }}
            >
              <motion.span
                initial={{ backgroundSize: '0% 100%' }}
                animate={{ backgroundSize: '100% 100%' }}
                transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
                className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
              >
                Introducing
              </motion.span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
              className="mt-4 sm:mt-6"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif" style={{ color: colors.primary }}>
                Our Third Masterpiece
              </h3>
              <motion.div 
                className="h-1 w-20 mx-auto mt-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Left Column - Content with staggered animation */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
              className="relative"
            >
              <MinimalCard className="p-4 sm:p-6 md:p-8" scrollProgress={scrollYProgress.get()}>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg leading-relaxed"
                  style={{ color: colors.muted }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  We proudly present our{' '}
                  <motion.span 
                    className="font-medium" 
                    style={{ color: colors.text }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    third prestigious development
                  </motion.span>{' '}
                  - a collection of{' '}
                  <motion.span 
                    className="font-medium" 
                    style={{ color: colors.primary }}
                    animate={{ 
                      textShadow: [
                        '0 0 0px rgba(59,130,246,0)',
                        '0 0 10px rgba(59,130,246,0.3)',
                        '0 0 0px rgba(59,130,246,0)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    48 luxury residences
                  </motion.span>{' '}
                  at{' '}
                  <motion.span 
                    className="font-medium bg-gradient-to-r from-transparent via-blue-50 to-transparent bg-[length:0%_100%] bg-no-repeat bg-left-bottom" 
                    style={{ color: colors.primary }}
                    initial={{ backgroundSize: '0% 100%' }}
                    whileInView={{ backgroundSize: '100% 100%' }}
                    transition={{ duration: 1.5 }}
                  >
                    6C, Pelawatte Road, Nugegoda
                  </motion.span>, 
                  situated in Colombo's most coveted neighborhood.
                </motion.p>
              </MinimalCard>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: 0.2
                  }
                }
              }}
            >
              <MinimalCard className="p-4 sm:p-6 md:p-8" scrollProgress={scrollYProgress.get()}>
                <motion.p 
                  className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6" 
                  style={{ color: colors.muted }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Nestled in the heart of Nugegoda, this exceptional location offers unparalleled access to 
                  premier international schools, fine dining, banking institutions, medical facilities, 
                  shopping arcades, and recreational amenities — all within moments of your residence.
                </motion.p>

                <motion.div 
                  className="pt-4 sm:pt-6 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.h3 
                    className="text-lg sm:text-xl md:text-xl font-serif mb-3 sm:mb-4" 
                    style={{ color: colors.text }}
                    whileHover={{ scale: 1.02 }}
                  >
                    Architectural Excellence
                  </motion.h3>
                  <motion.p 
                    className="text-sm sm:text-base leading-relaxed" 
                    style={{ color: colors.muted }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    The development features 2 levels of dedicated parking and 6 floors of meticulously 
                    designed living spaces, complemented by dual passenger elevators and thoughtful 
                    amenities that redefine urban luxury.
                  </motion.p>
                </motion.div>
              </MinimalCard>
            </motion.div>

            {/* Stats with scroll-triggered animations */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: 0.4
                  }
                }
              }}
              className="grid grid-cols-3 gap-3 sm:gap-4"
            >
              {[
                { value: 48, label: 'Luxury Units' },
                { value: 6, label: 'Exclusive Floors' },
                { value: 24, label: 'Hour Security' },
              ].map((stat, index) => (
                <GlassyStatCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  index={index}
                  scrollProgress={scrollYProgress.get()}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Features Grid with wave animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
            className="relative"
          >
            {/* PREMIUM AMENITIES Badge with floating animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`absolute ${isMobile ? '-top-2' : '-top-3'} left-1/2 -translate-x-1/2 z-20`}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <div 
                className="px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}dd)`,
                  color: colors.accent,
                }}
              >
                PREMIUM AMENITIES
              </div>
            </motion.div>

            <MinimalCard className="p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 mt-4 sm:mt-6" scrollProgress={scrollYProgress.get()}>
              <div className="relative">
                {/* Features Grid with wave animation */}
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'} mt-4 sm:mt-6`}>
                  {features.map((feature, index) => {
                    const row = Math.floor(index / (isMobile ? 1 : 2));
                    const col = index % (isMobile ? 1 : 2);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ 
                          opacity: 0, 
                          y: 50,
                          rotateX: 90 
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          rotateX: 0 
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          delay: 0.1 * index + 0.2,
                          type: 'spring',
                          stiffness: 100,
                          damping: 15
                        }}
                        whileHover={{ 
                          y: isMobile ? 0 : -8,
                          scale: isMobile ? 1 : 1.03,
                          borderColor: colors.primary,
                          transition: { type: 'spring', stiffness: 400, damping: 25 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => !isMobile && setHoveredFeature(index)}
                        onHoverEnd={() => !isMobile && setHoveredFeature(null)}
                        onTouchStart={() => isMobile && setHoveredFeature(index)}
                        onTouchEnd={() => isMobile && setTimeout(() => setHoveredFeature(null), 150)}
                        className={`p-3 sm:p-4 rounded-lg transition-all duration-200 border ${
                          hoveredFeature === index
                            ? 'border-primary bg-gradient-to-br from-blue-50 to-white'
                            : 'border-gray-100 bg-white'
                        } ${isMobile ? 'touch-manipulation' : ''}`}
                      >
                        <motion.div 
                          className="flex items-center gap-2 sm:gap-3"
                          animate={hoveredFeature === index ? {
                            x: [0, 5, 0],
                          } : {}}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.div 
                            className={`p-1.5 sm:p-2 rounded-md transition-colors duration-200 ${
                              hoveredFeature === index
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                                : 'bg-gray-100'
                            }`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              flexShrink: 0
                            }}
                          >
                            <div className={
                              hoveredFeature === index 
                                ? 'text-white' 
                                : 'text-gray-600'
                            }>
                              {feature.icon}
                            </div>
                          </motion.div>
                          <motion.span 
                            className={`text-xs sm:text-sm truncate ${
                              hoveredFeature === index
                                ? 'text-primary font-semibold'
                                : 'text-gray-700'
                            }`}
                            animate={hoveredFeature === index ? {
                              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            style={{
                              background: hoveredFeature === index 
                                ? `linear-gradient(90deg, ${colors.primary}, #3b82f6, ${colors.primary})`
                                : 'none',
                              backgroundSize: '200% 100%',
                              backgroundClip: hoveredFeature === index ? 'text' : 'none',
                              WebkitBackgroundClip: hoveredFeature === index ? 'text' : 'none',
                              color: hoveredFeature === index ? 'transparent' : 'inherit',
                            }}
                          >
                            {feature.text}
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="mt-6 sm:mt-8"
                >
                  <div className="p-4 sm:p-6 rounded-lg relative overflow-hidden group">
                    {/* Animated gradient background */}
                    <motion.div 
                      className="absolute inset-0"
                      animate={{
                        background: [
                          'linear-gradient(135deg, rgba(219,234,254,0.8) 0%, rgba(255,255,255,0.6) 100%)',
                          'linear-gradient(135deg, rgba(191,219,254,0.9) 0%, rgba(219,234,254,0.7) 100%)',
                          'linear-gradient(135deg, rgba(219,234,254,0.8) 0%, rgba(255,255,255,0.6) 100%)',
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    {/* Subtle border */}
                    <div className="absolute inset-0 border border-blue-100/50 rounded-lg" />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                      <div>
                        <motion.h4 
                          className="font-serif text-base sm:text-lg md:text-lg" 
                          style={{ color: colors.text }}
                          whileHover={{ x: 5 }}
                        >
                          Ready for Possession
                        </motion.h4>
                        <motion.p 
                          className="text-xs sm:text-sm mt-0.5 sm:mt-1" 
                          style={{ color: colors.muted }}
                          animate={{
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          Early 2024
                        </motion.p>
                      </div>
                      <div className="text-left sm:text-right">
                        <motion.div 
                          className="relative"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: colors.primary }}>
                            <AnimatedCounter value={48} scrollProgress={scrollYProgress.get()} />
                          </div>
                          {/* Pulsing glow effect */}
                          <motion.div 
                            className="absolute inset-0 text-2xl sm:text-3xl md:text-4xl font-bold opacity-20 blur-sm" 
                            style={{ color: colors.primary }}
                            animate={{
                              opacity: [0.2, 0.4, 0.2],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            48
                          </motion.div>
                        </motion.div>
                        <motion.div 
                          className="text-xs sm:text-sm font-medium tracking-wide mt-0.5 sm:mt-1" 
                          style={{ color: colors.muted }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          Exclusive Units
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </MinimalCard>
          </motion.div>
        </div>

        {/* CTA Button with scroll-triggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 1, type: 'spring', stiffness: 100 }}
          className="mt-12 sm:mt-16 md:mt-20 relative"
        >
          {/* Animated border path */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, ${colors.primary}80, transparent 50%)`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10 flex justify-center">
            <motion.button
              whileHover={{ 
                scale: isMobile ? 1 : 1.05,
                boxShadow: '0 20px 40px rgba(59,130,246,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                background: [
                  `linear-gradient(135deg, ${colors.text}, ${colors.secondary})`,
                  `linear-gradient(135deg, ${colors.primary}, ${colors.text})`,
                  `linear-gradient(135deg, ${colors.text}, ${colors.secondary})`,
                ],
                y: [0, -5, 0],
              }}
              transition={{
                background: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 font-medium rounded-lg overflow-hidden"
              style={{
                color: colors.accent,
              }}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
              />
              
              <span className="relative flex items-center gap-2 text-sm sm:text-base">
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  View Project Details
                </motion.span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}