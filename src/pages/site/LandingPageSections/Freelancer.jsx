import React from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import SectionWrapper from "../../../components/SiteComponents/SectionWrapper";
import { Button } from "../../../components/SiteComponents/ui/button"
import { ArrowUpRight, Check } from 'lucide-react'
import img from "../../../assets/images/Landingpage/h2-1.webp"

const FadeInWhenVisible = ({ children, delay = 0 }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5, delay }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  )
}

const cardVariants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 0,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
}

const Freelancer = () => {
  return (
    <SectionWrapper className="px-4  md:px-20 font-proxima overflow-hidden">
      <div className="lg:flex justify-between w-full my-20">
        <motion.div 
          className="lg:pt-52 lg:text-left md:text-left text-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FadeInWhenVisible>
            <p className="text-primary-custom font-semibold text-lg">
              For clients
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <h2 className="text-6xl font-semibold pt-3">
              Find talent your way
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.4}>
            <p className="py-6 lg:w-[450px] md:w-[500px] sm:w-[500px] text-[18px] leading-6">
              Work with the largest network of independent professionals and get
              things done—from quick turnarounds to big transformations.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-primary-custom px-6 py-6">
                Find Experts
                <ArrowUpRight className="ml-2" />
              </Button>
            </motion.div>
          </FadeInWhenVisible>
        </motion.div>
        <div className="relative mt-20 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              className="w-full pt-10 lg:pt-0"
              src={img}
              alt="Freelancer working"
            />
          </motion.div>
          <motion.div
            className="border lg:w-[330px] p-8 bg-[#1F4B3F] rounded-2xl absolute lg:top-52 top-40 lg:-left-12 text-white"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            {[
              "The best for every budget",
              "Quality work done quickly",
              "Protected payments, every time",
              "24/7 support"
            ].map((text, index) => (
              <motion.div 
                key={index}
                className="flex gap-4 items-center mb-6 last:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="border bg-white text-[#1F4B3F] p-1 rounded-full" />
                </motion.div>
                <p>{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Freelancer

