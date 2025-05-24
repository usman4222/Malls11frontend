import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"
import bgImage4 from "../../../assets/banner4.jpg"
import { Button } from "../../../components/SiteComponents/ui/button";
import { MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionWrapper from "../../../components/SiteComponents/SectionWrapper";
import SearchInterface from "../../../components/SiteComponents/Hero_Section_Input";

const FadeInWhenVisible = ({ children, delay = 0, duration = 0.5 }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  )
}


const Trusted_companies = [
  {
    brand: "/assets/images/Landingpage/hericon/brand1-1.webp",
  },
  {
    brand: "/assets/images/Landingpage/hericon/brand2-1.webp",
  },
  {
    brand: "/assets/images/Landingpage/hericon/brand3-1.webp",
  },
  {
    brand: "/assets/images/Landingpage/hericon/brand4-1.webp",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

function HeroSection() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center font-proxima overflow-hidden px-20 py-10  bg-herobackground"
      >
        {/* Child div for the background image */}
        <motion.div
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500 rounded-2xl py-10"
          style={{
            backgroundImage: `url(${bgImage4})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          whileHover={{
            scale: 1.02,  
            transition: { duration: 0.3 }
          }}
        >
          <SectionWrapper className="px-10 w-full flex justify-between lg:flex-row md:flex-row flex-col lg:items-start md:items-start items-center rounded-b-xl">
            <motion.div
              className="lg:mt-16 mt-8 flex flex-col lg:items-start md:items-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="lg:max-w-[800px] md:max-w-[490px] lg:text-left md:text-left font-proxima font-bold text-center lg:text-[50px] text-[30px] text-white"
                {...fadeInUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hire the{" "}
                <motion.span
                  className="border-b-2 border-white cursor-pointer"
                  whileHover={{ borderBottom: "2px solid transparent" }}
                  transition={{ duration: 0.2 }}
                >
                  TOP Freelance
                </motion.span>{" "}
                Talent here FREELY. (Business with Freedom)
              </motion.h1>
              <div className="flex lg:flex-row md:flex-col flex-col lg:gap-5 gap-5 mt-10  ">
                <FadeInWhenVisible delay={0.6}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/projects">
                    <Button
                      className="bg-primary-custom/90 hover:bg-primary-custom px-4 py-2"
                      size={"lg"}

                    >
                      Find Work <MoveUpRight className="" />
                    </Button>
                    </Link>
                  </motion.div>
                </FadeInWhenVisible>
                <FadeInWhenVisible delay={0.8}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/freelancers">
                      <Button
                        className="px-4 py-2"
                        variant="outline"
                        size={"lg"}
                      >
                        Find Experts <MoveUpRight className="" />
                      </Button>
                    </Link>
                  </motion.div>
                </FadeInWhenVisible>
              </div>
              <motion.div
                className="mt-10"
                {...fadeInUp}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <SearchInterface />
              </motion.div>
            </motion.div>
            {/* <motion.div
            className="relative mt-10 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <img
              className="object-cover lg:max-w-lg md:max-w-xs"
              src="/assets/images/Landingpage/h15-4-1.webp"
              alt="Hero illustration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#d2d6e2] via-transparent w-64 lg:w-[500px] to-transparent"></div>
          </motion.div> */}
          </SectionWrapper>
        </motion.div>
      </motion.div>
    </>

  );
}

export default HeroSection;