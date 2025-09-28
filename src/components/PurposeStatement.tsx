'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Cursor = () => (
  <motion.span
    className="inline-block ml-1"
    animate={{
      opacity: [1, 0, 1],
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    _
  </motion.span>
)

export default function PurposeStatement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const textLines = [
    "In a world where technology often overwhelms,",
    "I believe true impact comes from creating tools and experiences",
    "that empower people, foster clarity, and inspire meaningful connection.",
    "<br />",
    "<br />",
    "My work is driven by the belief that design and technology should not just exist—",
    "they should make life easier, amplify creativity, and bring people closer together."
  ]

  useEffect(() => {
    if (isInView) {
      setIsTyping(true)
      let fullText = textLines.join(' ').replace(/<br \/>/g, '<br /> ')
      let currentText = ''
      let i = 0

      const type = () => {
        if (i < fullText.length) {
          const char = fullText.charAt(i)
          const isMistake = Math.random() < 0.1 // 10% chance of mistake

          if (isMistake && char !== '<' && char !== 'b' && char !== 'r' && char !== '/' && char !== '>') {
            const mistake = String.fromCharCode(97 + Math.floor(Math.random() * 26)) // random letter
            setTypedText(currentText + mistake)
            setTimeout(() => {
              setTypedText(currentText)
              setTimeout(() => {
                currentText += char
                setTypedText(currentText)
                i++
                setTimeout(type, 50 + Math.random() * 50)
              }, 100)
            }, 250)
          } else {
            currentText += char
            setTypedText(currentText)
            i++
            const delay = char === ' ' ? 100 + Math.random() * 100 : 50 + Math.random() * 50
            setTimeout(type, delay)
          }
        } else {
          setIsTyping(false)
        }
      }

      type()
    }
  }, [isInView])

  return (
    <section ref={containerRef} className="h-screen flex items-center justify-end">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left half - empty space */}
          <div></div>

          {/* Right half - purpose statement with typing effect */}
          <div className="max-w-2xl">
            <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-text-secondary">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="inline"
              >
                <span dangerouslySetInnerHTML={{ __html: typedText }} />
                {(isTyping || typedText.length > 0) && <Cursor />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
