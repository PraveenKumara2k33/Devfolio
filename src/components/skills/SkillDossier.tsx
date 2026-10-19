import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import type { SkillGroup } from '../../types/portfolio'
import { skillGroups } from '../../data/portfolio'
import { getSkillLogo } from '../../lib/skillLogos'
import type { FolderPalette } from '../projects/projectMeta'
import { domains } from './skillDomains'

const domain = domains

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Skills as one dossier folder with colour-coded divider tabs. Picking a tab
 * files the current sheet away and pulls the next one up to the front.
 */
export function SkillDossier() {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, margin: '0px 0px -20% 0px' })
  const [[index, direction], setPage] = useState<[number, number]>([0, 0])
  const group = skillGroups[index]
  const meta = domain[group.icon]

  const select = (next: number) => {
    const n = (next + skillGroups.length) % skillGroups.length
    if (n !== index) setPage([n, next > index ? 1 : -1])
  }

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: skillGroups.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    const n = (keys[e.key] + skillGroups.length) % skillGroups.length
    select(keys[e.key])
    document.getElementById(`skill-tab-${skillGroups[n].id}`)?.focus()
  }

  const sheet: Variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, y: 46, rotateX: 10, x: d * 18 }),
    center: { opacity: 1, y: 0, rotateX: 0, x: 0, transition: { duration: 0.5, ease } },
    exit: (d: number) =>
      reduce
        ? { opacity: 0 }
        : { opacity: 0, y: 30, scale: 0.97, x: d * -24, rotate: d * -1.2, transition: { duration: 0.28, ease } },
  }

  const total = group.primary.reduce((n, g) => n + g.items.length, 0)

  return (
    <div ref={rootRef} className="mx-auto max-w-6xl">
      {/* Divider tabs */}
      <div
        role="tablist"
        aria-label="Skill domains"
        onKeyDown={onTabKey}
        className="scrollbar-none -mb-px flex gap-1 overflow-x-auto px-2 sm:gap-1.5 sm:px-4"
      >
        {skillGroups.map((g, i) => {
          const m = domain[g.icon]
          const active = i === index
          const Icon = m.icon
          return (
            <motion.button
              key={g.id}
              id={`skill-tab-${g.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="skill-sheet"
              tabIndex={active ? 0 : -1}
              onClick={() => select(i)}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={inView ? { opacity: 1, y: active ? 0 : 6 } : undefined}
              whileHover={active || reduce ? undefined : { y: 0 }}
              transition={{ y: { type: 'spring', stiffness: 380, damping: 30 }, opacity: { duration: 0.3, delay: 0.1 + i * 0.06 } }}
              className={`relative flex shrink-0 items-center gap-2 rounded-t-2xl px-3.5 pb-3 pt-2.5 text-left font-mono text-xs font-semibold transition-colors duration-200 sm:px-4 ${
                active ? 'z-10 text-white' : 'text-ink/70 hover:text-ink'
              }`}
              style={{ background: active ? m.palette.accent : m.palette.tint }}
            >
              <span className="opacity-70">{String(i + 1).padStart(2, '0')}</span>
              <Icon size={14} aria-hidden="true" />
              <span className="whitespace-nowrap">{m.short}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Folder body: coloured spine + stacked sheets */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className="relative rounded-3xl p-2 transition-colors duration-500 sm:p-3"
        style={{ background: meta.palette.accent }}
      >
        <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 rounded-3xl opacity-50 mix-blend-overlay" />

        <div className="relative" style={{ perspective: '1600px' }}>
          {/* Sheets waiting behind the front one */}
          <div aria-hidden="true" className="absolute inset-x-6 -bottom-1.5 top-3 rounded-2xl bg-sheet/50" />
          <div aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 top-1.5 rounded-2xl bg-sheet/75" />

          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.article
              key={group.id}
              id="skill-sheet"
              role="tabpanel"
              aria-labelledby={`skill-tab-${group.id}`}
              custom={direction}
              variants={sheet}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformOrigin: '50% 0%' }}
              className="ruled relative overflow-hidden rounded-2xl bg-sheet shadow-[0_24px_50px_-28px_rgb(17_24_32/0.55)]"
            >
              <SheetBody group={group} index={index} palette={meta.palette} total={total} />
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Pager on the folder spine */}
        <div className="relative flex items-center justify-between gap-3 px-3 pb-1 pt-3 font-mono text-xs text-white/85 sm:px-4">
          <button
            type="button"
            onClick={() => select(index - 1)}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:bg-white/15"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {domain[skillGroups[(index - 1 + skillGroups.length) % skillGroups.length].icon].short}
          </button>
          <span className="hidden sm:inline">
            file {String(index + 1).padStart(2, '0')} / {String(skillGroups.length).padStart(2, '0')} · ← → to flip
          </span>
          <button
            type="button"
            onClick={() => select(index + 1)}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:bg-white/15"
          >
            {domain[skillGroups[(index + 1) % skillGroups.length].icon].short}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

interface SheetBodyProps {
  group: SkillGroup
  index: number
  palette: FolderPalette
  total: number
}

function SheetBody({ group, index, palette, total }: SheetBodyProps) {
  const reduce = useReducedMotion()
  const Icon = domain[group.icon].icon
  const num = String(index + 1).padStart(2, '0')
  // AI and architecture list concepts rather than tools; label the count accordingly.
  const hasTools = group.primary.some((g) => g.items.some((item) => getSkillLogo(item)))

  const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.18 } } }
  const pop: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease } },
  }

  return (
    <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:p-10">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[9rem] font-bold leading-none sm:text-[12rem]"
        style={{ color: palette.accent, opacity: 0.07 }}
      >
        {num}
      </span>

      {/* Left: identity + capabilities */}
      <div className="relative">
        <span className="grid size-12 place-items-center rounded-2xl text-white shadow-sm" style={{ background: palette.accent }}>
          <Icon size={22} aria-hidden="true" />
        </span>
        <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-wider" style={{ color: palette.accent }}>
          Domain file {num}
        </p>
        <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">{group.title}</h3>
        <p className="mt-2 font-mono text-xs text-muted">
          {total} {hasTools ? 'technologies' : 'focus areas'} · {group.capabilities.length} capabilities
        </p>

        <h4 className="mt-7 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-muted">What I do with it</h4>
        <motion.ul variants={list} initial="hidden" animate="show" className="mt-3 space-y-2">
          {group.capabilities.map((c) => (
            <motion.li key={c} variants={pop} className="flex items-center gap-2.5 text-sm text-ink/85">
              <span className="grid size-5 shrink-0 place-items-center rounded-md" style={{ background: palette.tint, color: palette.deep }}>
                <Check size={12} strokeWidth={3} aria-hidden="true" />
              </span>
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Right: technology tiles */}
      <div className="relative space-y-6">
        {group.primary.map((g) => (
          <section key={g.label} aria-label={g.label}>
            <h4 className="mb-3 flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
              <span className="h-px w-5" style={{ background: palette.accent }} />
              {g.label}
              <span className="text-muted/70">· {g.items.length}</span>
            </h4>
            <motion.ul variants={list} initial="hidden" animate="show" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {g.items.map((item) => {
                const logo = getSkillLogo(item)
                return (
                  <motion.li
                    key={item}
                    variants={pop}
                    whileHover={reduce ? undefined : { y: -3 }}
                    className="group flex items-center gap-2.5 rounded-xl border border-line bg-sheet px-3 py-2.5 shadow-2xs transition-[border-color,box-shadow] duration-200 hover:shadow-[var(--shadow-sheet)]"
                    style={{ ['--tile-accent' as string]: palette.accent }}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ background: palette.tint }}>
                      {logo ? (
                        <img decoding="async" src={logo} alt="" className="size-[1.1rem] object-contain" loading="lazy" />
                      ) : (
                        <Icon size={15} aria-hidden="true" style={{ color: palette.deep }} />
                      )}
                    </span>
                    <span className="min-w-0 text-[0.82rem] font-medium leading-tight text-ink group-hover:text-[var(--tile-accent)]">
                      {item}
                    </span>
                  </motion.li>
                )
              })}
            </motion.ul>
          </section>
        ))}
      </div>
    </div>
  )
}
