import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import {
  Bot,
  BrainCircuit,
  ConciergeBell,
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
      <mark key={i} className="bg-transparent bg-[linear-gradient(transparent_55%,#d6e0ff_55%)] px-0.5 font-medium text-folder-deep">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

/**
 * About as an open personnel file: the folder's left cover swings open to
 * reveal an ID card and sticky note on the inside cover, and a memo, a
 * process checklist and a priority sheet filed on the right.
 */
export function AboutSection() {
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 1024px)')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const swing = wide && !reduce

  // Documents are dealt in after the cover has opened.
  const deal: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: swing ? 0.75 : 0.15 } } }

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
          className="relative grid gap-4 rounded-3xl rounded-tl-lg bg-gradient-to-br from-folder to-folder-deep p-3 shadow-[0_30px_60px_-28px_rgb(31_58_156/0.65)] sm:p-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0"
        >
          <span aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 rounded-3xl rounded-tl-lg opacity-50 mix-blend-overlay" />
          {/* Crease down the middle */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-6 left-[41.66%] hidden w-6 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(0_0_0/0.22),transparent)] lg:block" />

          {/* Left: inside cover, swings open on its spine */}
          <motion.div
            initial={swing ? { rotateY: 110 } : false}
            animate={inView ? { rotateY: 0 } : undefined}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
            style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
            className="relative min-w-0 rounded-2xl bg-[#1f3a9c] p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] sm:p-6 lg:mr-3"
          >
            <motion.div variants={deal} initial="hidden" animate={inView ? 'show' : 'hidden'} className="space-y-8 lg:sticky lg:top-28">
              <IdCard />
              <StickyNote />
            </motion.div>
          </motion.div>

          {/* Right: the pocket with filed documents */}
          <motion.div variants={deal} initial="hidden" animate={inView ? 'show' : 'hidden'} className="relative min-w-0 space-y-5 p-1 sm:p-3 lg:pl-6">
            <Memo />
            <ProcessForm run={inView} delay={swing ? 1.4 : 0.6} />
            <PrioritySheet />
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

function Tape({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`absolute h-6 w-20 bg-white/55 shadow-sm backdrop-blur-[1px] ${className}`} />
}

function IdCard() {
  const drop = useDrop(-1.5)
  return (
    <motion.article variants={drop} whileHover={{ rotate: 0, y: -3 }} className="relative rounded-2xl bg-sheet p-4 shadow-[0_18px_34px_-18px_rgb(17_24_32/0.55)] sm:p-5">
      <Paperclip aria-hidden="true" className="absolute -top-4 right-8 size-9 rotate-[18deg] text-white/70" strokeWidth={1.6} />
      <div className="flex items-center justify-between border-b border-dashed border-line pb-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
        <span>Engineer ID</span>
        <span>File no. 01</span>
      </div>

      <div className="mt-4 flex gap-3 min-[380px]:gap-4">
        <img decoding="async" src={profile.photoUrl} alt={`Portrait of ${profile.name}`} className="h-24 w-20 shrink-0 rounded-lg min-[380px]:h-28 min-[380px]:w-24 object-cover object-top shadow-2xs" loading="lazy" />
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
        <p className="font-mono text-[0.58rem] uppercase tracking-wider text-muted">Focus areas</p>
        <span
          aria-hidden="true"
          className="-rotate-6 rounded-md border-2 border-folder/60 px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-folder/70"
        >
          On file
        </span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {profile.focus.map((f) => {
          const logo = getSkillLogo(f)
          return (
            <li key={f} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2 py-1 font-mono text-[0.68rem] text-ink/80">
              {logo ? <img loading="lazy" decoding="async" src={logo} alt="" className="size-3 object-contain" /> : <span className="size-1.5 rounded-full bg-folder" />}
              {f}
            </li>
          )
        })}
      </ul>

    </motion.article>
  )
}

