'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'

interface HeaderProps {
  variant?: 'auto' | 'scrolled' | 'transparent'
}

export function Header({ variant = 'auto' }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Only track scroll if variant is 'auto'
    if (variant !== 'auto') return
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [variant])

  // Determine if header should be in scrolled state
  const isScrolled = variant === 'scrolled' || (variant === 'auto' && scrolled)

  const navItems = [
    {label:'Home' ,href:"/"},
    { label: 'Our Projects', href: '/#projects' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact Us', href: '#contact' },
  ]

  // Function to handle brochure download
  const handleDownloadBrochure = () => {
    // Replace this with the actual path to your PDF file
    const pdfUrl = '/rk.pdf' // Make sure to place your PDF in the public/brochures/ folder
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'RK-Realtors-Brochure.pdf' // The name that will be used when downloading
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-primary backdrop-blur-xl shadow-lg text-white'
          : 'bg-transparent text-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ">
        
        {/* Logo - Only font changed to Playfair Display */}
    
 <motion.div
  whileHover={{ scale: 1.05 }}
  className="font-serif text-2xl tracking-wide"
>
  <span className="font-bold">R K</span>{' '}
  <span className="font-normal italic text-white/80">Realtors</span>
</motion.div>




        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-sm tracking-wide uppercase">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative group transition"
            >
              {item.label}
              <span className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                isScrolled ? 'bg-black' : 'bg-white'
              }`} />
            </a>
          ))}
        </div>

        {/* Download Brochure Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadBrochure}
          className={`hidden md:inline-flex items-center gap-2 border px-6 py-2 rounded-full text-sm uppercase tracking-wide transition-all duration-300 ${
            isScrolled 
              ? 'border-white text-white hover:bg-black hover:text-white' 
              : 'border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          <Download size={16} />
          Download Brochure
        </motion.button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu - Lighter color */}
     {isOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="md:hidden bg-[#E8F0FE] backdrop-blur-xl text-[#13294B] px-6 py-6 space-y-6"
  >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium hover:text-[#1A8CFF] transition-colors"
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile Download Brochure Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              handleDownloadBrochure()
              setIsOpen(false)
            }}
            className="w-full flex items-center justify-center gap-2 border-2 border-[#13294B] text-[#13294B] py-3 rounded-full hover:bg-[#13294B] hover:text-white transition-all duration-300 font-medium"
          >
            <Download size={16} />
            Download Brochure
          </motion.button>
        </motion.div>
      )}
    </motion.header>
  )
}