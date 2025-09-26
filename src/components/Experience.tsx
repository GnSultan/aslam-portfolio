'use client'

import { motion } from 'framer-motion'

const experience = [
  {
    company: 'Meta',
    role: 'Senior Product Designer',
    period: '2022 - Present',
  },
  {
    company: 'Spotify',
    role: 'Product Designer',
    period: '2020 - 2022',
  },
  {
    company: 'Freelance',
    role: 'Creative Director',
    period: '2018 - 2020',
  },
  {
    company: 'Google',
    role: 'UX Designer',
    period: '2016 - 2018',
  },
  {
    company: 'Figma',
    role: 'UI Designer',
    period: '2014 - 2016',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section-spaced">
      <div className="container-wide">
        {/* Heading and Line */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h2 mb-6"
        >
          Experience
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
            <p className="text-xl leading-relaxed text-text-secondary">
              We worked with numerous clients, with a regular team, regular clients, enjoy collaborating with clients who appreciate the importance of good design.
            </p>
          </motion.div>

          {/* 70% - Experience Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="space-y-4">
              {experience.map((job, index) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-b border-secondary/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-text mb-1">{job.company}</h3>
                      <p className="text-text-secondary">{job.role}</p>
                    </div>
                    <div className="text-text-secondary text-sm font-mono">
                      {job.period}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
