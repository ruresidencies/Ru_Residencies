'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
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

// 3D Floating Building Component
function FloatingBuilding() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2, 6, 1]} />
        <meshStandardMaterial
          color={colors.primary}
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[1.01, (i - 2.5) * 1, 0]} castShadow>
          <planeGeometry args={[0.8, 0.6]} />
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

// Animated Number Counter - Fixed timing with Intersection Observer
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [isInView, shouldAnimate]);

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
    <span ref={ref} className="font-serif text-4xl text-primary">
      {shouldAnimate ? count : 0}
    </span>
  );
}

// Glassy Stat Card Component
function GlassyStatCard({ value, label, index }: { value: number; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.1, type: 'tween' as const }}
      whileHover={{ y: -5 }}
      className="relative text-center p-6 rounded-xl overflow-hidden group"
    >
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/30" />
      
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
      
      {/* Inner shadow */}
      <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]" />
      
      <div className="relative z-10">
        <div className="text-4xl font-bold mb-2">
          <AnimatedCounter value={value} />
          {label.includes('Hour') && (
            <span className="text-3xl font-normal ml-1">/</span>
          )}
        </div>
        <div className="text-sm font-medium tracking-wide" style={{ color: colors.muted }}>
          {label}
        </div>
      </div>

      {/* Subtle accent border on hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-100 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}

// Minimal Card
function MinimalCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween' as const, duration: 0.3 }}
      className={`bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Introduction({ className = '' }: IntroductionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [shouldAnimateNumber, setShouldAnimateNumber] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: <Building className="w-6 h-6" />, text: '48 Luxury Residential Units' },
    { icon: <MapPin className="w-6 h-6" />, text: 'Prime Nugegoda Location' },
    { icon: <Shield className="w-6 h-6" />, text: '24-Hour Security & CCTV' },
    { icon: <Dumbbell className="w-6 h-6" />, text: 'Modern Gymnasium' },
    { icon: <Car className="w-6 h-6" />, text: 'Car Charging & Washing Area' },
    { icon: <Trees className="w-6 h-6" />, text: 'Ample Garden Space' },
    { icon: <Zap className="w-6 h-6" />, text: 'Central Gas System' },
    { icon: <Award className="w-6 h-6" />, text: '6 Floors of Luxury Living' },
  ];

  // Scroll animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  } as const;

  return (
    <section 
      ref={containerRef}
      className={`relative py-24 bg-white overflow-hidden ${className}`}
      style={{ color: colors.text }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary} 1px, transparent 1px),
                              linear-gradient(to bottom, ${colors.primary} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating 3D Canvas */}
      {typeof window !== 'undefined' && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full pointer-events-none opacity-60">
          <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={colors.primary} />
            <directionalLight
              position={[-5, 5, 5]}
              intensity={0.5}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <FloatingBuilding />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <fog attach="fog" args={[colors.background, 10, 20]} />
          </Canvas>
        </div>
      )}

      <Container className="relative z-10">
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'tween' as const }}
          className="relative mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gray-300" />
            <div className="w-12 h-px bg-gray-300" />
          </div>
          
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'tween' as const }}
              className="text-4xl md:text-6xl font-serif font-light tracking-tight"
              style={{ color: colors.text }}
            >
              Introducing
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, type: 'tween' as const }}
              className="mt-6"
            >
              <h3 className="text-2xl md:text-4xl font-serif" style={{ color: colors.primary }}>
                Our Third Masterpiece
              </h3>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="relative">
              <MinimalCard className="p-8">
                <p className="text-lg leading-relaxed" style={{ color: colors.muted }}>
                  We proudly present our{' '}
                  <span className="font-medium" style={{ color: colors.text }}>
                    third prestigious development
                  </span>{' '}
                  - a collection of{' '}
                  <span className="font-medium" style={{ color: colors.primary }}>
                    48 luxury residences
                  </span>{' '}
                  at{' '}
                  <span className="font-medium" style={{ color: colors.primary }}>
                    6C, Pelawatte Road, Nugegoda
                  </span>, 
                  situated in Colombo's most coveted neighborhood.
                </p>
              </MinimalCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <MinimalCard className="p-8">
                <p className="leading-relaxed mb-6" style={{ color: colors.muted }}>
                  Nestled in the heart of Nugegoda, this exceptional location offers unparalleled access to 
                  premier international schools, fine dining, banking institutions, medical facilities, 
                  shopping arcades, and recreational amenities — all within moments of your residence.
                </p>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-xl font-serif mb-4" style={{ color: colors.text }}>
                    Architectural Excellence
                  </h3>
                  <p className="leading-relaxed" style={{ color: colors.muted }}>
                    The development features 2 levels of dedicated parking and 6 floors of meticulously 
                    designed living spaces, complemented by dual passenger elevators and thoughtful 
                    amenities that redefine urban luxury.
                  </p>
                </div>
              </MinimalCard>
            </motion.div>

            {/* Stats - Updated with glassy cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4"
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
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, type: 'tween' as const }}
          >
            <MinimalCard className="p-8">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, type: 'tween' as const }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  <div 
                    className="px-6 py-2 rounded-full text-sm font-medium tracking-wide"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.accent,
                    }}
                  >
                    PREMIUM AMENITIES
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-3 mt-12">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05, type: 'tween' as const }}
                      whileHover={{ 
                        y: -2,
                        borderColor: colors.primary,
                      }}
                      onHoverStart={() => setHoveredFeature(index)}
                      onHoverEnd={() => setHoveredFeature(null)}
                      className={`p-4 rounded-lg transition-all duration-200 border ${
                        hoveredFeature === index
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-100 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={`p-2 rounded-md transition-colors duration-200 ${
                            hoveredFeature === index
                              ? 'bg-primary'
                              : 'bg-gray-100'
                          }`}
                        >
                          <div className={
                            hoveredFeature === index 
                              ? 'text-white' 
                              : 'text-gray-600'
                          }>
                            {feature.icon}
                          </div>
                        </div>
                        <span className={`text-sm ${
                          hoveredFeature === index
                            ? 'text-primary font-medium'
                            : 'text-gray-700'
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, type: 'tween' as const }}
                  className="mt-8"
                >
                  <div className="p-6 rounded-lg relative overflow-hidden group">
                    {/* Glass effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-white/60 backdrop-blur-sm" />
                    
                    {/* Subtle border */}
                    <div className="absolute inset-0 border border-blue-100/50 rounded-lg" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-lg" style={{ color: colors.text }}>
                          Ready for Possession
                        </h4>
                        <p className="text-sm mt-1" style={{ color: colors.muted }}>Early 2024</p>
                      </div>
                      <div className="text-right">
                        <div className="relative">
                          <div className="text-4xl font-bold" style={{ color: colors.primary }}>
                            <AnimatedCounter value={48} />
                          </div>
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 text-4xl font-bold opacity-20 blur-sm" style={{ color: colors.primary }}>
                            48
                          </div>
                        </div>
                        <div className="text-sm font-medium tracking-wide mt-1" style={{ color: colors.muted }}>Exclusive Units</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </MinimalCard>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, type: 'tween' as const }}
          className="mt-20 relative"
        >
          <div className="relative z-10 flex justify-center">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: colors.primary,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'tween' as const }}
              className="group relative px-8 py-4 font-medium rounded-lg overflow-hidden"
              style={{
                backgroundColor: colors.text,
                color: colors.accent,
              }}
            >
              <span className="relative flex items-center gap-2">
                View Project Details
                <ChevronRight className="w-4 h-4" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}