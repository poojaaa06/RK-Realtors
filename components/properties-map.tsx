'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Define property type
interface Property {
  id: string
  name: string
  location: string
  lat: number
  lng: number
  status: 'completed' | 'ongoing' | 'upcoming'
  description: string
  image: string
  timeline?: string
}

// Property data from PDF - ALL PROJECTS
const properties: Property[] = [
  {
    id: '1',
    name: 'Vasudev Heights',
    location: 'Mira Road East',
    lat: 19.2856,
    lng: 72.8651,
    status: 'ongoing',
    description: '33-Storey Residential Tower near Tulsi Lake',
    image: '/VasudevHeights.png',
    timeline: 'March 2023 - Dec 2027'
  },
  {
    id: '2',
    name: 'Shree Shashwat',
    location: 'Mira Road East',
    lat: 19.2842, // Slightly offset
    lng: 72.8665, // Slightly offset
    status: 'ongoing',
    description: '22-Storey Residential Tower in Pleasant Park',
    image: '/shreesawant.png',
    timeline: 'Feb 2022 - April 2025'
  },

  {
    id: '3',
    name: 'Vasudev Ratna',
    location: 'Bhayandar East',
    lat: 19.2801,
    lng: 72.8571,
    status: 'upcoming',
    description: '50-Storey Residential Tower near Golden Nest Circle',
    image: '/vasudevratna.png',
    timeline: 'Aug 2024 - Nov 2028'
  },
  {
    id: '4',
    name: 'Tillibai Apartments',
    location: 'Malad East',
    lat: 19.1865,
    lng: 72.8564,
    status: 'completed',
    description: '10-Storey Residential Tower in Bachani Nagar',
    image: '/tillibai.png',
    timeline: 'Aug 2021 - Dec 2024'
  },
  {
    id: '5',
    name: 'Sai Shanti Complex',
    location: 'Boisar',
    lat: 19.8051,
    lng: 72.7551,
    status: 'completed',
    description: 'Residential Complex in Vanipada',
    image: '/saishanti.png',
    timeline: 'Jan 2008 - Nov 2010'
  }
]

// Dynamically import the map component with SSR disabled
const MapComponent = dynamic(
  () => import('./map-component'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] bg-[#EDEFF2] flex items-center justify-center rounded-xl border border-[#D8DCE3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13294B] mx-auto mb-3"></div>
          <p className="text-sm text-[#13294B]/60">Loading map...</p>
        </div>
      </div>
    )
  }
)

export function PropertiesMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[300px] bg-[#EDEFF2] flex items-center justify-center rounded-xl border border-[#D8DCE3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13294B] mx-auto mb-3"></div>
          <p className="text-sm text-[#13294B]/60">Loading map...</p>
        </div>
      </div>
    )
  }

  // Count properties by status
  const completedCount = properties.filter(p => p.status === 'completed').length
  const ongoingCount = properties.filter(p => p.status === 'ongoing').length
  const upcomingCount = properties.filter(p => p.status === 'upcoming').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-50px' }}
      className="w-full max-w-6xl mx-auto relative p-4 md:p-6 rounded-xl bg-white shadow-lg border border-[#D8DCE3]"
    >
      <div className="mb-4">
        {/* Header - Stack on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
          <h2 className="text-xl md:text-2xl font-display font-bold text-black">
            Our Properties Across Mumbai
          </h2>
          
          {/* Compact Legend */}
          <div className="flex items-center gap-2 text-[10px] md:text-xs bg-[#EDEFF2] px-3 py-2 md:px-4 md:py-2 rounded-full overflow-x-auto whitespace-nowrap md:whitespace-normal md:overflow-visible scrollbar-hide border border-[#D8DCE3]">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#13294B]"></div>
              <span className="text-black/70">Completed ({completedCount})</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#1A8CFF]"></div>
              <span className="text-black/70">Ongoing ({ongoingCount})</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#9FD4FF]"></div>
              <span className="text-black/70">Upcoming ({upcomingCount})</span>
            </div>
          </div>
        </div>
        
        <p className="text-xs md:text-sm text-black/70">
          {properties.length} projects • Mira Road • Bhayandar • Malad • Boisar
        </p>
      </div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <MapComponent properties={properties} />
      </motion.div>
    </motion.div>
  )
}