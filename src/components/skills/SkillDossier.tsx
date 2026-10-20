import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, FolderOpen } from 'lucide-react'
import type { SkillGroup } from '../../types/portfolio'
import { experience, projects, skillGroups } from '../../data/portfolio'
import { getSkillLogo } from '../../lib/skillLogos'
import { getProjectMeta, type FolderPalette } from '../projects/projectMeta'
import { domains } from './skillDomains'

const ease = [0.22, 1, 0.36, 1] as const

// "React 18/19", "React.js" and "React" are the same skill when matching stacks.
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.js$/, '')
    .replace(/\s+\d+(\/\d+)?$/, '')
    .replace(/\s+database$/, '')
    .trim()

// Where each skill shows up in roles and projects, so a tile can say "used at …".
const usage = new Map<string, string[]>()
// Short names: "Senchola Technology Solutions" → "Senchola", projects by their folder label.
const roleName = (company: string) => company.replace(/\s+Technolog(y|ies)\s.*$/, '')
const add = (tech: string, where: string) => usage.set(norm(tech), [...(usage.get(norm(tech)) ?? []), where])
for (const r of experience) for (const t of r.stack) add(t, roleName(r.company))
for (const p of projects) for (const t of p.stack) add(t, getProjectMeta(p.id, p.title).short)
const usedIn = (item: string) => [...new Set(usage.get(norm(item)) ?? [])]

const countOf = (g: SkillGroup) => g.primary.reduce((n, p) => n + p.items.length, 0)
const slug = (g: SkillGroup) => domains[g.icon].short.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '')

/**
 * Skills as one dossier folder with colour-coded divider tabs. Picking a tab
 * files the current sheet away and pulls the next one up to the front.
 */
