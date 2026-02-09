'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Check, Shield, Car, Users, Building, Dumbbell, Coffee, Wifi, Wind, Banknote, Landmark, FileText } from 'lucide-react'

export default function AmenitiesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const amenities = [
    {
      id: 'pool',
      title: 'Rooftop Swimming Pool',
      description: 'Relax and unwind in our serene rooftop pool with panoramic city views',
      category: 'leisure',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
      features: ['Temperature controlled', 'Panoramic views', 'Sunset seating', 'Poolside lounge']
    },
    {
      id: 'gym',
      title: 'Fully-Equipped Gymnasium',
      description: 'State-of-the-art fitness center with personal training available',
      category: 'fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
      features: ['24/7 access', 'Cardio & weights', 'Yoga studio', 'Personal trainers']
    },
    {
      id: 'reception',
      title: 'Reception & Concierge',
      description: '24/7 concierge service with valet and personal assistance',
      category: 'services',
      image: '/images/reception.jpg',
      features: ['24/7 concierge', 'Valet service', 'Package handling', 'Guest services']
    },
    {
      id: 'parking',
      title: 'Reserved & Visitor Parking',
      description: 'Secure underground parking with EV charging stations',
      category: 'services',
      image: '/images/parking.jpg',
      features: ['Resident parking', 'Visitor slots', 'EV charging', '24/7 security']
    },
    {
      id: 'conference',
      title: 'Executive Conference Room',
      description: 'Fully-equipped meeting space for business needs',
      category: 'business',
      image: '/images/confernce.jpg',
      features: ['Video conferencing', 'High-speed WiFi', 'Catering available', 'AV equipment']
    },
    {
      id: 'security',
      title: '24/7 Advanced Security',
      description: 'Multi-layered security with biometric access',
      category: 'security',
      image: '/images/cctv.jpg',
      features: ['Biometric access', 'CCTV surveillance', 'Security personnel', 'Emergency response']
    },
    {
      id: 'lifts',
      title: 'Premium Elevators',
      description: 'Modern elevators with mirror finishes for convenient access',
      category: 'building',
      image: '/images/elevator.jpg',
      features: ['Dual elevators', 'Mirror finished', 'Reliable service', '24/7 operation']
    },
    {
      id: 'disposal',
      title: 'Advanced Waste Management',
      description: 'Eco-friendly disposal system on every floor',
      category: 'services',
      image: '/images/waste.webp',
      features: ['Floor-level disposal', 'Recycling system', 'Odor control', 'Daily collection']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Amenities', icon: <Building className="w-4 h-4" /> },
    { id: 'leisure', label: 'Leisure', icon: <Coffee className="w-4 h-4" /> },
    { id: 'fitness', label: 'Fitness', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Users className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'business', label: 'Business', icon: <Wifi className="w-4 h-4" /> },
  ]

  const filteredAmenities = activeCategory === 'all' 
    ? amenities 
    : amenities.filter(amenity => amenity.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Luxury Amenities"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm text-white/80 mb-8">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span>Amenities</span>
              </div>
              
              <h1 className={`font-serif text-5xl lg:text-6xl font-light text-white mb-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Elevated Living
              </h1>
              <p className={`text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-2xl transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Premium amenities designed for comfort, convenience, and luxury at RU Residencies.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap
                  transition-all duration-300 flex-shrink-0
                  ${activeCategory === category.id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {category.icon}
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAmenities.map((amenity, index) => (
            <div
              key={amenity.id}
              className={`
                group relative overflow-hidden
                bg-white rounded-2xl border border-gray-100
                shadow-sm hover:shadow-2xl
                transition-all duration-500
                hover:-translate-y-2
                ${loaded ? 'opacity-100' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                    amenity.id === 'reception' ? 'object-top' : 
                    amenity.id === 'parking' ? 'object-center' :
                    amenity.id === 'conference' ? 'object-center' :
                    amenity.id === 'security' ? 'object-center' :
                    amenity.id === 'lifts' ? 'object-cover' :
                    amenity.id === 'disposal' ? 'object-center' : ''
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {amenity.category.charAt(0).toUpperCase() + amenity.category.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-light text-gray-900 mb-2">
                  {amenity.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {amenity.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  {amenity.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:via-black/5 group-hover:to-black/10 transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Loan Section - Updated with better image */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-navy-700 to-blue-800 shadow-md">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-light text-gray-900">
                  Home Loan Assistance
                </h2>
              </div>
              <p className="text-gray-600 text-lg mb-8">
                We provide comprehensive home loan assistance through our partnerships with leading 
                Sri Lankan financial institutions. Get expert guidance for your property financing needs in LKR.
              </p>
              
              <div className="space-y-4">
                {[
                  'Loan application assistance',
                  'Multiple bank tie-ups available',
                  'Documentation guidance',
                  'Quick processing support',
                  'Competitive LKR interest rates',
                  'Flexible repayment options'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/schedule-viewing">
                  <button className="
                    group relative
                    inline-flex items-center
                    rounded-full
                    px-8 py-3.5
                    text-sm font-medium
                    text-white
                    overflow-hidden
                    transition-all duration-500
                    before:absolute before:inset-0 
                    before:bg-gradient-to-r before:from-navy-700 before:to-blue-800
                    before:translate-x-[-100%] before:transition-transform before:duration-500
                    hover:before:translate-x-0
                    hover:shadow-2xl
                    border border-navy-700
                  ">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Loan Assistance
                      <ChevronRight className="w-4 h-4 transform transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Changed to a more appropriate Sri Lankan/Asian financial image */}
              <Image
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
                alt="Home Loan Assistance"
                fill
                className="object-cover"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-700/30 via-blue-800/20 to-transparent" />
              
              {/* Sri Lankan Rupee Symbol Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <div className="inline-block p-6 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl mb-6">
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-4xl font-bold text-navy-700">Rs</div>
                      <div className="text-5xl font-bold text-navy-700">LKR</div>
                      <div className="text-4xl font-bold text-navy-700">₨</div>
                    </div>
                    <div className="text-lg text-gray-700 font-medium mt-4">Sri Lankan Rupee Financing</div>
                  </div>
                  <div className="mt-4">
                    <div className="text-white text-base font-medium bg-gradient-to-r from-navy-700/90 to-blue-800/90 backdrop-blur-sm px-6 py-3 rounded-full inline-block">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4" />
                        <span>Local Currency Home Loans</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-black text-white py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-light mb-6">
            Experience Premium Living
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a tour to experience our world-class amenities firsthand. 
            See how RU Residencies redefines luxury living in Nugegoda.
          </p>
          
          <Link href="/schedule-viewing">
            <button className="
              group relative
              inline-flex items-center
              rounded-full
              px-10 py-4
              text-sm font-medium
              text-gray-900
              overflow-hidden
              transition-all duration-500
              before:absolute before:inset-0 
              before:bg-gradient-to-r before:from-white before:to-gray-200
              before:translate-x-[-100%] before:transition-transform before:duration-500
              hover:before:translate-x-0
              hover:text-gray-900
              hover:shadow-2xl
              border border-white/20
            ">
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Private Tour
                <ChevronRight className="w-4 h-4 transform transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}