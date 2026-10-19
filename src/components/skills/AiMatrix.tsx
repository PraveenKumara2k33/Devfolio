import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import { ArrowRight, BellRing, Bot, MessageSquareHeart, Sparkles, Target, TrendingUp, UserSearch, type LucideIcon } from 'lucide-react'
import { domains } from './skillDomains'

interface AiMatrixProps {
  rows: { capability: string; application: string }[]
}

const icons: Record<string, LucideIcon> = {
  'AI Concierge': BellRing,
  'Guest Intelligence': UserSearch,
  'Sentiment Analysis': MessageSquareHeart,
  'Next Best Action': Target,
  'AI CRM Assistant': Bot,
  'Revenue Intelligence': TrendingUp,
}

const ease = [0.22, 1, 0.36, 1] as const
const { accent, deep, tint } = domains.ai.palette

/**
 * AI capabilities wired to the hotel workflow each one serves. Each row draws
 * its connector in as the matrix scrolls into view.
 */
export function AiMatrix({ rows }: AiMatrixProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()

  const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }
  const row: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  }
  const wire: Variants = {
    hidden: { scaleX: reduce ? 1 : 0 },
    show: { scaleX: 1, transition: { duration: 0.6, ease, delay: 0.15 } },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, ease }}
      className="relative overflow-hidden rounded-3xl p-1.5 sm:p-2"
      style={{ background: `linear-gradient(140deg, ${accent}, ${deep})` }}
    >
      <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />

      {/* Header on the coloured frame */}
      <div className="relative flex flex-wrap items-end justify-between gap-3 px-4 pb-4 pt-4 text-white sm:px-6 sm:pt-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-white/15">
            <Sparkles size={19} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-white sm:text-xl">AI × Hospitality Integration Matrix</h3>
            <p className="font-mono text-[0.7rem] text-white/70">operational mapping to hotel platforms</p>
          </div>
        </div>
        <p className="hidden font-mono text-[0.68rem] uppercase tracking-wider text-white/70 sm:block">
          capability <ArrowRight size={11} className="inline" aria-hidden="true" /> application
        </p>
      </div>

      <motion.ul
        variants={list}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="relative grid gap-2 rounded-[1.25rem] bg-sheet p-2 sm:p-3 lg:grid-cols-2"
      >
        {rows.map((r, i) => {
          const Icon = icons[r.capability] ?? Sparkles
          return (
            <motion.li
              key={r.capability}
              variants={row}
              className="group flex items-center gap-3 rounded-2xl border border-line/70 bg-sheet p-3 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-sheet)] sm:gap-4 sm:p-4"
              style={{ ['--ai' as string]: accent }}
            >
              {/* Capability */}
              <div className="flex min-w-0 shrink-0 items-center gap-2.5 sm:w-48">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
                  style={{ background: tint, color: deep }}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[0.6rem] text-muted">{String(i + 1).padStart(2, '0')}</p>
                  <p className="text-sm font-semibold leading-tight" style={{ color: deep }}>
                    {r.capability}
                  </p>
                </div>
              </div>

              {/* Connector */}
              <div aria-hidden="true" className="relative hidden h-px min-w-6 flex-1 sm:block">
                <motion.span
                  variants={wire}
                  className="absolute inset-0 origin-left border-t-2 border-dashed transition-[border-style] group-hover:border-solid"
                  style={{ borderColor: `${accent}66` }}
                />
                <ArrowRight
                  size={14}
                  className="absolute -right-1 -top-[7px] transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: accent }}
                />
              </div>

              {/* Application */}
              <p className="min-w-0 flex-1 text-sm text-ink/80 sm:max-w-[13rem]">
                <span className="sr-only">applies to: </span>
                {r.application}
              </p>
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.div>
  )
}
