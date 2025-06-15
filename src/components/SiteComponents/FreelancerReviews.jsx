"use client"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, RotateCcw } from "lucide-react"

const reviewsData = [
    {
        id: 1,
        user: {
            name: "richard_sus",
            avatar: "R",
            country: "United States",
            flag: "🇺🇸",
            isRepeatClient: true,
        },
        rating: 5,
        date: "1 month ago",
        review:
            "Great work! You paid close attention to my needs, and the outcome was amazing. You created a mobile-responsive website that keeps users engaged and allows them to locate what they need efficiently. Thanks once more",
        price: "PKR4,200-PKR28,400",
        duration: "3 days",
        sellerResponse:
            "Thank you so much for your kind words! It was a pleasure working with you on this project. I'm thrilled that you're happy with the mobile-responsive website. Looking forward to working with you again!",
        helpful: { yes: 12, no: 1 },
    },
    {
        id: 2,
        user: {
            name: "sarah_johnson",
            avatar: "S",
            country: "Canada",
            flag: "🇨🇦",
            isRepeatClient: false,
        },
        rating: 5,
        date: "2 weeks ago",
        review:
            "Excellent communication and delivered exactly what I needed. The website looks professional and works perfectly on all devices. Highly recommend!",
        price: "PKR15,000-PKR35,000",
        duration: "5 days",
        sellerResponse:
            "Thank you for the wonderful review! I'm glad you're satisfied with the website. It was great working with you and I appreciate your clear requirements.",
        helpful: { yes: 8, no: 0 },
    },
    {
        id: 3,
        user: {
            name: "mike_tech",
            avatar: "M",
            country: "United Kingdom",
            flag: "🇬🇧",
            isRepeatClient: true,
        },
        rating: 4,
        date: "3 weeks ago",
        review:
            "Good work overall. The project was completed on time and met most of my requirements. There were a few minor adjustments needed, but the seller was quick to fix them.",
        price: "PKR8,500-PKR22,000",
        duration: "7 days",
        sellerResponse:
            "Thank you for your feedback! I'm glad we could address all the adjustments quickly. Your satisfaction is my priority, and I appreciate your patience during the revision process.",
        helpful: { yes: 6, no: 2 },
    },
]

export default function FreelancerReviews() {
    const [expandedResponses, setExpandedResponses] = useState([])

    const toggleResponse = (id) => {
        setExpandedResponses((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Reviews</h1>
                    <p className="text-gray-600">See what my clients say about working with me</p>
                </div>

                {/* Reviews */}
                <div className="space-y-6">
                    {reviewsData.map((review) => {
                        const isResponseExpanded = expandedResponses.includes(review.id)

                        return (
                            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                                {/* Review Header */}
                                <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {review.user.avatar}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900">{review.user.name}</h3>
                                            {review.user.isRepeatClient && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                    <RotateCcw className="w-3 h-3" />
                                                    Repeat Client
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm">{review.user.flag}</span>
                                            <span className="text-sm text-gray-600">{review.user.country}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {renderStars(review.rating)}
                                                <span className="font-semibold ml-1">{review.rating}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="mb-4">
                                    <p className="text-gray-700 leading-relaxed mb-4">{review.review}</p>

                                    <div className="flex items-center gap-8 text-sm">
                                        <div>
                                            <span className="text-gray-500">Price: </span>
                                            <span className="font-medium">{review.price}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Duration: </span>
                                            <span className="font-medium">{review.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Seller Response */}
                                <div className="border-t pt-4">
                                    <button
                                        onClick={() => toggleResponse(review.id)}
                                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mb-3"
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face"
                                            alt="Seller"
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span>Seller's Response</span>
                                        {isResponseExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    {isResponseExpanded && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <p className="text-gray-700 text-sm leading-relaxed">{review.sellerResponse}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Show More Button */}
                <div className="mt-8 text-center">
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Show More Reviews
                    </button>
                </div>

                {/* Summary Stats */}
                <div className="mt-12">
                    <div className="bg-white rounded-lg shadow-sm border p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Review Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
                                <div className="text-sm text-gray-600">Average Rating</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600 mb-2">127</div>
                                <div className="text-sm text-gray-600">Total Reviews</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
                                <div className="text-sm text-gray-600">Repeat Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
