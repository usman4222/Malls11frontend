import React, { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { BookCheck, Shield, ShieldCheck, ShieldCheckIcon, MonitorPlayIcon } from 'lucide-react'
import SectionWrapper from "../../../components/SiteComponents/SectionWrapper"

const data = [
  {
    icon: <MonitorPlayIcon size={38} />,
    title: "Post a job",
    description:
      "It's free and easy to post a Project. Simply fill in a title, description and set your budget.",
  },
  {
    icon: <BookCheck size={38} />,
    title: "Choose freelancers",
    description:
      "Our freelancers are customer-centric, dedicated to their jobs. Hire the top-tier freelancers.",
  },
  {
    icon: <Shield size={38} />,
    title: "We're here to help",
    description:
      "It's free and easy to contact our excellent Customer Service. We are always there for you 24/7.",
  },
  {
    icon: <ShieldCheckIcon size={38} />,
    title: "We're here to help",
    description:
      "It's free and easy to contact our excellent Customer Service. We are always there for you 24/7.",
  },
]

const FadeInWhenVisible = ({ children }) => {
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
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
    >
      {children}
    </motion.div>
  )
}

function Services() {
  return (
    <SectionWrapper className="px-4 md:px-20 ">
      <div className="mt-20 w-full flex flex-col">
        <FadeInWhenVisible>
          <div className="lg:items-start md:items-start items-center lg:text-start md:text-center text-center mb-12">
            <h2 className="text-4xl font-medium">Need something done?</h2>
            <p className="text-gray-700 text-[16px] mt-5">
              Most viewed and all-time top-selling services
            </p>
          </div>
        </FadeInWhenVisible>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:place-items-start md:place-items-start place-items-center w-full justify-between gap-8">
          {data.map((item, index) => (
            <FadeInWhenVisible key={index}>
              <motion.div
                className="lg:max-w-[300px] md:max-w-[300px] max-w-[500px] lg:text-start md:text-start text-center justify-center lg:items-start md:items-start items-center flex flex-col gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="mt-5 text-primary"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-medium mt-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Services

