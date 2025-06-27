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
import { changeGigStatus, getSingleGig } from '../../../actions/gig/gigAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function GigPreview() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { id } = useParams();
  const dispatch = useDispatch();

  const { gig } = useSelector((state) => state.gigs)
  const { currentUser } = useSelector((state) => state.user);
  const [selectedStatus, setSelectedStatus] = useState(gig?.status || "Draft");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    const prevStatus = selectedStatus;
    setSelectedStatus(newStatus);
    setStatusDropdownOpen(false);

    try {
      await dispatch(changeGigStatus(gig._id, newStatus));
      toast.success(`Gig status updated to ${newStatus}`);
      dispatch(getSingleGig(id));
    } catch (error) {
      setSelectedStatus(prevStatus);
      toast.error("Failed to update gig status.");
    }
  };


  useEffect(() => {
    if (gig?.status) {
      setSelectedStatus(gig.status);
    }
  }, [gig]);


  useEffect(() => {
    if (id) {
      dispatch(getSingleGig(id));
    }
  }, [dispatch, id]);


  const handleSubmitForReview = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    window.location.href = '/gigs/submitted'
  }

  return (
    <div className="pb-48 bg-gray-50">
      <ToastContainer />
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
                    <AvatarImage src={currentUser?.profile_image} />
                    {/* <AvatarFallback>{gigData.seller.name[0]}</AvatarFallback> */}
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{currentUser?.username}</h3>
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
            <div>
              <h2 className="text-xl font-semibold mb-4">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gig.packages?.map((pkg, index) => {
                  const packageLabels = ["Basic", "Standard", "Premium"];
                  const label = packageLabels[index] || `Package ${index + 1}`;

                  return (
                    <Card key={index} className="overflow-hidden">

                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-10">

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
      <div className="container flex items-center justify-between mx-auto px-4 pb-10">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Update Status: {selectedStatus}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {statusDropdownOpen && (
            <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                {["Draft", "Active", "Paused"]
                  .filter((status) => status !== gig.status)
                  .map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(status)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {status}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className='font-bold'>Gig Status: <span className='font-semibold'>{gig?.status}</span></h3>
        </div>
      </div>

    </div>
  )
}
