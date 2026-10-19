import type { SVGProps } from 'react'
import type { SocialIcon } from '../../types/portfolio'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

export function GitHubIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedInIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function InstagramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LeetCodeIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.48 0a1.38 1.38 0 0 0-.96.44L7.12 6.21l-2.73 2.92a5.25 5.25 0 0 0-1.06 1.67 5.53 5.53 0 0 0 .1 4.26 5.7 5.7 0 0 0 1.15 1.67l4.26 4.32a5.73 5.73 0 0 0 7.95.17l2.58-2.47a1.38 1.38 0 1 0-1.9-1.99l-2.58 2.47a2.97 2.97 0 0 1-4.11-.09l-4.26-4.32a2.83 2.83 0 0 1-.02-3.97l2.73-2.92 5.38-5.77A1.38 1.38 0 0 0 13.48 0Zm-2.87 13.52a1.38 1.38 0 1 0 0 2.76h9.55a1.38 1.38 0 1 0 0-2.76Z" />
    </svg>
  )
}

export function HackerRankIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0c1.29 0 9.97 5.01 10.61 6.12.64 1.12.64 10.64 0 11.76C21.97 18.99 13.29 24 12 24s-9.97-5.01-10.61-6.12C.75 16.76.75 7.24 1.39 6.12 2.03 5.01 10.71 0 12 0Zm2.69 6.18a.2.2 0 0 0-.2.2v4.32H9.5V6.6l1.04.01a.2.2 0 0 0 .14-.34L8.26 3.9a.2.2 0 0 0-.28 0L5.6 6.27a.2.2 0 0 0 .14.34h.98v10.84c0 .11.09.2.2.2h2.38a.2.2 0 0 0 .2-.2v-4.29h4.99v3.97l-1 .01a.2.2 0 0 0-.14.34l2.37 2.37a.2.2 0 0 0 .28 0l2.4-2.4a.2.2 0 0 0-.14-.34h-1v-10.53a.2.2 0 0 0-.2-.2Z" />
    </svg>
  )
}

/** SkillRack has no simple mark; use its uploaded logo on a light tile. */
function SkillRackIcon({ size = 18 }: { size?: number }) {
  return <img loading="lazy" decoding="async" src="/assets/skills/skillrack.svg" alt="" aria-hidden="true" width={size} height={size} className="object-contain" />
}

export function SocialGlyph({ icon, size = 18 }: { icon: SocialIcon; size?: number }) {
  switch (icon) {
    case 'github':
      return <GitHubIcon size={size} />
    case 'linkedin':
      return <LinkedInIcon size={size} />
    case 'leetcode':
      return <LeetCodeIcon size={size} />
    case 'hackerrank':
      return <HackerRankIcon size={size} />
    case 'skillrack':
      return <SkillRackIcon size={size} />
    case 'instagram':
      return <InstagramIcon size={size} />
  }
}
