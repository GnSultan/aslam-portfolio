'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section
      className="section-spaced relative"
      id="contact"
    >
      <div className="container-wide">
        {/* Heading and Line */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h2 mb-6"
        >
          Let&apos;s Talk
        </motion.h2>
        
        {/* Full-width line separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="w-full h-px bg-text mb-16 origin-left"
        />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 lg:gap-20">
            {/* 30% - Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
            <p className="text-body leading-relaxed text-text-secondary mb-8 content-text">
              Ready to bring your ideas to life? Let&apos;s discuss your project and <span className="text-emphasis">create something amazing together</span>.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-text mb-2">Email</h3>
                <a 
                  href="mailto:hello@imaslam.com" 
                  className="text-body text-text-secondary hover:text-primary transition-colors duration-300"
                >
                  hello@imaslam.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-text mb-2">Location</h3>
                <p className="text-body text-text-secondary">
                  Arusha, Tanzania
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-text mb-2">Available for</h3>
                <p className="text-body text-text-secondary">
                  Freelance projects & collaborations
                </p>
              </div>
            </div>
          </motion.div>

          {/* 70% - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 lg:pl-20"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-cursor-hover
                  data-cursor-text="Your Name"
                  className="w-full bg-transparent border-0 border-b border-text/20 focus:border-text focus:outline-none py-3 text-text placeholder-text/40 transition-colors duration-300"
                  placeholder="Name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group"
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-cursor-hover
                  data-cursor-text="Your Email"
                  className="w-full bg-transparent border-0 border-b border-text/20 focus:border-text focus:outline-none py-3 text-text placeholder-text/40 transition-colors duration-300"
                  placeholder="Email"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group"
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  data-cursor-hover
                  data-cursor-text="Your Message"
                  className="w-full bg-transparent border-0 border-b border-text/20 focus:border-text focus:outline-none py-3 text-text placeholder-text/40 transition-colors duration-300 resize-none"
                  placeholder="Message"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  data-cursor-hover
                  data-cursor-text="Submit"
                  className="text-text hover:text-primary transition-colors duration-300 group"
                >
                  <span className="text-lg font-light">Send Message</span>
                  <svg 
                    className="w-5 h-5 ml-2 inline transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
