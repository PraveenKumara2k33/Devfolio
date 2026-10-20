import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ConciergeBell,
  FileText,
  GitBranch,
  Headset,
  MessageSquareHeart,
  MessagesSquare,
  Paperclip,
  Rocket,
  Route,
  Target,
  TrendingUp,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { profile } from '../data/portfolio'
import { TornSection } from '../components/folder/TornSection'
import { SectionHeader } from '../components/folder/SectionHeader'
import { getSkillLogo } from '../lib/skillLogos'
import { domains } from '../components/skills/skillDomains'
import { useMediaQuery } from '../hooks/useMediaQuery'

const ease = [0.22, 1, 0.36, 1] as const

// One icon per AI direction item; anything new falls back to the brain.
const aiIcons: Record<string, LucideIcon> = {
  'AI hospitality assistants': Bot,
  'Guest concierge systems': ConciergeBell,
  'Guest sentiment analysis': MessageSquareHeart,
  'Personalized recommendations': Target,
  'CRM next-best-action': Route,
  'AI-assisted support': Headset,
  'Automated workflows': Workflow,
  'Natural-language interfaces': MessagesSquare,
  'LLM-powered internal tools': Wrench,
  'Revenue intelligence': TrendingUp,
}

// Words in the bio worth drawing the eye to.
const highlights = ['scalable, reliable, and user-centric', 'hospitality technology', 'measurable business value']

