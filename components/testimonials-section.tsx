'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

// Real Google reviews from the data provided - only the 8 specific reviews
const reviews = [
 
  {
    id: 1,
    name: 'Rimgim Mishra',
    rating: 5,
    text: 'RK realtors is a promising and trustworthy company. Vouch for their work ethics',
    likes: 0,
  },
  {
    id: 2,
    name: 'akhiwesh',
    rating: 5,
    text: 'RK Realtors has a very professional team. They understand the needs of shopkeepers and business owners, especially regarding space planning and commercial value. Highly satisfied with the interaction.',
    likes: 0,
  },
  {
    id: 3,
    name: 'Raj Ade',
    rating: 5,
    text: 'RK Realtors shows strong market knowledge and professionalism. Their project planning and commitment give confidence to investors and buyers alike.',
    likes: 0,
  },
  {
    id: 4,
    name: 'Akhilesh waghmare',
    rating: 5,
    text: 'We had a very good experience interacting with RK Realtors regarding our society redevelopment discussions. Their approach is practical, honest, and well-planned. Looking forward to working together.',
    likes: 0,
  },
  {
    id: 5,
    name: 'Praneel Shah',
    rating: 5,
    text: 'I had a very smooth and professional experience with R K REALTORS in Malad. The team was honest, responsive, and really understood my property requirements. They guided me properly through every step and made the whole process simple and stress-free. Highly recommend them if you’re looking for reliable property management and genuine service in Mumbai!',
    likes: 0,
  },
  {
    id: 6,
    name: 'syed mohammad kaif',
    rating: 5,
    text: 'Best developer with good finishing work',
    likes: 0,
  },
  {
    id: 7,
    name: 'Kapil Baheti',
    rating: 5,
    text: 'Had a wonderful experience working with this real estate firm. The team is highly professional, knowledgeable, and genuinely committed to helping clients find the right property. They guided me through every step with transparency and made the entire process smooth and stress-free.',
    likes: 0,
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(reviews.length / itemsPerView)
  const maxIndex = totalSlides - 1

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1))
  }

  const visibleReviews = reviews.slice(
    currentIndex * itemsPerView,
    (currentIndex * itemsPerView) + itemsPerView
  )

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  // Calculate star display for 4.7 rating
  const renderStars = () => {
    const stars = []
    const fullStars = 4
    const hasHalfStar = true // 4.7 rating has a half star
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-[70%]">
              <Star className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
            </div>
          </div>
        )
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300" />
        )
      }
    }
    return stars
  }

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden bg-white">
      {/* Grid Background - Updated to navy */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #13294B 1px, transparent 1px),
              linear-gradient(to bottom, #13294B 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: '0.02',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1A8CFF 1px, transparent 1px),
              linear-gradient(to bottom, #1A8CFF 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: '0.02',
          }}
        />
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#13294B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#1A8CFF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Google Reviews Badge - Updated with 4.7 rating and 17 reviews */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full mb-6 border border-[#D8DCE3] shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-[#13294B] font-semibold">Google Reviews</span>
            <div className="flex items-center gap-1 border-l border-[#D8DCE3] pl-3">
              <div className="flex items-center">
                {renderStars()}
              </div>
              <span className="text-sm font-bold text-[#13294B]">4.7</span>
              <span className="text-xs text-[#13294B]/60">(17 reviews)</span>
            </div>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#13294B] mt-3">
            What Our{' '}
            <span className="relative text-[#1A8CFF]">
              Client Says
            </span>
          </h2>
          <p className="text-[#13294B]/70 text-lg max-w-2xl mx-auto mt-4">
            Real experiences from real clients who found their perfect property with us
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative px-8 md:px-12">
          {/* Navigation Buttons - Updated colors */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#D8DCE3] shadow-md hover:shadow-lg flex items-center justify-center text-[#1A8CFF] hover:text-[#13294B] transition-all hover:scale-110"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#D8DCE3] shadow-md hover:shadow-lg flex items-center justify-center text-[#1A8CFF] hover:text-[#13294B] transition-all hover:scale-110"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Reviews Container */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className={`grid gap-6 ${
                  itemsPerView === 1 
                    ? 'grid-cols-1' 
                    : itemsPerView === 2 
                    ? 'grid-cols-2' 
                    : 'grid-cols-3'
                }`}
              >
                {visibleReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl border border-[#D8DCE3] p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Google Icon and Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="text-xs text-[#13294B]/60">Google</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? 'fill-[#FBBC05] text-[#FBBC05]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quote Icon - Updated color */}
                    <Quote className="w-8 h-8 text-[#D8DCE3] mb-2" />

                    {/* Review Text */}
                    <p className="text-[#13294B]/80 text-sm leading-relaxed mb-4 line-clamp-4">
                      {review.text}
                    </p>

                    {/* Reviewer Info */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-[#13294B]">{review.name}</p>
                        </div>
                        {review.likes > 0 && (
                          <div className="flex items-center gap-1 text-xs text-[#13294B]/60">
                            <span>❤️</span>
                            <span>{review.likes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator - Updated colors */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-[#13294B] rounded-full'
                    : 'w-2 h-2 bg-[#D8DCE3] rounded-full hover:bg-[#1A8CFF]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Reviews Link - Updated colors */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/search?sca_esv=0ccad900ef2a9a41&hl=en&gl=in&biw=1536&bih=730&sxsrf=ANbL-n5dVnE3zGhA7OrPcabXz1xWTuDvSg:1771410934221&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOSSmy_sqa_mN-cE_AIINsx7tukaFtpsbGZz5r60HYmqnn8O04MWsuSRFIXtxMLbH7Sb-RgM31WWyx50mPMMghQmSApX2&q=R+K+REALTORS+Reviews&sa=X&ved=2ahUKEwjT6_D76-KSAxVGkq8BHXJAKLQQ0bkNegQIIxAF"
            className="inline-flex items-center gap-2 text-[#13294B] hover:text-[#13294B] font-medium transition-colors group"
          >
            View all reviews on Google
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}