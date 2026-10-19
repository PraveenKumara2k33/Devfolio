import { motion, useReducedMotion } from 'motion/react'
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { navTabs, profile, socialLinks } from '../../data/portfolio'
import { scrollPageTo } from '../../lib/smoothScroll'
import { SocialGlyph } from '../ui/BrandIcons'
import type { SocialIcon } from '../../types/portfolio'

const footerIcons: SocialIcon[] = ['linkedin', 'instagram', 'github']

const builtWith = ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite']

/** The folder's back cover: index of sections, where else to find me, and a way back to the top. */
export function SiteFooter() {
  const year = new Date().getFullYear()
  // The footer keeps the essentials; the full list lives in Contact.
  const links = socialLinks
    .filter((s) => s.url && footerIcons.includes(s.icon))
    .sort((a, b) => footerIcons.indexOf(a.icon) - footerIcons.indexOf(b.icon))
  const reduce = useReducedMotion()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night text-white/70">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.32em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[17vw] font-bold leading-none tracking-tighter text-white/[0.035]"
      >
        {profile.firstName}
      </span>

      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="#home" className="inline-flex items-center gap-3" aria-label={`${profile.name} — back to top`}>
              <span className="grid size-11 place-items-center overflow-hidden rounded-xl border border-white/15 bg-ink p-1">
                <img loading="lazy" decoding="async" src="/assets/projects/portfolio_logo-128.webp" alt="" className="size-full object-contain" />
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-white">
                  {profile.name}
                  <span className="text-folder">.</span>
                </span>
                <span className="block font-mono text-[0.68rem] text-white/50">{profile.title}</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{profile.tagline}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
              {builtWith.map((t) => (
                <li key={t} className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[0.65rem] text-white/55">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Index */}
          <nav aria-label="Footer" className="md:col-span-4">
            <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-white/40">Index</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
              {navTabs.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="group flex items-center gap-2.5 rounded-md py-1.5 text-sm transition-colors hover:text-white">
                    <span className="font-mono text-[0.65rem] text-white/35 transition-colors group-hover:text-folder">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">{t.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="md:col-span-4">
            <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-white/40">Connect</p>
            <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-1">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 transition-colors hover:border-white/25 hover:bg-white/3"
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-folder text-white">
                    <Mail size={15} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white">Email</span>
                    <span className="block truncate font-mono text-[0.68rem] text-white/50">Open mail client</span>
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" className="text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </li>
              {links.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${s.label} profile (opens in a new tab)`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 transition-colors hover:border-white/25 hover:bg-white/3"
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-white/10 text-white">
                      <SocialGlyph icon={s.icon} size={15} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-white">{s.label}</span>
                      <span className="block truncate font-mono text-[0.68rem] text-white/50">{s.handle}</span>
                    </span>
                    <ArrowUpRight size={15} aria-hidden="true" className="text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="font-mono text-xs text-white/45">
            © {year} {profile.name} · Designed &amp; built by hand
          </p>
          <motion.button
            type="button"
            onClick={() => scrollPageTo(0)}
            whileHover={reduce ? undefined : { y: -3 }}
            whileTap={reduce ? undefined : { scale: 0.95 }}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-white/35"
          >
            Back to top
            <span className="grid size-6 place-items-center rounded-full bg-folder transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp size={13} aria-hidden="true" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
