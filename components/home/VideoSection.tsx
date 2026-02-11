'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null) // FIXED: Added null type and initial value

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setIsLoaded(true)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const resetControlsTimer = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    
    setShowControls(true)
    setIsTouching(true)
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
      setIsTouching(false)
    }, 3000)
  }

  useEffect(() => {
    // Check viewport on mount and resize
    const checkViewport = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    
    checkViewport()
    window.addEventListener('resize', checkViewport)

    const handleMouseMove = () => {
      resetControlsTimer()
    }

    const handleTouchStart = () => {
      resetControlsTimer()
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('touchstart', handleTouchStart)
    }

    return () => {
      window.removeEventListener('resize', checkViewport)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('touchstart', handleTouchStart)
      }
    }
  }, [])

  // Mobile Controls - Simplified and more touch-friendly
  const MobileControls = () => (
    <div className={`
      md:hidden fixed bottom-0 left-0 right-0
      transform transition-transform duration-300 ease-out
      ${showControls ? 'translate-y-0' : 'translate-y-full'}
      touch-none
    `}>
      {/* Gradient overlay for controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      
      {/* Controls container */}
      <div className="relative px-4 pb-4 pt-6">
        {/* Progress bar - Larger touch target */}
        <div className="mb-4 px-1">
          <div className="relative">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="
                w-full h-1.5
                appearance-none
                bg-white/30
                rounded-full
                cursor-pointer
                outline-none
                active:cursor-grabbing
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-6
                [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:active:scale-125
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white/20
              "
            />
            <div 
              className="absolute top-0 left-0 h-1.5 bg-white rounded-full pointer-events-none"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2 px-1">
            <span className="text-white text-xs font-medium">
              {formatTime(currentTime)}
            </span>
            <span className="text-white/70 text-xs">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Control buttons - Larger and spaced for touch */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-5">
            <button
              onClick={togglePlay}
              className="
                w-14 h-14
                rounded-full
                bg-white/20 backdrop-blur-lg
                flex items-center justify-center
                text-white
                active:bg-white/30
                active:scale-95
                transition-all duration-200
                border border-white/30
                shadow-xl
                touch-manipulation
              "
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>
            
            <button
              onClick={toggleMute}
              className="
                w-12 h-12
                rounded-full
                bg-white/20 backdrop-blur-lg
                flex items-center justify-center
                text-white
                active:bg-white/30
                active:scale-95
                transition-all duration-200
                border border-white/30
                shadow-xl
                touch-manipulation
              "
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <button
            onClick={handleFullscreen}
            className="
              w-12 h-12
              rounded-full
              bg-white/20 backdrop-blur-lg
              flex items-center justify-center
              text-white
              active:bg-white/30
              active:scale-95
              transition-all duration-200
              border border-white/30
              shadow-xl
              touch-manipulation
            "
            aria-label="Enter fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <section className="relative bg-black lg:hidden">
      <div 
        ref={containerRef}
        className="relative min-h-[70vh] md:min-h-[70vh] overflow-hidden cursor-pointer"
        onClick={() => isMobile && resetControlsTimer()}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
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
        </video>

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <div className="text-center px-4">
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/80 text-sm md:text-lg">Loading video...</p>
            </div>
          </div>
        )}

        {/* Gradient Overlays - Optimized for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Content Overlay - Responsive text sizing */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
          <div className="text-center max-w-4xl w-full pt-8 pb-20 md:pb-0">
            <div className="mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 md:mb-6 border border-white/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white text-xs font-medium tracking-wide">
                  EXPERIENCE RU RESIDENCIES
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-4 md:mb-6 leading-tight px-2">
                A New Standard of <br className="hidden sm:block" />
                <span className="text-white/95">Urban Living</span>
              </h1>
              
              <p className="text-sm md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed px-2 md:px-0">
                Discover the perfect harmony of luxury, location, and lifestyle 
                in the heart of Nugegoda. Where every detail is crafted for 
                exceptional living.
              </p>
            </div>
          </div>
        </div>

        {/* Tablet & Desktop Controls */}
        <div className={`
          absolute bottom-0 left-0 right-0 hidden md:block
          p-4 md:p-6
          bg-gradient-to-t from-black/80 via-black/60 to-transparent
          transition-all duration-500
          ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="
                w-12 h-12 md:w-14 md:h-14
                rounded-full
                bg-white/10 backdrop-blur-sm
                flex items-center justify-center
                text-white
                hover:bg-white/20
                active:scale-95
                transition-all duration-300
                border border-white/20
                touch-manipulation
              "
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-1" />
              )}
            </button>

            {/* Progress Bar */}
            <div className="flex-1 mx-4 md:mx-8 px-2">
              <div className="relative">
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
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:active:scale-125
                  "
                />
                <div 
                  className="absolute top-0 left-0 h-1.5 bg-white rounded-full pointer-events-none"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-2">
                <span className="text-white/70 text-xs md:text-sm">
                  {formatTime(currentTime)}
                </span>
                <span className="text-white/50 text-xs md:text-sm">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="
                  w-10 h-10 md:w-12 md:h-12
                  rounded-full
                  bg-white/10 backdrop-blur-sm
                  flex items-center justify-center
                  text-white
                  hover:bg-white/20
                  active:scale-95
                  transition-all duration-300
                  border border-white/20
                  touch-manipulation
                "
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={handleFullscreen}
                className="
                  w-10 h-10 md:w-12 md:h-12
                  rounded-full
                  bg-white/10 backdrop-blur-sm
                  flex items-center justify-center
                  text-white
                  hover:bg-white/20
                  active:scale-95
                  transition-all duration-300
                  border border-white/20
                  touch-manipulation
                "
                aria-label="Enter fullscreen"
              >
                <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        {isMobile && <MobileControls />}

        {/* Play Button Overlay for Tablet/Desktop when paused */}
        {!isPlaying && !isMobile && (
          <button
            onClick={togglePlay}
            className="
              absolute inset-0 hidden md:flex
              items-center justify-center
              bg-black/30
              transition-opacity duration-500
              active:bg-black/40
            "
            aria-label="Play video"
          >
            <div className="
              w-20 h-20 md:w-24 md:h-24
              rounded-full
              bg-white/10 backdrop-blur-sm
              flex items-center justify-center
              text-white
              border-2 border-white/30
              active:bg-white/20
              active:border-white/50
              active:scale-110
              transition-all duration-300
              touch-manipulation
            ">
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />
            </div>
          </button>
        )}

        {/* Auto-play notice - Better positioning for mobile */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
            <p className="text-white/70 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Auto-play</span>
            </p>
          </div>
        </div>

        {/* Touch indicator for mobile (shows where to tap) */}
        {isMobile && isTouching && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="text-white/60 text-xs bg-black/50 px-3 py-1 rounded-full">
              Tap to show controls
            </div>
          </div>
        )}
      </div>
    </section>
  )
}