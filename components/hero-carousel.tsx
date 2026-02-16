'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    title: 'Tillibai Apartments',
    subtitle: '10-Story Residential Tower',
    location: 'Malad East',
    description: '',
    image: '/tillibai.png'
  },
  {
    id: 2,
    title: 'Sai Shanti',
    subtitle: 'Residential Complex',
    location: 'Boisar',
    description: '',
    image: '/saishanti.png',
  },
  {
    id: 3,
    title: 'Vasudev Ratna',
    subtitle: '50-Story Residential Tower',
    location: 'Bhayandar East',
    description: '',
    image: '/vasudevratna.png',
  }
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Preload all images on mount
  useEffect(() => {
    slides.forEach(slide => {
      const img = new window.Image()
      img.src = slide.image
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(slide.image))
      }
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true)
        setIndex((prev) => (prev + 1) % slides.length)
        setTimeout(() => setIsTransitioning(false), 1000)
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [index, isTransitioning])

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setIndex((prev) => (prev - 1 + slides.length) % slides.length)
      setTimeout(() => setIsTransitioning(false), 1000)
    }
  }

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setIndex((prev) => (prev + 1) % slides.length)
      setTimeout(() => setIsTransitioning(false), 1000)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden text-white bg-black">
      {/* Image Preloader (hidden) */}
      <div className="hidden">
        {slides.map((slide, i) => (
          <Image
            key={i}
            src={slide.image}
            alt="preload"
            width={1920}
            height={1080}
            priority={i === 0}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with Next.js Image for optimization */}
          <div className="absolute inset-0">
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </div>

          {/* Animated Zoom Effect */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          >
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </motion.div>

          {/* Soft Overlay - using gradient for smoother transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Centered Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">

        <motion.p
          key={`location-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-sm tracking-[0.3em] uppercase text-gray-300 mb-6"
        >
          {slides[index].location}
        </motion.p>

        <motion.h1
          key={`title-${index}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          {slides[index].title}
        </motion.h1>

        <motion.p
          key={`subtitle-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-2xl md:text-3xl font-light text-gray-300 mb-6"
        >
          {slides[index].subtitle}
        </motion.p>

        <motion.p
          key={`desc-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-lg text-gray-300 mb-10 max-w-2xl"
        >
          {slides[index].description}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="group inline-flex items-center gap-3 border border-white px-8 py-4 rounded-full font-semibold transition-all duration-300 text-black bg-muted hover:bg-white hover:text-black"
        >
          Explore Project
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isTransitioning && i !== index) {
                setIsTransitioning(true)
                setIndex(i)
                setTimeout(() => setIsTransitioning(false), 1000)
              }
            }}
            disabled={isTransitioning}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          />
        ))}
      </div>

      {/* Loading indicator for images (optional) */}
      {!loadedImages.has(slides[index].image) && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}