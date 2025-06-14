import { Star, Clock, MapPin, Calendar, Truck, RotateCcw, Check, ChevronDown, Info, Ban } from "lucide-react"
import { useState } from "react";
import * as Tooltip from '@radix-ui/react-tooltip';

const packages = {
    basic: {
        title: "Kickstarter",
        price: "PKR 44,552",
        description: "Simple Landing Page Upto 5 Sections + Responsive + Functional",
        delivery: "4-day delivery",
        revisions: "Unlimited Revisions",
        features: [
            { text: "Functional website", available: true },
            { text: "1 page", available: true },
            { text: "E-commerce functionality", available: false },
            { text: "Payment integration", available: true },
            { text: "Hosting setup", available: true },
            { text: "Social media icons", available: true }
        ]
    },
    standard: {
        title: "Startup",
        price: "PKR 75,000",
        description: "Multi-page website up to 5 pages + Contact Form + SEO + Responsive",
        delivery: "6-day delivery",
        revisions: "Unlimited Revisions",
        features: [
            { text: "Functional website", available: true },
            { text: "5 pages", available: true },
            { text: "E-commerce functionality", available: true },
            { text: "Payment integration", available: true },
            { text: "Hosting setup", available: true },
            { text: "Social media icons", available: true }
        ]
    },
    premium: {
        title: "Enterprise",
        price: "PKR 120,000",
        description: "Full custom website with advanced features, admin panel & integrations",
        delivery: "10-day delivery",
        revisions: "Unlimited Revisions",
        features: [
            { text: "Functional website", available: true },
            { text: "Unlimited pages", available: true },
            { text: "E-commerce functionality", available: true },
            { text: "Payment integration", available: true },
            { text: "Hosting setup", available: true },
            { text: "Social media icons", available: true }
        ]
    }
};

export default function FreelancerProfile() {


    const [selected, setSelected] = useState("basic");

    const data = packages[selected];


    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Header */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                                            alt="Mohammad Sanjid"
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <h1 className="text-xl font-semibold text-gray-900">Mohammad Sanjid</h1>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white">
                                                Admin's Choice
                                            </span>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-600 text-green-600">
                                                • Online
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600">Welcome to Expert Profile Here Turning Your Ideas into Reality!</p>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="text-sm font-medium ml-1">4.9</span>
                                            <span className="text-sm text-gray-500">(321)</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Level 2
                                            </span>
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Contact me
                                        </button>
                                        <button className="flex-1 sm:flex-none px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                            📅 Book a consultation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">From</p>
                                            <p className="font-medium">Bangladesh</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Avg. response time</p>
                                            <p className="font-medium">1 hour</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 text-gray-500 flex items-center justify-center">🌐</div>
                                        <div>
                                            <p className="text-sm text-gray-500">Languages</p>
                                            <p className="font-medium">Bengali, English</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Member since</p>
                                            <p className="font-medium">Dec 2023</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Truck className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-500">Last delivery</p>
                                            <p className="font-medium">1 day</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    Greetings, I'm a skilled full stack developer passionate about translating ideas into compelling
                                    digital experiences. With over 4 years of practical experience, I've honed my abilities to provide
                                    exceptional Web and Mobile application solutions that suit your requirements. My Expertise are
                                    includes- PHP, HTML5, CSS3, JavaScript, flutter, Dart, etc. Are you eager to enhance your startup or
                                    existing business? Drop me a message anytime! Reach out, and let's discuss how we can improve your
                                    online presence together.

                                    Greetings, I'm a skilled full stack developer passionate about translating ideas into compelling digital experiences. With over 4 years of practical experience, I've honed my abilities to provide exceptional Web and Mobile application solutions that suit your requirements. My Expertise are includes- PHP, HTML5, CSS3, JavaScript, flutter, Dart, etc. Are you eager to enhance your startup or existing business? Drop me a message anytime! Reach out, and let's discuss how we can improve your online presence together.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border sticky top-6 overflow-hidden">
                            <div className="border-b">
                                <div className="flex">
                                    {["basic", "standard", "premium"].map((pkg) => (
                                        <button
                                            key={pkg}
                                            className={`flex-1 py-3 cursor-pointer px-4 text-center text-sm font-medium ${selected === pkg
                                                ? "border-b-2 border-black bg-gray-100 text-black"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            onClick={() => setSelected(pkg)}
                                        >
                                            {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">{data.title}</h3>
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-2xl font-bold">{data.price}</span>
                                        <Tooltip.Provider>
                                            <Tooltip.Root>
                                                <Tooltip.Trigger asChild>
                                                    <div className="mt-5 cursor-pointer">
                                                        <Info className="w-5 h-5 text-gray-500" />
                                                    </div>
                                                </Tooltip.Trigger>

                                                <Tooltip.Portal>
                                                    <Tooltip.Content
                                                        className="bg-black text-white text-xs rounded px-2 py-1 shadow-lg w-48"
                                                        side="top"
                                                        sideOffset={5}
                                                    >
                                                        To keep things simple, Malls 11 may round up prices that contain decimals.
                                                        The number you see here is the price used at checkout
                                                        <Tooltip.Arrow className="fill-black" />
                                                    </Tooltip.Content>
                                                </Tooltip.Portal>
                                            </Tooltip.Root>
                                        </Tooltip.Provider>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">{data.description}</p>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{data.delivery}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RotateCcw className="w-4 h-4" />
                                        <span>{data.revisions}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {data.features.map((feature, idx) => (
                                        <div key={idx} className={`flex items-center gap-2 text-sm ${feature.available ? "" : "text-gray-400"}`}>
                                            {feature.available ? (
                                                <Check className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <Ban className="w-4 h-4 text-gray-300" />
                                            )}
                                            <span>{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full px-4 py-2 cursor-pointer bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center">
                                    Continue
                                    <span className="ml-2">→</span>
                                </button>

                                <button className="w-full px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
                                    Contact me
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
