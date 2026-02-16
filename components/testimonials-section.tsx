'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

// Real Google reviews from the data provided - only positive ones
const reviews = [
  {
    id: 1,
    name: 'Kushagra',
    rating: 5,
    text: 'Had an amazing experience with RK Realtors! Aniket Tawri and team went above and beyond to explore and find me a good property. They truly understand their clients\' needs. Couldn\'t have asked for a more reliable and friendly team.',
    time: '10 months ago',
    likes: 0,
    response: 'Thank you for your kind words. Aniket is a gem'
  },
  {
    id: 2,
    name: 'Kumar Tahilramani',
    rating: 5,
    text: 'Fantastic good service & very trustworthy tram. I strongly recommend',
    time: 'a month ago',
    likes: 0,
    response: 'Thank you for your kind words'
  },
  {
    id: 3,
    name: 'Bhavna Pani',
    rating: 5,
    text: 'Ravi Kevalramani and his team are excellent. Especially his team members Krunal Raichura and also Pawan, handheld me through an unforeseen and unfortunate crisis. I cannot recommend their services enough. This company is very honest and professional.',
    time: 'a year ago',
    likes: 2,
    response: 'Thank you for your kind words Bhavna'
  },
  {
    id: 4,
    name: 'Supriya A',
    rating: 5,
    text: 'Having been away from Mumbai for over 12 years we were quite overwhelmed with house hunting. Piyush and Akshay helped us through the process like champs. Understood our brief perfectly and stayed with us at every step of the way. One of the most professional reality firms out there. Can\'t recommend them enough. 7 out of 5 stars.',
    time: 'a year ago',
    likes: 1,
    response: 'Thank you for your kind words Supriya'
  },
  {
    id: 5,
    name: 'Ashutosh Shinde',
    rating: 5,
    text: 'Have always been following Mr Ravi on social media and thought the company deals with only premium properties. But this thought ended when during my own rental house search i stumbled upon an advertisement on a flat which was little closer to my budget. They helped me find a great place!',
    time: 'a year ago',
    likes: 3,
    response: 'Thank you Ashutosh for your kind words.'
  },
  {
    id: 6,
    name: 'Uzi Abid',
    rating: 5,
    text: 'Wanna start my saying something about piyush Bhatia who helped me put my apartment on rent. He\'s such a nice guy. The best. So humble so understanding. We need more people like Piyush. He helped me and was available every single time I needed him.',
    time: 'a year ago',
    likes: 1,
    response: 'Thank you Uzi for taking the time and reviewing us.'
  },
  {
    id: 7,
    name: 'Raashi Sanghavi',
    rating: 5,
    text: 'It was lovely working with Aniket from RK Realtors. They\'re super professional and the first thing that impressed me was an Excel sheet which had answers to every question that I would need to make a decision of buying a house.',
    time: 'a year ago',
    likes: 0,
    response: 'Thank you for giving us your business and sharing your review'
  },
  {
    id: 8,
    name: 'Alka Paul',
    rating: 5,
    text: 'Excellent Service. Extremely pro active. Thorough Professionals by taking care of every detail necessary. Their assistant Santosh is very sincere and took care of all the things mentioned to him. He got us a new tenant for our flat and did everything perfectly.',
    time: '6 years ago',
    likes: 1,
    response: 'Thank you for Kind Words. It was a pleasure serving you.'
  },
  {
    id: 9,
    name: 'Ronak Morbia',
    rating: 5,
    text: 'RK was great to work with, a true super star! This was our first home sale. They held our hand through the entire process. Educated us on the market and made us feel like we were in the best of hands. We had a quick sale and more importantly a smooth transaction. I will definitely work with them again.',
    time: '9 years ago',
    likes: 0,
    response: 'We know you have choices and thank you for choosing us.'
  },
  {
    id: 10,
    name: 'Ishaan Kapse',
    rating: 5,
    text: 'Akshay and Aniket put in a lot of effort to help us find the perfect place. They were organised and punctual. They understood our requirements perfectly and worked them through with us. Would definitely recommend.',
    time: 'a year ago',
    likes: 0,
    response: 'Thank you Ishaan'
  },
  {
    id: 11,
    name: 'Kanishk Jayant',
    rating: 5,
    text: 'Ravi in Hindi/Sanskrit means the Sun God...and that\'s so true when it comes to Mr. Ravi Kewalramani and his associates....let there be light and there is light at the end of the tunnel. He is very ably assisted by his team member. Exceptional service!',
    time: '2 years ago',
    likes: 0,
  },
  {
    id: 12,
    name: 'Rohan Lavsi',
    rating: 5,
    text: 'Piyush has been a great help. He is one of best real estate agents I have met in last 20years.',
    time: 'a year ago',
    likes: 1,
    response: 'Thank you for your kind words.'
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
          {/* Google Reviews Badge - Updated colors */}
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
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? 'fill-[#FBBC05] text-[#FBBC05]'
                        : i === 4 
                          ? 'fill-[#FBBC05] text-[#FBBC05] opacity-30'
                          : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#13294B]">4.3</span>
              <span className="text-xs text-[#13294B]/60">(138 reviews)</span>
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
                          <p className="text-xs text-[#13294B]/60">{review.time}</p>
                        </div>
                        {review.likes > 0 && (
                          <div className="flex items-center gap-1 text-xs text-[#13294B]/60">
                            <span>❤️</span>
                            <span>{review.likes}</span>
                          </div>
                        )}
                      </div>

                      {/* Owner Response - Updated colors */}
                      {review.response && (
                        <div className="mt-3 pt-3 border-t border-[#D8DCE3]">
                          <p className="text-xs text-[#13294B] font-medium mb-1">RK Realtors responded:</p>
                          <p className="text-xs text-[#13294B]/70 italic">{review.response}</p>
                        </div>
                      )}
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
            href="#"
            className="inline-flex items-center gap-2 text-[#13294B] hover:text-[#13294B] font-medium transition-colors group"
          >
            View all 138 reviews on Google
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}