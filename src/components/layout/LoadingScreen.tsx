import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react'
import { BookOpen, Briefcase, Cpu, FolderKanban, GraduationCap, Mail, User, type LucideIcon } from 'lucide-react'
import { profile } from '../../data/portfolio'

// One file per section, in page order, each in its section colour.
const files: { label: string; path: string; icon: LucideIcon; color: string }[] = [
  { label: 'About', path: 'about.md', icon: User, color: '#3157d5' },
  { label: 'Experience', path: 'experience.log', icon: Briefcase, color: '#1f7a55' },
  { label: 'Projects', path: 'projects/', icon: FolderKanban, color: '#b9502a' },
  { label: 'Skills', path: 'skills.json', icon: Cpu, color: '#1e6b80' },
  { label: 'Education', path: 'education.pdf', icon: GraduationCap, color: '#8a5f0c' },
  { label: 'Publications', path: 'publications.pdf', icon: BookOpen, color: '#6a4bc9' },
  { label: 'Contact', path: 'contact.vcf', icon: Mail, color: '#3157d5' },
]

type Phase = 'fan' | 'gather' | 'open'

const SESSION_KEY = 'devfolio:loaded'
const FAN_MS = 2000
const ease = [0.22, 1, 0.36, 1] as const

function seenThisSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * First-visit loader, staged like opening a case file:
 *  fan    — section files rise out of the folder into a hand of cards while the count runs
 *  gather — the cards drop back into the folder
 *  open   — the cover swings open like a book onto the title page
 *  then the loader zooms away into the site
 * Shown once per browser session; reduced motion gets a short fade.
 */
