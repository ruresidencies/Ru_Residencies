'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Zap, Waves } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimation } from 'framer-motion'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [videoScale, setVideoScale] = useState(1)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [particleCount, setParticleCount] = useState(0)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Transform scroll progress for various effects
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [0, 5])
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 20])

  // Spring animations for smooth transitions
  const controlsY = useSpring(0, { stiffness: 300, damping: 30 })
  const controlsOpacity = useSpring(0, { stiffness: 400, damping: 40 })
  const playButtonScale = useMotionValue(1)
  const titleScale = useSpring(1, { stiffness: 100, damping: 10 })
  const particleOpacity = useMotionValue(0)

  // Particle system
  const createParticle = () => {
    if (!particlesRef.current || particleCount >= 15) return
    
    const particle = document.createElement('div')
    particle.className = 'absolute rounded-full pointer-events-none'
    
    // Random properties
    const size = Math.random() * 20 + 5
    const left = Math.random() * 100
    const top = Math.random() * 100
    const color = Math.random() > 0.5 ? '#60a5fa' : '#3b82f6'
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: ${top}%;
      background: radial-gradient(circle, ${color}40, ${color}00 70%);
      transform: scale(0);
      animation: particleFloat 3s ease-out forwards;
    `
    
    particlesRef.current.appendChild(particle)
    setParticleCount(prev => prev + 1)
    
    // Remove particle after animation
    setTimeout(() => {
      particle.remove()
      setParticleCount(prev => prev - 1)
    }, 3000)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        // Create particles on pause
        for (let i = 0; i < 5; i++) {
          setTimeout(() => createParticle(), i * 100)
        }
      } else {
        videoRef.current.play()
        // Glitch effect on play
        setGlitchEffect(true)
        setTimeout(() => setGlitchEffect(false), 300)
      }
      setIsPlaying(!isPlaying)
      
      // Play button animation
      playButtonScale.set(1.2)
      setTimeout(() => playButtonScale.set(1), 200)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      
      // Sound wave animation
      if (!isMuted) {
        for (let i = 0; i < 3; i++) {
          createParticle()
        }
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      
      // Create particles at certain time intervals
      if (Math.floor(videoRef.current.currentTime) % 5 === 0) {
        createParticle()
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setIsLoaded(true)
      
      // Initial particles
      setTimeout(() => {
        for (let i = 0; i < 8; i++) {
          createParticle()
        }
      }, 500)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
      
      // Seek ripple effect
      setVideoScale(1.02)
      setTimeout(() => setVideoScale(1), 300)
    }
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen()
        // Scale up content in fullscreen
        titleScale.set(1.1)
      } else {
        document.exitFullscreen()
        titleScale.set(1)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleMouseMove = (e: MouseEvent) => {
      setShowControls(true)
      setIsHovering(true)
      
      // Parallax effect on mouse move
      if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        
        const moveX = (x - 0.5) * 20
        const moveY = (y - 0.5) * 20
        
        if (videoRef.current) {
          videoRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(${videoScale})`
        }
      }
      
      const timer = setTimeout(() => {
        setShowControls(false)
        setIsHovering(false)
      }, 3000)
      return () => clearTimeout(timer)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('touchstart', () => {
        setShowControls(true)
        setIsHovering(true)
        setTimeout(() => {
          setShowControls(false)
          setIsHovering(false)
        }, 3000)
      })
    }

    // Auto-create particles
    const particleInterval = setInterval(() => {
      if (isPlaying && particleCount < 10) {
        createParticle()
      }
    }, 2000)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearInterval(particleInterval)
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('touchstart', handleMouseMove as any)
      }
    }
  }, [isPlaying, particleCount, isMobile, videoScale])

  // Mobile Controls - Enhanced with animations
  const MobileControls = () => (
    <motion.div 
      className="md:hidden absolute bottom-0 left-0 right-0 z-20"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Gradient overlay for controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      
      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 border-t border-blue-500/30"
        animate={{
          boxShadow: [
            '0 0 0px rgba(59,130,246,0)',
            '0 0 20px rgba(59,130,246,0.3)',
            '0 0 0px rgba(59,130,246,0)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Controls container */}
      <motion.div 
        className="relative px-4 pb-6 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Progress bar with glow effect */}
        <div className="mb-4">
          <div className="relative">
            <motion.div 
              className="absolute inset-0 bg-white/10 rounded-full blur-sm"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="
                w-full h-2
                appearance-none
                bg-white/20
                rounded-full
                cursor-pointer
                outline-none
                relative z-10
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:hover:scale-125
                [&::-webkit-slider-thumb]:transition-transform
              "
            />
            <div 
              className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full pointer-events-none z-5"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2">
            <motion.span 
              className="text-white text-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5 }}
              key={currentTime}
            >
              {formatTime(currentTime)}
            </motion.span>
            <span className="text-white/70 text-sm">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Control buttons with floating animation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={togglePlay}
              className="relative"
              whileTap={{ scale: 0.9 }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Pulsing ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="
                relative
                w-12 h-12
                rounded-full
                bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-md
                flex items-center justify-center
                text-white
                hover:from-blue-500/40 hover:to-purple-500/40
                transition-all duration-300
                border border-white/30
                shadow-xl
                z-10
              "
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(59,130,246,0.3))'
                }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-1" />
                )}
              </div>
            </motion.button>
            
            <motion.button
              onClick={toggleMute}
              className="relative"
              whileTap={{ scale: 0.9 }}
              animate={isMuted ? {} : {
                scale: [1, 1.1, 1],
              }}
              transition={isMuted ? {} : {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="
                w-10 h-10
                rounded-full
                bg-white/20 backdrop-blur-md
                flex items-center justify-center
                text-white
                hover:bg-white/30
                transition-all duration-300
                border border-white/30
                shadow-lg
              ">
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </div>
            </motion.button>
          </div>
          
          <motion.button
            onClick={handleFullscreen}
            className="relative"
            whileTap={{ scale: 0.9 }}
            animate={{
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="
              w-10 h-10
              rounded-full
              bg-white/20 backdrop-blur-md
              flex items-center justify-center
              text-white
              hover:bg-white/30
              transition-all duration-300
              border border-white/30
              shadow-lg
            ">
              <Maximize2 className="w-4 h-4" />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black lg:hidden overflow-hidden"
    >
      <motion.div 
        ref={containerRef}
        className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden group cursor-pointer"
        style={{
          opacity,
          y,
          scale,
          rotateX,
          filter: `blur(${blur}px)`
        }}
        onMouseEnter={() => {
          setShowControls(true)
          setIsHovering(true)
        }}
        onMouseLeave={() => {
          setShowControls(false)
          setIsHovering(false)
        }}
      >
        {/* Particle System Container */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />
        
        {/* Glitch Effect Overlay */}
        {glitchEffect && (
          <motion.div 
            className="absolute inset-0 z-10 mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(45deg, transparent 45%, rgba(255,0,255,0.3) 50%, transparent 55%)',
              backgroundSize: '10px 10px'
            }}
          />
        )}

        {/* Video Element with parallax */}
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            scale: videoScale,
            transition: 'transform 0.3s ease-out, scale 0.3s ease-out'
          }}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setIsLoaded(true)}
        >
          <source src="/video/ru.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        {/* Loading Overlay with animation */}
        {!isLoaded && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900/20 flex items-center justify-center z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div 
                className="relative w-16 h-16 mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full" />
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-white/60" />
              </motion.div>
              <motion.p 
                className="text-white/80 text-lg"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading experience...
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Dynamic Gradient Overlays */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
          animate={isHovering ? {
            background: [
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
              'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10 mix-blend-overlay"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Content Overlay with scroll animations */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center px-4 md:px-6 z-10"
          style={{ y: controlsY, opacity: controlsOpacity }}
        >
          <div className="text-center max-w-4xl w-full">
            <motion.div 
              className="mb-6 md:mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Animated badge */}
              <motion.div 
                className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full mb-4 md:mb-6 border border-white/20 relative overflow-hidden group/badge"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59,130,246,0.2)',
                    '0 0 30px rgba(59,130,246,0.4)',
                    '0 0 20px rgba(59,130,246,0.2)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000" />
                
                <motion.div 
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 5px rgba(72,187,120,0.5)',
                      '0 0 15px rgba(72,187,120,0.8)',
                      '0 0 5px rgba(72,187,120,0.5)'
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-white text-xs md:text-sm font-medium tracking-wide relative z-10">
                  EXPERIENCE RU RESIDENCIES
                </span>
              </motion.div>
              
              {/* Main title with floating animation */}
              <motion.h2 
                className="text-3xl md:text-5xl lg:text-7xl font-light text-white mb-4 md:mb-6 leading-snug md:leading-tight px-4"
                style={{ scale: titleScale }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                A New Standard of <br className="hidden md:block" />
                <motion.span 
                  className="text-white/95 relative inline-block"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #ffffff, #93c5fd, #ffffff)',
                    backgroundSize: '200% 100%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Urban Living
                </motion.span>
              </motion.h2>
              
              {/* Description with staggered letters animation */}
              <motion.p 
                className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Discover the perfect harmony of luxury, location, and lifestyle 
                in the heart of Nugegoda. Where every detail is crafted for 
                exceptional living.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop Video Controls (Tablet) */}
        <motion.div 
          className={`
            absolute bottom-0 left-0 right-0 hidden md:block z-20
            p-4 md:p-6
            bg-gradient-to-t from-black/90 via-black/70 to-transparent
          `}
          initial={{ y: 100, opacity: 0 }}
          animate={showControls ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Animated Play/Pause Button */}
            <motion.button
              onClick={togglePlay}
              className="relative group/play"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ scale: playButtonScale }}
            >
              <div className="
                w-12 h-12 md:w-14 md:h-14
                rounded-full
                bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm
                flex items-center justify-center
                text-white
                border-2 border-white/30
                shadow-xl
                relative overflow-hidden
              ">
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/play:translate-x-full transition-transform duration-700" />
                
                {isPlaying ? (
                  <Pause className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
                ) : (
                  <Play className="w-5 h-5 md:w-6 md:h-6 ml-1 relative z-10" />
                )}
              </div>
            </motion.button>

            {/* Progress Bar with glow */}
            <div className="flex-1 mx-6 md:mx-8">
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-white/10 rounded-full blur-sm"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="
                    w-full h-1.5
                    appearance-none
                    bg-white/20
                    rounded-full
                    cursor-pointer
                    outline-none
                    relative z-10
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-webkit-slider-thumb]:transition-transform
                  "
                />
                <motion.div 
                  className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full pointer-events-none z-5"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                  animate={{
                    boxShadow: [
                      '0 0 5px rgba(59,130,246,0.5)',
                      '0 0 15px rgba(59,130,246,0.8)',
                      '0 0 5px rgba(59,130,246,0.5)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <div className="flex justify-between mt-2">
                <motion.span 
                  className="text-white/70 text-xs md:text-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                  key={currentTime}
                >
                  {formatTime(currentTime)}
                </motion.span>
                <span className="text-white/50 text-xs md:text-sm">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Animated Mute Button */}
              <motion.button
                onClick={toggleMute}
                className="relative group/mute"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isMuted ? {} : {
                  scale: [1, 1.05, 1],
                }}
                transition={isMuted ? {} : {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="
                  w-10 h-10 md:w-12 md:h-12
                  rounded-full
                  bg-white/10 backdrop-blur-sm
                  flex items-center justify-center
                  text-white
                  border border-white/30
                  shadow-lg
                  relative overflow-hidden
                ">
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 md:w-5 md/h-5 relative z-10" />
                      {/* Sound waves */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute border-2 border-white/40 rounded-full"
                          style={{
                            width: 10 + i * 10,
                            height: 10 + i * 10
                          }}
                          animate={{
                            scale: [0, 2],
                            opacity: [0.5, 0]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </motion.button>

              {/* Spinning Fullscreen Button */}
              <motion.button
                onClick={handleFullscreen}
                className="group/full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="
                  w-10 h-10 md:w-12 md:h-12
                  rounded-full
                  bg-white/10 backdrop-blur-sm
                  flex items-center justify-center
                  text-white
                  border border-white/30
                  shadow-lg
                  relative overflow-hidden
                ">
                  <Maximize2 className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Controls - Always visible on mobile */}
        {isMobile && <MobileControls />}

        {/* Floating Particles Generator */}
        <motion.button
          onClick={() => {
            for (let i = 0; i < 8; i++) {
              setTimeout(() => createParticle(), i * 100)
            }
          }}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-20 opacity-50 hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="
            w-8 h-8 md:w-10 md:h-10
            rounded-full
            bg-black/30 backdrop-blur-sm
            flex items-center justify-center
            text-white/70
            border border-white/20
          ">
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.button>

        {/* Auto-play notice - Enhanced with animation */}
        <motion.div 
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          <div className="px-3 md:px-4 py-1.5 md:py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
            <motion.p 
              className="text-white/70 text-xs md:text-sm flex items-center gap-2"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.span 
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500"
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    '0 0 5px rgba(72,187,120,0.5)',
                    '0 0 15px rgba(72,187,120,0.8)',
                    '0 0 5px rgba(72,187,120,0.5)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="hidden md:inline">Video auto-plays</span>
              <span className="md:hidden">Auto-play</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Water Ripple Effect on Click */}
        {isHovering && !isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-white/10 rounded-lg"
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* CSS for particle animations */}
      <style jsx>{`
        @keyframes particleFloat {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}