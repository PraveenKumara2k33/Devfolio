import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import {
  ArrowLeft,
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
import { about, profile } from '../data/portfolio'
import { TornSection } from '../components/folder/TornSection'
import { SectionHeader } from '../components/folder/SectionHeader'
import { getSkillLogo } from '../lib/skillLogos'
import { useMediaQuery } from '../hooks/useMediaQuery'

const ease = [0.22, 1, 0.36, 1] as const

const tone = {
  blue: '#3157d5',
  green: '#1f7a55',
  greenTint: '#dff2e8',
  violet: '#6a4bc9',
  violetDeep: '#4b3199',
  violetTint: '#ece6fb',
}

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

/* ------------------------------------------------------------------ */
/*  The documents in the book                                          */
/* ------------------------------------------------------------------ */

interface Doc {
  id: string
  file: string
  label: string
  icon: LucideIcon
  color: string
  render: (run: boolean) => ReactNode
}

const docs: Doc[] = [
  { id: 'profile', file: 'profile.md', label: 'Profile', icon: FileText, color: tone.blue, render: () => <Memo /> },
  { id: 'approach', file: 'approach.flow', label: 'Approach', icon: GitBranch, color: tone.green, render: (run) => <Pipeline run={run} /> },
  { id: 'ai', file: 'ai_direction.ipynb', label: 'AI direction', icon: BrainCircuit, color: tone.violet, render: () => <AiDirection /> },
]

/**
 * About as an open blue case folder read like a book: the left page is the
 * profile; the right page is a small book of documents (memo, approach, AI
 * direction) that turn over the spine like real pages.
 */
export function AboutSection() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  // `inView` fires once, for the book's entrance. `visible` tracks whether the
  // book is still on screen: it opens while visible and closes itself again
  // once it has been scrolled (almost) out of view, up or down.
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const visible = useInView(ref, { amount: 0.12 })
  const [opened, setOpened] = useState(false)
  const [openedBefore, setOpenedBefore] = useState(false)
  const isOpen = opened || !!reduce

  useEffect(() => {
    if (reduce) return
    if (!visible) {
      // Closing is deferred a tick so it is never a synchronous state update in the effect.
      const t = window.setTimeout(() => setOpened(false), 0)
      return () => window.clearTimeout(t)
    }
    if (opened) return
    // First time: let the sealed cover be seen. Coming back: open sooner.
    const t = window.setTimeout(() => {
      setOpened(true)
      setOpenedBefore(true)
    }, openedBefore ? 650 : 1600)
    return () => window.clearTimeout(t)
  }, [visible, opened, openedBefore, reduce])

  const open = () => {
    setOpened(true)
    setOpenedBefore(true)
  }

  // Page content rises in once the covers have swung clear.
  const page = (delay: number): Variants => ({
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: 0.08 } },
  })
  const revealAt = reduce ? 0.1 : 1.05

  return (
    <TornSection id="about" tone="sheet" seed={11} texture="grid">
      <SectionHeader id="about" index="01" label="About" title="I turn business requirements into production software." />

      <div ref={ref} className="relative">
        {/* Folder tab */}
        <div className="flex items-end pl-6">
          <span className="folder-tab-shape inline-flex items-center gap-2 bg-[#2d52c8] px-5 pb-1.5 pt-2 font-mono text-xs font-semibold text-white/90">
            <span className="text-white/60">01</span>
            <span aria-hidden="true">/</span>
            About me
          </span>
        </div>

        {/* Ribbon bookmark: sits behind the cover, so only its forked tail shows below the book */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, y: -12 }}
          animate={isOpen ? { opacity: 1, y: 0, rotate: reduce ? 0 : [0, 2.5, 0, -2, 0] } : undefined}
          transition={{
            opacity: { delay: revealAt + 0.3, duration: 0.4 },
            y: { delay: revealAt + 0.3, duration: 0.5, ease },
            rotate: { delay: revealAt + 1, duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -bottom-9 right-14 h-24 w-5 origin-top bg-[linear-gradient(90deg,#b7841a,#e3ac2e_45%,#c8921f)] shadow-[0_6px_10px_-4px_rgb(0_0_0/0.35)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)] lg:left-[calc(50%+2.75rem)] lg:right-auto"
        />

        {/* Hardcover */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease }}
          className="relative grid gap-4 rounded-[1.75rem] rounded-tl-lg p-3 shadow-[0_40px_70px_-32px_rgb(19_42_115/0.75),inset_0_1px_0_rgb(255_255_255/0.18),inset_0_-2px_0_rgb(0_0_0/0.2)] sm:p-5 lg:grid-cols-2 lg:gap-0"
          style={{ background: COVER_BG }}
        >
          <span aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 rounded-[1.75rem] rounded-tl-lg opacity-60 mix-blend-overlay" />
          {/* Stitched edge */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 rounded-[1.45rem] rounded-tl-md border border-dashed border-white/20" />
          {/* Spine */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-3 left-1/2 hidden w-10 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgb(0_0_0/0.35),transparent)] lg:block" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-5 left-1/2 z-30 hidden w-px -translate-x-1/2 bg-ink/25 lg:block" />

          {/* Left page */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0.4 }}
            animate={isOpen ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: revealAt - 0.3 }}
            className="relative min-w-0"
            inert={!isOpen}
          >
            <motion.div variants={page(revealAt)} initial="hidden" animate={isOpen ? 'show' : 'hidden'} className="h-full">
              <ProfilePage />
            </motion.div>
          </motion.div>

          {/* Right page: the book of documents */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0.4 }}
            animate={isOpen ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: revealAt - 0.3 }}
            className="relative z-[25] min-w-0"
            inert={!isOpen}
          >
            <DocBook run={isOpen} />
          </motion.div>

          {/* The closed, sealed cover; removed once it has swung open */}
          {/* The pages sit in the covers' shadow until the covers swing clear */}
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 rounded-[1.75rem] rounded-tl-lg bg-[#0b1430]"
              initial={false}
              animate={{ opacity: opened ? 0 : 0.55 }}
              transition={opened ? { duration: 1, delay: OPEN_DELAY + 0.25, ease: 'easeOut' } : { duration: 0.6, ease: 'easeIn' }}
            />
          )}

          {/* The sealed cover: opens on its own, on a tap, and closes again when scrolled away */}
          {!reduce && <SealedCover open={opened} onOpen={open} />}
        </motion.div>
      </div>
    </TornSection>
  )
}

