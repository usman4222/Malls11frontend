import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import BreadCrumb2 from "../explor/BreadCrumb2";
import { ArrowUpRight, Search, Menu, X, SlidersHorizontal } from "lucide-react";
import { Button } from "../../../components/SiteComponents/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/SiteComponents/ui/avatar";
import { Input } from "../../../components/SiteComponents/ui/input";
import { Link } from "react-router-dom";
import SectionWrapper from "../../../components/SiteComponents/SectionWrapper";
import blog1 from "../../../assets/images/blogs/img1.webp"
import blog2 from "../../../assets/images/blogs/img2.webp"
import blog3 from "../../../assets/images/blogs/img3.webp"
import blog4 from "../../../assets/images/blogs/img4.webp"
import blog5 from "../../../assets/images/blogs/img5.webp"
import blog6 from "../../../assets/images/blogs/img6.webp"
import blog7 from "../../../assets/images/blogs/img7.webp"
import blog8 from "../../../assets/images/blogs/img8.webp"
import blog9 from "../../../assets/images/blogs/img9.webp"

const blogs = [
  {
    image: blog1,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Meshach Akaka",
    avatar_blog: "BLogs",
    avatar_date: "27 October 2024",
    title: "The Freelance Marketplace: Uptiers Comprehensive Guide",

    content:
      "More and more companies are starting to understand the benefit of making better use of freelancers to fill skills gaps.  What is Uptiers Freelance marketplace? Uptiers talent ...",
  },
  {
    image: blog2,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Meshach Akaka",
    avatar_blog: "BLogs",
    avatar_date: "5 October 2024",
    title: "Streamline Your Freelance Business with Uptiers",

    content:
      "Sell Your Services with Ease One of the most important aspects of running a successful freelance business is being able to effectively market and sell your services. ...",
  },
  {
    image: blog3,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Meshach Akaka",
    avatar_blog: "BLogs",
    avatar_date: "22 September 2024",
    title: "Ways to Differentiate Your Brand as a Freelancer",

    content:
      "The internet has evolved the freelance marketplace in unprecedented ways. Freelance websites allow anyone to connect with a staggering amount of specialists to find the one which ...",
  },
  {
    image: blog4,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Uptiers Team",
    avatar_blog: "BLogs",
    avatar_date: "28 August 2024",
    title:
      "Work From Home No Experience: Your Guide to Starting a Remote Career on Uptiers",

    content:
      "Our methods of labor are changing so quickly, and it is difficult to stay on track. Remote work is one of these changes which has become very ...",
  },
  {
    image: blog5,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Uptiers Team",
    avatar_blog: "BLogs",
    avatar_date: "20 August 2024",
    title:
      "Creating Your First Listing on Uptiers: A Comprehensive Guide for Freelancers",

    content:
      "Are you new to Uptiers and struggling to create your first listing? Well creating a listing that can stand out from the noise is not easy. But ...",
  },
  {
    image: blog6,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Meshach Akaka",
    avatar_blog: "BLogs",
    avatar_date: "20 August 2024",
    title:
      "How to Set Up Your Profile on Uptiers: A Quick Guide for Freelancers",

    content:
      "Creating a compelling profile on Uptiers is the key to attracting clients.  Follow these simple steps to create a professional looking profile.  1. Sign Up and Verify ...",
  },
  {
    image: blog7,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Uptiers Team",
    avatar_blog: "BLogs",
    avatar_date: "19 August 2024",
    title: "Outsourcing for Success: How to Find the Person You Can Trust",

    content:
      "The more efficient you are in your business, the better it is for your business. Which is why, outsourcing is a great strategy for growth and productivity, ...",
  },
  {
    image: blog8,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Meshach Akaka",
    avatar_blog: "BLogs",
    avatar_date: "19 August 2024",
    title:
      "Freelance Customer Service: Your Secret Weapon for Business Success on Uptiers",

    content:
      "Great customer service is a must-have in today’s fast-moving world for any successful business. However, if you are running a startup or a small business with limited ...",
  },
  {
    image: blog9,
    avatar: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    avatar_name: "Uptiers Team",
    avatar_blog: "BLogs",
    avatar_date: "17 August 2024",
    title:
      "Your Ultimate Guide to Find Affordable & Reliable Freelancers on Uptiers",

    content:
      "Are you tired of searching numerous accounts and paying more than you should for ordinary outcomes? The search for an ideal freelance worker seems like looking for ...",
  },
];

const tags = [
  "Business",
  "Startup",
  "Freelance",
  "Remote Work",
  "Work From Home",
  "web development",
  "Design & Creative",
];

const BlogLength = `Showing 1 – 12 of ${blogs.length} results`;

