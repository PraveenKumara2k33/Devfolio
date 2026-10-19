import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowRight, Award, Briefcase, Download, Layers, Mail } from 'lucide-react'
import { ecosystem, profile, publications } from '../data/portfolio'
import { FolderStack } from '../components/hero/FolderStack'
import { RotatingPhrase } from '../components/hero/RotatingPhrase'

const ease = [0.22, 1, 0.36, 1] as const

// One colour per platform module, from the site palette.
const moduleColors = ['#3157d5', '#1f7a55', '#b9502a', '#1e6b80', '#6a4bc9', '#8a5f0c', '#3157d5', '#1f7a55']

const facts = [
  { icon: Briefcase, value: '2+ yrs', label: 'professional experience' },
  { icon: Layers, value: String(ecosystem.length), label: 'products on one platform' },
  { icon: Award, value: 'IEEE', label: publications[0] ? `published ${publications[0].year}` : 'published' },
]

export function HeroSection() {
  const reduce = useReducedMotion()
  const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  }

  return (
    <section id="home" aria-labelledby="home-title" className="paper-grain relative overflow-hidden bg-paper pb-20 pt-32 md:pb-28 lg:pt-32">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_10%,transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 size-[36rem] rounded-full bg-folder/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div variants={list} initial="hidden" animate="show">
          <motion.h1 variants={item} id="home-title" className="text-[clamp(2.6rem,7vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            {profile.firstName}
            <span className="text-folder"> A.</span>
            <span className="mt-3 block text-[0.42em] font-medium leading-tight tracking-[-0.02em] text-ink/70">
              Full stack engineer for <RotatingPhrase phrases={['hospitality platforms', 'business systems', 'AI-powered products']} />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-lg text-muted">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary group">
              View projects
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={profile.resumeUrl} download={profile.resumeFileName} type="application/pdf" className="btn btn-ghost">
              <Download size={16} aria-hidden="true" />
              Download resume
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-ghost" aria-label="Send an email">
              <Mail size={16} aria-hidden="true" />
              Email
            </a>
          </motion.div>

          {/* Quick facts */}
          <motion.dl variants={item} className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-sheet/70 py-3 shadow-2xs">
            {facts.map(({ icon: Icon, value, label }) => (
              <div key={label} className="px-3 sm:px-4">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="flex items-center gap-1.5 font-display text-xl font-bold text-ink sm:text-2xl">
                    <Icon size={15} aria-hidden="true" className="text-folder" />
                    {value}
                  </span>
                  <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted sm:text-xs">{label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Currently building */}
          <motion.aside variants={item} aria-label="Currently building" className="sheet mt-5 max-w-xl overflow-hidden p-0">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-line bg-paper/60 px-5 py-2.5">
              <p className="flex items-center gap-2 whitespace-nowrap font-mono text-xs text-folder">
                <span className="size-1.5 animate-pulse rounded-full bg-folder" />
                // currently building
              </p>
              <a href="#experience" className="whitespace-nowrap font-mono text-xs text-muted transition-colors hover:text-ink">
                Hospitality SaaS Platform →
              </a>
            </div>
            <div className="p-5">
              <p className="text-sm text-ink/80">A unified hospitality ecosystem — {ecosystem.length} products sharing one platform.</p>
              <motion.ul
                className="mt-4 flex flex-wrap gap-1.5"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } } }}
              >
                {ecosystem.map((m, i) => (
                  <motion.li
                    key={m}
                    variants={{ hidden: { opacity: 0, scale: reduce ? 1 : 0.85 }, show: { opacity: 1, scale: 1 } }}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-sheet px-2 py-1 font-mono text-[0.7rem] text-ink/80 transition-colors hover:border-ink/25"
                  >
                    <span className="size-1.5 rounded-full" style={{ background: moduleColors[i % moduleColors.length] }} />
                    {m}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.aside>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 30, rotate: reduce ? 0 : -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="px-4 sm:px-10 lg:px-0"
        >
          <FolderStack />
        </motion.div>
      </div>


    </section>
  )
}