function emphasise(text: string): ReactNode[] {
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(pattern).map((part, i) =>
    highlights.includes(part) ? (
      <mark key={i} className="bg-transparent bg-[linear-gradient(transparent_58%,#d6e0ff_58%)] px-0.5 font-medium text-folder-deep">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

const green = domains.backend.palette
const violet = domains.ai.palette
const blue = domains.frontend.palette

interface Doc {
  id: string
  file: string
  label: string
  icon: LucideIcon
  color: string
  body: (run: boolean) => ReactNode
}

const docs: Doc[] = [
  { id: 'profile', file: 'profile.md', label: 'Profile', icon: FileText, color: blue.accent, body: () => <Memo /> },
  { id: 'approach', file: 'approach.flow', label: 'Flow', icon: GitBranch, color: green.accent, body: (run) => <Pipeline run={run} /> },
  { id: 'ai', file: 'ai_direction.ipynb', label: 'AI', icon: BrainCircuit, color: violet.accent, body: () => <AiDirection /> },
]

/**
 * About as one open personnel folder: the inside cover holds the ID card and
 * an interests note; the pocket holds a stack of tabbed documents — pick a
 * tab to pull that document to the front.
 */
export function AboutSection() {
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 1024px)')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [active, setActive] = useState(0)
  const swing = wide && !reduce

  const select = (i: number, focus = false) => {
    const n = (i + docs.length) % docs.length
    setActive(n)
    if (focus) document.getElementById(`about-tab-${docs[n].id}`)?.focus()
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (e.key === 'Home') select(0, true)
    else if (e.key === 'End') select(docs.length - 1, true)
    else if (step) select(active + step, true)
    else return
    e.preventDefault()
  }

  const deal: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: swing ? 0.8 : 0.15 } } }

  return (
    <TornSection id="about" tone="sheet" seed={11} texture="grid">
      <SectionHeader id="about" index="01" label="About" title="I turn business requirements into production software." />

      <div ref={ref} className="relative" style={{ perspective: '2200px' }}>
        {/* Folder tab */}
        <div className="flex items-end pl-6">
          <span className="folder-tab-shape inline-flex items-center gap-2 bg-folder-deep px-5 pb-1.5 pt-2 font-mono text-xs font-semibold text-white/90">
            <span className="text-white/60">01</span>
            <span aria-hidden="true">/</span>
            PERSONNEL FILE — {profile.name.toUpperCase()}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease }}
          className="relative grid gap-4 rounded-3xl rounded-tl-lg bg-gradient-to-br from-folder to-folder-deep p-3 shadow-[0_30px_60px_-28px_rgb(31_58_156/0.65)] sm:p-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0"
        >
          <span aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 rounded-3xl rounded-tl-lg opacity-50 mix-blend-overlay" />
          {/* Spine crease */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-6 left-[41.66%] hidden w-6 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(0_0_0/0.25),transparent)] lg:block" />

          {/* Inside cover: swings open on the spine */}
          <motion.div
            initial={swing ? { rotateY: 110 } : false}
            animate={inView ? { rotateY: 0 } : undefined}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
            style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
            className="relative min-w-0 rounded-2xl bg-[#1f3a9c] p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] sm:p-6 lg:mr-4"
          >
            <motion.div variants={deal} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-8">
              <IdCard />
              <InterestsNote />
            </motion.div>
          </motion.div>

          {/* Pocket: tabbed documents */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease, delay: swing ? 0.7 : 0.2 }}
            className="relative flex min-w-0 flex-col pt-2 lg:pl-4"
          >
            {/* Document tabs */}
            <div role="tablist" aria-label="Documents" onKeyDown={onKey} className="relative z-20 flex gap-1 px-1 sm:gap-1.5 sm:px-4">
              {docs.map((d, i) => {
                const on = i === active
                const Icon = d.icon
                return (
                  <motion.button
                    key={d.id}
                    id={`about-tab-${d.id}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`about-doc-${d.id}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    initial={false}
                    animate={{ y: on ? 0 : 6 }}
                    whileHover={on || reduce ? undefined : { y: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`relative flex min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-t-2xl px-2 pb-3 pt-2.5 text-left sm:justify-start sm:gap-2 text-xs font-semibold transition-colors duration-200 sm:flex-none sm:px-4 sm:text-sm ${
                      on ? 'bg-sheet text-ink shadow-[0_-6px_16px_-10px_rgb(0_0_0/0.5)]' : 'bg-white/15 text-white/85 hover:bg-white/25 hover:text-white'
                    }`}
                  >
                    <span
                      className="grid size-6 shrink-0 place-items-center rounded-lg"
                      style={on ? { background: d.color, color: '#fff' } : { background: 'rgb(255 255 255 / 0.2)' }}
                    >
                      <Icon size={13} aria-hidden="true" />
                    </span>
                    <span className="truncate sm:hidden">{d.label}</span>
                    <span className="hidden truncate font-mono sm:inline">{d.file}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* The stack: every document shares one cell and stretches to the folder height */}
            <div className="relative grid flex-1">
              {/* Paper edges peeking out beneath the front sheet */}
              <span aria-hidden="true" className="absolute inset-x-3 -bottom-2 top-4 rounded-2xl bg-white/45" />
              <span aria-hidden="true" className="absolute inset-x-1.5 -bottom-1 top-2 rounded-2xl bg-white/70" />

              {docs.map((d, i) => {
                const on = i === active
                return (
                  <motion.article
                    key={d.id}
                    id={`about-doc-${d.id}`}
                    role="tabpanel"
                    aria-labelledby={`about-tab-${d.id}`}
                    aria-hidden={!on}
                    inert={!on}
                    initial={false}
                    animate={on ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: reduce ? 0 : 24, rotateX: reduce ? 0 : 6 }}
                    transition={{ duration: on ? 0.45 : 0.25, ease }}
                    className={`relative flex flex-col overflow-hidden rounded-2xl rounded-tl-md bg-sheet shadow-[0_22px_44px_-24px_rgb(0_0_0/0.6)] ${on ? '' : 'pointer-events-none'}`}
                    style={{ gridArea: '1 / 1', zIndex: on ? 10 : 1, transformOrigin: '50% 0%' }}
                  >
                    {/* Document header */}
                    <div className="flex items-center justify-between gap-3 border-b border-line bg-paper px-5 py-2.5 sm:px-7">
                      <p className="flex min-w-0 items-center gap-1.5 truncate font-mono text-[0.7rem] text-muted">
                        <span className="size-2 shrink-0 rounded-full" style={{ background: d.color }} />
                        about / <span className="font-semibold text-ink">{d.file}</span>
                      </p>
                      <span className="flex shrink-0 gap-1.5" aria-hidden="true">
                        {docs.map((x, j) => (
                          <span key={x.id} className="h-1.5 rounded-full transition-all duration-300" style={{ width: j === active ? 18 : 6, background: j === active ? d.color : '#d9d5cb' }} />
                        ))}
                      </span>
                    </div>
                    <div className={`ruled flex-1 ${on ? '' : 'invisible'}`}>{d.body(on && inView)}</div>
                  </motion.article>
                )
              })}
            </div>

            {/* Pager */}
            <div className="relative mt-4 flex items-center justify-between gap-3 px-1 text-xs font-medium text-white/85 sm:text-sm">
              <button
                type="button"
                onClick={() => select(active - 1)}
                className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/15"
              >
                <ArrowRight size={14} aria-hidden="true" className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
                <span className="font-mono">{docs[(active - 1 + docs.length) % docs.length].file}</span>
              </button>
              <span className="hidden font-mono text-[0.68rem] text-white/60 sm:inline">
                {active + 1} / {docs.length} · ← → to flip
              </span>
              <button
                type="button"
                onClick={() => select(active + 1)}
                className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-semibold text-white transition-colors hover:bg-white/15"
              >
                <span className="font-mono">{docs[(active + 1) % docs.length].file}</span>
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </TornSection>
  )
}

/* ------------------------------------------------------------------ */

function useDrop(tilt: number): Variants {
  const reduce = useReducedMotion()
  return {
    hidden: { opacity: 0, y: reduce ? 0 : -36, rotate: reduce ? tilt : tilt * 3 },
    show: { opacity: 1, y: 0, rotate: tilt, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  }
}

function Label({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">{children}</p>
}

function IdCard() {
  const drop = useDrop(-1.5)
  return (
    <motion.article variants={drop} whileHover={{ rotate: 0, y: -3 }} className="relative rounded-2xl bg-sheet p-4 shadow-[0_18px_34px_-18px_rgb(0_0_0/0.6)] sm:p-5">
      <Paperclip aria-hidden="true" className="absolute -top-4 right-8 size-9 rotate-[18deg] text-white/80" strokeWidth={1.6} />
      <div className="flex items-center justify-between border-b border-dashed border-line pb-2">
        <Label>Engineer ID</Label>
        <Label>File no. 01</Label>
      </div>

      <div className="mt-4 flex gap-4">
        <img
          decoding="async"
          loading="lazy"
          src={profile.photoUrl}
          alt={`Portrait of ${profile.name}`}
          className="h-24 w-20 shrink-0 rounded-xl object-cover object-top shadow-2xs min-[380px]:h-28 min-[380px]:w-24"
        />
        <dl className="min-w-0 space-y-2 text-sm">
          <div>
            <dt className="font-mono text-[0.58rem] uppercase tracking-wider text-muted">Name</dt>
            <dd className="font-display text-lg font-semibold leading-tight">{profile.name}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.58rem] uppercase tracking-wider text-muted">Role</dt>
            <dd className="font-medium text-ink/85">{profile.title}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.58rem] uppercase tracking-wider text-muted">Company</dt>
            <dd className="font-medium text-folder">{profile.company}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        <Label>Focus areas</Label>
        <span aria-hidden="true" className="-rotate-6 rounded-md border-2 border-folder/60 px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-folder/70">
          On file
        </span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {profile.focus.map((f) => {
          const logo = getSkillLogo(f)
          return (
            <li key={f} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 font-mono text-[0.68rem] text-ink/80">
              {logo ? <img decoding="async" loading="lazy" src={logo} alt="" className="size-3 object-contain" /> : <span className="size-1.5 rounded-full bg-folder" />}
              {f}
            </li>
          )
        })}
      </ul>
    </motion.article>
  )
}

function InterestsNote() {
  const drop = useDrop(1.8)
  return (
    <motion.article variants={drop} whileHover={{ rotate: 0, y: -3 }} className="relative bg-[#dff2e8] p-5 pt-7 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.55)]">
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-white/60 shadow-sm" />
      <h3 className="font-display text-lg font-semibold text-ink">Current interests</h3>
      <p className="text-xs text-[#13563b]/70">Areas I'm actively growing in.</p>
      <ul className="mt-3 grid gap-x-4 gap-y-1.5 text-sm text-ink/85 sm:grid-cols-2">
        {profile.interests.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-[#1f7a55]" />
            {it}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

function Memo() {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-2">
        <p className="font-display text-xl font-bold tracking-tight">MEMO</p>
      </div>
      <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-y-1 font-mono text-[0.7rem]">
        <dt className="text-muted">FROM</dt>
        <dd className="text-ink">{profile.name}</dd>
        <dt className="text-muted">SUBJECT</dt>
        <dd className="text-ink">Who I am and how I work</dd>
      </dl>
      <div className="mt-5 space-y-4">
        {profile.about.map((p, i) => (
          <p key={p.slice(0, 24)} className={i === 0 ? 'text-[1.05rem] leading-relaxed text-ink' : 'leading-relaxed text-ink/75'}>
            {emphasise(p)}
          </p>
        ))}
      </div>
    </div>
  )
}

/** Requirement → production; the line fills and steps light up when the document is opened. */
function Pipeline({ run }: { run: boolean }) {
  const reduce = useReducedMotion()
  const steps = profile.mindset
  const last = steps.length - 1
  const gap = reduce ? 0 : 0.12

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-line pb-3">
        <div>
          <h3 className="text-lg font-semibold sm:text-xl">How I approach a feature</h3>
          <p className="text-sm text-muted">From requirement to running in production.</p>
        </div>
        <Label>Form 01.2 · {steps.length} stages</Label>
      </div>

      <ol className="relative mt-5 space-y-1">
        <span aria-hidden="true" className="absolute bottom-4 left-[1.05rem] top-4 w-0.5 rounded-full bg-line" />
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: reduce ? 1 : 0 }}
          animate={run ? { scaleY: 1 } : undefined}
          transition={{ duration: steps.length * gap + 0.2, ease: 'linear', delay: 0.15 }}
          className="absolute bottom-4 left-[1.05rem] top-4 w-0.5 origin-top rounded-full"
          style={{ background: `linear-gradient(${green.accent}, #3157d5)` }}
        />
        {steps.map((step, i) => {
          const isLast = i === last
          const at = 0.15 + i * gap
          return (
            <li key={step} className="relative flex items-center gap-3 py-1">
              <motion.span
                initial={{ backgroundColor: '#ffffff', color: '#5c6670' }}
                animate={run ? { backgroundColor: isLast ? '#3157d5' : green.accent, color: '#ffffff' } : undefined}
                transition={{ delay: at, duration: 0.25 }}
                className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-line font-mono text-[0.68rem] font-bold shadow-2xs"
              >
                {isLast ? <Rocket size={14} aria-hidden="true" /> : String(i + 1).padStart(2, '0')}
              </motion.span>
              {isLast ? (
                <span className="rounded-lg bg-folder px-2.5 py-1 text-sm font-semibold text-white">{step}</span>
              ) : (
                <span className="text-sm font-medium text-ink">{step}</span>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function AiDirection() {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-dashed border-line pb-3">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold sm:text-xl">AI engineering direction</h3>
          <p className="mt-1 text-sm text-muted">Combining AI with enterprise software to move beyond traditional CRUD workflows.</p>
        </div>
        <span className="-rotate-6 rounded-md border-2 px-2 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em]" style={{ borderColor: violet.accent, color: violet.accent }}>
          Next chapter
        </span>
      </div>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {profile.aiDirection.map((a) => {
          const Icon = aiIcons[a] ?? BrainCircuit
          return (
            <li
              key={a}
              className="group flex items-center gap-2.5 rounded-xl border border-line bg-sheet px-3 py-2 text-[0.85rem] text-ink/85 transition-colors hover:border-[#6a4bc9]/50"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg transition-transform group-hover:-rotate-6 group-hover:scale-110" style={{ background: violet.tint, color: violet.deep }}>
                <Icon size={15} aria-hidden="true" />
              </span>
              {a}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
