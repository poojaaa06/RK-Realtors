import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, MapPin, Calendar, Shield, Phone, Mail, 
  Building2, Clock, CheckCircle2, Sparkles
} from 'lucide-react'
import PropertyMapWrapper from './PropertyMapWrapper'
import { Header } from '@/components/header'

// Property data from PDF - STRICTLY from the brochure
const properties = [
  {
    id: 1,
    name: 'Vasudev Heights',
    slug: 'vasudev-heights',
    type: '33-Storey Residential Tower',
    address: 'Vasudev Heights, near Tulsi Lake, Opp. Delta Vrindavan, Bhakti Vedanta Marg, near Royal College, Mira Road (E) - 401107',
    reraId: 'P51700046384',
    startDate: 'March 2023',
    completion: 'December 2027',
    status: 'ongoing',
    image: '/VasudevHeights.png',
    coordinates: [19.2856, 72.8651],
  },
  {
    id: 2,
    name: 'Vasudev Ratna',
    slug: 'vasudev-ratna',
    type: '50-Storey Residential Tower',
    address: 'Vasudev Ratna, Phatak Road, Opp. DC, near golden nest circle, Bhayandar East - 401105',
    reraId: 'P51700054530',
    startDate: 'August 2024',
    completion: 'November 2028',
    status: 'upcoming',
    image: '/vasudevratna.png',
    coordinates: [19.2801, 72.8571],
  },
  {
    id: 3,
    name: 'Shree Shashwat',
    slug: 'shree-shashwat',
    type: '22-Storey Residential Tower',
    address: 'Shree Shashwat, building no. 22, Pleasant Park, off Mira Bhayandar road, Mira Road (E) - 401107',
    reraId: 'P51700055427',
    startDate: 'February 2022',
    completion: 'April 2025',
    status: 'ongoing',
    image: '/shreesawant.png',
    coordinates: [19.2856, 72.8651],
  },
  {
    id: 4,
    name: 'Tillibai Apartments',
    slug: 'tillibai-apartments',
    type: '10-Storey Residential Tower',
    address: 'Tillibai apartments, bachani nagar road, bachani nagar, Malad East, Mumbai - 400097',
    reraId: 'P51800046882',
    startDate: 'August 2021',
    completion: 'December 2024',
    status: 'completed',
    image: '/tillibai.png',
    coordinates: [19.1865, 72.8564],
  },
  {
    id: 5,
    name: 'Sai Shanti Complex',
    slug: 'sai-shanti-complex',
    type: 'Residential Complex',
    address: 'Sai shanti complex, Sainath nagar, vijay colony, vanipada, Boisar - 401501',
    reraId: 'N/A',
    startDate: 'January 2008',
    completion: 'November 2010',
    status: 'completed',
    image: '/saishanti.png',
    coordinates: [19.8051, 72.7551],
  },
]

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = properties.find(p => p.slug === slug)

  if (!property) {
    notFound()
  }

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'completed': return {
        bg: 'bg-[#13294B] text-white',
        icon: CheckCircle2,
        label: 'Completed'
      }
      case 'ongoing': return {
        bg: 'bg-[#1A8CFF] text-white',
        icon: Clock,
        label: 'Under Construction'
      }
      case 'upcoming': return {
        bg: 'bg-[#9FD4FF] text-[#13294B]',
        icon: Sparkles,
        label: 'Coming Soon'
      }
      default: return {
        bg: 'bg-[#EDEFF2] text-[#13294B]',
        icon: Building2,
        label: 'Status'
      }
    }
  }

  const statusStyle = getStatusStyles(property.status)
  const StatusIcon = statusStyle.icon

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header variant="scrolled" />
      
      {/* Add padding-top to account for fixed header */}
      <div className="pt-20 md:pt-24">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#13294B] hover:text-[#1A8CFF] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Properties</span>
          </Link>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Single border around all content */}
          <div className="border border-[#D8DCE3] rounded-2xl p-6 md:p-8 bg-white shadow-sm">
            <div className="space-y-8">
              
              {/* Hero Section - Balanced image size */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
                
                {/* Left: Image - Properly sized */}
                <div className="relative">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#EDEFF2] border border-[#D8DCE3]">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right: Basic Info */}
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.bg}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusStyle.label}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl font-light text-black">
                    {property.name}
                  </h1>
                  
                  <p className="text-sm text-black/70 flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#13294B] shrink-0 mt-0.5" />
                    <span>{property.type}</span>
                  </p>

                  {/* RERA ID */}
                  <div className="flex items-center gap-2 text-sm bg-[#EDEFF2] px-3 py-2 rounded-lg border border-[#D8DCE3]">
                    <Shield className="w-4 h-4 text-[#13294B]" />
                    <span className="text-black font-medium">RERA:</span>
                    <span className="font-mono text-black font-semibold">{property.reraId}</span>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-black uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#13294B]" />
                  Location Map
                </h2>
                <div className="rounded-lg overflow-hidden border border-[#D8DCE3]">
                  <PropertyMapWrapper 
                    coordinates={property.coordinates} 
                    name={property.name}
                    address={property.address}
                  />
                </div>
              </div>

              {/* Project Details Section */}
              <div className="border-t border-[#D8DCE3] pt-6">
                <h2 className="text-sm font-semibold text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#13294B]" />
                  Project Details
                </h2>
                
                {/* Address */}
                <div className="flex items-start gap-3 text-base text-black bg-[#EDEFF2] p-4 rounded-lg border border-[#D8DCE3]">
                  <MapPin className="w-5 h-5 text-[#13294B] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{property.address}</span>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="border-t border-[#D8DCE3] pt-6">
                <h2 className="text-sm font-semibold text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#13294B]" />
                  Project Timeline
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#EDEFF2] p-4 rounded-lg border border-[#D8DCE3]">
                    <p className="text-xs text-[#13294B] font-medium mb-1">Start Date</p>
                    <p className="text-lg font-semibold text-black">{property.startDate}</p>
                  </div>
                  <div className="bg-[#EDEFF2] p-4 rounded-lg border border-[#D8DCE3]">
                    <p className="text-xs text-[#13294B] font-medium mb-1">Completion</p>
                    <p className="text-lg font-semibold text-black">{property.completion}</p>
                  </div>
                </div>
              </div>

              {/* Contact & Offices Section */}
              <div className="border-t border-[#D8DCE3] pt-6 mt-4">
                <h2 className="text-sm font-semibold text-black uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#13294B]" />
                  Contact & Offices
                </h2>
                
                {/* Promoters */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#EDEFF2] p-4 rounded-lg border border-[#D8DCE3]">
                    <p className="text-xs text-[#13294B] font-medium mb-1">Varun Sharma</p>
                    <a href="tel:9833396669" className="text-base text-black hover:text-[#13294B] flex items-center gap-2 font-semibold transition-colors">
                      <Phone className="w-4 h-4 text-[#13294B]" />
                      9833396669
                    </a>
                  </div>
                  <div className="bg-[#EDEFF2] p-4 rounded-lg border border-[#D8DCE3]">
                    <p className="text-xs text-[#13294B] font-medium mb-1">Rajendra Sharma</p>
                    <a href="tel:9819001948" className="text-base text-black hover:text-[#13294B] flex items-center gap-2 font-semibold transition-colors">
                      <Phone className="w-4 h-4 text-[#13294B]" />
                      9819001948
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-6 bg-[#EDEFF2] p-4 rounded-lg border border-[#D8DCE3]">
                  <a 
                    href="mailto:rkrealtors99@gmail.com"
                    className="text-base text-black hover:text-[#13294B] flex items-center gap-2 font-semibold transition-colors"
                  >
                    <Mail className="w-5 h-5 text-[#13294B]" />
                    rkrealtors99@gmail.com
                  </a>
                </div>

                {/* Office Addresses */}
                <div className="space-y-4">
                  <div className="bg-[#EDEFF2]/50 p-4 rounded-lg border border-[#D8DCE3]">
                    <p className="text-sm font-bold text-black mb-2">Malad Office</p>
                    <p className="text-sm text-black/70 leading-relaxed">
                      B1, Dhiraj C.H.S, Poddar Road, Near Gol Garden, Malad (E), Mumbai - 400097
                    </p>
                  </div>
                  <div className="bg-[#EDEFF2]/50 p-4 rounded-lg border border-[#D8DCE3]">
                    <p className="text-sm font-bold text-black mb-2">Mira Road Office</p>
                    <p className="text-sm text-black/70 leading-relaxed">
                      A-101, Ostwal Paradise, Building No. 8, Opp. Reliance Petrol Pump, Shivar Garden, Mira Bhayandar Road, Mira Road (E) - 401107
                    </p>
                  </div>
                </div>

                {/* Get in Touch note */}
                <p className="text-sm text-[#13294B] mt-6 pt-4 border-t border-[#D8DCE3] italic font-medium">
                  For project inquiries, site visits, and partnership opportunities, please feel free to contact us.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}