'use client'

import dynamic from 'next/dynamic'

// Dynamically import the PropertyMap to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-[#E9DFC3]/20 rounded-lg flex items-center justify-center border border-[#E9DFC3]">
      <div className="text-[#1B56FD] font-medium">Loading map...</div>
    </div>
  ),
})

type PropertyMapWrapperProps = {
  coordinates: [number, number]
  name: string
  address: string
}

export default function PropertyMapWrapper({ coordinates, name, address }: PropertyMapWrapperProps) {
  // Convert array format to object format for Leaflet
  const mapProperty = {
    name,
    address,
    coordinates: {
      lat: coordinates[0],
      lng: coordinates[1],
    },
  }

  return <PropertyMap property={mapProperty} />
}