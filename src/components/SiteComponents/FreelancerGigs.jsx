import { Star } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserGigs } from "../../actions/gig/gigAction"
import { Link, useParams } from "react-router-dom"

export default function FreelancerGigs() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { gigs, loadingGigs } = useSelector((state) => state.gigs)
  const { currentUser } = useSelector((state) => state.user)

  console.log("gigs", gigs);


  useEffect(() => {
    if (id) {
      dispatch(getUserGigs(id))
    }
  }, [dispatch, id])

  return (
    <div className=" bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Services</h1>
          <p className="text-gray-600">Choose from my professional service offerings</p>
        </div>

        {loadingGigs ? (
          <div className="text-center text-gray-600 text-lg font-medium">Loading gigs...</div>
        ) : gigs?.length === 0 ? (
          <div className="text-center text-gray-600 text-lg font-medium">No gigs found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <Link to={`/freelancer-gig/${gig._id}`}>
                <div
                  key={gig._id}
                  className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`relative h-48 bg-gradient-to-br from-blue-900 via-green-500 to-teal-400 p-4 text-white`}>
                    <div className="flex items-start justify-between h-full">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 leading-tight">{gig.title}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl">💼</span>
                          <span className="text-sm bg-white/20 px-2 py-1 rounded">{gig.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={currentUser?.profile_image || "https://placehold.co/24x24?text=U"}
                        alt={currentUser?.username || "User"}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-900">{currentUser?.username || "Freelancer"}</span>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2 hover:underline">{gig.description}</p>

                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium ml-1">4.9</span>
                      <span className="text-sm text-gray-500">(99)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">Rate: </span>
                        <span className="text-lg font-bold text-gray-900">
                          PKR {gig.min_hourly_rate || "N/A"} – PKR {gig.max_hourly_rate || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {/* <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Choose any of my services above or contact me directly to discuss your custom requirements.
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
        </div> */}
      </div>
    </div>
  )
}
