import { ArrowUpRight, ChevronsLeftRight } from "lucide-react";
import { ArrowBigUpDash } from "lucide-react";
import { ChartNoAxesColumn } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Martini } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useRef, useState } from "react";
import { useAnimation, useInView, motion } from "framer-motion";
import SectionWrapper from "../../../components/SiteComponents/SectionWrapper";

const categories = [
  { name: "Developers", icon: ChevronsLeftRight },
  { name: "Designers", icon: ArrowBigUpDash },
  { name: "Finance Experts", icon: ChartNoAxesColumn },
  { name: "Project Managers", icon: SquareCheckBig },
  { name: "Product Managers", icon: CalendarCheck },
  { name: "Marketing Experts", icon: Martini },
];

const professionals = {
  Developers: [
    {
      image: "/assets/images/Landingpage/featured cards/images.avif",
      name: "Gabriel Courtemanche",
      title: "Verified Expert in Engineering",
      role: "JavaScript Developer",
      skills: ["DevOps", "Git", "JavaScript", "Node.js"],
      previousCompany: "",
    },
    {
      image: "/assets/images/Landingpage/featured cards/images 2.avif",
      name: "Sarah Johnson",
      title: "Verified Expert in Full-Stack Development",
      role: "Full-Stack Developer",
      skills: ["React", "Python", "MongoDB", "AWS"],
      previousCompany: "/assets/images/Landingpage/hericon/brand2-1.webp",
    },
    {
      image: "/assets/images/Landingpage/featured cards/images 3.avif",
      name: "Michael Chen",
      title: "Verified Expert in Mobile Development",
      role: "Mobile App Developer",
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      previousCompany: "/assets/images/Landingpage/hericon/brand4-1.webp",
    },
  ],
  Designers: [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Emma Wilson",
      title: "Verified Expert in UI/UX Design",
      role: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "Sketch", "InVision"],
      previousCompany: "/assets/images/Landingpage/hericon/brand3-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Alex Rodriguez",
      title: "Verified Expert in Graphic Design",
      role: "Graphic Designer",
      skills: ["Illustrator", "Photoshop", "InDesign", "After Effects"],
      previousCompany: "/assets/images/Landingpage/hericon/brand5-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Sophia Lee",
      title: "Verified Expert in Product Design",
      role: "Product Designer",
      skills: ["Prototyping", "User Research", "Design Systems", "Zeplin"],
      previousCompany: "/assets/images/Landingpage/hericon/brand6-1.webp",
    },
  ],
  "Finance Experts": [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "David Brown",
      title: "Verified Expert in Financial Analysis",
      role: "Financial Analyst",
      skills: ["Financial Modeling", "Valuation", "Excel", "PowerBI"],
      previousCompany: "/assets/images/Landingpage/hericon/brand7-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Jennifer Taylor",
      title: "Verified Expert in Investment Banking",
      role: "Investment Banker",
      skills: ["M&A", "IPO", "Due Diligence", "Financial Statements"],
      previousCompany: "/assets/images/Landingpage/hericon/brand8-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Robert Kim",
      title: "Verified Expert in Risk Management",
      role: "Risk Manager",
      skills: ["Risk Assessment", "Compliance", "Basel III", "Stress Testing"],
      previousCompany: "/assets/images/Landingpage/hericon/brand9-1.webp",
    },
  ],
  "Project Managers": [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Lisa Martinez",
      title: "Verified Expert in Agile Project Management",
      role: "Agile Project Manager",
      skills: ["Scrum", "Kanban", "JIRA", "Confluence"],
      previousCompany: "/assets/images/Landingpage/hericon/brand10-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Thomas Anderson",
      title: "Verified Expert in IT Project Management",
      role: "IT Project Manager",
      skills: ["PRINCE2", "PMP", "MS Project", "Agile"],
      previousCompany: "/assets/images/Landingpage/hericon/brand11-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Emily Nguyen",
      title: "Verified Expert in Construction Project Management",
      role: "Construction Project Manager",
      skills: ["AutoCAD", "Primavera P6", "Cost Estimation", "Risk Management"],
      previousCompany: "/assets/images/Landingpage/hericon/brand12-1.webp",
    },
  ],
  "Product Managers": [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Daniel Park",
      title: "Verified Expert in SaaS Product Management",
      role: "SaaS Product Manager",
      skills: ["Product Strategy", "User Stories", "A/B Testing", "Analytics"],
      previousCompany: "/assets/images/Landingpage/hericon/brand13-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Rachel Green",
      title: "Verified Expert in E-commerce Product Management",
      role: "E-commerce Product Manager",
      skills: ["CRO", "SEO", "User Acquisition", "Retention Strategies"],
      previousCompany: "/assets/images/Landingpage/hericon/brand14-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Kevin Wong",
      title: "Verified Expert in Mobile Product Management",
      role: "Mobile Product Manager",
      skills: [
        "App Store Optimization",
        "Mobile Analytics",
        "UX Design",
        "Agile",
      ],
      previousCompany: "/assets/images/Landingpage/hericon/brand15-1.webp",
    },
  ],
  "Marketing Experts": [
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Olivia Smith",
      title: "Verified Expert in Digital Marketing",
      role: "Digital Marketing Specialist",
      skills: ["SEO", "PPC", "Social Media Marketing", "Content Marketing"],
      previousCompany: "/assets/images/Landingpage/hericon/brand16-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "James Wilson",
      title: "Verified Expert in Brand Management",
      role: "Brand Manager",
      skills: [
        "Brand Strategy",
        "Market Research",
        "Product Positioning",
        "Brand Analytics",
      ],
      previousCompany: "/assets/images/Landingpage/hericon/brand17-1.webp",
    },
    {
      image: "/placeholder.svg?height=300&width=300",
      name: "Sophia Garcia",
      title: "Verified Expert in Growth Marketing",
      role: "Growth Marketer",
      skills: ["User Acquisition", "Retention", "A/B Testing", "Data Analysis"],
      previousCompany: "/assets/images/Landingpage/hericon/brand18-1.webp",
    },
  ],
};

