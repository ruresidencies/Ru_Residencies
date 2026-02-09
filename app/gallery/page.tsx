// app/gallery/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Home,
  Camera,
  Sparkles,
  MapPin,
  Clock,
  Users
} from 'lucide-react'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Gallery images data - generic descriptions
  const galleryImages = [
    {
      id: 1,
      src: '/images/gallery1.jpeg',
      alt: 'Premium residential living',
      category: 'architecture',
      title: 'Exceptional Design',
      description: 'Where architecture meets artistry'
    },
    {
      id: 2,
      src: '/images/gallery2.jpeg',
      alt: 'Elegant interior spaces',
      category: 'interiors',
      title: 'Refined Living',
      description: 'Crafted for sophisticated lifestyles'
    },
    {
      id: 3,
      src: '/images/gallery3.jpeg',
      alt: 'Modern kitchen design',
      category: 'interiors',
      title: 'Modern Elegance',
      description: 'Contemporary spaces redefined'
    },
    {
      id: 4,
      src: '/images/gallery4.jpeg',
      alt: 'Luxurious bedroom suite',
      category: 'interiors',
      title: 'Tranquil Spaces',
      description: 'Serenity meets luxury'
    },
    {
      id: 5,
      src: '/images/gallery5.jpeg',
      alt: 'Premium amenities',
      category: 'amenities',
      title: 'Elevated Living',
      description: 'Experience the extraordinary'
    },
    {
      id: 6,
      src: '/images/gallery1.jpeg',
      alt: 'Common areas',
      category: 'common',
      title: 'Shared Luxury',
      description: 'Spaces designed for community'
    },
    {
      id: 7,
      src: '/images/gallery2.jpeg',
      alt: 'Design details',
      category: 'details',
      title: 'Attention to Detail',
      description: 'Every element considered'
    },
    {
      id: 8,
      src: '/images/gallery3.jpeg',
      alt: 'City views',
      category: 'views',
      title: 'Urban Panorama',
      description: 'Living with a view'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Photos', count: galleryImages.length },
    { id: 'architecture', label: 'Architecture', count: 1 },
    { id: 'interiors', label: 'Interiors', count: 3 },
    { id: 'amenities', label: 'Amenities', count: 1 },
    { id: 'common', label: 'Common Areas', count: 1 },
    { id: 'details', label: 'Details', count: 1 },
    { id: 'views', label: 'Views', count: 1 }
  ]

  // Generic slogans for lightbox
  const genericSlogans = [
    "Redefining urban luxury",
    "Where dreams find address",
    "Architectural excellence",
    "Designed for discerning tastes",
    "Your sanctuary in the city",
    "Premium living reimagined",
    "Space, light, elegance",
    "Contemporary sophistication"
  ]

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    let newIndex
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    }
    
    setSelectedImage(filteredImages[newIndex].id)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'ArrowLeft') navigateImage('prev')
    }

    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <>
      {/* Hero Section with improved text area */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900/5 via-white to-gray-900/5">
        <div className="absolute inset-0">
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-gray-900/10" />
          
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#000_48%,#000_52%,transparent_52%)] bg-[size:60px_60px]" />
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 text-center">
          {/* Enhanced icon container */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-900/10 to-gray-900/20 mb-10 border border-gray-200/50 shadow-xl backdrop-blur-sm">
            <Camera className="w-12 h-12 text-gray-900" />
          </div>

          {/* Main heading with improved typography */}
          <h1 className="
            font-serif text-5xl lg:text-7xl xl:text-8xl
            font-light text-gray-900 
            leading-[1.1] tracking-tight
            mb-8
          ">
            The RU Residencies <br />
            <span className="
              font-normal text-gray-800 
              bg-clip-text text-transparent 
              bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700
            ">
              Experience
            </span>
          </h1>
          
          {/* Enhanced subtitle with better styling */}
          <div className="relative max-w-2xl mx-auto">
            <div className="
              absolute -inset-x-20 -inset-y-6
              bg-gradient-to-r from-transparent via-gray-50/50 to-transparent
              rounded-3xl blur-xl opacity-60
            " />
            
            <p className="
              relative z-10
              text-xl lg:text-2xl
              text-gray-700 
              leading-relaxed
              font-light
              px-6 lg:px-12
            ">
              A visual journey through premium living spaces where every detail 
              <span className="
                font-normal text-gray-800 
                bg-gradient-to-r from-transparent via-gray-100 to-transparent
                px-2 mx-1 rounded
              ">
                tells a story of excellence
              </span> 
              and sophisticated design.
            </p>
            
            {/* Decorative line */}
            <div className="
              mt-12
              w-24 h-px
              mx-auto
              bg-gradient-to-r from-transparent via-gray-300 to-transparent
            " />
          </div>

          {/* Optional: Add subtle tagline below */}
          <p className="
            mt-12
            text-sm uppercase tracking-widest
            text-gray-500
            font-medium
          ">
            Visual Gallery • Luxury Living • Nugegoda
          </p>
        </div>
      </section>

      {/* Gallery Filter with improved styling */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50/50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-5 py-2.5
                  rounded-xl
                  text-sm font-medium
                  transition-all duration-300
                  border
                  ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-gray-900 to-black text-white shadow-xl border-transparent'
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 border-gray-300/50 hover:bg-white hover:border-gray-400 hover:shadow-lg'
                  }
                  flex items-center gap-2
                  hover:-translate-y-0.5
                `}
              >
                {category.label}
                <span className={`
                  text-xs px-2 py-1 rounded-lg font-semibold
                  ${activeCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-700'
                  }
                `}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid with improved background */}
      <section className="py-24 bg-gradient-to-b from-gray-50/30 via-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="
                    group relative
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-br from-gray-100 to-gray-200
                    aspect-[4/3]
                    cursor-pointer
                    transition-all duration-500
                    hover:shadow-2xl hover:shadow-gray-900/10
                    hover:scale-[1.02]
                    border border-gray-300/20
                  "
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 4}
                    />
                    
                    {/* Enhanced gradient overlay */}
                    <div className="
                      absolute inset-0
                      bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition-all duration-500
                    " />
                    
                    {/* Overlay with generic slogan - improved styling */}
                    <div className="
                      absolute bottom-0 left-0 right-0
                      p-6
                      transform translate-y-full
                      group-hover:translate-y-0
                      transition-transform duration-500
                    ">
                      <div className="text-white">
                        <h3 className="text-lg font-semibold mb-2">
                          {genericSlogans[index % genericSlogans.length]}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                            <Camera className="w-3 h-3" />
                          </div>
                          <span className="capitalize font-medium">{image.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced zoom button */}
                    <div className="
                      absolute top-4 right-4
                      w-11 h-11
                      rounded-xl
                      bg-white/95 backdrop-blur-sm
                      flex items-center justify-center
                      transform translate-y-2 opacity-0
                      group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-500
                      shadow-lg
                      border border-gray-200
                    ">
                      <Maximize2 className="w-5 h-5 text-gray-900" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 shadow-inner border border-gray-300/20">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">No images found in this category</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Try selecting a different category to explore our complete gallery collection.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="
                  px-6 py-3
                  rounded-xl
                  bg-gradient-to-r from-gray-900 to-black
                  text-white font-medium
                  hover:shadow-lg
                  transition-all duration-300
                  hover:-translate-y-0.5
                "
              >
                View All Photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="
            bg-gradient-to-br from-gray-900 via-gray-800 to-black
            rounded-3xl
            overflow-hidden
            shadow-2xl
            relative
            border border-gray-800
          ">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_75%,transparent_75%)] bg-[size:50px_50px]" />
            </div>

            <div className="grid lg:grid-cols-2 items-center relative z-10">
              <div className="p-12 lg:p-16 text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 mb-8 border border-white/10 shadow-lg">
                  <Sparkles className="w-8 h-8" />
                </div>
                
                <h2 className="
                  font-serif text-4xl lg:text-5xl 
                  font-light 
                  mb-6
                ">
                  Experience the <br />
                  <span className="text-white">Real Elegance</span>
                </h2>
                
                <p className="text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
                  While our gallery captures the beauty, the true essence of luxury living 
                  must be experienced firsthand. Feel the quality materials, breathe the 
                  thoughtfully designed spaces, and envision your life unfolding at RU Residencies.
                </p>
                
                <div className="space-y-4">
                  <Link href="/schedule-viewing" className="block">
                    <div
                      className="
                        group relative
                        inline-flex items-center justify-center
                        rounded-xl
                        px-10 py-4
                        text-base font-semibold
                        text-gray-900
                        overflow-hidden
                        transition-all duration-500
                        bg-gradient-to-r from-white via-gray-100 to-white
                        hover:shadow-2xl hover:scale-[1.02]
                        border border-white/20
                        cursor-pointer
                        w-full sm:w-auto
                      "
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Home className="w-5 h-5" />
                        Schedule a Private Tour
                        <span className="
                          inline-block transform transition-transform duration-500
                          group-hover:translate-x-2
                        ">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                  
                  <p className="text-gray-400 text-sm mt-6">
                    Limited availability. Contact us today to secure your preferred unit.
                  </p>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-full min-h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-12">
                <div className="text-center max-w-sm">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-xl">
                    <Home className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-white/90 text-xl font-light mb-4">Your Future Home Awaits</p>
                  <p className="text-white/70 text-base">Experience luxury living in the heart of Nugegoda</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">24/7</div>
                      <div className="text-sm text-white/70">Security</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">Premium</div>
                      <div className="text-sm text-white/70">Amenities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">Prime</div>
                      <div className="text-sm text-white/70">Location</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">Luxury</div>
                      <div className="text-sm text-white/70">Finishes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="
          fixed inset-0 z-[9999]
          bg-gradient-to-br from-black via-gray-900 to-black
          flex items-center justify-center
          p-4
          animate-in fade-in duration-300
          backdrop-blur-lg
        ">
          <button
            onClick={() => setSelectedImage(null)}
            className="
              absolute top-6 right-6
              w-12 h-12
              rounded-xl
              bg-white/10 backdrop-blur-sm
              flex items-center justify-center
              text-white
              hover:bg-white/20
              transition-all duration-300
              z-50
              border border-white/10
              hover:scale-110
            "
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => navigateImage('prev')}
            className="
              absolute left-6 top-1/2 -translate-y-1/2
              w-12 h-12
              rounded-xl
              bg-white/10 backdrop-blur-sm
              flex items-center justify-center
              text-white
              hover:bg-white/20
              transition-all duration-300
              z-50
              border border-white/10
              hover:scale-110
            "
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => navigateImage('next')}
            className="
              absolute right-6 top-1/2 -translate-y-1/2
              w-12 h-12
              rounded-xl
              bg-white/10 backdrop-blur-sm
              flex items-center justify-center
              text-white
              hover:bg-white/20
              transition-all duration-300
              z-50
              border border-white/10
              hover:scale-110
            "
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-6xl h-full">
            {(() => {
              const image = galleryImages.find(img => img.id === selectedImage)
              if (!image) return null
              
              const sloganIndex = image.id - 1
              
              return (
                <div className="flex flex-col lg:flex-row h-full gap-8">
                  <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                  
                  <div className="lg:w-96 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">CATEGORY</p>
                        <p className="text-white font-semibold text-lg capitalize">{image.category}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-light text-white mb-6 leading-tight">
                      {genericSlogans[sloganIndex % genericSlogans.length]}
                    </h3>
                    
                    <div className="space-y-8">
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="text-sm text-gray-300 font-semibold mb-4">FEATURES & AMENITIES</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3 text-white">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            Premium imported finishes
                          </li>
                          <li className="flex items-center gap-3 text-white">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            Smart home integration
                          </li>
                          <li className="flex items-center gap-3 text-white">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            Energy-efficient design
                          </li>
                          <li className="flex items-center gap-3 text-white">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            24/7 concierge service
                          </li>
                        </ul>
                      </div>
                      
                      <div className="pt-6 border-t border-white/10">
                        <Link href="/schedule-viewing" className="block">
                          <div
                            className="
                              w-full
                              py-4
                              rounded-xl
                              bg-gradient-to-r from-white to-gray-200
                              text-gray-900
                              text-center
                              font-semibold
                              transition-all duration-300
                              hover:shadow-2xl hover:scale-[1.02]
                              cursor-pointer
                              border border-white/20
                            "
                          >
                            Book Your Private Tour
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
          
          <div className="
            absolute bottom-8 left-1/2 -translate-x-1/2
            px-6 py-2.5
            rounded-xl
            bg-white/10 backdrop-blur-md
            text-white text-sm font-medium
            border border-white/10
            flex items-center gap-2
          ">
            <span className="text-gray-300">Image</span>
            {filteredImages.findIndex(img => img.id === selectedImage) + 1} 
            <span className="text-gray-300">of</span> 
            {filteredImages.length}
          </div>
        </div>
      )}
    </>
  )
}