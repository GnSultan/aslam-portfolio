import { siteConfig } from '@/config/site'

interface SocialLink {
  name: string
  url: string
  label: string
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: siteConfig.social.github,
    label: 'Visit GitHub profile'
  },
  {
    name: 'Instagram',
    url: siteConfig.social.instagram,
    label: 'Visit Instagram profile'
  },
  {
    name: 'Threads',
    url: siteConfig.social.threads,
    label: 'Visit Threads profile'
  },
  {
    name: 'Behance',
    url: siteConfig.social.behance,
    label: 'Visit Behance profile'
  }
]

interface SocialLinksProps {
  className?: string
  linkClassName?: string
  variant?: 'light' | 'dark'
}

export default function SocialLinks({
  className = '',
  linkClassName = '',
  variant = 'dark'
}: SocialLinksProps) {
  const baseStyles = variant === 'dark'
    ? 'text-white/60 hover:text-white'
    : 'text-text/70 hover:text-text'

  return (
    <div className={`flex items-center justify-center gap-8 flex-wrap ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyles} transition-colors text-lg ${linkClassName}`}
          aria-label={`${social.label} (opens in new tab)`}
        >
          {social.name}
        </a>
      ))}
    </div>
  )
}
