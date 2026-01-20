'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Close mobile menu on route change
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const navItems = [
    { href: '/residences', label: 'Residences' },
    { href: '/amenities', label: 'Amenities' },
    { href: '/location', label: 'Location' },
    { href: '/gallery', label: 'Gallery' },
  ]

  return (
    <>
      <header className={`
        fixed top-0 inset-x-0 z-50 
        transition-all duration-700
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-4' 
          : 'bg-white/90 backdrop-blur-sm py-6'
        }
      `}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* BRAND - Enhanced with animation */}
            <div 
              className="
                flex items-center gap-4 
                group cursor-pointer
                transform transition-transform duration-500
                hover:scale-[1.02]
              "
              onMouseEnter={() => setActiveLink('')}
            >
              <div className="
                relative 
                w-12 h-12 
                overflow-hidden 
                rounded-xl 
                bg-gradient-to-br from-gray-900 to-black
                group-hover:from-gray-800 group-hover:to-black
                transition-all duration-500
                shadow-lg group-hover:shadow-xl
              ">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <Image
                  src="/images/ru residencies logo (1).png"
                  alt="RU Residencies"
                  width={48}
                  height={48}
                  priority
                  className="
                    relative z-10
                    transform transition-transform duration-700
                    group-hover:scale-110
                  "
                />
              </div>

              <div className="flex flex-col">
                <span className="
                  font-serif text-2xl font-light text-gray-900 leading-tight
                  tracking-wide
                ">
                  RU Residencies
                </span>
                <span className="
                  text-xs tracking-[0.3em] text-gray-500 mt-1
                  transform transition-all duration-500
                  group-hover:translate-x-1
                ">
                  NUGEGODA
                </span>
              </div>
            </div>

            {/* DESKTOP NAV LINKS - Enhanced with hover effects */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <NavLink 
                  key={item.href}
                  href={item.href}
                  isActive={activeLink === item.href}
                  onHover={() => setActiveLink(item.href)}
                />
              ))}
            </nav>

            {/* CTA BUTTON - Premium styling */}
            <div className="hidden lg:flex items-center gap-6">
              <div
                className="
                  group relative
                  inline-flex items-center
                  rounded-full
                  px-8 py-3
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
                onMouseEnter={() => setActiveLink('contact')}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Schedule a Viewing
                  <span className="
                    inline-block transform transition-transform duration-500
                    group-hover:translate-x-1
                  ">
                    →
                  </span>
                </span>
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="
                lg:hidden
                relative
                w-10 h-10
                rounded-full
                flex items-center justify-center
                bg-gray-100
                hover:bg-gray-200
                transition-all duration-300
                group
              "
            >
              <div className="relative w-6 h-6">
                <Menu className={`
                  absolute inset-0 w-full h-full
                  text-gray-700
                  transition-all duration-500
                  ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100'}
                `} />
                <X className={`
                  absolute inset-0 w-full h-full
                  text-gray-700
                  transition-all duration-500
                  ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}
                `} />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU - Fixed height issue */}
        <div className={`
          lg:hidden
          absolute inset-x-0 top-full
          bg-white/95 backdrop-blur-lg
          border-t border-gray-100
          overflow-hidden
          transition-all duration-700
          ${isMobileMenuOpen 
            ? 'max-h-screen opacity-100 visible'  // Changed from max-h-96 to max-h-screen
            : 'max-h-0 opacity-0 invisible'
          }
        `}>
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="
                  block
                  text-lg font-light text-gray-700
                  py-3
                  border-b border-gray-100
                  transition-all duration-300
                  hover:text-gray-900 hover:pl-4
                  hover:border-gray-300
                  cursor-pointer
                "
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </div>
            ))}
            <div
              className="
                block w-full
                rounded-xl
                bg-gradient-to-r from-gray-900 to-black
                text-white
                text-center
                py-4
                text-sm font-medium
                transition-transform duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
                shadow-lg
                cursor-pointer
              "
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Schedule a Viewing
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Indicator */}
      <div className={`
        fixed top-0 left-0 right-0 h-0.5 z-50
        bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
        transform origin-left
        transition-transform duration-300
        ${isScrolled ? 'scale-x-100' : 'scale-x-0'}
      `} />
    </>
  )
}

function NavLink({
  href,
  isActive,
  onHover,
}: {
  href: string
  children?: React.ReactNode
  isActive?: boolean
  onHover?: () => void
}) {
  // Use the label from the navItems array
  const getLabel = () => {
    const navItems = [
      { href: '/residences', label: 'Residences' },
      { href: '/amenities', label: 'Amenities' },
      { href: '/location', label: 'Location' },
      { href: '/gallery', label: 'Gallery' },
    ]
    const item = navItems.find(item => item.href === href)
    return item ? item.label : ''
  }

  return (
    <div
      className="
        relative
        text-sm font-light
        text-gray-600
        tracking-wide
        transition-colors duration-500
        hover:text-gray-900
        group
        py-2
        cursor-pointer
      "
      onMouseEnter={onHover}
    >
      <span className={`
        relative z-10
        transition-all duration-500
        ${isActive ? 'text-gray-900' : ''}
      `}>
        {getLabel()}
      </span>
      
      {/* Animated underline */}
      <span className={`
        absolute bottom-0 left-0
        h-px w-0
        bg-gradient-to-r from-gray-900 to-black
        transition-all duration-500
        group-hover:w-full
        ${isActive ? 'w-full' : ''}
      `} />
      
      {/* Hover background effect */}
      <span className="
        absolute inset-0 -mx-3 -my-1
        bg-gradient-to-r from-gray-50 to-transparent
        rounded-lg
        opacity-0
        group-hover:opacity-100
        transition-opacity duration-500
        -z-10
      " />
    </div>
  )
}