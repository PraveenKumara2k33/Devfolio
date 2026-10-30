import { useEffect, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Building2,
  CalendarCheck,
  CreditCard,
  Download,
  Globe,
  Hammer,
  HeartHandshake,
  Mail,
  Network,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { ecosystem, profile, publications } from '../data/portfolio'
import { FolderStack } from '../components/hero/FolderStack'
import { RotatingPhrase } from '../components/hero/RotatingPhrase'
import { useIntroDone } from '../lib/intro'

const ease = [0.22, 1, 0.36, 1] as const

// One colour per platform module, from the site palette.
const moduleColors = ['#3157d5', '#1f7a55', '#b9502a', '#1e6b80', '#6a4bc9', '#8a5f0c', '#3157d5', '#1f7a55']

// Opens the visitor's mail app with my address and a subject already filled in.
const mailHref = `mailto:${profile.email}?subject=${encodeURIComponent('Hello PraveenKumar, from your portfolio')}`

const facts = [
  { value: '2+ yrs', label: 'professional experience' },
  { value: '15+', label: 'core technologies' },
  { value: 'IEEE', label: publications[0] ? `published ${publications[0].year}` : 'published' },
]

export function HeroSection() {
  const reduce = useReducedMotion()
  // Hold the entrance until the first-visit loader is out of the way.
  const ready = useIntroDone()
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
        <motion.div variants={list} initial="hidden" animate={ready ? 'show' : 'hidden'}>
          {/* Role badge */}
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-sheet/80 py-1 pl-2.5 pr-3.5 text-xs font-semibold text-ink/80 shadow-2xs backdrop-blur"
          >
            <span className="relative grid size-2 place-items-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/50" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            Full Stack Software Engineer
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span className="text-success">Backend focus</span>
          </motion.p>

          <motion.h1 variants={item} id="home-title" className="mt-5 text-[clamp(2.5rem,6.2vw,4.35rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            {profile.firstName}
            <span className="text-folder"> A.</span>
            <span className="mt-3 block text-[0.42em] font-medium leading-tight tracking-[-0.02em] text-ink/70">
              Building <RotatingPhrase phrases={['reliable backend systems', 'hospitality platforms', 'AI-powered products']} />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <a href="#projects" className="btn btn-primary group col-span-2 justify-center sm:col-span-1">
              View projects
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={profile.resumeUrl} download={profile.resumeFileName} type="application/pdf" className="btn btn-ghost justify-center px-3 sm:px-5">
              <Download size={16} aria-hidden="true" />
              <span className="sm:hidden">Resume</span>
              <span className="hidden sm:inline">Download resume</span>
            </a>
            <a href={mailHref} className="btn btn-ghost justify-center px-3 sm:px-5" title={profile.email}>
              <Mail size={16} aria-hidden="true" />
              Email me
            </a>
          </motion.div>

          {/* Key numbers: big and quick to scan */}
          <motion.dl variants={item} className="mt-9 flex max-w-xl divide-x divide-line">
            {facts.map(({ value, label }) => (
              <div key={label} className="min-w-0 flex-1 px-4 first:pl-0 sm:px-6">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{value}</span>
                  {/* Visible label; screen readers already heard it from the <dt>. */}
                  <span aria-hidden="true" className="mt-1 block text-xs leading-snug text-muted">
                    {label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={item}>
            <NowBuilding ready={ready} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 30, rotate: reduce ? 0 : -2 }}
          animate={ready ? { opacity: 1, y: 0, rotate: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="px-4 sm:px-10 lg:px-0"
        >
          <FolderStack ready={ready} />
        </motion.div>
      </div>

    </section>
  )
}


// One icon per platform product; anything new falls back to a generic box.
const moduleIcons: Record<string, LucideIcon> = {
  'Booking Engine': CalendarCheck,
  'Property Management': Building2,
  'Point of Sale': CreditCard,
  Housekeeping: BedDouble,
  HRMS: Users,
  CRM: HeartHandshake,
  'Channel Manager': Network,
  'Hospitality Websites': Globe,
}

/**
 * The platform I'm building, as a small status board: the products come
 * "online" one by one, then a soft highlight moves across them.
 */
function NowBuilding({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(-1)

  // Once every tile is online, walk a highlight across them.
  useEffect(() => {
    if (!ready || reduce) return
    let i = -1
    let tick = 0
    const start = window.setTimeout(() => {
      const step = () => {
        i = (i + 1) % ecosystem.length
        setActive(i)
      }
      step()
      tick = window.setInterval(step, 1500)
    }, 2600)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(tick)
    }
  }, [ready, reduce])

  const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.75 } } }
  const tile: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
  }

  return (
    <aside aria-label="Currently building" className="mt-7 max-w-xl overflow-hidden rounded-2xl border border-line bg-sheet shadow-[var(--shadow-sheet)]">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-paper/60 px-5 py-2.5">
        <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-success">
          <Hammer size={13} aria-hidden="true" />
          Now building
        </p>
        <a
          href="#experience"
          className="group inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-ink"
        >
          See the role
          <ArrowUpRight size={13} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 className="font-display text-lg font-semibold">Hospitality SaaS Platform</h2>
          <p className="text-xs text-muted">{ecosystem.length} products · one shared platform</p>
        </div>

        <motion.ul variants={grid} className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ecosystem.map((m, i) => {
            const Icon = moduleIcons[m] ?? CalendarCheck
            const color = moduleColors[i % moduleColors.length]
            const on = i === active
            return (
              <motion.li
                key={m}
                variants={tile}
                className={`relative flex min-w-0 items-center gap-2 rounded-xl border px-2 py-2 sm:flex-col sm:items-start sm:gap-2 sm:px-2.5 sm:py-2.5 transition-[border-color,background-color,box-shadow] duration-500 ${
                  on ? 'border-transparent bg-paper shadow-[0_6px_16px_-10px_rgb(23_33_43/0.45)]' : 'border-line bg-sheet'
                }`}
                style={on ? { boxShadow: `0 0 0 1.5px ${color}55, 0 6px 16px -10px rgb(23 33 43 / 0.45)` } : undefined}
              >
                <span
                  className="relative grid size-7 shrink-0 place-items-center rounded-lg transition-transform duration-500"
                  style={{ background: `${color}14`, color, transform: on ? 'scale(1.08)' : undefined }}
                >
                  <Icon size={14} aria-hidden="true" />
                </span>
                <span className="min-w-0 text-xs font-medium leading-tight text-ink/85">{m}</span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </aside>
  )
}
