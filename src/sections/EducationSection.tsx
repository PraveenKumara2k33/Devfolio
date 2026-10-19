import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import { ArrowUpRight, Award, BookOpen, Calendar, FileBadge, FileBarChart, FileText, FolderOpen, GraduationCap, type LucideIcon } from 'lucide-react'
import { education } from '../data/portfolio'
import type { Education } from '../types/portfolio'
import { TornSection } from '../components/folder/TornSection'
import { SectionHeader } from '../components/folder/SectionHeader'
import type { FolderPalette } from '../components/projects/projectMeta'
import { domains } from '../components/skills/skillDomains'
import { ScoreRing } from '../components/education/ScoreRing'
import { parseScore } from '../components/education/parseScore'
import { GpaChart } from '../components/education/GpaChart'
import { MarksPanel } from '../components/education/MarksPanel'
import { EduFolder } from '../components/education/EduFolder'

// Oldest to newest, left to right: SSLC → HSC → B.Tech.
const levels = [...education].reverse()

const palettes: Record<string, FolderPalette> = {
  sslc: domains.architecture.palette,
  hsc: domains.backend.palette,
  btech: domains.frontend.palette,
}
const paletteOf = (e: Education) => palettes[e.id] ?? domains.frontend.palette
const shortName = (e: Education) => e.qualification.match(/\(([^)]+)\)/)?.[1] ?? e.qualification.split(',')[0]
const endYear = (e: Education) => e.period.match(/\d{4}/g)?.pop() ?? e.period
const stairs = ['h-36 sm:h-44', 'h-40 sm:h-52', 'h-44 sm:h-60']


export function EducationSection() {
  const [index, setIndex] = useState(levels.length - 1)
  const panelRef = useRef<HTMLDivElement>(null)
  const inView = useInView(panelRef, { once: true, margin: '0px 0px -10% 0px' })
  const level = levels[index]
  const palette = paletteOf(level)
  const docs = docsFor(level, palette)

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const n = (index + step + levels.length) % levels.length
    setIndex(n)
    document.getElementById(`edu-tab-${levels[n].id}`)?.focus()
  }

  return (
    <TornSection id="education" tone="sheet" seed={71} texture="grid">
      <SectionHeader
        id="education"
        index="05"
        label="Education"
        title="Computer science foundations."
        intro="Three folders, filed in order: secondary school, higher secondary, then the B.Tech degree. Open one to lay out its certificates and mark sheets."
      />

      {/* Folder row — a staircase from SSLC up to B.Tech */}
      <div role="tablist" aria-label="Qualifications" className="mx-auto grid max-w-3xl grid-cols-3 items-end gap-3 px-1 sm:gap-6">
        {levels.map((e, i) => (
          <EduFolder
            key={e.id}
            id={e.id}
            index={i}
            short={shortName(e)}
            year={endYear(e)}
            score={e.score?.value}
            docs={docsFor(e, paletteOf(e)).length}
            palette={paletteOf(e)}
            active={i === index}
            heightClass={stairs[i] ?? stairs[stairs.length - 1]}
            onSelect={() => setIndex(i)}
            onKeyDown={onKey}
          />
        ))}
      </div>

      {/* Open file */}
      <div
        ref={panelRef}
        id="edu-panel"
        role="tabpanel"
        aria-labelledby={`edu-tab-${level.id}`}
        className="relative mt-9 overflow-hidden rounded-3xl border-2 p-3 transition-colors duration-500 sm:p-5"
        style={{ borderColor: palette.accent, background: `color-mix(in srgb, ${palette.tint} 55%, var(--color-sheet))` }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="flex items-center gap-2 font-mono text-xs" style={{ color: palette.deep }}>
            <FolderOpen size={15} aria-hidden="true" />
            education / <span className="font-semibold">{shortName(level).toLowerCase().replace(/\W+/g, '-')}</span> /
          </p>
          <p className="font-mono text-[0.68rem] text-muted">
            {docs.length} documents · {level.period}
          </p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <DocsGrid key={level.id} docs={docs} run={inView} />
        </AnimatePresence>
      </div>
    </TornSection>
  )
}

/* ------------------------------------------------------------------ */

interface Doc {
  id: string
  file: string
  icon: LucideIcon
  span: string
  clip?: boolean
  body: (run: boolean) => ReactNode
}

function DocsGrid({ docs, run }: { docs: Doc[]; run: boolean }) {
  const reduce = useReducedMotion()
  const deal: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
    exit: { opacity: 0, y: reduce ? 0 : 16, transition: { duration: 0.2 } },
  }
  const sheet: Variants = {
    hidden: (i: number) => (reduce ? { opacity: 0 } : { opacity: 0, y: -60, rotate: i % 2 ? 4 : -4, scale: 0.94 }),
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: reduce ? 0 : i % 2 ? 0.6 : -0.6,
      transition: { type: 'spring', stiffness: 220, damping: 22 },
    }),
  }

  return (
    <motion.div variants={deal} initial="hidden" animate={run ? 'show' : 'hidden'} exit="exit" className="grid gap-4 lg:grid-cols-12">
      {docs.map((d, i) => (
        <motion.article
          key={d.id}
          custom={i}
          variants={sheet}
          whileHover={reduce ? undefined : { rotate: 0, y: -3 }}
          className={`ruled relative rounded-2xl border border-line bg-sheet p-4 shadow-[0_14px_30px_-20px_rgb(17_24_32/0.55)] sm:p-5 ${d.span}`}
        >
          {d.clip && <PaperClip />}
          <header className="mb-4 flex items-center gap-2 border-b border-dashed border-line pb-2.5 font-mono text-[0.68rem] font-semibold text-muted">
            <d.icon size={14} aria-hidden="true" />
            {d.file}
          </header>
          {d.body(run)}
        </motion.article>
      ))}
    </motion.div>
  )
}

