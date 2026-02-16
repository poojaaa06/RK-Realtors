'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: 'Quick Links',
      links: ['Home', 'Projects', 'About Us', 'Contact'],
    },
    {
      title: 'Projects',
      links: ['Vasudev Heights', 'Vasudev Ratna', 'Shree Shashwat', 'RK Imperia'],
    },
    {
      title: 'Information',
      links: ['RERA Registration', 'FAQs', 'Privacy Policy', 'Terms & Conditions'],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Twitter, href: '#' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="bg-black text-[#F8FAFC]">
      {/* Top accent line */}
     
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="font-display font-bold text-2xl mb-4">
              <span className="text-[#1A8CFF]">RK</span>
              <span className="text-[#F8FAFC]"> Realtors</span>
            </div>
            <p className="text-[#94A3B8] mb-6 leading-relaxed">
              Building premium residential spaces that transform lives and create lasting communities across Mumbai.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-[#1A8CFF]/10 flex items-center justify-center group-hover:bg-[#1A8CFF]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#1A8CFF]" />
                </div>
                <a href="tel:+919833396669" className="text-[#94A3B8] hover:text-[#1B56FD] transition text-sm">
                  +91 9833396669
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-[#1A8CFF]/10 flex items-center justify-center group-hover:bg-[#1A8CFF]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#1A8CFF]" />
                </div>
                <a href="mailto:rkrealtors99@gmail.com" className="text-[#94A3B8] hover:text-[#1B56FD] transition text-sm">
                  rkrealtors99@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A8CFF]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#1A8CFF]" />
                </div>
                <span className="text-[#94A3B8] text-sm">Malad & Mira Road, Mumbai</span>
              </div>
            </div>
          </motion.div>

          {/* Link Sections */}
          {sections.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-4 text-[#1A8CFF]">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#94A3B8] hover:text-[#1B56FD] transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-white via-[#1B56FD]/3 to-primary mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-[#94A3B8] text-sm">
            © {currentYear} RK Realtors. All rights reserved. | Built with excellence.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#1A8CFF]/10 flex items-center justify-center text-[#1A8CFF] hover:bg-[#1B56FD] hover:text-[#F8FAFC] transition-all duration-300 border border-[#1B56FD]/20"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}