import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function PortfolioModal({ isOpen, onClose, project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen || !project) return null


  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    }
  }


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-900">
                Made by <span className="underline">Portfolio Owner</span>
              </span>
            </div>

            <div className="flex items-center gap-4">

              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">From: {project.date}</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h2>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Price range</h4>
                <p className="text-lg font-bold text-gray-900">{project.priceRange}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Project duration</h4>
                <p className="text-lg font-bold text-gray-900">{project.duration}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Industries</h4>
                <div className="flex flex-wrap gap-2">
                  {project.industries.slice(0, 1).map((industry, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      {industry}
                    </span>
                  ))}
                  {project.industries.length > 1 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-500">
                      +{project.industries.length - 1}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden bg-gray-100">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Start Similar Project
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                View More Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
