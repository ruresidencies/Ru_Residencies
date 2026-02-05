export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24">
      {/* Hero Skeleton */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black h-64 lg:h-80">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      </div>
      
      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form Skeleton */}
          <div>
            <div className="mb-10">
              <div className="h-10 bg-gray-200 rounded-xl w-2/3 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-100 rounded-xl w-full max-w-md animate-pulse"></div>
            </div>
            
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded-xl w-1/3 animate-pulse"></div>
                  <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                </div>
              ))}
              
              <div className="h-14 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            <div className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
            <div className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
            <div className="h-40 bg-gray-100 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}