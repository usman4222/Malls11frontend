"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = [
  {
    id: 1,
    question: "What do you need to start working?",
    answer:
      "To get started, I'll need a clear brief about your project requirements, any existing brand materials (logos, colors, fonts), content for the website, and access to your hosting/domain if you have one. We'll also discuss your timeline and budget during our initial consultation.",
  },
  {
    id: 2,
    question: "Will all pages be responsive and mobile-friendly?",
    answer:
      "All websites I create are fully responsive and optimized for mobile devices. I ensure your site looks great and functions perfectly on desktops, tablets, and smartphones. Mobile-first design is a standard part of my development process.",
  },
  {
    id: 3,
    question: "Can you customize or redesign an existing website?",
    answer:
      "Yes, I will redesign, customize, or fix errors in an existing website also according to your requirements.",
  },
  {
    id: 4,
    question: "How long does it take to complete a project?",
    answer:
      "Project timelines vary depending on complexity and scope. A simple landing page typically takes 3-7 days, while a full website with multiple pages and custom features can take 2-4 weeks. I'll provide you with a detailed timeline during our project discussion.",
  },
  {
    id: 5,
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, I offer ongoing support and maintenance services. This includes regular updates, security monitoring, backup management, and technical support. I provide different maintenance packages to suit various needs and budgets.",
  },
]

export default function FreelancerFaq() {
  const [expandedItems, setExpandedItems] = useState([]) 

  const toggleItem = (id) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

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
