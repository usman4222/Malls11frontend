
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, Tag, Facebook, Twitter, Linkedin, Heart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/SiteComponents/ui/avatar"
import { Button } from "@/components/SiteComponents/ui/button"
import { Link } from 'react-router-dom'
import detail_blog_img from "@/assets/images/blogs/img3.webp"


const dummyBlogPost = {
  id: '1',
  title: "The Freelance Revolution: Navigating the Gig Economy with Uptiers",
  author: "Meshach Akaka",
  date: "27 October 2024",
  readTime: "8 min read",
  content: `
    <p>The gig economy is reshaping the way we work, and platforms like Uptiers are at the forefront of this revolution. As traditional employment models evolve, more professionals are turning to freelancing as a viable career path. This comprehensive guide explores the ins and outs of the freelance marketplace, with a special focus on how Uptiers is changing the game.</p>
    
    <h2>Understanding the Gig Economy</h2>
    <p>The gig economy refers to a labor market characterized by short-term contracts, temporary positions, and freelance work as opposed to permanent jobs. This shift has been driven by several factors:</p>
    <ul>
      <li>Technological advancements enabling remote work</li>
      <li>Desire for flexibility and work-life balance</li>
      <li>Companies seeking to reduce overhead costs</li>
      <li>Increased demand for specialized skills on a project basis</li>
    </ul>
    
    <h2>Enter Uptiers: A New Era of Freelancing</h2>
    <p>Uptiers has positioned itself as a leading platform in the freelance marketplace. Here's what sets it apart:</p>
    <ol>
      <li><strong>Diverse Talent Pool:</strong> From graphic designers to data scientists, Uptiers hosts a wide array of professionals.</li>
      <li><strong>Advanced Matching Algorithm:</strong> Uptiers uses AI to connect the right talent with the right projects.</li>
      <li><strong>Secure Payments:</strong> An escrow system ensures fair compensation for completed work.</li>
      <li><strong>Skill Verification:</strong> Uptiers verifies freelancers' skills through rigorous testing and portfolio reviews.</li>
    </ol>
    
    <h2>Navigating Uptiers as a Freelancer</h2>
    <p>To succeed on Uptiers, freelancers should focus on:</p>
    <ul>
      <li>Creating a compelling profile that showcases unique skills and experience</li>
      <li>Building a strong portfolio of past work</li>
      <li>Maintaining excellent communication with clients</li>
      <li>Continuously updating skills to stay competitive</li>
    </ul>
    
    <h2>The Benefits for Businesses</h2>
    <p>Companies using Uptiers can enjoy several advantages:</p>
    <ul>
      <li>Access to a global talent pool</li>
      <li>Flexibility in scaling teams up or down</li>
      <li>Cost-effective solutions for short-term projects</li>
      <li>Reduced overhead compared to full-time employees</li>
    </ul>
    
    <h2>The Future of Work</h2>
    <p>As we look ahead, the gig economy is poised for continued growth. Platforms like Uptiers are not just facilitating this change; they're actively shaping the future of work. By providing tools, resources, and opportunities for both freelancers and businesses, Uptiers is helping to create a more flexible, efficient, and dynamic labor market.</p>
    
    <h2>Conclusion</h2>
    <p>The freelance revolution is here, and Uptiers is leading the charge. Whether you're a skilled professional looking for more flexibility in your career or a business seeking top talent for your next project, understanding and leveraging platforms like Uptiers will be crucial in the evolving landscape of work.</p>
  `,
  tags: ["Freelancing", "Gig Economy", "Remote Work", "Uptiers", "Future of Work"],
  image: detail_blog_img,
  avatar: "/placeholder.svg?height=80&width=80",
  likes: 127,
  comments: 23,
}

export default function BlogPost() {
  const [blogPost, setBlogPost] = useState(dummyBlogPost)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // This is where you would fetch the actual blog post data
    // For example:
    // const fetchBlogPost = async () => {
    //   const response = await fetch(`/api/blog-posts/${slug}`)
    //   const data = await response.json()
    //   setBlogPost(data)
    // }
    // fetchBlogPost()
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setBlogPost(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }))
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="font-proxima bg-gray-50 min-h-screen"
      >
        <motion.div
          initial={{ height: "100vh" }}
          animate={{ height: ["100vh", "50vh", "40vh"] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative w-full overflow-hidden"
        >
          <img
            src={blogPost.image}
            alt={blogPost.title}
            layout="fill"
            objectFit="cover"
            priority
            className="transition-all duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4 max-w-4xl"
            >
              {blogPost.title}
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          <Link to="blog_detail" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 transition-colors duration-200">
            <ArrowLeft className="mr-2" size={20} />
            <span className="text-sm sm:text-base">Back to Blog List</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <Avatar>
                <AvatarImage src={blogPost.avatar} alt={blogPost.author} />
                <AvatarFallback>{blogPost.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{blogPost.author}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span className="mr-4">{blogPost.date}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                <span>{blogPost.likes}</span>
              </motion.button>
              <div className="flex items-center space-x-1 text-gray-500">
                <User size={20} />
                <span>{blogPost.comments}</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 sm:mt-12 pt-8 border-t border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm cursor-pointer transition-colors duration-200 hover:bg-green-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-8 sm:mt-12 pt-8 border-t border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-4">Share this post</h3>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon">
                  <Facebook size={20} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon">
                  <Twitter size={20} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon">
                  <Linkedin size={20} />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