const FeaturedServices = () => {
  const [activeCategory, setActiveCategory] = useState("Developers");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div className="bg-gray-50 mt-32">
      <SectionWrapper className="px-4 md:px-20 mb-10 font-sans">
        <div className="">
          <h2 className="text-4xl font-medium">  Meet Talent in Our Network</h2>


          <div className="flex mt-16 flex-wrap justify-between text-sm md:text-lg border-y-2 py-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex gap-2 items-center px-4 md:px-10 py-2 mb-2 md:mb-0 ${activeCategory === category.name
                  ? "text-white bg-primary-custom"
                  : "text-gray-700 hover:bg-gray-200"
                  } rounded-md transition-colors duration-200`}
                onClick={() => setActiveCategory(category.name)}
              >
                <category.icon className="w-5 h-5" />
                <h1>{category.name}</h1>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={mainControls}
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.25 },
              },
            }}
            className="flex flex-col md:flex-row gap-8 mt-10 w-full md:w-[75%]"
          >
            {professionals[activeCategory].map((professional, index) => (
              <div
                key={index}
                className="bg-white p-3 items-center shadow-2xl rounded-lg w-full"
              >
                <div className="">
                  <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={professional.image}
                    alt={professional.name}
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm text-primary-custom font-semibold pt-2">
                    {professional.name}
                  </p>
                  <div className="flex items-center text-center gap-2">
                    <BadgeCheck size={20} color="green" />
                    <p className="text-green-700 py-3">
                      <span className="text-green-700 font-semibold">
                        {professional.title}
                      </span>
                    </p>
                  </div>
                  <p>{professional.role}</p>
                  <p className="pt-7 text-gray-700">Experts</p>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {professional.skills.map((skill, skillIndex) => (
                      <button
                        key={skillIndex}
                        className="border border-gray-500 rounded-2xl hover:text-blue-700 hover:bg-blue-100 px-4 py-1 text-xs text-gray-600"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <div className="bg-green-700/30 py-1 mt-5 flex justify-center cursor-pointer">
                    <p className="text-center flex items-center gap-2 text-[13px]"> View Profile <ArrowUpRight className="w-4 h-4"  /></p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="bg-blue-900 w-full md:w-[25%] mt-10 text-white flex flex-col items-center justify-center p-6 rounded-lg">
            <ChartNoAxesCombined size={50} />
            <h1 className="pt-3 font-semibold text-xl">Discover 20,000+</h1>
            <h1 className="text-xl font-semibold py-2">More Talent</h1>
            <p className="py-2 text-center">in the Toptal Network</p>
            <button className="bg-green-400 px-7 rounded-xl py-3 mt-5 hover:bg-green-500 transition-colors duration-200">
              Discover Freelance Talent
            </button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default FeaturedServices;
