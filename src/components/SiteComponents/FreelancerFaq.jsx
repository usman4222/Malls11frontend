"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile } from "../../actions/profile/profileAction"
import { useParams } from "react-router-dom"

export default function FreelancerFaq() {
  const [expandedItems, setExpandedItems] = useState([])
  const dispatch = useDispatch()
  const { id } = useParams();
  const { viewedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getUserProfile(id));
    }
  }, [dispatch, id]);


  const toggleItem = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Use user faqs if available, otherwise fallback
  const faqData = Array.isArray(viewedUser?.faqs) && viewedUser.faqs.length > 0
    ? viewedUser.faqs.map((faq, index) => ({
      id: index + 1,
      question: faq.question || `Question ${index + 1}`,
      answer: faq.answer || `No answer provided.`,
    }))
    : "No FAQs available at the moment."

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FAQ</h1>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const isExpanded = expandedItems.includes(item.id)

            return (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                >
                  <span className="text-gray-700 font-medium pr-4">{item.question}</span>
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Feel free to reach out to me directly and I'll be happy to help
              clarify any questions about my services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Contact Me
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
