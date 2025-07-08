"use client"

import { useEffect, useState } from "react"
import { Star, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, RotateCcw, CornerDownLeft, MapPin } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getFreelancerReviews } from "../../actions/reviews/reviewAction"
import { useParams } from "react-router-dom"
import { formatRelativeTime } from "../../utils/formatRelativeTime"


export default function FreelancerReviews({ id }) {
    const [expandedResponses, setExpandedResponses] = useState([])
    const dispatch = useDispatch()
    const { freelancerReviews } = useSelector((state) => state.reviews)

    useEffect(() => {
        if (id) {
            dispatch(getFreelancerReviews(id))
        }
    }, [dispatch, id])

    const toggleResponse = (id) => {
        setExpandedResponses((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))
    }

    return (
        <div className=" bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Reviews</h1>
                    <p className="text-gray-600">See what my clients say about working with me</p>
                </div>

                {/* Reviews */}
                <div className="space-y-6">
                    {freelancerReviews.reviews?.map((review, index) => {
                        // const isResponseExpanded = expandedResponses.includes(review.id)

                        return (
                            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                                {/* Review Header */}
                                <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {review?.client_id?.profile_image && (
                                                <img src={review?.client_id?.profile_image} alt={review?.client_id?.username} className="w-full h-full rounded-full object-cover" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900">{review?.client_id?.username}</h3>
                                        </div>

                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{review?.client_id?.country}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {renderStars(review.rating)}
                                                <span className="font-semibold ml-1">{review.rating}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {review?.createdAt
                                                    ? formatRelativeTime(review?.createdAt)
                                                    : "Unknown date"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="mb-4">
                                    <p className="text-gray-700 leading-relaxed mb-4">{review.review_text}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