function PaperClip() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 48" className="absolute -top-4 right-8 h-11 w-5 text-ink/40">
      <path d="M8 40V10a5 5 0 0 1 10 0v26a8 8 0 0 1-16 0V14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */

/** The documents filed in each qualification's folder. */
function docsFor(e: Education, palette: FolderPalette): Doc[] {
  const score = e.score ? parseScore(e.score.value) : null
  const isDegree = !!e.gpaTrend
  const docs: Doc[] = []

  docs.push({
    id: 'certificate',
    file: isDegree ? 'degree_certificate.pdf' : 'certificate.pdf',
    icon: FileBadge,
    clip: true,
    span: isDegree ? 'lg:col-span-5' : e.breakdown && e.breakdown.length > 1 ? 'lg:col-span-4' : 'lg:col-span-5',
    body: (run) => (
      <div>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <span className="grid size-11 place-items-center rounded-xl p-2" style={{ background: palette.tint }}>
              {e.logo ? <img loading="lazy" decoding="async" src={e.logo} alt={`${e.institution} emblem`} className="size-full object-contain" /> : <GraduationCap size={18} aria-hidden="true" />}
            </span>
            <h3 className="mt-3 text-lg font-semibold leading-tight sm:text-xl">{e.qualification}</h3>
            <p className="mt-1 text-sm font-medium" style={{ color: palette.accent }}>
              {e.institution}
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-muted">
              <Calendar size={12} aria-hidden="true" />
              {e.period}
            </p>
          </div>
          {score && <ScoreRing {...score} label={e.score!.label} palette={palette} run={run} size={isDegree ? 116 : 96} />}
        </div>
        {!isDegree && e.subjects && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stream">
            {e.subjects.map((s) => (
              <li key={s} className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: palette.tint, color: palette.deep }}>
                {s}
              </li>
            ))}
          </ul>
        )}
        <Stamp palette={palette} label={isDegree ? 'Graduated' : 'Passed'} />
      </div>
    ),
  })

  if (e.gpaTrend && score) {
    docs.push({
      id: 'transcript',
      file: 'semester_transcript.pdf',
      icon: FileBarChart,
      span: 'lg:col-span-7',
      body: (run) => <GpaChart data={e.gpaTrend!} average={score.value} palette={palette} run={run} />,
    })
  }

  if (isDegree && e.subjects) {
    docs.push({
      id: 'subjects',
      file: 'key_subjects.txt',
      icon: BookOpen,
      span: e.notable ? 'lg:col-span-7' : 'lg:col-span-12',
      body: () => (
        <ul className="grid gap-2 sm:grid-cols-2">
          {e.subjects!.map((s, i) => (
            <li key={s} className="flex items-center gap-2.5 text-sm text-ink/85">
              <span className="grid size-6 shrink-0 place-items-center rounded-md font-mono text-[0.6rem] font-bold" style={{ background: palette.tint, color: palette.deep }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {s}
            </li>
          ))}
        </ul>
      ),
    })
  }

  if (e.notable) {
    docs.push({
      id: 'ieee',
      file: 'ieee_publication.pdf',
      icon: Award,
      clip: true,
      span: 'lg:col-span-5',
      body: () => (
        <a href="#publications" className="group block">
          <span
            className="inline-flex items-center gap-1.5 rounded-lg border-2 border-dashed px-2.5 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider"
            style={{ borderColor: palette.accent, color: palette.deep }}
          >
            <Award size={14} aria-hidden="true" />
            IEEE published
          </span>
          <p className="mt-3 text-sm text-ink/80">{e.notable}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-0.5" style={{ color: palette.accent }}>
            Read it in Publications
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </a>
      ),
    })
  }

  const sheets = e.breakdown ?? []
  sheets.forEach((b) => {
    docs.push({
      id: `marks-${b.title}`,
      file: `marksheet_${b.title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      icon: FileText,
      span: sheets.length > 1 ? 'lg:col-span-4' : 'lg:col-span-7',
      body: (run) => <MarksPanel breakdown={[b]} palette={palette} run={run} id={`${e.id}-${b.title}`} />,
    })
  })

  return docs
}

function Stamp({ palette, label }: { palette: FolderPalette; label: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: reduce ? 1 : 1.6, rotate: -16 }}
      animate={{ opacity: 0.85, scale: 1, rotate: -9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.55 }}
      className="mt-4 inline-block rounded-md border-2 px-2 py-0.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em]"
      style={{ borderColor: palette.accent, color: palette.accent }}
    >
      {label}
    </motion.span>
  )
}