function Blogs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const Sidebar = ({ isOpen, onClose }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
        >
          <div className="p-4">
            <button onClick={onClose} className="mb-4 float-right">
              <X size={24} />
            </button>
            <div className="clear-both">
              <div className="flex border px-6 py-3 justify-between rounded-lg shadow-sm items-center mb-4">
                <input
                  className="w-full"
                  type="search"
                  placeholder="Search..."
                />
                <Search size={20} />
              </div>
              <div className="border rounded-lg p-5 flex flex-col gap-5 mt-8 shadow-sm">
                <h3 className="text-xl font-semibold">Categories</h3>
                <p className="text-sm cursor-pointer w-max transition-all duration-200 underline hover:text-green-500">
                  Blogs
                </p>
              </div>
              <div className="border px-6 my-8 rounded-lg shadow-sm items-center">
                <h3 className="text-xl py-6 font-semibold">Recent Posts</h3>
                <div className="">
                  <p>Скачать Казино Пин Ап</p>
                  <p className="text-sm text-gray-500">3 December 2024</p>
                </div>
                <div className="py-6">
                  <p>Sykaaa Казино</p>
                  <p className="text-sm text-gray-500">3 December 2024</p>
                </div>
                <div className="pb-7">
                  <p>Gg Bet Casino</p>
                  <p className="text-sm text-gray-500">3 December 2024</p>
                </div>
              </div>
              <div className="border rounded-lg p-5 flex flex-col gap-1 mt-8 shadow-sm">
                <h3 className="text-xl font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {tags.map((item, index) => (
                    <motion.p
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 text-sm cursor-pointer w-max transition-all duration-200 border px-2 rounded-lg bg-primary-custom text-white"
                    >
                      {item}
                    </motion.p>
                  ))}
                </div>
              </div>
              <div className="w-full border px-8 py-10 rounded-lg shadow-lg items-center my-8 text-gray-700 bg-white">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                  Stay Updated!
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Subscribe to our newsletter and never miss out on exciting
                  updates, tips, and exclusive offers.
                </p>
                <form className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 text-gray-700 outline-none"
                    required
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-primary-custom hover:bg-primary-custom/90 text-white py-2"
                    >
                      Subscribe
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="font-proxima">
      <div className="py-5 bg-[#F1FCFA]">
        <SectionWrapper className="px-4 md:px-20">
          <BreadCrumb2 startRoute="/" startRoutesName="Home" page="Services" />
        </SectionWrapper>
      </div>
      <SectionWrapper className="px-4 md:px-20 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="mt-5 flex justify-between items-center"
        >
          <h1 className="sm:text-3xl text-xl font-semibold ">Blogs</h1>
          <Button
            onClick={toggleSidebar}
            className="lg:hidden"
            variant="ghost"
            size="icon"
          >
            <SlidersHorizontal size={24} />
          </Button>
        </motion.div>
        <div className="flex flex-col mt-5 lg:flex-row gap-8">
          <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-5">
            {blogs.map((item, index) => (
              <motion.div

                key={index}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex-1"
              >
                <div className="overflow-hidden rounded-lg">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full rounded-lg"
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="flex pt-6 items-center sm:gap-3 gap-2 sm:text-sm text-xs text-gray-500">
                  <div>{item.avatar}</div>
                  <div className="flex flex-wrap gap-2 sm:gap-6">
                    <h3>{item.avatar_name}</h3>
                    <p>{item.avatar_blog}</p>
                    <p>{item.avatar_date}</p>
                  </div>
                </div>
                <h1 className="sm:text-3xl text-2xl font-semibold group-hover:text-green-500 py-4 group-hover:underline duration-300">
                  <Link to="/blogs">{item.title}</Link>
                </h1>
                <p className="text-sm md:text-[16px]">{item.content}</p>
                <motion.div
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`blogs/${"some-slug"}`}
                    className="flex items-center gap-2 "
                  >
                    <Button
                      className="group-hover:text-green-500 px-6 py-6 bg-green-50 mt-5"
                      variant="outline"
                    >
                      Read More <ArrowUpRight size={50} />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block lg:w-1/3"
          >
            <div className="flex border px-6 py-3 justify-between rounded-lg shadow-sm items-center">
              <input className="w-full" type="search" placeholder="Search..." />
              <Search size={20} />
            </div>
            <div className="border rounded-lg p-5 flex flex-col gap-5 mt-8 shadow-sm">
              <h3 className="text-xl font-semibold">Categories</h3>
              <p className="text-sm cursor-pointer w-max transition-all duration-200 underline hover:text-green-500">
                Blogs
              </p>
            </div>
            <div className="border px-6 my-8 rounded-lg shadow-sm items-center">
              <h3 className="text-xl py-6 font-semibold">Recent Posts</h3>
              <div className="">
                <p>Скачать Казино Пин Ап</p>
                <p className="text-sm text-gray-500">3 December 2024</p>
              </div>
              <div className="py-6">
                <p>Sykaaa Казино</p>
                <p className="text-sm text-gray-500">3 December 2024</p>
              </div>
              <div className="pb-7">
                <p>Gg Bet Casino</p>
                <p className="text-sm text-gray-500">3 December 2024</p>
              </div>
            </div>
            <div className="border rounded-lg p-5 flex flex-col gap-1 mt-8 shadow-sm">
              <h3 className="text-xl font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {tags.map((item, index) => (
                  <motion.p
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 text-sm cursor-pointer w-max transition-all duration-200 border px-2 rounded-lg bg-primary-custom text-white"
                  >
                    {item}
                  </motion.p>
                ))}
              </div>
            </div>
            <div className="w-full border px-8 py-10 rounded-lg shadow-lg items-center my-8 text-gray-700 bg-white">
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                Stay Updated!
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Subscribe to our newsletter and never miss out on exciting
                updates, tips, and exclusive offers.
              </p>
              <form className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-gray-700 outline-none"
                  required
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-primary-custom hover:bg-primary-custom/90 text-white py-2"
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}

export default Blogs;
