'use client'

import { useEffect, useState } from 'react'
import { Clock, Globe, Star, Edit2, ArrowLeft, RefreshCcwDot, Check } from 'lucide-react'
import { Button } from "../../../components/SiteComponents/ui/button"
import { Card, CardContent } from "../../../components/SiteComponents/ui/card"
import { Badge } from "../../../components/SiteComponents/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/SiteComponents/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/SiteComponents/ui/tabs"
import { Alert, AlertDescription } from "../../../components/SiteComponents/ui/alert"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleGig } from '../../../actions/gig/gigAction'

export default function GigPreview() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id } = useParams();
  const dispatch = useDispatch();

  const { gig } = useSelector((state) => state.gigs);

  console.log("gig", gig);


  useEffect(() => {
    if (id) {
      dispatch(getSingleGig(id));
    }
  }, [dispatch, id]);

  const gigData = {
    title: "UI/UX",
    price: 500.0,
    deliveryTime: "3 Days Delivery",
    revisions: "2 Revisions",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abcdefgh.jpg-zxcSDfgaoQuny6slX4JzwEJAP5wDyv.jpeg",
      "/placeholder.svg?height=400&width=600",
    ],
    description: "Professional UI/UX Design Services",
    seller: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4.9,
      reviews: 150
    },
    relatedServices: [
      {
        id: 1,
        title: "I will design logos and banners",
        price: 50.0,
        image: "/placeholder.svg?height=200&width=300",
        seller: {
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=40&width=40"
        }
      },
      {
        id: 2,
        title: "Social media post design",
        price: 35.0,
        image: "/placeholder.svg?height=200&width=300",
        seller: {
          name: "Mike Johnson",
          avatar: "/placeholder.svg?height=40&width=40"
        }
      },
      {
        id: 3,
        title: "Logo design and company logo",
        price: 100.0,
        image: "/placeholder.svg?height=200&width=300",
        seller: {
          name: "Sarah Wilson",
          avatar: "/placeholder.svg?height=40&width=40"
        }
      }
    ]
  }

  const handleSubmitForReview = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    window.location.href = '/gigs/submitted'
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <Button onClick={() => window.history.back()}><ArrowLeft /></Button>
            <Button variant="outline" asChild>
              <Link >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Gig
              </Link>
            </Button>
            <Badge variant="outline" className="text-sm">Preview Mode</Badge>

          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={handleSubmitForReview}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="container mx-auto px-4 py-4">
        <Alert>
          <AlertDescription>
            This is a preview of how your gig will appear to buyers. Make sure everything looks correct before submitting for review.
          </AlertDescription>
        </Alert>
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
                {gigData.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Gig image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </SwiperSlide>
                ))}
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
              {gigData.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full rounded-md overflow-hidden border cursor-pointer">
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover w-full h-full "
                    />
                  </div>
                </SwiperSlide>
              ))}
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
                    <AvatarImage src={gigData.seller.avatar} />
                    <AvatarFallback>{gigData.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{gigData.seller.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{gigData.seller.rating}</span>
                      <span>({gigData.seller.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <p>No reviews yet.</p>
              </TabsContent>
            </Tabs>

            {/* Related Services */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gig.packages?.map((pkg, index) => {
                  const packageLabels = ["Basic", "Standard", "Premium"];
                  const label = packageLabels[index] || `Package ${index + 1}`;

                  return (
                    <Card key={index} className="overflow-hidden">
                      {/* <div className="relative aspect-video">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="object-cover w-full h-full"
                        />
                      </div> */}
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-10">
                          {/* Optionally show avatar if available */}
                          {/* <Avatar className="h-6 w-6">
              <AvatarImage src={pkg.avatar} />
              <AvatarFallback>{pkg.title[0]}</AvatarFallback>
            </Avatar> */}
                          <div className="text-lg font-semibold">{label}</div>
                          <div className="text-lg font-semibold">${pkg.price}</div>
                        </div>
                        <p className="text-sm line-clamp-2">{pkg.description}</p>
                        <div className='flex gap-5 items-center mt-5'>
                          <RefreshCcwDot className='w-4' />
                          <p className='text-sm font-semibold'>{pkg.revisions} Revisions</p>
                        </div>
                        <div className='flex gap-5 items-center '>
                          <Clock className='w-4' />
                          <p className='text-sm font-semibold'>{pkg.revisions} Day Dilvery</p>
                        </div>
                        <div className='mt-5'>
                          {pkg.features.map((feature, index) => (
                            <div key={index} className='flex gap-5 items-center '>
                              <Check className='w-4' />
                              <p className='text-sm font-semibold'>{feature}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Right Section */}
          {/* <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Badge variant="secondary" className="text-lg font-semibold">
                    Advanced
                  </Badge>
                  <span className="text-2xl font-bold">${gig.price}</span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{gig.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{gig.revisions}</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" disabled>
                  Buy Now ${gig.price}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Preview Mode - Buying Disabled
                </p>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </main>
    </div>
  )
}