/* ------------------------------------------------------------------ */
/*  The sealed cover                                                    */
/* ------------------------------------------------------------------ */

const COVER_BG = 'linear-gradient(140deg, #2d52c8 0%, #1f3fa6 42%, #142c78 100%)'
const OPEN_DELAY = 0.35 // the seal cracks first
const OPEN_DURATION = 1.25
// Seal position: the middle of the cover, but never so low it's off-screen on a tall phone layout.
const SEAL_TOP = 'min(50%, 22rem)'

/**
 * A gatefold hardcover held shut by a wax seal.
 *  Opening: the seal swells and its halves twist apart (the crack), then the two
 *  flaps swing out to the left and right, lifting toward the reader, each
 *  carrying its half of the seal.
 *  Closing (when the book is scrolled away): the flaps swing back in, the seal
 *  halves meet again and the gold title fades back up.
 * The whole closed cover is clickable; the seal is the keyboard-accessible button.
 */
function SealedCover({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion()
  const doorEase = [0.6, 0.04, 0.24, 1] as const
  const shutEase = [0.5, 0, 0.3, 1] as const

  return (
    <div
      className={`absolute inset-0 z-40 ${open ? 'pointer-events-none' : 'cursor-pointer'}`}
      style={{ perspective: '2200px' }}
      onClick={open ? undefined : onOpen}
    >
      {(['left', 'right'] as const).map((side) => {
        const left = side === 'left'
        const sign = left ? -1 : 1
        return (
          <motion.div
            key={side}
            aria-hidden="true"
            className={`absolute inset-y-0 w-1/2 overflow-hidden ${left ? 'left-0 rounded-l-[1.75rem] rounded-tl-lg' : 'right-0 rounded-r-[1.75rem]'}`}
            style={{
              transformOrigin: left ? 'left center' : 'right center',
              background: COVER_BG,
              backgroundSize: '200% 100%',
              backgroundPosition: left ? 'left' : 'right',
            }}
            initial={false}
            animate={open ? { rotateY: sign * 118, opacity: 0 } : { rotateY: 0, opacity: 1 }}
            transition={
              open
                ? {
                    rotateY: { duration: OPEN_DURATION, ease: doorEase, delay: OPEN_DELAY },
                    opacity: { duration: 0.35, delay: OPEN_DELAY + OPEN_DURATION - 0.35 },
                  }
                : {
                    rotateY: { duration: 0.95, ease: shutEase },
                    opacity: { duration: 0.2 },
                  }
            }
          >
            <span className="paper-grain pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" />
            {/* Stitching on the three outer edges */}
            <span
              className={`pointer-events-none absolute inset-y-1.5 border-y border-dashed border-white/20 ${
                left ? 'left-1.5 right-0 rounded-l-[1.45rem] rounded-tl-md border-l' : 'left-0 right-1.5 rounded-r-[1.45rem] border-r'
              }`}
            />
            {/* Board thickness at the seam edge, then the shadow where the flaps meet */}
            <span className={`pointer-events-none absolute inset-y-0 w-1.5 bg-[#0f2263] ${left ? 'right-0' : 'left-0'}`} />
            <span
              className={`pointer-events-none absolute inset-y-0 w-12 ${
                left ? 'right-1.5 bg-[linear-gradient(270deg,rgb(0_0_0/0.32),transparent)]' : 'left-1.5 bg-[linear-gradient(90deg,rgb(0_0_0/0.32),transparent)]'
              }`}
            />
            {/* This flap's half of the wax seal (the flap clips it at the seam) */}
            <span className={`absolute size-24 -translate-y-1/2 ${left ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} style={{ top: SEAL_TOP }}>
              <motion.span
                className="block size-full"
                initial={false}
                // The crack: the seal swells, then each half twists away from the seam.
                animate={open ? { scale: [1, 1.12, 1.04], rotate: [0, 0, sign * 9], x: [0, 0, sign * 3] } : { scale: 1, rotate: 0, x: 0 }}
                transition={open ? { duration: OPEN_DELAY + 0.15, times: [0, 0.55, 1], ease: 'easeOut' } : { duration: 0.4, delay: 0.55 }}
              >
                <WaxSeal />
              </motion.span>
            </span>
          </motion.div>
        )
      })}

      {/* A soft light sweeping across the closed cover */}
      {!reduce && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem] rounded-tl-lg">
          <motion.span
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(100deg,transparent,rgb(255_255_255/0.09),transparent)]"
            initial={false}
            animate={open ? { opacity: 0 } : { opacity: 1, x: ['0%', '420%'] }}
            transition={open ? { duration: 0.2 } : { x: { duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3.2 }, opacity: { duration: 0.4 } }}
          />
        </span>
      )}

      {/* Gold-foil title, centred over the seam; fades as the seal breaks, returns on close */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 flex flex-col items-center px-6 text-center"
        style={{ top: `calc(${SEAL_TOP} - 15rem)` }}
        initial={false}
        animate={open ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
        transition={open ? { duration: 0.3 } : { duration: 0.5, delay: 0.7 }}
      >
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[#e9c46a]/80">Case file · 01</p>
        <p className="mt-3 font-display text-5xl font-bold tracking-tight text-[#efcf7a] [text-shadow:0_1px_0_rgb(0_0_0/0.35),0_0_18px_rgb(233_196_106/0.25)] sm:text-6xl">
          About me
        </p>
        <span className="mt-4 h-px w-24 bg-[linear-gradient(90deg,transparent,#e9c46a,transparent)]" />
        <p className="mt-3 text-sm font-medium text-white/80">{profile.name}</p>
        <p className="text-xs text-white/55">{about.role}</p>
      </motion.div>

      {/* The seal is the button: tap it (or just wait) to open */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
        }}
        disabled={open}
        tabIndex={open ? -1 : 0}
        aria-label="Open the About me book"
        className="group absolute left-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        style={{ top: SEAL_TOP }}
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
      >
        <span className="absolute inset-0 rounded-full ring-2 ring-[#e9c46a]/0 transition-shadow duration-300 group-hover:ring-[#e9c46a]/50 group-focus-visible:ring-[#e9c46a]" />
      </motion.button>
      <motion.p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 text-center font-mono text-xs uppercase tracking-[0.25em] text-[#e9c46a]/75"
        style={{ top: `calc(${SEAL_TOP} + 4rem)` }}
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: [0.45, 1, 0.45] }}
        transition={open ? { duration: 0.2 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        Break the seal
      </motion.p>
    </div>
  )
}

/** A red wax seal stamped with the PK monogram. */
function WaxSeal() {
  return (
    <span className="relative grid size-full place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#d9493c,#a82020_55%,#6f1212)] shadow-[0_6px_14px_-4px_rgb(0_0_0/0.6),inset_0_-3px_6px_rgb(0_0_0/0.35),inset_0_2px_3px_rgb(255_255_255/0.25)]">
      {/* Stamped ring and monogram */}
      <span className="absolute inset-2.5 rounded-full border-2 border-[#5d0e0e]/50 shadow-[0_1px_0_rgb(255_255_255/0.2)]" />
      <span className="relative font-display text-3xl font-bold tracking-tight text-[#f4b8ac]/85 [text-shadow:0_-1px_0_rgb(0_0_0/0.45),0_1px_0_rgb(255_255_255/0.25)]">
        PK
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted">{children}</p>
}

/**
 * One page of the open book. On desktop the two pages meet at the spine
 * (square inner corners, a soft gutter shadow) and the stack of pages
 * beneath shows along the outer edge.
 */
function BookPage({ side, className = '', children }: { side: 'left' | 'right'; className?: string; children: ReactNode }) {
  const left = side === 'left'
  return (
    <div className="relative h-full">
      {/* Page stack peeking out along the outer edge */}
      <span aria-hidden="true" className={`absolute inset-y-2 rounded-2xl bg-[#e4dccb] ${left ? '-left-2 right-3' : '-right-2 left-3'}`} />
      <span aria-hidden="true" className={`absolute inset-y-1 rounded-2xl bg-[#efe9dc] ${left ? '-left-1 right-2' : '-right-1 left-2'}`} />

      <div
        className={`relative flex h-full flex-col rounded-2xl bg-sheet shadow-[0_1px_0_rgb(23_33_43/0.04),0_20px_36px_-22px_rgb(0_0_0/0.6)] ${
          left ? 'lg:rounded-r-[5px]' : 'lg:rounded-l-[5px]'
        } ${className}`}
      >
        {children}
        {/* Gutter: the paper curving down into the spine */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 z-20 hidden w-12 lg:block ${
            left ? 'right-0 bg-[linear-gradient(270deg,rgb(23_33_43/0.13),rgb(23_33_43/0.03)_40%,transparent)]' : 'left-0 bg-[linear-gradient(90deg,rgb(23_33_43/0.13),rgb(23_33_43/0.03)_40%,transparent)]'
          }`}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Left page: profile                                                 */
/* ------------------------------------------------------------------ */

function ProfilePage() {
  const reduce = useReducedMotion()

  return (
    <BookPage side="left" className="p-6 sm:p-8">
      <Paperclip aria-hidden="true" className="absolute -top-4 right-16 z-10 size-9 rotate-[18deg] text-[#8a93a6]" strokeWidth={1.6} />

      <motion.div variants={rise} className="flex items-center justify-between border-b border-dashed border-line pb-3">
        <Eyebrow>Profile</Eyebrow>
        <Eyebrow>File 01</Eyebrow>
      </motion.div>

      <motion.div variants={rise} className="mt-6 flex items-center gap-5">
        <div className="size-24 shrink-0 overflow-hidden rounded-2xl bg-paper shadow-sm ring-4 ring-paper sm:size-28">
          <motion.img
            decoding="async"
            loading="lazy"
            src={profile.photoUrl}
            alt={`Portrait of ${profile.name}`}
            className="size-full object-cover object-top"
            variants={{
              hidden: { filter: reduce ? 'none' : 'grayscale(1)', scale: reduce ? 1 : 1.06 },
              show: { filter: 'grayscale(0)', scale: 1, transition: { duration: 1, ease } },
            }}
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-bold leading-tight sm:text-[1.75rem]">{profile.name}</h3>
          <p className="mt-1 font-medium text-folder">{about.role}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#dff2e8] px-2.5 py-0.5 text-xs font-semibold text-[#13563b]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#1f7a55]" />
            {about.specialty}
          </span>
        </div>
      </motion.div>

      {/* Key facts */}
      <motion.dl variants={rise} className="mt-6 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-paper/60">
        {about.facts.map((f) => (
          <div key={f.value} className="px-3 py-3 sm:px-4">
            <dt className="sr-only">{f.label}</dt>
            <dd className="font-display text-lg font-bold leading-none text-ink sm:text-xl">{f.value}</dd>
            <dd className="mt-1.5 text-xs leading-snug text-muted">{f.label}</dd>
          </div>
        ))}
      </motion.dl>

      {/* Focus areas */}
      <motion.div variants={rise} className="mt-6">
        <Eyebrow>Focus areas</Eyebrow>
        <ul className="mt-3 flex flex-wrap gap-2">
          {about.focus.map((s) => {
            const logo = getSkillLogo(s)
            return (
              <li key={s} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1.5 text-sm font-medium text-ink/85">
                {logo ? <img decoding="async" loading="lazy" src={logo} alt="" className="size-4 object-contain" /> : <span aria-hidden="true" className="size-1.5 rounded-full bg-folder" />}
                {s}
              </li>
            )
          })}
        </ul>
      </motion.div>

      {/* Current interests, pinned to the foot so both pages end level */}
      <motion.div variants={rise} className="mt-auto pt-6">
        <div className="rounded-xl bg-[#dff2e8]/70 p-4 sm:p-5">
          <p className="font-display text-base font-semibold text-ink">Current interests</p>
          <p className="text-xs text-[#13563b]/75">Backend areas I'm actively growing in.</p>
          <ul className="mt-3 grid gap-x-4 gap-y-1.5 text-sm text-ink/85 sm:grid-cols-2">
            {about.interests.map((it) => (
              <li key={it} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-[#1f7a55]" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      <p aria-hidden="true" className="mt-5 text-center font-mono text-xs text-muted/70">— 1 —</p>
    </BookPage>
  )
}

/* ------------------------------------------------------------------ */
/*  Right page: a book of documents that turn like pages               */
/* ------------------------------------------------------------------ */

// Forward: the current page lifts and turns over the spine (to the left),
// revealing the next one underneath. Back: the previous page turns back in.
// How a page turns. `far` (desktop): the page swings all the way across the
// spine and settles on the left page, like a real book. On phones the pages are
// stacked, so it lifts to ~110° and fades instead.
interface Turn {
  dir: number
  far: boolean
}
const TURN = 1.15
const turnCurve = [0.55, 0.06, 0.25, 1] as const
const LIFT = 46 // px the page rises toward the reader mid-turn

// The 3D container only rotates and lifts. Opacity lives on the two faces:
// animating opacity on the container would flatten it in Chrome, and the
// page's front would show through mirrored instead of its paper back.
const flip: Variants = {
  enter: ({ dir, far }: Turn) => (dir >= 0 ? { rotateY: 0, z: 0, zIndex: 1 } : { rotateY: far ? -178 : -110, z: 0, zIndex: 3 }),
  center: ({ dir }: Turn) => ({
    rotateY: 0,
    z: dir < 0 ? [0, LIFT, 0] : 0,
    zIndex: 2,
    transition: {
      rotateY: { duration: TURN, ease: turnCurve },
      z: { duration: TURN, ease: 'easeInOut' },
      zIndex: { duration: 0 },
    },
  }),
  exit: ({ dir, far }: Turn) =>
    dir >= 0
      ? {
          rotateY: far ? -178 : -110,
          z: [0, LIFT, 0],
          zIndex: 3,
          transition: {
            rotateY: { duration: TURN, ease: turnCurve },
            z: { duration: TURN, ease: 'easeInOut' },
            zIndex: { duration: 0 },
          },
        }
      : { rotateY: 0, zIndex: 1, transition: { duration: TURN } },
}
// Each face appears as its page arrives and melts into the stack as it lands.
const face: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: [1, 1, 0], transition: { duration: TURN, times: [0, 0.84, 1] } },
}
const fade: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
// Light falling off the front of a page as it turns away, and lifting off the
// page underneath as it is uncovered.
const shade: Variants = {
  enter: { opacity: 0.3 },
  center: { opacity: 0, transition: { duration: TURN * 0.9, ease: turnCurve } },
  exit: { opacity: 0.45, transition: { duration: TURN * 0.6, ease: 'easeIn' } },
}

function DocBook({ run }: { run: boolean }) {
  const reduce = useReducedMotion()
  const wide = useMediaQuery('(min-width: 1024px)')
  const [[index, dir], setPage] = useState<[number, number]>([0, 0])
  const doc = docs[index]

  const go = (to: number, focus = false) => {
    const n = (to + docs.length) % docs.length
    if (n === index) return
    setPage([n, to > index ? 1 : -1])
    if (focus) document.getElementById(`about-tab-${docs[n].id}`)?.focus()
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (e.key === 'Home') go(0, true)
    else if (e.key === 'End') go(docs.length - 1, true)
    else if (step) go(index + step, true)
    else return
    e.preventDefault()
  }

  return (
    <BookPage side="right">
      {/* Bookmarks */}
      <div role="tablist" aria-label="Documents" onKeyDown={onKey} className="flex gap-1 rounded-t-2xl border-b border-line bg-paper/70 p-1.5 sm:p-2 lg:rounded-tl-[5px]">
        {docs.map((d, i) => {
          const on = i === index
          const Icon = d.icon
          return (
            <button
              key={d.id}
              id={`about-tab-${d.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="about-doc"
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              className={`relative flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold transition-colors sm:gap-2 sm:text-sm ${
                on ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="about-bookmark"
                  className="absolute inset-0 rounded-xl bg-sheet shadow-[0_1px_0_rgb(23_33_43/0.06),0_4px_12px_-6px_rgb(23_33_43/0.25)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span
                className="relative hidden size-6 shrink-0 place-items-center rounded-lg text-white transition-colors sm:grid"
                style={{ background: on ? d.color : '#b9b4a8' }}
              >
                <Icon size={13} aria-hidden="true" />
              </span>
              <span className="relative truncate 2xl:hidden">{d.label}</span>
              <span className="relative hidden truncate font-mono 2xl:inline">{d.file}</span>
            </button>
          )
        })}
      </div>

      {/* Pages. On desktop an invisible copy of every document sizes the stage to the
          tallest one, so turning a page never changes the book's height; on phones
          each page is only as tall as its own content. */}
      <div id="about-doc" role="tabpanel" aria-labelledby={`about-tab-${doc.id}`} className="relative grid flex-1" style={{ perspective: '1800px' }}>
        {docs.map((d) => (
          <div key={d.id} aria-hidden="true" inert className="invisible col-start-1 row-start-1 hidden lg:block">
            {d.render(false)}
          </div>
        ))}

        <AnimatePresence initial={false} custom={{ dir, far: wide } satisfies Turn}>
          <motion.div
            key={doc.id}
            custom={{ dir, far: wide } satisfies Turn}
            variants={reduce ? fade : flip}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative col-start-1 row-start-1"
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
          >
            {/* Front of the page */}
            <motion.div
              variants={reduce ? undefined : face}
              className="relative h-full bg-sheet"
              style={{ transform: 'rotateY(0deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              {doc.render(run)}
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  variants={shade}
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(23_33_43/0.4),rgb(23_33_43/0.08)_55%,rgb(23_33_43/0.02))]"
                />
              )}
            </motion.div>
            {/* Back of the page: plain paper, seen as it swings across the spine */}
            {!reduce && (
              <motion.div
                variants={face}
                aria-hidden="true"
                className="ruled absolute inset-0 bg-[#f4efe3]"
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <span className="absolute inset-0 bg-[linear-gradient(270deg,rgb(23_33_43/0.18),transparent_45%)]" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dog-ear: the folded corner turns to the next page */}
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Turn to the next page"
          className="group absolute bottom-0 right-0 z-10 size-10 overflow-hidden rounded-br-2xl"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 size-6 origin-bottom-right bg-[linear-gradient(315deg,#d9d5cb_0%,#d9d5cb_48%,#fffefa_52%)] shadow-[-2px_-2px_4px_rgb(23_33_43/0.12)] transition-transform duration-300 [clip-path:polygon(100%_0,0_100%,100%_100%)] group-hover:scale-150"
          />
        </button>
      </div>

      {/* Page controls */}
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-paper hover:text-ink"
        >
          <ArrowLeft size={15} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        <span className="flex items-center gap-1.5" aria-label={`Page ${index + 1} of ${docs.length}`}>
          <span aria-hidden="true" className="mr-1.5 font-mono text-xs text-muted/70">
            — {index + 2} —
          </span>
          {docs.map((d, i) => (
            <span key={d.id} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === index ? 20 : 6, background: i === index ? doc.color : '#d9d5cb' }} />
          ))}
        </span>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
        >
          <span className="hidden sm:inline">Next page</span>
          <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </BookPage>
  )
}

/* ------------------------------------------------------------------ */
/*  profile.md                                                          */
/* ------------------------------------------------------------------ */

function emphasise(text: string): ReactNode[] {
  const { highlights } = about.memo
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

function Memo() {
  return (
    <div className="ruled h-full p-5 sm:p-7">
      <p className="border-b-2 border-ink pb-2 font-display text-xl font-bold tracking-tight">MEMO</p>
      <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-y-1 font-mono text-xs">
        <dt className="text-muted">FROM</dt>
        <dd className="text-ink">{profile.name}</dd>
        <dt className="text-muted">SUBJECT</dt>
        <dd className="text-ink">{about.memo.subject}</dd>
      </dl>
      <div className="mt-5 space-y-4">
        {about.memo.paragraphs.map((p, i) => (
          <p key={p.slice(0, 24)} className={i === 0 ? 'text-[1.02rem] leading-relaxed text-ink' : 'leading-relaxed text-ink/75'}>
            {emphasise(p)}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  approach.flow                                                       */
/* ------------------------------------------------------------------ */

/** Requirement → production; the line fills and the steps light up each time the page opens. */
function Pipeline({ run }: { run: boolean }) {
  const reduce = useReducedMotion()
  const steps = about.approach.steps
  const last = steps.length - 1
  const gap = reduce ? 0 : 0.11

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-line pb-3">
        <div>
          <h3 className="text-lg font-semibold sm:text-xl">{about.approach.title}</h3>
          <p className="text-sm text-muted">{about.approach.subtitle}</p>
        </div>
        <Eyebrow>{steps.length} stages</Eyebrow>
      </div>

      <ol className="relative mt-4">
        <span aria-hidden="true" className="absolute bottom-4 left-[1.05rem] top-4 w-0.5 rounded-full bg-line" />
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: reduce ? 1 : 0 }}
          animate={run ? { scaleY: 1 } : undefined}
          transition={{ duration: last * gap + 0.2, ease: 'linear', delay: 0.35 }}
          className="absolute bottom-4 left-[1.05rem] top-4 w-0.5 origin-top rounded-full"
          style={{ background: `linear-gradient(${tone.green}, ${tone.blue})` }}
        />
        {steps.map((step, i) => {
          const isLast = i === last
          const at = 0.35 + i * gap
          return (
            <li key={step} className="relative flex items-center gap-3 py-[0.3rem]">
              <motion.span
                initial={{ backgroundColor: '#fffefa', color: '#5c6670' }}
                animate={run ? { backgroundColor: isLast ? tone.blue : tone.green, color: '#ffffff' } : undefined}
                transition={{ delay: at, duration: 0.25 }}
                className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-line font-mono text-xs font-bold shadow-2xs"
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

/* ------------------------------------------------------------------ */
/*  ai_direction.ipynb                                                  */
/* ------------------------------------------------------------------ */

function AiDirection() {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-dashed border-line pb-3">
        <div className="max-w-md">
          <h3 className="text-lg font-semibold sm:text-xl">{about.ai.title}</h3>
          <p className="mt-1 text-sm text-muted">{about.ai.subtitle}</p>
        </div>
        <span
          className="-rotate-6 rounded-md border-2 px-2 py-0.5 font-mono text-micro font-bold uppercase tracking-[0.2em]"
          style={{ borderColor: tone.violet, color: tone.violet }}
        >
          Next chapter
        </span>
      </div>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {about.ai.items.map((a) => {
          const Icon = aiIcons[a] ?? BrainCircuit
          return (
            <li
              key={a}
              className="group flex items-center gap-2.5 rounded-xl border border-line bg-sheet px-3 py-2 text-[0.88rem] text-ink/85 transition-colors hover:border-[#6a4bc9]/50"
            >
              <span
                className="grid size-8 shrink-0 place-items-center rounded-lg transition-transform group-hover:-rotate-6 group-hover:scale-110"
                style={{ background: tone.violetTint, color: tone.violetDeep }}
              >
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
