"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionWrapper from "../../../components/SiteComponents/SectionWrapper";
// import cardsImage from "@/assets/homepage_thumb.jpg";

const services = [
  {
    count: "15 Services",
    title: "Development & IT",
    description: "Software Engineering & Development",
    image:
      "/assets/images/blogs/html-css-collage-concept-with-person.jpg",
  },
  {
    count: "39 Services",
    title: "Design & Creative",
    description: "UI/UX Design & Creative Solutions",
    image:
      "/assets/images/blogs/multi-colored-paint-drops-splashing-abstract-background-generated-by-ai.jpg",
  },
  {
    count: "3 Services",
    title: "Finance & Accounting",
    description: "Financial Services & Consulting",
    image: "/assets/images/blogs/modern-equipped-computer-lab.jpg",
  },
  {
    count: "12 Services",
    title: "Writing & Translation",
    description: "Content Writing & Language Services",
    image: "/assets/images/blogs/lawyer-working-close-up.jpg",
  },
  {
    count: "22 Services",
    title: "Programming & Tech",
    description: "Technical Development & Support",
    image:
      "/assets/images/blogs/programming-background-with-person-working-with-codes-computer.jpg",
  },
  {
    count: "12 Services",
    title: "Writing & Translation",
    description: "Content Writing & Language Services",
    image:
      "/assets/images/blogs/young-pretty-girl-is-making-skeches-her-new-project.jpg",
  },
];

const FadeInWhenVisible = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function ServicesSlider() {
  const swiperRef = useRef(null);

  return (


    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center font-proxima overflow-hidden px-20 py-10  bg-gray-300" 
    >

      <div className="w-full">
        <FadeInWhenVisible>
          <div className="mb-12 text-left md:text-left">
            <h2 className="text-4xl font-medium">
              Browse services by category
            </h2>
            <p className="text-md mt-3 ">
              Get inspiration from over 1800+ skills
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
      {/* Child div for the background image */}
      <motion.div
        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500 rounded-2xl  bg-gray-400"
        // style={{
        //   backgroundImage: `url(${cardsImage})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        whileHover={{
          scale: 1.02,  // Only scales the background div, not the parent card
          transition: { duration: 0.3 }
        }}
      >
        <SectionWrapper className="px-20 mt-16 font-proxima">
          <div className="container mx-auto ">
            <FadeInWhenVisible>
              <div className="relative">
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination",
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                    1280: {
                      slidesPerView: 4,
                    },
                  }}
                  className="!pb-14"
                >
                  {services.map((service, index) => (
                    <SwiperSlide key={index}>
                      <div className="group relative h-[400px] overflow-hidden rounded-2xl">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                            {service.count}
                          </span>
                          <h3 className="mb-2 text-2xl font-bold">
                            {service.title}
                          </h3>
                          <p className="text-white/80">{service.description}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  onClick={() => swiperRef.current?.swiper.slidePrev()}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={() => swiperRef.current?.swiper.slideNext()}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="swiper-pagination" />
              </div>
            </FadeInWhenVisible>
          </div>
        </SectionWrapper>
      </motion.div>
    </motion.div>

  );
}