export function LoadingScreen() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(() => !seenThisSession())
  const [phase, setPhase] = useState<Phase>('fan')
  const [progress, setProgress] = useState(0)

  const finish = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* storage blocked: the loader will simply show again next visit */
    }
    setVisible(false)
  }

  useEffect(() => {
    if (!visible) return
    // The static boot screen in index.html has done its job once React is here.
    document.getElementById('boot')?.remove()
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'

    const fan = reduce ? 300 : FAN_MS
    const counter = animate(0, 100, { duration: fan / 1000, ease: [0.45, 0, 0.2, 1], onUpdate: (v) => setProgress(Math.round(v)) })
    const timers = reduce
      ? [window.setTimeout(finish, fan + 150)]
      : [
          window.setTimeout(() => setPhase('gather'), fan + 150),
          window.setTimeout(() => setPhase('open'), fan + 650),
          window.setTimeout(finish, fan + 1700),
        ]

    // Any key or click skips the intro.
    const skip = () => finish()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)

    return () => {
      counter.stop()
      timers.forEach(window.clearTimeout)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
      root.style.overflow = prev
    }
  }, [visible, reduce])

  const shown = Math.min(files.length, Math.ceil((progress / 100) * files.length))
  const current = files[Math.max(0, shown - 1)]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label={`Loading portfolio, ${progress}%`}
          exit={reduce ? { opacity: 0, transition: { duration: 0.25 } } : { opacity: 0, scale: 1.15, transition: { duration: 0.6, ease } }}
          className="fixed inset-0 z-100 grid place-items-center overflow-hidden bg-night text-white"
        >
          {/* Backdrop: blueprint grid and a soft glow behind the folder */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
            }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute size-[34rem] rounded-full blur-3xl"
            animate={{ background: `radial-gradient(circle, ${current.color}55, transparent 65%)` }}
            transition={{ duration: 0.5 }}
          />

          <div className="relative flex flex-col items-center">
            {/* Stage: the fanned cards sit above the folder */}
            <div className="relative h-[19rem] w-[20rem] sm:h-[22rem] sm:w-[26rem]" style={{ perspective: '1400px' }}>
              <FileFan shown={shown} phase={phase} reduce={!!reduce} />
              <CaseFolder phase={phase} reduce={!!reduce} />
            </div>

            {/* Readout */}
            <div className="mt-10 w-[18rem] sm:w-[22rem]">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="truncate text-white/55">
                  ~/portfolio/
                    <motion.span
                      key={phase === 'fan' ? current.path : phase}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="inline-block font-semibold"
                      style={{ color: phase === 'fan' ? current.color : '#9fe0bf' }}
                    >
                      {phase === 'fan' ? current.path : 'case file ready'}
                    </motion.span>
                </span>
                <span className="font-display text-lg font-bold tabular-nums text-white">{progress}%</span>
              </div>
              <div className="mt-2.5 flex gap-1">
                {files.map((f, i) => (
                  <span key={f.path} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      className="absolute inset-0 origin-left rounded-full"
                      style={{ background: f.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: i < shown ? 1 : 0 }}
                      transition={{ duration: 0.3, ease }}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={finish}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-[0.68rem] text-white/60 transition-colors hover:border-white/35 hover:text-white"
          >
            Skip intro
            <kbd className="rounded border border-white/20 px-1 text-[0.6rem]">any key</kbd>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */

/** The section files: rise out of the folder into an arc, then drop back in. */
function FileFan({ shown, phase, reduce }: { shown: number; phase: Phase; reduce: boolean }) {
  const n = files.length
  const mid = (n - 1) / 2
  const gathered = phase !== 'fan'

  return (
    <div className="absolute inset-x-0 bottom-[30%] z-0 flex justify-center">
      {files.map((f, i) => {
        const out = i < shown && !gathered
        const active = out && i === shown - 1
        const spread = i - mid
        const Icon = f.icon
        return (
          <motion.div
            key={f.path}
            className="absolute bottom-0 h-36 w-24 sm:h-40 sm:w-28"
            style={{ transformOrigin: '50% 140%', zIndex: i }}
            initial={{ y: 70, rotate: 0, opacity: 0 }}
            animate={
              out
                ? {
                    y: reduce ? 0 : -26 - (mid - Math.abs(spread)) * 8 - (active ? 22 : 0),
                    rotate: reduce ? 0 : spread * 13,
                    x: spread * 22,
                    scale: active ? 1.08 : 1,
                    opacity: 1,
                  }
                : { y: 70, rotate: 0, x: 0, scale: 1, opacity: gathered && i < shown ? 1 : 0 }
            }
            transition={{ type: 'spring', stiffness: 220, damping: 20, delay: gathered ? (n - i) * 0.03 : 0 }}
          >
            <div
              className="flex size-full flex-col overflow-hidden rounded-xl bg-sheet text-ink transition-shadow duration-300"
              style={{
                boxShadow: active
                  ? `0 0 0 2px ${f.color}, 0 0 38px 4px ${f.color}88, 0 18px 40px -14px rgb(0 0 0 / 0.7)`
                  : '0 18px 40px -14px rgb(0 0 0 / 0.7)',
              }}
            >
              <span className="h-1.5 w-full" style={{ background: f.color }} />
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-2">
                <span className="grid size-9 place-items-center rounded-lg text-white" style={{ background: f.color }}>
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span className="font-display text-[0.8rem] font-semibold">{f.label}</span>
                <span aria-hidden="true" className="flex w-full flex-col items-center gap-1">
                  <span className="h-0.5 w-3/4 rounded-full bg-ink/10" />
                  <span className="h-0.5 w-1/2 rounded-full bg-ink/10" />
                </span>
              </div>
              <span className="pb-1.5 text-center font-mono text-[0.55rem] text-muted">{String(i + 1).padStart(2, '0')}</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/** The folder: a pocket while the files fan out, then the cover swings open like a book. */
function CaseFolder({ phase, reduce }: { phase: Phase; reduce: boolean }) {
  const opening = phase === 'open'

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 mx-auto h-[46%] w-full max-w-[22rem]" style={{ transformStyle: 'preserve-3d' }}>
      {/* Tab */}
      <div className="absolute -top-6 left-4 z-0 flex h-7 items-center rounded-t-xl bg-folder-deep px-3.5 font-mono text-[0.62rem] font-semibold tracking-wide text-white/85">
        PK / PORTFOLIO
      </div>

      {/* Title page, revealed when the cover opens */}
      <div className="absolute inset-0 flex flex-col justify-center rounded-2xl bg-sheet px-6 text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-folder">Case file · engineering</p>
        <p className="mt-1.5 font-display text-2xl font-bold leading-tight">{profile.name}</p>
        <p className="text-sm text-muted">{profile.title}</p>
        <motion.span
          aria-hidden="true"
          className="mt-3 block h-0.5 origin-left rounded-full bg-gradient-to-r from-folder via-[#6a4bc9] to-[#1f7a55]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: opening ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        />
      </div>

      {/* Cover: hinged on the left, with an inside face that shows as it swings open */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
        initial={false}
        animate={opening && !reduce ? { rotateY: -150 } : { rotateY: 0 }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
      >
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-folder via-folder to-folder-deep p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" />
          <div aria-hidden="true" className="absolute left-1/2 top-0 h-2.5 w-16 -translate-x-1/2 rounded-b-full bg-black/20" />
          <div className="relative flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-wider text-white/70">
            <span>Confidential · portfolio</span>
            <span>{files.length} files</span>
          </div>
          <div className="relative">
            <p className="font-display text-3xl font-bold leading-none text-white">PK.</p>
            <p className="mt-1 font-mono text-[0.65rem] text-white/70">{profile.name}</p>
          </div>
        </div>
        {/* Inside of the cover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-bl from-[#1b3388] to-folder-deep"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className="paper-grain absolute inset-0 opacity-50 mix-blend-overlay" />
          <div className="absolute inset-x-6 bottom-5 top-5 rounded-xl border border-dashed border-white/20" />
          <p className="absolute bottom-7 right-8 font-mono text-[0.55rem] uppercase tracking-wider text-white/40">property of PK</p>
        </div>
      </motion.div>
    </div>
  )
}
