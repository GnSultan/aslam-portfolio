'use client'

import { motion } from 'framer-motion'

const skills = [
  {
    name: 'Brand Strategy',
    percentage: '85%',
    description: 'Building foundations that make brands connect',
  },
  {
    name: 'Brand Identity',
    percentage: '90%',
    description: 'Crafting visuals that tell a clear story',
  },
  {
    name: 'Product Design',
    percentage: '80%',
    description: 'Designing experiences people enjoy and trust',
  },
  {
    name: 'Custom Web Applications',
    percentage: '80%',
    description: 'Building products that solve real problems',
  },
  {
    name: 'Digital Experiences',
    percentage: '80%',
    description: 'Crafting modern websites that just work',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section-spaced">
      <div className="container-wide">
        {/* Heading and Line */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h2 mb-6"
        >
          Skills
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
              I bring a range of expertise to every project, combining strategy, design, and development to deliver impact.
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
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-b border-secondary/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-text mb-1">{skill.name}</h3>
                      <p className="text-text-secondary">{skill.description}</p>
                    </div>
                    <div className="text-text-secondary text-xl font-medium">
                      {skill.percentage}
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
