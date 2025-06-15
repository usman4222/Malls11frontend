import { Calendar } from "lucide-react"
import { useState } from "react"
import PortfolioModal from "./PortfolioModal"

const allProjects = [
  {
    id: 1,
    title: "Seamless Travel Deals Hub",
    description: "I crafted the Premium Booking App website to offer a sleek and efficient booking experience for travelers looking for the best deals.",
    date: "January 2024",
    cost: "$2500-$5000",
    duration: "1-3 months",
    tags: ["Travel & Tourism"],
    additionalTags: 1,
    images: 2,
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Business Website",
    description: "Designed a business website with responsive design, contact forms, and SEO optimization.",
    date: "March 2023",
    cost: "$1500-$3000",
    duration: "1-2 months",
    tags: ["Business"],
    additionalTags: 0,
    images: 3,
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Built an advanced analytics dashboard with interactive charts and real-time data.",
    date: "June 2023",
    cost: "$4000-$7000",
    duration: "2-4 months",
    tags: ["Analytics", "Data"],
    additionalTags: 2,
    images: 4,
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    category: "Dashboard",
  },
  {
    id: 4,
    title: "Tech Platform",
    description: "Developed a scalable tech platform for startups with admin panel and API integrations.",
    date: "Feb 2024",
    cost: "$6000-$10,000",
    duration: "3-6 months",
    tags: ["Tech", "SaaS"],
    additionalTags: 0,
    images: 5,
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    category: "Platform",
  },
  {
    id: 5,
    title: "Service Website Design",
    description: "Designed a service-based website with clean UI/UX and booking functionality.",
    date: "Dec 2023",
    cost: "$2000-$3500",
    duration: "1-2 months",
    tags: ["Services"],
    additionalTags: 0,
    images: 2,
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop",
    category: "Design",
  },
  {
    id: 6,
    title: "E-Commerce Platform",
    description: "Created a fully functional e-commerce platform with payment gateway.",
    date: "May 2024",
    cost: "$7000-$15000",
    duration: "3-6 months",
    tags: ["E-Commerce"],
    additionalTags: 0,
    images: 6,
    featured: false,
    thumbnail: "https://images.unsplash.com/photo-1592503253681-93c2dbfc4e5b?w=300&h=200&fit=crop",
    category: "E-Commerce",
  },
]

export default function FreelancerPortfolio() {
  const [selectedProject, setSelectedProject] = useState(allProjects[0])
  const [showAll, setShowAll] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }


  // Logic for how many to show initially
  const visibleProjects = showAll ? allProjects : allProjects.slice(0, 4)
  const remainingCount = allProjects.length - 4

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
          <div className="w-full h-px bg-gray-200"></div>
        </div>

        {/* Featured Project */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Project Image */}
              <div className="relative bg-[#00C951] p-8 flex items-center justify-center min-h-[300px] lg:min-h-[400px]">
                <div className="relative z-10">
                  <div className="bg-gray-800 rounded-t-lg p-1 w-80">
                    <div className="bg-white rounded-t-md overflow-hidden">
                      {/* <div className="h-4 bg-gray-100 flex items-center px-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                      </div> */}
                      <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full h-48 object-cover" />
                    </div>
                    <div className="bg-gray-800 h-8 rounded-b-lg"></div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <span>📷</span>
                  <span>{selectedProject.images}</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 lg:p-8">
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>From: {selectedProject.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedProject.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                      {tag}
                    </span>
                  ))}
                  {selectedProject.additionalTags > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-500">
                      +{selectedProject.additionalTags}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Project cost</p>
                    <p className="text-lg font-bold text-gray-900">{selectedProject.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Project duration</p>
                    <p className="text-lg font-bold text-gray-900">{selectedProject.duration}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={handleOpenModal}
                  >
                    View Full
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video">
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}

          {!showAll && remainingCount > 0 && (
            <div
              onClick={() => setShowAll(true)}
              className="bg-white rounded-lg shadow-sm border flex flex-col items-center justify-center p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-3xl font-bold text-gray-400 mb-2">+{remainingCount}</div>
              <div className="text-sm text-gray-500 text-center">More Projects</div>
            </div>
          )}
        </div>

      </div>
      {isModalOpen && (
        <PortfolioModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={{
            id: selectedProject.id,
            title: selectedProject.title,
            description: selectedProject.description,
            date: selectedProject.date,
            priceRange: selectedProject.cost, // mapping cost to priceRange
            duration: selectedProject.duration,
            industries: selectedProject.tags, // mapping tags to industries
            images: selectedProject.images
          }}
        />
      )}
    </div>
  )
}