function StickyNote() {
  const drop = useDrop(1.8)
  return (
    <motion.article variants={drop} whileHover={{ rotate: 0, y: -3 }} className="relative bg-[#dff2e8] p-5 pt-7 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.55)]">
      <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
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
  const drop = useDrop(-0.6)
  return (
    <motion.article variants={drop} className="ruled relative rounded-xl bg-sheet p-5 shadow-[0_18px_34px_-20px_rgb(17_24_32/0.5)] sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-2">
        <p className="font-display text-xl font-bold tracking-tight">MEMO</p>
        <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">profile.md</p>
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
    </motion.article>
  )
}

function ProcessForm({ run, delay }: { run: boolean; delay: number }) {
  const reduce = useReducedMotion()
  const drop = useDrop(0.5)
  const steps = profile.mindset
  const last = steps.length - 1
  const gap = reduce ? 0 : 0.14

  return (
    <motion.article variants={drop} className="relative rounded-xl bg-sheet p-5 shadow-[0_18px_34px_-20px_rgb(17_24_32/0.5)] sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">How I approach a feature</h3>
        <p className="font-mono text-[0.62rem] uppercase tracking-wider text-muted">Form 01.2 · approach.flow</p>
      </div>
      <p className="text-sm text-muted">From requirement to running in production.</p>

      <ol className="mt-4 grid gap-x-6 sm:grid-cols-2">
        {steps.map((step, i) => {
          const isLast = i === last
          return (
            <li key={step} className={`flex items-center gap-3 py-2 ${isLast ? 'sm:col-span-2' : 'border-b border-dashed border-line'}`}>
              <span className={`grid size-5 shrink-0 place-items-center rounded border-2 ${isLast ? 'border-folder' : 'border-[#1f7a55]'}`}>
                <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                  <motion.path
                    d="M2 6.5 L5 9 L10 3"
                    fill="none"
                    stroke={isLast ? '#3157d5' : '#1f7a55'}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={run ? { pathLength: 1 } : undefined}
                    transition={{ duration: 0.25, delay: delay + i * gap }}
                  />
                </svg>
              </span>
              <span className="w-6 font-mono text-[0.65rem] text-muted">{String(i + 1).padStart(2, '0')}</span>
              {isLast ? (
                <span className="inline-flex items-center gap-2 rounded-lg bg-folder px-2.5 py-1 text-sm font-semibold text-white">
                  <Rocket size={14} aria-hidden="true" />
                  {step}
                </span>
              ) : (
                <span className="text-sm font-medium text-ink">{step}</span>
              )}
            </li>
          )
        })}
      </ol>
    </motion.article>
  )
}

function PrioritySheet() {
  const drop = useDrop(-0.4)
  return (
    <motion.article variants={drop} className="relative overflow-hidden rounded-xl bg-night p-5 text-white shadow-[0_24px_40px_-20px_rgb(0_0_0/0.6)] sm:p-7">
      <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[#6a4bc9]/35 blur-3xl" />
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.6, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.4 }}
        className="absolute right-5 top-5 rounded-md border-2 border-[#c9bbff] px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#c9bbff]"
      >
        Next chapter
      </motion.span>

      <p className="relative font-mono text-[0.62rem] uppercase tracking-wider text-white/50">ai_direction.ipynb</p>
      <h3 className="relative mt-1 text-lg font-semibold text-white">AI engineering direction</h3>
      <p className="relative mt-1 max-w-md text-sm text-white/65">Combining AI with enterprise software to move beyond traditional CRUD workflows.</p>

      <ul className="relative mt-5 grid gap-2 sm:grid-cols-2">
        {profile.aiDirection.map((a) => {
          const Icon = aiIcons[a] ?? BrainCircuit
          return (
            <li
              key={a}
              className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[0.75rem] text-white/80 transition-colors hover:border-[#b9a6ff]/50 hover:text-white"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-[#6a4bc9]/25 text-[#c9bbff] transition-transform group-hover:-rotate-6 group-hover:scale-110">
                <Icon size={13} aria-hidden="true" />
              </span>
              {a}
            </li>
          )
        })}
      </ul>
    </motion.article>
  )
}
