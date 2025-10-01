'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--footer)',
        backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '200px 200px',
        backgroundAttachment: 'fixed',
        backgroundPosition: '0 0'
      }}
      className="text-white py-24"
    >
      <div className="w-full px-4 sm:px-6 lg:px-16">
        <div className="text-center">
          {/* Large copyright spanning full width */}
          <h2 className="text-[clamp(4rem,12vw,10rem)] leading-[1] tracking-tight font-bold mb-12 w-full">
            © {currentYear}
          </h2>

          {/* Social links */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors text-lg"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors text-lg"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors text-lg"
            >
              LinkedIn
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors text-lg"
            >
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
