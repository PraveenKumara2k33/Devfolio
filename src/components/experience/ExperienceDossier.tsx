import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowLeft, ArrowRight, Calendar, MapPin, Terminal } from 'lucide-react'
import type { Role } from '../../types/portfolio'
import { skillLogos } from '../../lib/skillLogos'
import { ModuleTabs } from '../folder/ModuleTabs'
import { CompanyMark } from './CompanyMark'

interface ExperienceDossierProps {
  role: Role
  index: number
  total: number
  focus: string[]
  prev?: Role
  next?: Role
  onPrev: () => void
  onNext: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
}

/** One career chapter rendered as an open file sheet. Children reveal in sequence. */
export function ExperienceDossier({ role, index, total, focus, prev, next, onPrev, onNext }: ExperienceDossierProps) {
  const reduce = useReducedMotion()
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  }
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.article variants={list} initial="hidden" animate="show" className="relative">
      {/* Index tab on the sheet edge */}
      <div className="flex items-end gap-2 pl-5">
        <span className="folder-tab-shape inline-flex items-center gap-2 bg-manila px-5 pb-1.5 pt-2 font-mono text-xs font-medium text-ink/80">
          <span className="text-folder">02.{index + 1}</span>
          <span aria-hidden="true">/</span>
          {role.company}
        </span>
        <span className="mb-1.5 font-mono text-[0.68rem] text-muted">
          file {num} of {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="ruled relative overflow-hidden rounded-3xl rounded-tl-lg border border-line bg-sheet shadow-[var(--shadow-lift)]">
        {/* Accent wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-folder/10 blur-3xl"
        />
        {/* Watermark number */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-2 select-none font-display text-[7rem] font-bold leading-none text-ink/[0.04] sm:text-[10rem]"
        >
          {num}
        </span>

        <div className="relative space-y-8 p-5 sm:p-8 md:p-10">
          {/* Header */}
          <motion.header variants={item} className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <CompanyMark role={role} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {role.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-2.5 py-0.5 font-mono text-[0.68rem] font-semibold text-success">
                    <span className="relative flex size-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-70" />
                      <span className="relative size-1.5 rounded-full bg-success" />
                    </span>
                    Current role
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                  <Calendar size={12} aria-hidden="true" className="text-folder" />
                  {role.current ? 'Present' : role.period}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                  <MapPin size={12} aria-hidden="true" className="text-folder" />
                  {role.mode ?? 'On-site'}
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-semibold sm:text-3xl md:text-4xl">{role.company}</h3>
              <p className="mt-1 text-base font-medium text-folder sm:text-lg">{role.title}</p>
            </div>
          </motion.header>

          {/* Summary + focus */}
          <motion.div variants={item} className="grid gap-5 md:grid-cols-[1fr_auto]">
            <p className="max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">{role.summary}</p>
            <ul className="flex flex-wrap content-start gap-2 md:max-w-[16rem]" aria-label="Focus areas">
              {focus.map((f) => (
                <li key={f} className="tag-soft">
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Highlights */}
          <motion.section variants={item}>
            <h4 className="eyebrow mb-3 uppercase">What I shipped</h4>
            <motion.ol variants={list} className="grid gap-3 sm:grid-cols-2">
              {role.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  variants={item}
                  whileHover={reduce ? undefined : { y: -3 }}
                  className="group flex items-start gap-3 rounded-2xl border border-line bg-paper/60 p-4 text-sm leading-relaxed text-ink/85 transition-colors duration-200 hover:border-folder/40 hover:bg-sheet"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-soft font-mono text-[0.65rem] font-bold text-folder-deep transition-colors duration-200 group-hover:bg-folder group-hover:text-white">
                    {i + 1}
                  </span>
                  <span>{h}</span>
                </motion.li>
              ))}
            </motion.ol>
          </motion.section>

          {/* Product modules */}
          {role.modules && (
            <motion.section variants={item}>
              <h4 className="eyebrow mb-3 uppercase">Platform modules · {role.modules.length}</h4>
              <ModuleTabs modules={role.modules} />
            </motion.section>
          )}

          {/* Environment terminal */}
          {role.environment && (
            <motion.section variants={item}>
              <div className="overflow-hidden rounded-2xl border border-night bg-night font-mono text-[0.78rem] text-white/85 shadow-[0_24px_40px_-24px_rgb(17_24_32/0.8)]">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 text-white/45">
                  <span className="flex items-center gap-2">
                    <Terminal size={13} aria-hidden="true" className="text-emerald-300" />
                    ~/{role.id} $ cat environment.env
                  </span>
                  <span className="text-[0.65rem] text-amber-300">production</span>
                </div>
                <dl className="space-y-1.5 p-4">
                  {role.environment.map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
                      animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                      transition={{ delay: 0.5 + i * 0.14, duration: 0.5, ease }}
                      className="grid gap-x-3 sm:grid-cols-[7rem_1fr]"
                    >
                      <dt className="font-semibold uppercase tracking-wider text-amber-300/90">{row.label}</dt>
                      <dd className="text-white/75">{row.items.join(' · ')}</dd>
                    </motion.div>
                  ))}
                  <div className="caret pt-1 text-emerald-300" aria-hidden="true">
                    ${' '}
                  </div>
                </dl>
              </div>
            </motion.section>
          )}

          {/* Stack */}
          <motion.section variants={item}>
            <h4 className="eyebrow mb-3 uppercase">Stack</h4>
            <motion.ul variants={list} className="flex flex-wrap gap-2" aria-label="Technologies">
              {role.stack.map((s) => {
                const logo = skillLogos[s]
                return (
                  <motion.li
                    key={s}
                    variants={item}
                    whileHover={reduce ? undefined : { y: -2, scale: 1.04 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-sheet px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs"
                  >
                    {logo ? (
                      <img src={logo} alt="" aria-hidden="true" className="size-3.5 object-contain" loading="lazy" />
                    ) : (
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-folder" />
                    )}
                    {s}
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.section>
        </div>

        {/* Prev / next */}
        <motion.nav
          variants={item}
          aria-label="Adjacent roles"
          className="relative grid grid-cols-2 border-t border-line bg-paper/60"
        >
          <button
            type="button"
            onClick={onPrev}
            disabled={!prev}
            className="group flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-sheet disabled:pointer-events-none disabled:opacity-40 sm:px-8"
          >
            <ArrowLeft size={16} aria-hidden="true" className="shrink-0 text-folder transition-transform group-hover:-translate-x-1" />
            <span className="min-w-0">
              <span className="block font-mono text-[0.65rem] uppercase tracking-wider text-muted">Previous</span>
              <span className="block truncate text-sm font-semibold">{prev?.company ?? 'Start'}</span>
            </span>
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!next}
            className="group flex items-center justify-end gap-3 border-l border-line px-5 py-4 text-right transition-colors hover:bg-sheet disabled:pointer-events-none disabled:opacity-40 sm:px-8"
          >
            <span className="min-w-0">
              <span className="block font-mono text-[0.65rem] uppercase tracking-wider text-muted">Next</span>
              <span className="block truncate text-sm font-semibold">{next?.company ?? 'End'}</span>
            </span>
            <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-folder transition-transform group-hover:translate-x-1" />
          </button>
        </motion.nav>
      </div>
    </motion.article>
  )
}
