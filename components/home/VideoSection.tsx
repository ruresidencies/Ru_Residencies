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
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleMouseMove = () => {
      setShowControls(true)
      const timer = setTimeout(() => setShowControls(false), 3000)
      return () => clearTimeout(timer)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('touchstart', handleMouseMove)
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('touchstart', handleMouseMove)
      }
    }
  }, [])

  // Simplified controls for mobile
  const MobileControls = () => (
    <div className="md:hidden absolute bottom-6 left-0 right-0 px-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={togglePlay}
          className="
            w-14 h-14
            rounded-full
            bg-white/20 backdrop-blur-md
            flex items-center justify-center
            text-white
            hover:bg-white/30
            transition-all duration-300
            border border-white/30
            shadow-lg
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
            bg-white/20 backdrop-blur-md
            flex items-center justify-center
            text-white
            hover:bg-white/30
            transition-all duration-300
            border border-white/30
            shadow-lg
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
      
      {/* Progress bar for mobile */}
      <div className="mt-4 px-2">
        <div className="relative">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="
              w-full h-2
              appearance-none
              bg-white/30
              rounded-full
              cursor-pointer
              outline-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg
            "
          />
          <div 
            className="absolute top-0 left-0 h-2 bg-white rounded-full pointer-events-none"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2">
          <span className="text-white text-sm">
            {formatTime(currentTime)}
          </span>
          <span className="text-white/70 text-sm">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <section className="relative bg-black lg:hidden">
      <div 
        ref={containerRef}
        className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden group cursor-pointer"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
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
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/80 text-lg">Loading video...</p>
            </div>
          </div>
        )}

        {/* Gradient Overlays - More subtle on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10 md:bg-gradient-to-t md:from-black/40 md:via-transparent md:to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 md:bg-gradient-to-r md:from-black/20 md:via-transparent md:to-black/20" />

        {/* Content Overlay - Responsive text sizing */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6">
          <div className="text-center max-w-4xl w-full">
            <div className="mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm rounded-full mb-4 md:mb-6 border border-white/20">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                  EXPERIENCE RU RESIDENCIES
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-white mb-4 md:mb-6 leading-snug md:leading-tight">
                A New Standard of <br className="hidden md:block" />
                <span className="text-white/95">Urban Living</span>
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed px-2 md:px-0">
                Discover the perfect harmony of luxury, location, and lifestyle 
                in the heart of Nugegoda. Where every detail is crafted for 
                exceptional living.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Video Controls */}
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
                transition-all duration-300
                border border-white/20
                group/play
              "
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-6 md:h-6 group-hover/play:scale-110 transition-transform" />
              ) : (
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-1 group-hover/play:scale-110 transition-transform" />
              )}
            </button>

            {/* Progress Bar */}
            <div className="flex-1 mx-6 md:mx-8">
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
                    [&::-webkit-slider-thumb]:hover:scale-125
                    [&::-webkit-slider-thumb]:transition-transform
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
            <div className="flex items-center gap-4">
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
                  transition-all duration-300
                  border border-white/20
                  group/mute
                "
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5 group-hover/mute:scale-110 transition-transform" />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5 group-hover/mute:scale-110 transition-transform" />
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
                  transition-all duration-300
                  border border-white/20
                  group/full
                "
                aria-label="Enter fullscreen"
              >
                <Maximize2 className="w-4 h-4 md:w-5 md:h-5 group-hover/full:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Controls - Always visible on mobile */}
        {isMobile && <MobileControls />}

        {/* Play Button Overlay (shown when paused on desktop) */}
        {!isPlaying && !isMobile && (
          <button
            onClick={togglePlay}
            className="
              absolute inset-0 hidden md:flex
              items-center justify-center
              bg-black/30
              transition-opacity duration-500
              group/overlay
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
              group-hover/overlay:bg-white/20
              group-hover/overlay:border-white/50
              transition-all duration-500
              transform group-hover/overlay:scale-110
            ">
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />
            </div>
          </button>
        )}

        {/* Auto-play notice */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6">
          <div className="px-3 md:px-4 py-1.5 md:py-2 bg-black/50 backdrop-blur-sm rounded-full">
            <p className="text-white/70 text-xs md:text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden md:inline">Video auto-plays</span>
              <span className="md:hidden">Auto-play</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}