export function SkillDossier() {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { once: true, margin: '0px 0px -20% 0px' })
  const [[index, direction], setPage] = useState<[number, number]>([0, 0])
  const group = skillGroups[index]
  const meta = domains[group.icon]
  const total = skillGroups.length
  const prev = skillGroups[(index - 1 + total) % total]
  const next = skillGroups[(index + 1) % total]

  const select = (to: number) => {
    const n = (to + total) % total
    if (n !== index) setPage([n, to > index ? 1 : -1])
  }

  // Keep the active tab in view on narrow, scrolling tab strips.
  useEffect(() => {
    const strip = tabsRef.current
    const tab = document.getElementById(`skill-tab-${group.id}`)
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return
    strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 2 + tab.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [group.id, reduce])

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: total - 1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    select(keys[e.key])
    document.getElementById(`skill-tab-${skillGroups[(keys[e.key] + total) % total].id}`)?.focus()
  }

  const sheet: Variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotateX: 8, x: d * 18 }),
    center: { opacity: 1, y: 0, rotateX: 0, x: 0, transition: { duration: 0.5, ease } },
    exit: (d: number) =>
      reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97, x: d * -24, rotate: d * -1, transition: { duration: 0.26, ease } },
  }

  return (
    <div ref={rootRef} className="mx-auto max-w-6xl">
      {/* Divider tabs */}
      <div className="relative">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Skill domains"
          onKeyDown={onTabKey}
          className="scrollbar-none -mb-px flex gap-1 overflow-x-auto px-2 [mask-image:linear-gradient(90deg,transparent,#000_1rem,#000_calc(100%-1rem),transparent)] sm:gap-1.5 sm:px-4 lg:[mask-image:none]"
        >
          {skillGroups.map((g, i) => {
            const m = domains[g.icon]
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
                whileHover={active || reduce ? undefined : { y: 2 }}
                transition={{ y: { type: 'spring', stiffness: 380, damping: 30 }, opacity: { duration: 0.3, delay: 0.1 + i * 0.06 } }}
                className={`relative flex shrink-0 items-center gap-2 overflow-hidden rounded-t-2xl px-3.5 pb-3 pt-2.5 text-left text-xs font-semibold transition-colors duration-200 sm:px-4 sm:text-sm ${
                  active ? 'z-10 text-white' : 'text-ink/70 shadow-[inset_0_-1px_0_rgb(17_24_32/0.06)] hover:text-ink'
                }`}
                style={{ background: active ? m.palette.accent : m.palette.tint }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                <Icon size={15} aria-hidden="true" />
                <span className="whitespace-nowrap">{m.short}</span>
                <span
                  className="rounded-full px-1.5 py-px font-mono text-[0.62rem]"
                  style={active ? { background: 'rgb(255 255 255 / 0.2)' } : { background: '#fff', color: m.palette.deep }}
                >
                  {countOf(g)}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Folder body */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className="relative rounded-3xl p-2 shadow-[0_30px_60px_-34px_rgb(17_24_32/0.7),inset_0_1px_0_rgb(255_255_255/0.25)] sm:p-3"
        style={{ background: `linear-gradient(160deg, ${meta.palette.accent} 0%, ${meta.palette.accent} 55%, ${meta.palette.deep} 100%)` }}
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
              className="relative overflow-hidden rounded-2xl bg-sheet shadow-[0_24px_50px_-28px_rgb(17_24_32/0.55)]"
            >
              {/* File header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper px-5 py-3 sm:px-8">
                <p className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted">
                  <FolderOpen size={14} aria-hidden="true" style={{ color: meta.palette.accent }} />
                  skills /<span className="truncate font-semibold text-ink">{slug(group)}.json</span>
                </p>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {skillGroups.map((g, i) => (
                    <span
                      key={g.id}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{ width: i === index ? 18 : 6, background: i === index ? meta.palette.accent : 'var(--color-line)' }}
                    />
                  ))}
                </div>
              </div>

              <SheetBody group={group} palette={meta.palette} />
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Pager on the folder spine */}
        <div className="relative flex items-center justify-between gap-3 px-2 pb-1 pt-3 text-xs font-medium text-white/90 sm:px-4 sm:text-sm">
          <button type="button" onClick={() => select(index - 1)} className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/15">
            <ArrowLeft size={15} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden min-[400px]:inline">{domains[prev.icon].short}</span>
          </button>
          <span className="font-mono text-[0.7rem] text-white/75">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            <span className="hidden sm:inline"> · ← → to flip</span>
          </span>
          <button type="button" onClick={() => select(index + 1)} className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/15">
            <span className="hidden min-[400px]:inline">{domains[next.icon].short}</span>
            <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function SheetBody({ group, palette }: { group: SkillGroup; palette: FolderPalette }) {
  const reduce = useReducedMotion()
  const Icon = domains[group.icon].icon
  // AI and architecture list concepts rather than tools; label the count accordingly.
  const hasTools = group.primary.some((g) => g.items.some((item) => getSkillLogo(item)))

  const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.18 } } }
  const pop: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease } },
  }

  return (
    <div className="ruled grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10 lg:p-10">
      {/* Left: identity + capabilities */}
      <div className="relative flex flex-col">
        <span className="relative grid size-12 place-items-center rounded-2xl text-white shadow-[0_10px_20px_-10px_rgb(17_24_32/0.6)]" style={{ background: `linear-gradient(135deg, ${palette.accent}, ${palette.deep})` }}>
          <Icon size={22} aria-hidden="true" />
        </span>
        <h3 className="relative mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{group.title}</h3>
        <p className="relative mt-2 flex flex-wrap gap-2 font-mono text-[0.68rem]">
          <span className="rounded-full px-2 py-0.5" style={{ background: palette.tint, color: palette.deep }}>
            {countOf(group)} {hasTools ? 'technologies' : 'focus areas'}
          </span>
          <span className="rounded-full border border-line px-2 py-0.5 text-muted">{group.capabilities.length} capabilities</span>
        </p>

        <div className="relative mt-7 rounded-2xl p-4 sm:p-5" style={{ background: palette.tint }}>
          <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider" style={{ color: palette.deep }}>
            What I do with it
          </h4>
          <motion.ul variants={list} initial="hidden" animate="show" className="mt-3 space-y-2">
            {group.capabilities.map((c) => (
              <motion.li key={c} variants={pop} className="flex items-start gap-2.5 text-sm text-ink/85">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white" style={{ background: palette.accent }}>
                  <Check size={11} strokeWidth={3.5} aria-hidden="true" />
                </span>
                {c}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Right: technology tiles */}
      <div className="relative space-y-7">
        {group.primary.map((g) => (
          <section key={g.label} aria-label={g.label}>
            <h4 className="mb-3 flex items-center gap-3 font-mono text-[0.68rem] font-semibold uppercase tracking-wider">
              <span className="rounded-md px-2 py-0.5" style={{ background: palette.tint, color: palette.deep }}>
                {g.label} · {g.items.length}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </h4>
            <motion.ul variants={list} initial="hidden" animate="show" className="grid grid-cols-2 gap-2 xl:grid-cols-3">
              {g.items.map((item) => {
                const logo = getSkillLogo(item)
                const where = usedIn(item)
                return (
                  <motion.li
                    key={item}
                    variants={pop}
                    whileHover={reduce ? undefined : { y: -3 }}
                    title={where.length ? `Used at: ${where.join(', ')}` : undefined}
                    className="group relative flex items-center gap-2.5 overflow-hidden rounded-2xl border border-line bg-sheet px-2.5 py-2.5 shadow-2xs transition-[border-color,box-shadow] duration-200 hover:border-[var(--tile-accent)] hover:shadow-[var(--shadow-sheet)] sm:gap-3 sm:px-3"
                    style={{ ['--tile-accent' as string]: palette.accent }}
                  >
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" style={{ background: palette.accent }} />
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl ring-1 ring-inset ring-black/[0.04] sm:size-9" style={{ background: palette.tint }}>
                      {logo ? (
                        <img decoding="async" src={logo} alt="" className="size-5 object-contain" loading="lazy" />
                      ) : (
                        <Icon size={16} aria-hidden="true" style={{ color: palette.deep }} />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.8rem] font-medium leading-tight text-ink group-hover:text-[var(--tile-accent)] sm:text-[0.85rem]">{item}</span>
                      {where.length > 0 && (
                        <span className="mt-0.5 block truncate font-mono text-[0.62rem] text-muted">
                          {where[0]}
                          {where.length > 1 && ` +${where.length - 1}`}
                        </span>
                      )}
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
