import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import type { SocialIcon } from '../types/portfolio'
import { profile, socialLinks } from '../data/portfolio'
import { TornSection } from '../components/folder/TornSection'
import { SectionHeader } from '../components/folder/SectionHeader'
import { Reveal } from '../components/motion/Reveal'
import { SocialGlyph } from '../components/ui/BrandIcons'

// Each platform's own brand colour for its icon tile.
const brand: Record<SocialIcon, { bg: string; fg: string }> = {
  linkedin: { bg: '#0a66c2', fg: '#fff' },
  github: { bg: '#f0f6fc', fg: '#1f2328' },
  leetcode: { bg: '#ffa116', fg: '#1a1a1a' },
  hackerrank: { bg: '#00ea64', fg: '#0e141e' },
  skillrack: { bg: '#ffffff', fg: '#399bce' },
  instagram: { bg: 'linear-gradient(45deg, #f9ce34, #ee2a7b 50%, #6228d7)', fg: '#fff' },
}

export function ContactSection() {
  const reduce = useReducedMotion()
  const links = socialLinks.filter((s) => s.url)

  return (
    <TornSection id="contact" tone="night" seed={97}>
      <SectionHeader
        id="contact"
        index="07"
        label="Contact"
        dark
        title={
          <>
            Building something that needs a <span className="text-[#8fb0ff]">reliable full stack engineer?</span>
          </>
        }
        intro="The fastest way to reach me is email. My profiles are alongside if you'd like to see more of my work first."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
        <Reveal className="flex flex-col rounded-2xl border border-white/10 bg-white/4 p-6 md:p-8">
          <p className="font-mono text-xs text-white/50">// email</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">Send a direct email</h3>
          <p className="mt-3 text-sm text-white/60">Opens a new message in your mail app, already addressed to me.</p>
          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <Mail size={16} aria-hidden="true" />
              Open mail client
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              type="application/pdf"
              className="btn border border-white/15 text-white hover:border-white/35"
            >
              <Download size={16} aria-hidden="true" />
              Resume (PDF)
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-white/10 bg-white/4 p-6 md:p-8">
          <p className="font-mono text-xs text-white/50">// profiles &amp; coding platforms</p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {links.map((s, i) => {
              const c = brand[s.icon]
              return (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/10 p-3 text-white/85 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/4 hover:text-white"
                  >
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
                      style={{ background: c.bg, color: c.fg }}
                    >
                      <SocialGlyph icon={s.icon} size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{s.label}</span>
                      <span className="block truncate font-mono text-xs text-white/50">{s.handle}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </motion.li>
              )
            })}
          </ul>
        </Reveal>
      </div>

      <p className="mt-16 text-center font-display text-lg text-white/50">{profile.closingLine}</p>
    </TornSection>
  )
}
