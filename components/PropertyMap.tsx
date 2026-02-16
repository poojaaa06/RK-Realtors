'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

type Property = {
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

type PropertyMapProps = {
  property: Property
}

export default function PropertyMap({ property }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map with custom z-index
    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
      // Ensure map stays within its container
      fadeAnimation: false,
      zoomAnimation: false,
    }).setView(
      [property.coordinates.lat, property.coordinates.lng],
      14
    )

    mapInstanceRef.current = map

    // Add tile layer (using CartoDB Voyager for clean look)
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map)

    // Custom marker with blue color to match theme
    const markerIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: #0118D8;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(1, 24, 216, 0.3);
      "></div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    })

    // Add marker
    const marker = L.marker([property.coordinates.lat, property.coordinates.lng], {
      icon: markerIcon
    }).addTo(map)
    
    // Add popup with property info
    marker.bindPopup(`
      <div style="font-family: system-ui; padding: 8px;">
        <strong style="
          font-family: var(--font-playfair), serif;
          display: block;
          margin-bottom: 4px;
          color: black;
          font-size: 14px;
        ">${property.name}</strong>
        <span style="color: black; font-size: 12px;">${property.address}</span>
      </div>
    `)

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [property])

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[300px] rounded-lg overflow-hidden relative z-0"
      style={{ isolation: 'isolate' }} // Creates a new stacking context
    />
  )
}