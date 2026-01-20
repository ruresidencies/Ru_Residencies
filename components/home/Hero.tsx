'use client';

import { useState, useEffect, useRef } from 'react';
import Container from '@/components/ui/Container';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

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
  const hasInitialized = useRef(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
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

      {/* Content - Text stays fixed and only animates once */}
      <Container className="relative z-10">
        <div className="max-w-3xl">
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
          
          <div className="mt-8 md:mt-12 overflow-hidden">
            <p className={`text-xl md:text-2xl font-light text-white/90 tracking-wide transition-all duration-1000 delay-150 ${
              isTextVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              in the Heart of Colombo
            </p>
          </div>

          <div className="mt-6 md:mt-8 overflow-hidden">
            <p className={`text-base md:text-lg max-w-xl text-white/80 font-light leading-relaxed transition-all duration-1000 delay-300 ${
              isTextVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              Thoughtfully designed residences blending modern architecture,
              comfort, and timeless elegance.
            </p>
          </div>

          {/* Call to Action */}
          <div className={`mt-10 md:mt-12 flex items-center gap-6 transition-all duration-1000 delay-500 ${
            isTextVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <button className="px-8 py-3 bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-0.5">
              Explore Residences
            </button>
            <button className="px-8 py-3 border-2 border-white/30 text-white font-medium tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5">
              View Gallery
            </button>
          </div>
        </div>
      </Container>

      {/* Slideshow Controls - Mobile responsive */}
      <div className="absolute bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full px-4 md:px-0 md:w-auto">
        <div className="flex items-center gap-4 md:gap-6 bg-black/30 backdrop-blur-sm px-4 md:px-6 py-3 rounded-full justify-center">
          <button
            onClick={prevSlide}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>

          {/* Slide Indicators - Smaller on mobile */}
          <div className="flex items-center gap-2 md:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-6 md:w-8 bg-white'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="md:hidden" />
            <ChevronRight size={24} className="hidden md:block" />
          </button>

          <div className="h-4 md:h-6 w-px bg-white/30" />

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause size={18} className="md:hidden" /> : <Play size={18} className="md:hidden" />}
            {isPlaying ? <Pause size={20} className="hidden md:block" /> : <Play size={20} className="hidden md:block" />}
          </button>
        </div>
      </div>

      {/* Slide Number Display - Mobile responsive */}
      <div className="absolute bottom-8 md:bottom-8 right-4 md:right-8 z-20">
        <div className="flex items-center gap-2 text-white/70 text-sm font-light">
          <span className="text-xl md:text-2xl font-normal text-white">
            {(currentSlide + 1).toString().padStart(2, '0')}
          </span>
          <span className="text-white/50">/</span>
          <span>{slides.length.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-20 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-white/50 text-sm font-light tracking-wider">
          <span className="rotate-90 mb-2">SCROLL</span>
          <div className="h-16 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>

      {/* Subtle gradient at bottom - Enhanced for mobile */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-32 bg-gradient-to-t from-black/40 to-transparent z-10" />
    </section>
  );
}