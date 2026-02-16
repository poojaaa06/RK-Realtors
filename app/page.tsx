import { Header } from '@/components/header'
import { HeroCarousel } from '@/components/hero-carousel'
import { PropertiesShowcase } from '@/components/properties-showcase'
import { PropertiesMap } from '@/components/properties-map'
import { AboutSection } from '@/components/about-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      <Header />
      <HeroCarousel />
      
      <section id="projects">
        <PropertiesShowcase />
      </section>

      {/* Map Section - GRID ONLY IN BACKGROUND */}
      <section 
        id="map" 
        className="py-20 px-4 md:px-8 lg:px-16 w-full relative overflow-hidden bg-white"
      >
        {/* GRID BACKGROUND - ONLY IN SECTION BACKGROUND */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0118D8 1px, transparent 1px),
              linear-gradient(to bottom, #0118D8 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: '0.08',
          }}
        ></div>
        
        {/* Secondary grid - only in background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1B56FD 1px, transparent 1px),
              linear-gradient(to bottom, #1B56FD 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: '0.05',
          }}
        ></div>
        
        {/* Content container - NO GRID HERE, just white card */}
        <div className="max-w-7xl mx-auto relative z-10">
          <PropertiesMap />
        </div>
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  )
}