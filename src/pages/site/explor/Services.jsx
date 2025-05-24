import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import Combo_Box4 from "./Como_Box4";
import { Star } from "lucide-react";
import { Heart } from "lucide-react";
import Pagination1 from "./Pagination1";
import BreadCrumb2 from "./BreadCrumb2";
import { Link } from "react-router-dom";
import { URLS } from "@/config/config";


const cards = [
  {
    img: "/assets/images/explorer/services-1.webp",
    title: "Design & Creative",
    head: "I will design Modern minimalist logo for your company",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Nizam Uddin",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-2.webp",
    title: "Finance & Accounting",
    head: "I will set up QuickBooks online or QuickBooks Desktop Remotely for your",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Akakah Jasper",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-3.webp",
    title: "Development & IT",
    head: "I will be your android app, mobile app developer",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Muhammad Jawad",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-4.webp",
    title: "Digital Marketing",
    head: "I will increase domain authority Moz da with high-quality Do-follow Backlinks",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Umar Farooq",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-5.webp",
    title: "Design & Creative",
    head: "I will design your company logo, Bussiness card,latterpad",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Bhatti graphics designer",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-6.webp",
    title: "Design & Creative",
    head: "Graphics designer",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Bhatti graphics designer",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-7.webp",
    title: "Digital Marketing",
    head: "I will do monthly off page seo services using high quality SEO backlinks",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Umar Farooq",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-8.webp",
    title: "Digital Marketing",
    head: "I Will Increase ahrefs domain rating dr 70 using high quality SEO Backlinks",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Umar Farooq",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-9.webp",
    title: "Programming & Tech",
    head: "I will do WordPress WooCommerce website customization expert level",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Muhammad Shoaib",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-10.webp",
    title: "Digital Marketing",
    head: "You will get Wix Website Design or Redesign | Wix Designer | Wix Expert |",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Ogunyemi Ololade",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-11.webp",
    title: "Design & Creative",
    head: "You will get WordPress Website Designer, WordPress Expert,",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Ogunyemi Ololade",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-12.webp",
    title: "Digital Marketing",
    head: "You will get Klaviyo Holiday Marketing Campaign Setup Black Friday Cyber",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Ogunyemi Ololade",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-13.webp",
    title: "Sales & Customer Care",
    head: "I will do b2b lead generation, prospect list, linkedin, list building and web",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Muhammad Gulfam Ali",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-14.webp",
    title: "Digital Marketing",
    head: "I will increase dr 70 plus ahrefs dr increase of your website",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Muhammad Waris",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-15.webp",
    title: "Programming & Tech",
    head: "I will create responsive wix website design and redesign wix website",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Binuyo Fisayo Deborah",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-16.webp",
    title: "Programming & Tech",
    head: "I will create responsive wordpress website design, redesign wordpress",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Binuyo Fisayo Deborah",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-17.webp",
    title: "Programming & Tech",
    head: "I will design a stunning shopify website, dropshipping store suitable",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Binuyo Fisayo Deborah",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-18.webp",
    title: "Development & IT",
    head: "I will create full stack website theme and plugin installation article and page",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "MUDASSER RAFIQ",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-19.webp",
    title: "Design & Creative",
    head: "I will design Modern minimalist logo for your company",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Nizam Uddin",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-20.webp",
    title: "Design & Creative",
    head: "I will design Modern minimalist logo for your company",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Nizam Uddin",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-21.webp",
    title: "Design & Creative",
    head: "I will design Modern minimalist logo for your company",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Nizam Uddin",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-22.webp",
    title: "Design & Creative",
    head: "I will design Modern minimalist logo for your company",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Nizam Uddin",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-23.webp",
    title: "Design & Creative",
    head: "I will design Modern minimalist logo for your company",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Nizam Uddin",
    rate: "Starting at: $5.00",
  },
  {
    img: "/assets/images/explorer/services-24.webp",
    title: "Design & Creative",
    head: "I will design Modern minimalist logo for your company",
    icon: <Star className="text-yellow-200 " fill="yellow" size={15} />,
    review: " 0.0 (0 Reviews)",
    name: "Nizam Uddin",
    rate: "Starting at: $5.00",
  },
];

const Datalength = `Showing 1 – 12 of ${cards.length} results`;

function Services() {
  return (
    <div className="flex flex-col gap-5 mt-16 font-proxima mb-10 px-3 sm:px-0">
      {/* Breadcrumb Section */}
      <div className="py-5 bg-[#F1FCFA] ">
        <SectionWrapper className="sm:px-10">
          <BreadCrumb2 startRoute="/" startRoutesName="Home" page="Services" />
        </SectionWrapper>
      </div>

      <SectionWrapper className="sm:px-10">
        <div className="relative">
          <img
            className="w-full h-auto object-cover"
            src="/assets/images/explorer/bg-filter1-1.webp"
            alt="Banner"
          />
          <div className="absolute top-2 left-5 sm:top-5 sm:left-10 md:top-10 md:left-10 lg:top-20 lg:left-12">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold sm:pb-2 md:pb-4">
              Find everything you need.
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">
              Discover the top freelance services on the market!
            </p>
          </div>
        </div>
      </SectionWrapper>
      <div className="bg-[#F1FCFA] mt-7">
        <SectionWrapper className="sm:px-10 ">
          {/* Main Content Section */}
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-wrap justify-between items-center">
              <h1 className="text-sm md:text-base">{Datalength}</h1>
              <div className="mt-3 md:mt-0">
                <Combo_Box4 />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="flex border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="relative w-full sm:flex">
                    {/* Card Image */}
                    <div className="sm:w-2/5">
                      <img
                        src={card.img}
                        alt="Service"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {/* Card Content */}
                    <div className="p-5 sm:w-3/5 flex flex-col">
                      <p className="text-xs sm:text-sm text-gray-600 pb-2">
                        {card.title}
                      </p>
                      <h1 className="text-start font-medium hover:text-green-500 hover:underline ">
                        <Link to={URLS.SERVICES}>{card.head}</Link>
                      </h1>
                      <div className="flex items-center gap-2 py-2 border-b-2 mt-auto">
                        <span>{card.icon}</span>
                        <p className="text-xs sm:text-sm">{card.review}</p>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <h1 className="text-xs sm:text-sm">{card.name}</h1>
                        <h2 className="text-sm sm:text-base font-medium">
                          {card.rate}
                        </h2>
                      </div>
                    </div>
                    {/* Heart Icon */}
                    <Heart
                      size={30}
                      className="absolute top-2 right-2 hover:text-white transition-all ease-in-out border p-2 rounded-full bg-white hover:bg-[#35ba62] cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Section */}
            <div className="flex justify-center mt-5">
              <Pagination1 />
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}

export default Services;
