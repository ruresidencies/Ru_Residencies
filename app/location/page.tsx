// app/location/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  Car, 
  Train, 
  ShoppingBag, 
  Utensils, 
  Building2,
  School,
  Hospital,
  Coffee,

  ChevronRight,
  Navigation
} from 'lucide-react'

export default function LocationPage() {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const locationFeatures = [
    {
      category: 'transport',
      icon: <Car className="w-5 h-5" />,
      title: 'Major Road Access',
      description: 'Direct access to High Level Road & Colombo-Nugegoda Road',
      distance: '1-2 min',
      color: 'from-blue-500 to-blue-600'
    },
    {
      category: 'transport',
      icon: <Train className="w-5 h-5" />,
      title: 'Public Transport',
      description: 'Walking distance to bus stops and tuk-tuk stands',
      distance: '3 min walk',
      color: 'from-green-500 to-green-600'
    },
    {
      category: 'shopping',
      icon: <ShoppingBag className="w-5 h-5" />,
      title: 'Retail & Shopping',
      description: 'Keells Super, Arpico Super Centre, and local markets',
      distance: '5 min drive',
      color: 'from-purple-500 to-purple-600'
    },
    {
      category: 'dining',
      icon: <Utensils className="w-5 h-5" />,
      title: 'Restaurants & Cafes',
      description: 'Wide variety of dining options from local to international',
      distance: '2-10 min',
      color: 'from-amber-500 to-amber-600'
    },
    {
      category: 'education',
      icon: <School className="w-5 h-5" />,
      title: 'Premium Schools',
      description: 'Leading international and local educational institutions',
      distance: '10-15 min',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      category: 'healthcare',
      icon: <Hospital className="w-5 h-5" />,
      title: 'Medical Facilities',
      description: 'Hospitals, clinics, and pharmacies within close proximity',
      distance: '5-10 min',
      color: 'from-rose-500 to-rose-600'
    },
    {
      category: 'business',
      icon: <Building2 className="w-5 h-5" />,
      title: 'Business District',
      description: 'Easy commute to Colombo City Centre and business hubs',
      distance: '20-25 min',
      color: 'from-gray-600 to-gray-700'
    },
    {
      category: 'dining',
      icon: <Coffee className="w-5 h-5" />,
      title: 'Cafes & Bakeries',
      description: 'Popular coffee shops and bakeries for daily essentials',
      distance: '2-5 min',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const categories = [
    { id: 'all', label: 'All', count: locationFeatures.length },
    { id: 'transport', label: 'Transport', count: 2 },
    { id: 'shopping', label: 'Shopping', count: 1 },
    { id: 'dining', label: 'Dining', count: 2 },
    { id: 'education', label: 'Education', count: 1 },
    { id: 'healthcare', label: 'Healthcare', count: 1 },
    { id: 'business', label: 'Business', count: 1 }
  ]

  const filteredFeatures = activeCategory === 'all' 
    ? locationFeatures 
    : locationFeatures.filter(feature => feature.category === activeCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_75%,transparent_75%)] bg-[length:50px_50px]" />
        </div>

        {/* Decorative map dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-900/10 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-block text-sm tracking-[0.3em] text-gray-500 mb-4">
                  PRIME LOCATION
                </span>
                <h1 className="
                  font-serif text-5xl lg:text-7xl 
                  font-light text-gray-900 
                  leading-tight tracking-tight
                  mb-6
                ">
                  The Heart of <br />
                  <span className="text-gray-700">Nugegoda</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Strategically positioned in one of Colombo's most sought-after suburbs, 
                  RU Residencies offers unparalleled connectivity to everything the city has to offer, 
                  while maintaining a serene residential atmosphere.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exact Location</p>
                    <p className="font-medium text-gray-900">Nugegoda, Colombo</p>
                  </div>
                </div>

                <a 
                  href="https://maps.app.goo.gl/yiTfsF9BcchCgnDK6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className="
                      group relative
                      inline-flex items-center
                      rounded-full
                      px-6 py-3
                      text-sm font-medium
                      text-gray-900
                      overflow-hidden
                      transition-all duration-500
                      before:absolute before:inset-0 
                      before:bg-gradient-to-r before:from-gray-900 before:to-black
                      before:translate-x-[-100%] before:transition-transform before:duration-500
                      hover:before:translate-x-0
                      hover:text-white
                      hover:shadow-2xl
                      border border-gray-300
                      cursor-pointer
                    "
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Navigation className="w-4 h-4" />
                      Open in Maps
                      <ChevronRight className="
                        w-4 h-4
                        transform transition-transform duration-500
                        group-hover:translate-x-1
                      " />
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative">
              <div className="
                relative 
                aspect-square
                rounded-3xl 
                overflow-hidden
                shadow-2xl
                group
                bg-gradient-to-br from-gray-100 to-gray-200
              ">
                {/* Google Maps Embed */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3285147970413!2d79.8842676!3d6.871307299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a4085c2c0bb%3A0x5d9c3f7c5a7d9b9c!2sNugegoda!5e0!3m2!1sen!2slk!4v1697212345678!5m2!1sen!2slk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>

                {/* Loading State */}
                {!isMapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-gray-900/20 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-gray-500">Loading map...</p>
                    </div>
                  </div>
                )}

                {/* Map Overlay Elements */}
                <div className="
                  absolute top-6 left-6
                  bg-white/90 backdrop-blur-sm
                  px-4 py-3
                  rounded-xl
                  shadow-lg
                  max-w-xs
                ">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">RU Residencies</p>
                      <p className="text-xs text-gray-500">Nugegoda, Colombo</p>
                    </div>
                  </div>
                </div>

                {/* Pulse Animation */}
                <div className="
                  absolute top-1/2 left-1/2 
                  -translate-x-1/2 -translate-y-1/2
                  w-8 h-8
                  rounded-full
                  bg-gradient-to-br from-gray-900 to-black
                  animate-ping
                  opacity-75
                " />
                <div className="
                  absolute top-1/2 left-1/2 
                  -translate-x-1/2 -translate-y-1/2
                  w-8 h-8
                  rounded-full
                  bg-gradient-to-br from-gray-900 to-black
                  border-4 border-white
                  shadow-xl
                " />
              </div>

              {/* Decorative elements */}
              <div className="
                absolute -bottom-6 -right-6 
                w-48 h-48 
                bg-gradient-to-br from-gray-900/5 to-gray-900/10 
                rounded-3xl 
                -z-10
              " />
            </div>
          </div>
        </div>
      </section>

      {/* Connectivity Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="
              font-serif text-4xl lg:text-5xl 
              font-light text-gray-900 
              mb-6
            ">
              Unmatched Connectivity
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Everything you need is just moments away from your doorstep.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-6 py-3
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
                  text-xs px-2 py-1 rounded-full
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

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFeatures.map((feature, index) => (
              <div
                key={index}
                className="
                  group relative
                  bg-white
                  rounded-2xl
                  p-6
                  border border-gray-100
                  transition-all duration-500
                  hover:shadow-2xl hover:border-gray-200
                  hover:-translate-y-2
                "
              >
                {/* Gradient Corner */}
                <div className={`
                  absolute top-0 right-0
                  w-16 h-16
                  bg-gradient-to-br ${feature.color}
                  rounded-bl-full
                  opacity-0
                  group-hover:opacity-10
                  transition-opacity duration-500
                `} />

                <div className="relative z-10">
                  <div className="
                    w-12 h-12
                    rounded-xl
                    bg-gradient-to-br from-gray-50 to-gray-100
                    flex items-center justify-center
                    mb-4
                    group-hover:scale-110
                    transition-transform duration-500
                  ">
                    <div className={`
                      w-8 h-8
                      rounded-lg
                      bg-gradient-to-br ${feature.color}
                      flex items-center justify-center
                    `}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {feature.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="
                      text-xs font-medium
                      px-3 py-1
                      rounded-full
                      bg-gray-100
                      text-gray-700
                    ">
                      {feature.distance}
                    </span>
                    <ChevronRight className="
                      w-4 h-4 text-gray-400
                      transform transition-transform duration-300
                      group-hover:translate-x-1
                    " />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distance Chart Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="
              font-serif text-4xl lg:text-5xl 
              font-light text-gray-900 
              mb-6
            ">
              Strategic Distances
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Convenient access to Colombo's most important destinations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="
              bg-white
              rounded-3xl
              border border-gray-100
              shadow-xl
              overflow-hidden
            ">
              {/* Chart Header */}
              <div className="
                p-8
                border-b border-gray-100
                bg-gradient-to-r from-gray-50 to-gray-100/50
              ">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium text-gray-900">Travel Times from RU Residencies</h3>
                  <span className="text-sm text-gray-500">Approximate drive times</span>
                </div>
              </div>

              {/* Chart Content */}
              <div className="p-8 space-y-6">
                {[
                  { destination: 'Colombo City Centre', time: '20-25 min', color: 'from-gray-900 to-black' },
                  { destination: 'Bandaranaike International Airport', time: '45-50 min', color: 'from-blue-500 to-blue-600' },
                  { destination: 'Colombo Port City', time: '25-30 min', color: 'from-amber-500 to-amber-600' },
                  { destination: 'Major Hospitals', time: '5-15 min', color: 'from-rose-500 to-rose-600' },
                  { destination: 'International Schools', time: '10-20 min', color: 'from-indigo-500 to-indigo-600' },
                  { destination: 'Shopping Malls', time: '5-20 min', color: 'from-purple-500 to-purple-600' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-3 h-3
                        rounded-full
                        bg-gradient-to-br ${item.color}
                        group-hover:scale-125
                        transition-transform duration-300
                      `} />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {item.destination}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="
                        w-32 h-2
                        bg-gray-200
                        rounded-full
                        overflow-hidden
                      ">
                        <div 
                          className={`
                            h-full
                            bg-gradient-to-r ${item.color}
                            rounded-full
                            transition-all duration-1000
                            ${isMapLoaded ? 'w-full' : 'w-0'}
                          `}
                          style={{ transitionDelay: `${index * 200}ms` }}
                        />
                      </div>
                      <span className="
                        font-medium text-gray-900
                        min-w-[80px] text-right
                      ">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="
            w-20 h-20
            rounded-2xl
            bg-gradient-to-br from-white/10 to-white/5
            flex items-center justify-center
            mx-auto mb-8
            border border-white/10
          ">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="
            font-serif text-4xl lg:text-5xl 
            font-light 
            mb-8
          ">
            Experience the Location
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            Visit us to experience first-hand the convenience and lifestyle 
            that comes with living at RU Residencies' prime location.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/schedule-viewing" className="block">
              <div
                className="
                  group relative
                  inline-flex items-center
                  rounded-full
                  px-10 py-4
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
                  Visit Our Location
                  <span className="
                    inline-block transform transition-transform duration-500
                    group-hover:translate-x-2
                  ">
                    →
                  </span>
                </span>
              </div>
            </Link>
            
            <a 
              href="https://maps.app.goo.gl/yiTfsF9BcchCgnDK6"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className="
                  inline-flex items-center
                  rounded-full
                  px-10 py-4
                  text-base font-medium
                  text-white
                  border border-white/30
                  transition-all duration-300
                  hover:bg-white/10 hover:border-white/50
                  hover:shadow-lg
                  cursor-pointer
                "
              >
                Get Directions
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}