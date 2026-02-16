'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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

interface MapComponentProps {
  properties: Property[]
}

// Custom icon creator - using the new navy/white palette
const createCustomIcon = (status: string) => {
  const colors = {
    completed: '#13294B', // Deep navy
    ongoing: '#1A8CFF',    // Electric blue
    upcoming: '#9FD4FF'     // Light sky blue
  }

  const color = colors[status as keyof typeof colors]

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px ${color === '#13294B' ? '#13294B' : '#1A8CFF'}80;
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3" fill="white"></circle>
        </svg>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  })
}

export default function MapComponent({ properties }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    // Clear any existing map instance
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
      markersRef.current = []
    }

    const container = document.getElementById('properties-map')
    if (!container) return

    // Initialize map
    const map = L.map('properties-map', {
      zoomControl: false,
      attributionControl: false
    })
    mapRef.current = map

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add markers for each property
    properties.forEach((property) => {
      const marker = L.marker(
        [property.lat, property.lng],
        { icon: createCustomIcon(property.status) }
      ).addTo(map)

      // Add styled popup with new colors
      const statusColors = {
        completed: '#13294B', // Deep navy
        ongoing: '#1A8CFF',   // Electric blue
        upcoming: '#9FD4FF'    // Light sky blue
      }
      
      const statusLabels = {
        completed: 'Completed',
        ongoing: 'Ongoing',
        upcoming: 'Upcoming'
      }

      const statusBgColor = statusColors[property.status as keyof typeof statusColors]
      const statusLabel = statusLabels[property.status as keyof typeof statusLabels]

      marker.bindPopup(`
        <div class="p-4 w-full min-w-[260px]">
          <h3 class="font-semibold text-[#13294B] text-lg mb-1 font-playfair">
            ${property.name}
          </h3>
          <p class="text-sm text-[#13294B]/70 mb-2">${property.location}</p>
          
          <div class="mb-3">
            <span class="inline-block px-2.5 py-1 rounded-full text-xs font-medium text-white" style="background-color: ${statusBgColor}">
              ${statusLabel}
            </span>
          </div>

          <p class="text-sm text-[#13294B]/70 mb-3">${property.description}</p>
          
          ${property.timeline ? `
            <div class="flex items-center gap-1.5 text-sm font-medium text-[#13294B]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#13294B" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${property.timeline}
            </div>
          ` : ''}
        </div>
      `, {
        maxWidth: 300,
        className: 'custom-popup'
      })

      markersRef.current.push(marker)
    })

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current)
      map.fitBounds(group.getBounds().pad(0.2))
    } else {
      map.setView([19.0760, 72.8777], 10) // Mumbai coordinates
    }

    // Add zoom controls
    L.control.zoom({
      position: 'topright'
    }).addTo(map)

    // Add attribution control
    L.control.attribution({
      prefix: false
    }).addTo(map)

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markersRef.current = []
      }
    }
  }, [properties])

  return (
    <div className="relative">
      <div 
        id="properties-map"
        className="w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden shadow-lg border-2 border-[#13294B]/20"
        style={{ zIndex: 1 }}
      />
      
      {/* Location Badge */}
      <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 z-10 max-w-[calc(100%-16px)]">
        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm shadow-lg border border-[#13294B]/20 flex items-center gap-1.5 md:gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#13294B" strokeWidth="2" className="md:w-4 md:h-4 flex-shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3" fill="#13294B"></circle>
          </svg>
          <span className="font-medium text-[#13294B] truncate">Mumbai Metropolitan Region</span>
        </div>
      </div>
    </div>
  )
}