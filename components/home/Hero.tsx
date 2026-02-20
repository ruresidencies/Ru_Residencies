'use client';

import { useState, useEffect, useRef } from 'react';
import Container from '@/components/ui/Container';
import { ChevronLeft, ChevronRight, Pause, Play, X, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    src: '/images/zac-gudakov-SgL017lyKX8-unsplash.jpg',
    alt: 'Modern architecture exterior',
  },
  {
    id: 2,
    src: '/images/lotus-design-n-print-1vMz2_MclrM-unsplash.jpg',
    alt: 'Elegant interior design',
  },
  {
    id: 3,
    src: '/images/sam-moghadam-KnbKpAgpECY-unsplash.jpg',
    alt: 'Luxury living space',
  },
  {
    id: 4,
    src: '/images/lotus-design-n-print-r_y2VBvEOIE-unsplash.jpg',
    alt: 'Contemporary residence',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [showVideoPlayer, setShowVideoPlayer] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const hasInitialized = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Video player functions
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto-play functionality for slides
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying]);

  // Initialize text visibility only once
  useEffect(() => {
    if (!hasInitialized.current) {
      setIsTextVisible(true);
      hasInitialized.current = true;
    }
  }, []);

  // Video time update
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pb-20 md:pb-0">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.src}')` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              {/* Subtle gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Content - Fixed padding to prevent overlap with controls */}
      <Container className="relative z-10">
        <div className="max-w-3xl pb-24 md:pb-32 lg:pb-36 xl:pb-20 2xl:pb-24">
          {/* FIRST SLIDE - ONLY Availability Text (Elegant & High Contrast) */}
          {currentSlide === 0 && (
            <div className="overflow-hidden">
              <div className={`transition-all duration-1000 ${
                isTextVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                <span className="text-sm md:text-base uppercase tracking-[0.3em] text-white/50 font-light block mb-4">Exclusive Release</span>
                <div className="flex flex-col">
                  <span className="text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
                    12
                  </span>
                  <span className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 mt-2 mb-4">
                    units remaining
                  </span>
                  <div className="flex items-baseline gap-3 mt-4">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-light text-white/80">from</span>
                    <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                      45M
                    </span>
                    <span className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light">+</span>
                  </div>
                  <div className="w-24 h-0.5 bg-white/30 mt-8"></div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDES 2-4 - Original Content */}
          {currentSlide !== 0 && (
            <>
              <div className="overflow-hidden">
                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] md:leading-[0.9] tracking-tight text-white transition-all duration-1000 ${
                  isTextVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}>
                  Elevated
                  <span className="block mt-4 text-white/95 pb-2 md:pb-0">Living</span>
                </h1>
              </div>
              
              <div className="mt-6 md:mt-8 lg:mt-12 overflow-hidden">
                <p className={`text-xl md:text-2xl font-light text-white/90 tracking-wide transition-all duration-1000 delay-150 ${
                  isTextVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}>
                  in the Heart of Colombo
                </p>
              </div>

              <div className="mt-4 md:mt-6 lg:mt-8 overflow-hidden">
                <p className={`text-base md:text-lg max-w-xl text-white/80 font-light leading-relaxed transition-all duration-1000 delay-300 ${
                  isTextVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}>
                  Thoughtfully designed residences blending modern architecture,
                  comfort, and timeless elegance.
                </p>
              </div>

              {/* Call to Action - Stack on smaller screens */}
              <div className={`mt-6 md:mt-8 lg:mt-10 xl:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 transition-all duration-1000 delay-500 ${
                isTextVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}>
                <Link href="/residences" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 lg:px-8 py-2.5 lg:py-3 bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-0.5 text-sm lg:text-base">
                    Explore Residences
                  </button>
                </Link>
                <Link href="/gallery" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-6 lg:px-8 py-2.5 lg:py-3 border-2 border-white/30 text-white font-medium tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5 text-sm lg:text-base">
                    View Gallery
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>

      {/* High-End Video Player Window - Desktop Only */}
      <div className="hidden lg:block absolute z-30 right-6 xl:right-8 top-6 xl:top-8">
        {showVideoPlayer && (
          <div 
            className={`transition-all duration-500 ${
              isFullscreen 
                ? 'fixed inset-0 z-50 bg-black' 
                : isHovered 
                  ? 'scale-105' 
                  : 'scale-100'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={videoContainerRef}
          >
            <div 
              className={`transition-all duration-500 ${
                isFullscreen 
                  ? 'w-full h-full bg-black' 
                  : 'w-72 xl:w-80 h-48 xl:h-52 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl bg-black/90 border border-white/10 hover:shadow-3xl hover:border-white/20'
              }`}
            >
              {/* Window Header */}
              <div 
                className={`flex items-center justify-between px-3 xl:px-4 py-2 xl:py-2.5 transition-all duration-300 ${
                  isFullscreen 
                    ? 'bg-black/50 border-b border-white/10' 
                    : isHovered
                      ? 'bg-black/70 backdrop-blur-sm'
                      : 'bg-black/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div 
                      className="w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-all duration-300 hover:scale-110" 
                      onClick={() => setShowVideoPlayer(false)}
                    />
                    <div className="w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] xl:text-xs text-white/70 ml-2 font-mono tracking-wide">RU Preview</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleFullscreen}
                    className="p-1 hover:bg-white/10 rounded transition-all duration-300 hover:scale-110"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? (
                      <Minimize2 size={10} className="xl:w-3 xl:h-3 text-white/80" />
                    ) : (
                      <Maximize2 size={10} className="xl:w-3 xl:h-3 text-white/80" />
                    )}
                  </button>
                </div>
              </div>

              {/* Video Container */}
              <div className="relative h-[calc(100%-40px)] xl:h-[calc(100%-44px)]">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted={isVideoMuted}
                  loop
                  playsInline
                >
                  <source src="/video/ru.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Gradient Overlay - Subtle */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />

                {/* Play/Pause Overlay */}
                {!isVideoPlaying && (
                  <button
                    onClick={toggleVideoPlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
                    aria-label="Play video"
                  >
                    <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110">
                      <Play size={16} className="xl:w-5 xl:h-5 text-white ml-1" />
                    </div>
                  </button>
                )}

                {/* Minimal Controls (Show on hover) */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 p-2 xl:p-3 transition-all duration-300 ${
                    isHovered || !isVideoPlaying || isFullscreen
                      ? 'bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {/* Progress Bar - Minimal */}
                  <div className="mb-1 xl:mb-2">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-0.5 xl:h-1 appearance-none bg-white/20 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 xl:[&::-webkit-slider-thumb]:w-2.5 xl:[&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-transform"
                    />
                  </div>

                  {/* Control Buttons - Minimal */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 xl:gap-2">
                      <button
                        onClick={toggleVideoPlay}
                        className="p-1 xl:p-1.5 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                      >
                        {isVideoPlaying ? (
                          <Pause size={12} className="xl:w-3.5 xl:h-3.5 text-white" />
                        ) : (
                          <Play size={12} className="xl:w-3.5 xl:h-3.5 text-white ml-0.5" />
                        )}
                      </button>
                      
                      <button
                        onClick={toggleVideoMute}
                        className="p-1 xl:p-1.5 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                        aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                      >
                        {isVideoMuted ? (
                          <VolumeX size={12} className="xl:w-3.5 xl:h-3.5 text-white" />
                        ) : (
                          <Volume2 size={12} className="xl:w-3.5 xl:h-3.5 text-white" />
                        )}
                      </button>
                    </div>

                    {/* Time Display */}
                    <div className="text-[10px] xl:text-xs text-white/60 font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-2 right-2">
                  <div className="flex items-center gap-1 px-1.5 xl:px-2 py-0.5 xl:py-0.5 bg-black/60 backdrop-blur-sm rounded-full">
                    <div className={`w-1 h-1 xl:w-1.5 xl:h-1.5 rounded-full ${isVideoPlaying ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                    <span className="text-[8px] xl:text-xs text-white/70">{isVideoPlaying ? 'LIVE' : 'PAUSED'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Icon to Reopen Video Player - Desktop Only */}
        {!showVideoPlayer && (
          <div 
            className="cursor-pointer group"
            onClick={() => setShowVideoPlayer(true)}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md group-hover:bg-blue-500/30 transition-all duration-500" />
              
              {/* Main button */}
              <div className="relative w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-black/80 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-blue-400/30">
                <Play size={14} className="xl:w-4 xl:h-4 text-white/80 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slideshow Controls - Fixed positioning at bottom */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full px-4">
        <div className="flex items-center gap-3 md:gap-4 lg:gap-6 bg-black/30 backdrop-blur-sm px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full mx-auto w-fit">
          <button
            onClick={prevSlide}
            className="p-1.5 md:p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} className="md:hidden" />
            <ChevronLeft size={20} className="hidden md:block lg:hidden" />
            <ChevronLeft size={24} className="hidden lg:block" />
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-4 md:w-6 lg:w-8 h-1.5 md:h-2 bg-white'
                    : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-1.5 md:p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={18} className="md:hidden" />
            <ChevronRight size={20} className="hidden md:block lg:hidden" />
            <ChevronRight size={24} className="hidden lg:block" />
          </button>

          <div className="h-4 md:h-5 lg:h-6 w-px bg-white/30" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 md:p-2 text-white/80 hover:text-white transition-colors"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? 
              <Pause size={16} className="md:hidden" /> : 
              <Play size={16} className="md:hidden" />
            }
            {isPlaying ? 
              <Pause size={18} className="hidden md:block lg:hidden" /> : 
              <Play size={18} className="hidden md:block lg:hidden" />
            }
            {isPlaying ? 
              <Pause size={20} className="hidden lg:block" /> : 
              <Play size={20} className="hidden lg:block" />
            }
          </button>
        </div>
      </div>

      {/* Slide Number Display */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 right-4 md:right-6 lg:right-8 z-20">
        <div className="flex items-center gap-2 text-white/70 text-xs md:text-sm font-light">
          <span className="text-lg md:text-xl lg:text-2xl font-normal text-white">
            {(currentSlide + 1).toString().padStart(2, '0')}
          </span>
          <span className="text-white/50">/</span>
          <span>{slides.length.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on medium screens to prevent overlap */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 lg:left-8 z-20 hidden xl:block">
        <div className="flex flex-col items-center gap-2 text-white/50 text-xs md:text-sm font-light tracking-wider">
          <span className="rotate-90 mb-2">SCROLL</span>
          <div className="h-12 md:h-14 lg:h-16 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>

      {/* Subtle gradient at bottom - Optimized for all screen sizes */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-36 lg:h-40 xl:h-44 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
    </section>
  );
}