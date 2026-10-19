import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { Calendar, Layers, Rocket, ShieldCheck, type LucideIcon } from 'lucide-react'
import type { FolderPalette } from '../projects/projectMeta'
import { domains } from './skillDomains'

export interface Stat {
  value: number
  suffix: string
  label: string
  note: string
}

const looks: { icon: LucideIcon; palette: FolderPalette }[] = [
  { icon: Layers, palette: domains.frontend.palette },
  { icon: Calendar, palette: domains.backend.palette },
  { icon: Rocket, palette: domains.architecture.palette },
  { icon: ShieldCheck, palette: domains.cloud.palette },
]

/** Headline numbers as colour-coded index cards that count up when scrolled into view. */
export function SkillStats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()

  return (
    <ul ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const { icon: Icon, palette } = looks[i % looks.length]
        return (
          <motion.li
            key={stat.label}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ duration: 0.5, delay: inView ? i * 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-sheet p-4 shadow-[var(--shadow-sheet)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] sm:p-5"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: palette.accent }} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 size-32 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-125"
              style={{ background: palette.tint }}
            />

            <div className="relative flex items-start justify-between gap-3">
              <p className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl" style={{ color: palette.deep }}>
                <CountUp to={stat.value} run={inView} instant={!!reduce} />
                {stat.suffix}
              </p>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: palette.accent }}>
                <Icon size={17} aria-hidden="true" />
              </span>
            </div>
            <p className="relative mt-4 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-ink">{stat.label}</p>
            <p className="relative mt-1 text-xs text-muted">{stat.note}</p>
          </motion.li>
        )
      })}
    </ul>
  )
}

function CountUp({ to, run, instant }: { to: number; run: boolean; instant: boolean }) {
  const [n, setN] = useState(instant ? to : 0)

  useEffect(() => {
    if (!run || instant) return
    const controls = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [run, instant, to])

  return <span className="tabular-nums">{instant ? to : n}</span>
}
