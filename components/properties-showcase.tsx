'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const properties = [
  {
    id: 1,
    name: 'Vasudev Heights',
    slug: 'vasudev-heights',
    area: 'Mira Road (E)',
    location: 'Mira Road East',
    status: 'ongoing',
    image: '/VasudevHeights.jpeg',
    imageAlt: 'Vasudev Heights residential tower',
  },
  {
    id: 2,
    name: 'Vasudev Ratna',
    slug: 'vasudev-ratna',
    area: 'Bhayandar East',
    location: 'Bhayandar East',
    status: 'upcoming',
    image: '/VasudevRatna.jpeg',
    imageAlt: 'Vasudev Ratna skyscraper',
  },
  {
    id: 3,
    name: 'Shree Shashwat',
    slug: 'shree-shashwat',
    area: 'Mira Road (E)',
    location: 'Mira Road',
    status: 'ongoing',
    image: 'ShreeShahwat.jpeg',
    imageAlt: 'Shree Shashwat residential building',
  },
  {
    id: 4,
    name: 'Tillibai Apartments',
    slug: 'tillibai-apartments',
    area: 'Malad East',
    location: 'Malad East',
    status: 'completed',
    image: '/tillibai.png',
    imageAlt: 'Tillibai Apartments',
  },
  {
    id: 5,
    name: 'Sai Shanti Complex',
    slug: 'sai-shanti-complex',
    area: 'Boisar',
    location: 'Boisar',
    status: 'completed',
    image: '/SaiShanti.jpeg',
    imageAlt: 'Sai Shanti Complex',
  },
]

const filters = ['All', 'Completed', 'Ongoing', 'Upcoming']

export function PropertiesShowcase() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProperties = properties.filter(property => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Completed') return property.status === 'completed'
    if (activeFilter === 'Ongoing') return property.status === 'ongoing'
    if (activeFilter === 'Upcoming') return property.status === 'upcoming'
    return true
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-white text-green-600 border-green-200'
      case 'ongoing': return 'bg-white text-blue-600 border-blue-200'
      case 'upcoming': return 'bg-white text-amber-600 border-amber-200'
      default: return 'bg-white text-gray-600 border-gray-200'
    }
  }

  return (
    <section className="py-20 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Our Projects
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Featured Properties
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Discover our portfolio of premium residential projects across Mumbai.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Properties Grid - ONLY name and area */}
        <motion.div
          key={activeFilter} // This forces re-render when filter changes
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <Link href={`/properties/${property.slug}`} className="block">
                <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 h-full flex flex-col border border-muted">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(property.status)}`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Content - ONLY name and area */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      {property.name}
                    </h3>
                    
                    <div className="flex items-start gap-2 text-sm text-foreground/70">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60">No properties found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}