import { useEffect, useState } from 'react'
import { Clock, Globe, Star, Edit2, ArrowLeft, RefreshCcwDot, Check, Info, RotateCcw, Ban, ChevronDown } from 'lucide-react'
import { Button } from "../../components/SiteComponents/ui/button"
import { Card, CardContent } from "../../components/SiteComponents/ui/card"
import { Badge } from "../../components/SiteComponents/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/SiteComponents/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/SiteComponents/ui/tabs"
import { Alert, AlertDescription } from "../../components/SiteComponents/ui/alert"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeGigStatus, getSingleGig } from '../../actions/gig/gigAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from '@radix-ui/react-tooltip'
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


function FreelancerGigDetails() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selected, setSelected] = useState("basic");

    const { id } = useParams();
    const dispatch = useDispatch();

    const { gig } = useSelector((state) => state.gigs)
    const { viewedUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (id) {
            dispatch(getSingleGig(id));
        }
    }, [dispatch, id]);

    const data = packages[selected];


    return (
        <div className="pb-48 bg-gray-50">
            <ToastContainer />
            <div className="bg-background border-b sticky top-0 z-50">
            </div>


            <main className="container mx-auto pr-4 pl-14 py-8 ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-2xl font-semibold mb-4">{gig.title}</h2>
                        <div className="relative aspect-video bg-background rounded-lg overflow-hidden ">
                            <Swiper
                                spaceBetween={10}
                                navigation={true}
                                pagination={{ clickable: true }}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[Navigation, Pagination, Thumbs]}
                                className="h-full w-full border rounded-2xl overflow-hidden"
                            >

                                <SwiperSlide>
                                    <img
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abcdefgh.jpg-zxcSDfgaoQuny6slX4JzwEJAP5wDyv.jpeg"
                                        alt={`Gig image`}
                                        className="object-cover w-full h-full"
                                    />
                                </SwiperSlide>

                            </Swiper>
                        </div>

                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[Thumbs]}
                            className="h-24"
                        >
                            <SwiperSlide>
                                <div className="relative h-full w-full rounded-md overflow-hidden border cursor-pointer">
                                    <img
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abcdefgh.jpg-zxcSDfgaoQuny6slX4JzwEJAP5wDyv.jpeg"
                                        alt={`Thumbnail`}
                                        className="object-cover w-full h-full "
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>


                        <Tabs defaultValue="description" className="w-full">
                            <TabsList>
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="about">About The Seller</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="mt-4">
                                <div className='py-5'>
                                    <h2 className="text-2xl font-semibold mb-4">About this Gig</h2>
                                </div>
                                <div className="prose max-w-none">
                                    <p>{gig.description}</p>
                                </div>
                            </TabsContent>
                            <TabsContent value="about" className="mt-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={viewedUser?.profile_image} />
                                        {/* <AvatarFallback>{gigData.seller.name[0]}</AvatarFallback> */}
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{viewedUser?.username}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span>0</span>
                                            <span>No reviews</span>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="reviews" className="mt-4">
                                <p>No reviews yet.</p>
                            </TabsContent>
                        </Tabs>

                        {/* Related Services */}
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

                    {/* Right Section */}
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
            </main>
        </div>
    )
}


export default FreelancerGigDetails;
