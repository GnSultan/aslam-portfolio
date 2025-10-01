'use client'

import SocialLinks from '@/components/SocialLinks'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--footer)',
        backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '200px 200px',
        backgroundAttachment: 'fixed',
        backgroundPosition: '0 0'
      }}
      className="text-white py-24"
    >
      <div className="w-full">
        <div className="text-center px-4 sm:px-6 lg:px-16">
          {/* Large copyright spanning full width */}
          <h2 className="text-[clamp(8rem,25vw,20rem)] leading-[1] tracking-tighter font-medium mb-12">
            © {currentYear}
          </h2>

          {/* Social links */}
          <SocialLinks variant="dark" />
        </div>
      </div>
    </footer>
  )
}
