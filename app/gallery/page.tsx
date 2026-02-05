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
  Building,
  Camera,
  Sparkles
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
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_75%,transparent_75%)] bg-[length:50px_50px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-900/5 to-gray-900/10 mb-8 border border-gray-100">
            <Camera className="w-10 h-10 text-gray-900" />
          </div>

          <h1 className="
            font-serif text-5xl lg:text-7xl 
            font-light text-gray-900 
            leading-tight tracking-tight
            mb-6
          ">
            The RU Residencies <br />
            <span className="text-gray-700">Experience</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            A visual celebration of premium living spaces where every detail tells a story of excellence.
          </p>
        </div>
      </section>

      {/* Gallery Filter */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-4 py-2
                  rounded-full
                  text-sm font-medium
                  transition-all duration-300
                  ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-gray-900 to-black text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                  flex items-center gap-2
                `}
              >
                {category.label}
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${activeCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-300 text-gray-700'
                  }
                `}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="
                    group relative
                    overflow-hidden
                    rounded-2xl
                    bg-gray-100
                    aspect-[4/3]
                    cursor-pointer
                    transition-all duration-500
                    hover:shadow-2xl hover:scale-[1.02]
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
                    
                    <div className="
                      absolute inset-0
                      bg-gradient-to-t from-gray-900/80 via-gray-900/0 to-transparent
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity duration-500
                    " />
                    
                    {/* Overlay with generic slogan */}
                    <div className="
                      absolute bottom-0 left-0 right-0
                      p-6
                      transform translate-y-full
                      group-hover:translate-y-0
                      transition-transform duration-500
                    ">
                      <div className="text-white">
                        <h3 className="text-lg font-medium mb-1">
                          {genericSlogans[index % genericSlogans.length]}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Camera className="w-3 h-3" />
                          <span className="capitalize">{image.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="
                      absolute top-4 right-4
                      w-10 h-10
                      rounded-full
                      bg-white/90 backdrop-blur-sm
                      flex items-center justify-center
                      transform translate-y-2 opacity-0
                      group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-500
                    ">
                      <Maximize2 className="w-4 h-4 text-gray-900" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-3">No images found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try selecting a different category to view our gallery.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="
            bg-gradient-to-br from-gray-900 to-black
            rounded-3xl
            overflow-hidden
            shadow-2xl
          ">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="p-12 lg:p-16 text-white">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 mb-8">
                  <Sparkles className="w-7 h-7" />
                </div>
                
                <h2 className="
                  font-serif text-4xl lg:text-5xl 
                  font-light 
                  mb-6
                ">
                  Beyond the Lens
                </h2>
                
                <p className="text-gray-300 text-lg mb-8 max-w-lg">
                  These images capture moments, but the true essence of luxury living 
                  must be experienced in person. Feel the quality, breathe the space, 
                  and envision your life at RU Residencies.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/schedule-viewing" className="block">
                    <div
                      className="
                        group relative
                        inline-flex items-center
                        rounded-full
                        px-8 py-3.5
                        text-base font-medium
                        text-white
                        overflow-hidden
                        transition-all duration-500
                        before:absolute before:inset-0 
                        before:bg-white
                        before:translate-x-[-100%] before:transition-transform before:duration-500
                        hover:before:translate-x-0
                        hover:text-gray-900
                        border border-white/30
                        cursor-pointer
                      "
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Experience It Live
                        <span className="
                          inline-block transform transition-transform duration-500
                          group-hover:translate-x-1
                        ">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                  
                  <Link href="/contact" className="block">
                    <div
                      className="
                        inline-flex items-center
                        rounded-full
                        px-8 py-3.5
                        text-base font-medium
                        text-white
                        border border-white/30
                        transition-all duration-300
                        hover:bg-white/10 hover:border-white/50
                        hover:shadow-lg
                        cursor-pointer
                      "
                    >
                      Request More Photos
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-full min-h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                    <Home className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-white/80 text-lg">Your Future Home Awaits</p>
                  <p className="text-white/60 text-sm mt-2">Schedule your private viewing today</p>
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
          bg-black/95 backdrop-blur-lg
          flex items-center justify-center
          p-4
          animate-in fade-in duration-300
        ">
          <button
            onClick={() => setSelectedImage(null)}
            className="
              absolute top-6 right-6
              w-12 h-12
              rounded-full
              bg-white/10
              flex items-center justify-center
              text-white
              hover:bg-white/20
              transition-all duration-300
              z-50
            "
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => navigateImage('prev')}
            className="
              absolute left-6 top-1/2 -translate-y-1/2
              w-12 h-12
              rounded-full
              bg-white/10
              flex items-center justify-center
              text-white
              hover:bg-white/20
              transition-all duration-300
              z-50
            "
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => navigateImage('next')}
            className="
              absolute right-6 top-1/2 -translate-y-1/2
              w-12 h-12
              rounded-full
              bg-white/10
              flex items-center justify-center
              text-white
              hover:bg-white/20
              transition-all duration-300
              z-50
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
                  <div className="relative flex-1 rounded-2xl overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                  
                  <div className="lg:w-96 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Category</p>
                        <p className="text-white font-medium capitalize">{image.category}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-light text-white mb-4">
                      {genericSlogans[sloganIndex % genericSlogans.length]}
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="text-sm text-gray-300 mb-3">Why Choose RU Residencies?</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-3 text-white text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            Premium finishes throughout
                          </li>
                          <li className="flex items-center gap-3 text-white text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            Strategic Nugegoda location
                          </li>
                          <li className="flex items-center gap-3 text-white text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            Comprehensive amenities
                          </li>
                          <li className="flex items-center gap-3 text-white text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            24/7 security & maintenance
                          </li>
                        </ul>
                      </div>
                      
                      <div className="pt-6 border-t border-white/10">
                        <Link href="/schedule-viewing" className="block">
                          <div
                            className="
                              w-full
                              py-3.5
                              rounded-xl
                              bg-gradient-to-r from-white to-gray-200
                              text-gray-900
                              text-center
                              font-medium
                              transition-all duration-300
                              hover:shadow-xl hover:scale-[1.02]
                              cursor-pointer
                            "
                          >
                            Schedule a Private Tour
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
            absolute bottom-6 left-1/2 -translate-x-1/2
            px-4 py-2
            rounded-full
            bg-white/10 backdrop-blur-sm
            text-white text-sm
            border border-white/10
          ">
            {filteredImages.findIndex(img => img.id === selectedImage) + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </>
  )
}