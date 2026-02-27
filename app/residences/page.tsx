// app/residences/page.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function ResidencesPage() {
  const floorPlans = [
    {
      type: 'Type A',
      size: '1,460 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Room & Toilet',
      description: 'Spacious corner unit with optimal natural light and panoramic views.',
      image: '/images/UNIT A-R1_page-0001.jpg',
      features: [
        'Open-plan living & dining',
        'Private balcony access from living room',
        'Walk-in wardrobe in master bedroom',
        'En-suite bathrooms'
      ]
    },
    {
      type: 'Type B',
      size: '1,460 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Room & Toilet',
      description: 'Efficient layout maximizing space and functionality.',
      image: '/images/UNIT B-R1_page-0001.jpg',
      features: [
        'Separate utility area',
        'Built-in kitchen cabinets',
        'All bedrooms with A/C provisions',
        'Maid\'s room with separate entrance'
      ]
    },
    {
      type: 'Type C',
      size: '1,406 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Toilet',
      description: 'Well-proportioned family residence with ample storage.',
      image: '/images/UNIT C-R1_page-0001.jpg',
      features: [
        'Granite kitchen countertops',
        'Premium sanitary fittings',
        'Balcony access from bedrooms',
        'Ample built-in storage'
      ]
    },
    {
      type: 'Type D',
      size: '1,377 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Toilet',
      description: 'Corner unit featuring enhanced privacy and cross-ventilation.',
      image: '/images/UNIT D-R1_page-0001.jpg',
      features: [
        'Extra-large living area',
        'Premium flooring throughout',
        'Dedicated study area',
        'Extended balcony space'
      ]
    },
    {
      type: 'Type E',
      size: '1,439 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Toilet',
      description: 'Elegant design with enhanced living spaces and premium finishes.',
      image: '/images/UNIT E-R1_page-0001.jpg',
      features: [
        'Expansive living area',
        'Designer kitchen with premium fittings',
        'Master bedroom with en-suite',
        'Private balcony access'
      ]
    },
    {
      type: 'Type F',
      size: '1,350 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom',
      description: 'Smart, space-efficient design perfect for modern families.',
      image: '/images/UNIT F-R1_page-0001.jpg',
      features: [
        'Optimized layout for maximum space utilization',
        'Modern kitchen with built-in cabinets',
        'All bedrooms with A/C provisions',
        'Elegant bathroom fixtures'
      ]
    },
    {
      type: 'Type H',
      size: '1,252 sq. ft.',
      layout: '3 Bedroom + 2 Bathroom + Maid\'s Room & Toilet',
      description: 'Premium compact design with all the essential features.',
      image: '/images/UNIT H-R1_page-0001.jpg',
      features: [
        'Efficient use of space',
        'Maid\'s room with attached toilet',
        'Modern kitchen layout',
        'Quality finishes throughout'
      ]
    }
  ]

  const interiorFeatures = [
    {
      category: 'Kitchen',
      items: [
        '10-foot pantry cupboard with granite top',
        'Aluminum-framed glass sliding doors',
        'Elcardo aluminum fittings',
        'Macply cabinet doors'
      ],
      icon: '🏠'
    },
    {
      category: 'Bedrooms',
      items: [
        'Pre-installed A/C units in all bedrooms',
        'Floor-to-ceiling windows',
        'Built-in wardrobes',
        'Premium lighting fixtures'
      ],
      icon: '🛏️'
    },
    {
      category: 'Bathrooms',
      items: [
        'Hot water supply in main bathrooms',
        'Rocell branded sanitaryware',
        'Premium chrome fittings',
        'Anti-slip floor tiles'
      ],
      icon: '🚿'
    },
    {
      category: 'Finishes',
      items: [
        'Lanka Tile floor areas throughout',
        'Aluminum framed windows',
        'Granite countertops',
        'Premium paint finishes'
      ],
      icon: '✨'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_75%,transparent_75%)] bg-[length:50px_50px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-block text-sm tracking-[0.3em] text-gray-500 mb-4">
                  EXQUISITE LIVING
                </span>
                <h1 className="
                  font-serif text-5xl lg:text-7xl 
                  font-light text-gray-900 
                  leading-tight tracking-tight
                  mb-6
                ">
                  Thoughtfully <br />
                  <span className="text-gray-700">Designed Residences</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Experience refined urban living through meticulously crafted apartments 
                  that blend contemporary design with functional elegance. Each residence 
                  is designed to offer unparalleled comfort and sophistication.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link href="/schedule-viewing" className="block">
                  <div
                    className="
                      group relative
                      inline-flex items-center
                      rounded-full
                      px-8 py-4
                      text-base font-medium
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
                
                <Link href="/gallery" className="block">
                  <div
                    className="
                      inline-flex items-center
                      rounded-full
                      px-8 py-4
                      text-base font-medium
                      text-gray-700
                      border border-gray-300
                      transition-all duration-300
                      hover:border-gray-900 hover:text-gray-900
                      hover:shadow-lg
                      cursor-pointer
                    "
                  >
                    View Gallery
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="
                relative 
                aspect-[4/3] lg:aspect-square
                rounded-3xl 
                overflow-hidden
                shadow-2xl
                group
              ">
                {/* Your high-quality residence image */}
                <Image
                  src="/images/gallery4.jpeg"
                  alt="Luxury residence at RU Residencies"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
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

      {/* Floor Plans Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="
              font-serif text-4xl lg:text-5xl 
              font-light text-gray-900 
              mb-6
            ">
              Floor Plans & Layouts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our diverse range of thoughtfully designed residences, 
              each crafted to maximize space, light, and functionality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {floorPlans.map((plan) => (
              <div
                key={plan.type}
                className="
                  group relative
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  border border-gray-100
                  transition-all duration-500
                  hover:shadow-2xl hover:border-gray-200
                "
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
                  {/* Floor plan image */}
                  <Image
                    src={plan.image}
                    alt={`${plan.type} floor plan - ${plan.size}`}
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay gradient for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  
                  {/* Badge */}
                  <div className="
                    absolute top-6 left-6
                    bg-white/90 backdrop-blur-sm
                    px-4 py-2
                    rounded-full
                    text-sm font-medium text-gray-900
                    shadow-sm
                  ">
                    {plan.type}
                  </div>
                  
                  {/* Size badge */}
                  <div className="
                    absolute top-6 right-6
                    bg-gradient-to-r from-gray-900 to-black
                    text-white
                    px-4 py-2
                    rounded-full
                    text-sm font-medium
                    shadow-lg
                  ">
                    {plan.size}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-light text-gray-900 mb-2">
                        {plan.type} Residence
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {plan.layout}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="
                          w-2 h-2 
                          rounded-full 
                          bg-gradient-to-r from-gray-900 to-black
                          flex-shrink-0
                        " />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <Link href="/schedule-viewing" className="block">
                      <div
                        className="
                          inline-flex items-center gap-2
                          text-gray-700
                          font-medium
                          transition-all duration-300
                          hover:text-gray-900 hover:gap-3
                          group
                          cursor-pointer
                        "
                      >
                        View Detailed Specifications
                        <span className="
                          transform transition-transform duration-300
                          group-hover:translate-x-1
                        ">
                          →
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="
              font-serif text-4xl lg:text-5xl 
              font-light text-gray-900 
              mb-6
            ">
              Premium Interior Finishes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Every detail is carefully considered, from premium materials to 
              sophisticated fixtures, ensuring exceptional quality throughout.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {interiorFeatures.map((category) => (
              <div
                key={category.category}
                className="
                  group relative
                  bg-white
                  rounded-2xl
                  p-8
                  border border-gray-100
                  transition-all duration-500
                  hover:shadow-xl hover:border-gray-200
                  hover:-translate-y-2
                "
              >
                <div className="
                  w-12 h-12
                  flex items-center justify-center
                  text-2xl
                  mb-6
                  bg-gradient-to-br from-gray-50 to-gray-100
                  rounded-xl
                  group-hover:from-gray-100 group-hover:to-gray-200
                  transition-all duration-500
                ">
                  {category.icon}
                </div>

                <h3 className="text-xl font-light text-gray-900 mb-6">
                  {category.category}
                </h3>

                <ul className="space-y-4">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="
                        w-1.5 h-1.5 
                        rounded-full 
                        bg-gray-400 
                        mt-2
                        flex-shrink-0
                      " />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Pricing Note */}
          <div className="
            mt-20
            bg-gradient-to-r from-gray-50 to-gray-100/50
            rounded-3xl
            p-12
            text-center
            max-w-4xl mx-auto
            border border-gray-200/50
          ">
            <h3 className="
              font-serif text-3xl font-light text-gray-900 mb-4
            ">
              Exceptional Value Proposition
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Our residences offer unmatched quality and amenities in the heart of Nugegoda. 
              Competitive pricing ensures you receive premium living without compromise.
            </p>
            <a 
              href="tel:+94772112117" 
              className="inline-block"
            >
              <div
                className="
                  inline-flex items-center gap-2
                  text-gray-900 font-medium
                  px-6 py-3
                  bg-white
                  rounded-full
                  border border-gray-300
                  transition-all duration-300
                  hover:border-gray-900 hover:shadow-lg
                  cursor-pointer
                "
              >
                Contact for Detailed Pricing
                <span className="
                  transform transition-transform duration-300
                  group-hover:translate-x-1
                ">
                  →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="
            font-serif text-4xl lg:text-5xl 
            font-light 
            mb-8
          ">
            Experience RU Residencies
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            Visit our show apartment to experience the quality, craftsmanship, 
            and lifestyle that defines RU Residencies.
          </p>
          
          <div className="flex justify-center">
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
                  Schedule Your Viewing
                  <span className="
                    inline-block transform transition-transform duration-500
                    group-hover:translate-x-2
                  ">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}