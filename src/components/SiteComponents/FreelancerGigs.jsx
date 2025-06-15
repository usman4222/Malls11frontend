import { Star, Heart, Video } from "lucide-react"

const services = [
  {
    id: 1,
    title: "SHOPIFY DROPSHIPPING STORE",
    subtitle: "shopify",
    description: "I will build shopify store or dropshipping ecommerce store...",
    price: "23,762",
    gradient: "from-blue-900 via-orange-500 to-orange-400",
    logo: "🛍️",
    orderText: "ORDER NOW!",
  },
  {
    id: 2,
    title: "DESIGN/REDESIGN WORDPRESS WEBSITE",
    subtitle: "ORDER NOW!",
    description: "I will build, design or redesign wordpress website, rebuild...",
    price: "23,762",
    gradient: "from-blue-900 via-yellow-500 to-yellow-400",
    logo: "🌐",
    orderText: "ORDER NOW!",
  },
  {
    id: 3,
    title: "MOBILE APP DEVELOPMENT",
    subtitle: "ORDER NOW!",
    description: "I will do mobile app development, android ios app...",
    price: "44,552",
    gradient: "from-blue-900 via-orange-500 to-pink-500",
    logo: "📱",
    orderText: "ORDER NOW!",
  },
]

export default function FreelancerGigs() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Services</h1>
          <p className="text-gray-600">Choose from my professional service offerings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Service Header with Gradient */}
              <div className={`relative h-48 bg-gradient-to-br ${service.gradient} p-4 text-white`}>
                <div className="absolute top-4 right-4">
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-start justify-between h-full">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 leading-tight">{service.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{service.logo}</span>
                      <span className="text-sm bg-white/20 px-2 py-1 rounded">{service.subtitle}</span>
                    </div>
                    <button className="bg-yellow-400 text-black px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-300 transition-colors">
                      {service.orderText}
                    </button>
                  </div>

                  <div className="ml-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                      alt="Mohammad Sanjid"
                      className="w-16 h-16 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face"
                    alt="Mohammad Sanjid"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">Mohammad Sanjid</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Level 2</span>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-center gap-1 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium ml-1">4.9</span>
                  <span className="text-sm text-gray-500">(319)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">From </span>
                    <span className="text-lg font-bold text-gray-900">PKR {service.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
                  <Video className="w-4 h-4" />
                  <span>Offers video consultations</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Choose any of my services above or contact me directly to discuss your custom requirements. I'm here to
              turn your ideas into reality!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Contact Me Now
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
