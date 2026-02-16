'use client'

import { motion } from 'framer-motion'
import { Building, Award, Users, TrendingUp, Play, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { label: 'Projects Completed', value: '6+' },
  { label: 'Happy Families', value: '5000+' },
  { label: 'Years of Excellence', value: '20+' },
  { label: 'Ongoing Projects', value: '3+' },
]

export function AboutSection() {
  return (
    <section className="py-20 md:py-32 px-6 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Our Story Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-12 bg-[#13294B]" /> {/* Deep navy */}
            <span className="text-[#13294B] text-sm font-medium tracking-wider uppercase">
              Our Story
            </span>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Headline & Large Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Headline */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#13294B]">
              Your Vision Our Expertise Your Success{' '}
              <span className="text-[#1A8CFF]">Get Noticed Generate Leads Dominate.</span> {/* Electric blue accent */}
            </h2>

            {/* Large Image Placeholder */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative h-[400px] rounded-2xl overflow-hidden border border-[#D8DCE3] shadow-lg group"
            >
              <Image
                src="/bigimage.jpeg"
                alt="RK Realtors Team"
                fill
                className="object-cover"
                priority
              />
              {/* Soft overlay for premium look */}
              <div className="absolute inset-0 bg-[#13294B]/10 group-hover:bg-[#13294B]/20 transition duration-300" />
            </motion.div>
          </motion.div>

          {/* Right Column - Images & Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Two Small Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-[180px] rounded-xl overflow-hidden border border-[#D8DCE3] shadow-md group"
              >
                <Image
                  src="/smallimage1.jpg"
                  alt="Luxury Project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#13294B]/10 group-hover:bg-[#13294B]/20 transition duration-300" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-[180px] rounded-xl overflow-hidden border border-[#D8DCE3] shadow-md group"
              >
                <Image
                  src="/smallimage2.jpg"
                  alt="Luxury Project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#13294B]/10 group-hover:bg-[#13294B]/20 transition duration-300" />
              </motion.div>
            </div>

            {/* Description Text */}
            <div className="space-y-4 bg-[#EDEFF2] p-6 rounded-xl border border-[#D8DCE3]">
              <p className="text-[#13294B] text-sm md:text-base leading-relaxed">
                With over two decades of excellence in real estate development, RK Realtors has established itself as a premier builder of premium residential spaces. Our commitment to architectural excellence and customer satisfaction has made us a trusted name.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center bg-white p-4 rounded-xl shadow-sm border border-[#D8DCE3]"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#13294B] font-display mb-1">
                    {stat.value}
                  </div>
                  <p className="text-[#13294B]/70 text-xs leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Team Avatars & CTA */}
            <div className="flex items-center gap-4 pt-4">
              {/* Avatar Group - Updated colors */}
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-[#13294B] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-lg"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>

              {/* Play Button - Updated colors */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#1A8CFF] flex items-center justify-center group-hover:bg-[#13294B] transition-colors shadow-lg">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
                <span className="text-[#13294B] text-sm font-medium group-hover:text-[#1A8CFF] transition-colors">
                  WATCH VIDEO
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          {/* Decorative Background */}
        </motion.div>
      </div>
    </section>
  )
}