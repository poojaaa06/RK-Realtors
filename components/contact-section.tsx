'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Email configuration
  const YOUR_EMAIL = "poohja.0604@gmail.com" // Main recipient

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${YOUR_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: 'New Contact Form Submission from RK Realtors Website',
          _template: 'table',
          _captcha: 'false',
          _cc: 'rahulshopping1701@gmail.com,rkrealtors99@gmail.com', // Add both emails in CC
          _autoresponse: 'Thank you for contacting RK Realtors. We have received your inquiry and will get back to you shortly.' // Optional auto-response
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        })
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 9833396669 - Varun Sharma', '+91 9819001948 - Rajendra Sharma'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['rkrealtors99@gmail.com'],
    },
    {
      icon: MapPin,
      title: 'Offices',
      details: [
        'Malad: B1, Dhiraj C.H.S, Poddar Road, Near Gol Garden, Malad (E), Mumbai - 400097',
        'Mira Road: A-101, Ostwal Paradise, Building No. 8, Opp. Reliance Petrol Pump, Shivar Garden, Mira Bhayandar Road, Mira Road (E) - 401107',
      ],
    },
  ]

  return (
    <section className="py-20 md:py-32 px-6 bg-black text-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#1B56FD]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#0118D8]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block bg-white text-primary text-sm font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-[#1B56FD]/20"
          >
            Get In Touch
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4 text-[#F8FAFC]">
            Ready to Find Your{' '}
            <span className="relative">
              Dream Home?
            </span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Connect with our expert team to explore your perfect property and investment opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((info, idx) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="flex gap-4 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-full bg-[#1A8CFF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A8CFF]/20 transition-all border border-[#1A8CFF]/20"
                  >
                    <Icon className="w-6 h-6 text-[#1A8CFF]" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-[#F8FAFC]">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, didx) => (
                        <p key={didx} className="text-[#94A3B8] text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-xl border border-[#334155] shadow-xl"
          >
            {/* Name */}
            <motion.div
              whileHover={{ y: -2 }}
              className="relative"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#1B56FD] transition-colors"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ y: -2 }}
              className="relative"
            >
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#1B56FD] transition-colors"
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              whileHover={{ y: -2 }}
              className="relative"
            >
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#1B56FD] transition-colors"
              />
            </motion.div>

            {/* Message */}
            <motion.div
              whileHover={{ y: -2 }}
              className="relative"
            >
              <textarea
                name="message"
                placeholder="Tell us what you're looking for..."
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#1B56FD] transition-colors resize-none"
              />
            </motion.div>

            {/* Honeypot field to prevent spam */}
            <input type="text" name="_honey" style={{ display: 'none' }} />
            {/* Disable captcha */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Set template to table for better formatting */}
            <input type="hidden" name="_template" value="table" />
            {/* CC recipients */}
            <input type="hidden" name="_cc" value="poohja.0604@gmail.com, rahulshopping1701@gmail.com" />
            {/* Auto-response to the sender */}
            <input type="hidden" name="_autoresponse" value="Thank you for contacting RK Realtors. We have received your inquiry and will get back to you shortly." />

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex justify-center items-center gap-2 bg-[#FAFAFA] text-[#13294B] px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#1B56FD]/30 transition-all duration-300 border border-[#1B56FD]/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Inquiry'}
              {!isSubmitting && !submitted && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </motion.button>

            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-center text-sm"
              >
                Thank you! We'll get back to you shortly.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}