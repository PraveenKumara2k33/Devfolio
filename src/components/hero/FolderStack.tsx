import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from 'motion/react'
import { Cloud, Database, Download, Mail, RotateCw, Server, type LucideIcon } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { about, profile, socialLinks } from '../../data/portfolio'
import { SocialGlyph } from '../ui/BrandIcons'
import { getSkillLogo } from '../../lib/skillLogos'

const ease = [0.22, 1, 0.36, 1] as const
const THICKNESS = 6 // px of badge edge
const stack = ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS']
// Back of the badge: what I work on, in three plain rows.
const expertise: { icon: LucideIcon; title: string; tools: string }[] = [
  { icon: Server, title: 'APIs & services', tools: 'FastAPI · Spring Boot · REST' },
  { icon: Database, title: 'Data', tools: 'PostgreSQL · MySQL · SQL' },
  { icon: Cloud, title: 'Cloud & DevOps', tools: 'Docker · Nginx · AWS' },
]
const profiles = socialLinks.filter((l) => l.url && (l.icon === 'linkedin' || l.icon === 'github'))
const mailHref = `mailto:${profile.email}?subject=${encodeURIComponent('Hello PraveenKumar, from your portfolio')}`
const hide: CSSProperties = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

// Barcode bars derived from the name, so it's stable and looks "printed".
const bars = Array.from(profile.name.replace(/\s/g, '').toUpperCase()).flatMap((ch) => {
  const c = ch.charCodeAt(0)
  return [1 + (c % 3), 1 + ((c >> 2) % 2), 1 + ((c >> 1) % 3)]
})

/** A layer that floats `z` px above the badge face, so it parallaxes as the badge tilts. */
function Depth({ z, className = '', children }: { z: number; className?: string; children: ReactNode }) {
  return (
    <div className={className} style={{ transform: `translateZ(${z}px)`, ...hide }}>
      {children}
    </div>
  )
}

/** The slot punched in the top of the badge, where the lanyard clip goes through. */
function Slot() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-3 h-2.5 w-14 -translate-x-1/2 rounded-full bg-[#0f1f5c]/70 shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]"
    />
  )
}

/**
 * Hero visual: an engineer ID badge hanging on a lanyard.
 *  - Entrance: drops in from above and swings on the lanyard before settling.
 *  - Idle: a gentle sway. Desktop: 3D tilt toward the pointer; the photo, name
 *    and badges sit at different depths, so they parallax.
 *  - One tap (or Enter) flips it over. A double tap or rapid taps knock it, so it
 *    swings on the lanyard like a pendulum: more taps, bigger swing.
 *  - Reduced motion: a still badge that still flips.
 */
export function FolderStack({ ready = true }: { ready?: boolean }) {
  const reduce = !!useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const interactive = finePointer && !reduce
  const [flipped, setFlipped] = useState(false)

  // Pointer position, tracked on the outer box (which never tilts) so hit-testing stays stable.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 150, damping: 17, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), spring)

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (!interactive) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  function reset() {
    px.set(0)
    py.set(0)
  }
  const flip = () => setFlipped((f) => !f)

  // Pendulum: a knock adds angular velocity; a light spring pulls it back to rest.
  const swing = useMotionValue(0)
  const taps = useRef(0)
  const tapTimer = useRef(0)
  useEffect(() => () => window.clearTimeout(tapTimer.current), [])

  const knock = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    // Hitting the right side pushes the badge to the left, and vice versa.
    const dir = e.clientX > r.left + r.width / 2 ? 1 : -1
    const velocity = Math.max(-900, Math.min(900, swing.getVelocity() + dir * 190))
    animate(swing, 0, { type: 'spring', stiffness: 38, damping: 2.6, mass: 1, velocity })
  }

  // Pull: grab the badge and drag. Pulling down stretches the lanyard (with
  // rubber-band resistance); dragging sideways swings it. On release it snaps
  // back with a bounce and swings to rest.
  const stretch = useMotionValue(0)
  const strapHeight = useTransform(stretch, (s) => 112 + s)
  const strapScaleX = useTransform(stretch, (s) => 1 - s / 700)
  const dragged = useRef(false)
  const stopDrag = useRef<() => void>(() => {})
  useEffect(() => () => stopDrag.current(), [])

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.button !== 0) return
    const startX = e.clientX
    const startY = e.clientY
    let moving = false
    swing.stop()
    stretch.stop()

    const move = (ev: globalThis.PointerEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      if (!moving && Math.hypot(dx, dy) < 6) return
      moving = true
      const s = 140 * (1 - Math.exp(-Math.max(0, dy) / 160))
      stretch.set(s)
      // The badge hangs ~230 px below the pivot; the angle follows the pointer.
      const angle = (-Math.atan2(dx, 230 + s) * 180) / Math.PI
      swing.set(Math.max(-32, Math.min(32, angle)))
    }
    const end = () => {
      stopDrag.current()
      if (!moving) return
      dragged.current = true
      animate(stretch, 0, { type: 'spring', stiffness: 320, damping: 8, velocity: stretch.getVelocity() })
      animate(swing, 0, {
        type: 'spring',
        stiffness: 38,
        damping: 2.6,
        velocity: Math.max(-900, Math.min(900, swing.getVelocity())),
      })
    }
    stopDrag.current = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
      stopDrag.current = () => {}
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
  }

  // One tap flips; a second tap within 260 ms (and every one after) knocks it instead.
  const onTap = (e: MouseEvent<HTMLElement>) => {
    // A pull ends with a click event; it shouldn't also flip the badge.
    if (dragged.current) {
      dragged.current = false
      return
    }
    taps.current += 1
    window.clearTimeout(tapTimer.current)
    if (taps.current === 1) {
      tapTimer.current = window.setTimeout(() => {
        taps.current = 0
        flip()
      }, reduce ? 0 : 260)
      return
    }
    if (!reduce) knock(e)
    tapTimer.current = window.setTimeout(() => (taps.current = 0), 450)
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      flip()
    }
  }

  const state = ready ? 'show' : 'hidden'
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 8 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 1.2 + i * 0.08 } }),
  }
  const photo: Variants = {
    hidden: { filter: reduce ? 'none' : 'grayscale(1)', scale: reduce ? 1.03 : 1.12 },
    show: { filter: 'grayscale(0)', scale: 1.03, transition: { duration: 1.2, ease, delay: 1 } },
  }

  const faceBase = 'absolute inset-0 rounded-[1.4rem] [transform-style:preserve-3d]'

  return (
    <div
      className="relative mx-auto w-full max-w-[21rem] select-none pb-6"
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {/* Floor shadow */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-[18%] bottom-14 h-7 rounded-[50%] bg-ink/25 blur-xl"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 1 }}
      />

      {/* The drop: falls in from above and swings on the lanyard (pivot at the top) */}
      <motion.div
        style={{ transformOrigin: '50% 0%' }}
        initial={{ y: reduce ? 0 : -160, rotate: reduce ? 0 : -16, opacity: 0 }}
        animate={ready ? { y: 0, rotate: 0, opacity: 1 } : undefined}
        transition={{
          y: { type: 'spring', stiffness: 90, damping: 13 },
          rotate: { type: 'spring', stiffness: 55, damping: 4.5, mass: 1 },
          opacity: { duration: 0.25 },
        }}
      >
        {/* Idle sway once it has settled */}
        <motion.div
          style={{ transformOrigin: '50% 0%' }}
          animate={ready && !reduce ? { rotate: [0, 1.4, 0, -1.4, 0] } : undefined}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3.2 }}
        >
        {/* Knock-driven pendulum swing */}
        <motion.div style={{ transformOrigin: '50% 0%', rotate: swing }}>
          {/* Lanyard strap: grows longer and a little thinner as the badge is pulled */}
          <motion.div
            aria-hidden="true"
            style={{ height: strapHeight, scaleX: strapScaleX }}
            className="relative mx-auto w-9 overflow-hidden bg-[linear-gradient(90deg,#1f3a9c,#3157d5_50%,#1f3a9c)] shadow-[inset_0_-10px_14px_-8px_rgb(0_0_0/0.4)] [mask-image:linear-gradient(to_bottom,transparent,#000_45%)]"
          >
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.55rem] font-bold uppercase tracking-[0.25em] text-white/70 [writing-mode:vertical-rl]">
              PK · ENGINEER · PK
            </span>
          </motion.div>
          {/* Metal clip */}
          <div
            aria-hidden="true"
            className="relative z-10 mx-auto -mt-1 h-7 w-12 rounded-b-xl rounded-t-md bg-[linear-gradient(180deg,#e5e7eb,#9ca3af_55%,#d1d5db)] shadow-[0_3px_6px_-2px_rgb(0_0_0/0.45),inset_0_1px_0_rgb(255_255_255/0.8)]"
          >
            <span className="absolute inset-x-3 bottom-1.5 h-1.5 rounded-full bg-[#6b7280]/60" />
          </div>

          {/* The badge (3D) */}
          <div className="-mt-3" style={{ perspective: 900 }}>
            <motion.div className="[transform-style:preserve-3d]" style={interactive ? { rotateX, rotateY } : undefined}>
              <motion.div
                role="button"
                tabIndex={0}
                aria-pressed={flipped}
                aria-label={flipped ? 'ID badge, back. Press to flip to the front.' : 'ID badge. Press to flip for details.'}
                onClick={onTap}
                onPointerDown={onPointerDown}
                onKeyDown={onKey}
                style={{ touchAction: 'pan-y' }}
                initial={false}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={reduce ? { duration: 0.3 } : { type: 'spring', stiffness: 80, damping: 14 }}
                className="relative mx-auto aspect-[3/4.45] w-[86%] cursor-grab rounded active:cursor-grabbing-[1.4rem] outline-none [transform-style:preserve-3d] focus-visible:ring-4 focus-visible:ring-folder/40"
              >
                {/* Edge: stacked slices give the badge real thickness */}
                {Array.from({ length: THICKNESS }).map((_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[1.4rem]"
                    style={{ transform: `translateZ(${-i - 1}px)`, background: i === THICKNESS - 1 ? '#c9c3b5' : '#e4ded0' }}
                  />
                ))}

                {/* ---------- Front ---------- */}
                <div
                  className={`${faceBase} bg-sheet text-ink shadow-[0_36px_64px_-28px_rgb(23_33_43/0.55)] ring-1 ring-line`}
                  style={{ transform: 'rotateY(0deg)', ...hide }}
                  inert={flipped}
                >
                  {/* Printed background: header band and a fine dot grid */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.4rem]" style={hide}>
                    <span className="absolute inset-x-0 top-0 h-[5.25rem] bg-[linear-gradient(135deg,#3157d5,#1f3a9c)]" />
                    <span
                      className="absolute inset-x-0 top-0 h-[5.25rem] opacity-20"
                      style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 9px)' }}
                    />
                    <span className="dot-grid absolute inset-x-0 bottom-0 top-[5.25rem] opacity-60" />
                  </span>
                  <Slot />

                  <Depth z={20} className="flex items-center justify-between px-5 pt-8 text-white">
                    <motion.span custom={0} variants={rise} initial="hidden" animate={state} className="font-display text-xl font-bold tracking-tight">
                      PK<span className="text-[#efcf7a]">.</span>
                    </motion.span>
                    <motion.span
                      custom={0}
                      variants={rise}
                      initial="hidden"
                      animate={state}
                      className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white/80"
                    >
                      Engineer
                    </motion.span>
                  </Depth>

                  {/* Photo, raised off the badge */}
                  <Depth z={44} className="relative mx-5 mt-3">
                    <div className="overflow-hidden rounded-2xl bg-paper shadow-[0_16px_28px_-14px_rgb(23_33_43/0.55)] ring-4 ring-sheet">
                      <div className="aspect-[4/3.3] overflow-hidden">
                        <motion.img
                          variants={photo}
                          initial="hidden"
                          animate={state}
                          decoding="async"
                          src={profile.photoUrl}
                          alt={`Portrait of ${profile.name}`}
                          width={400}
                          height={400}
                          fetchPriority="high"
                          draggable={false}
                          className="size-full object-cover object-top"
                        />
                      </div>
                    </div>
                    {/* Holographic sticker */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-3 -right-2 grid size-11 place-items-center rounded-full font-display text-xs font-bold text-white shadow-[0_6px_12px_-4px_rgb(0_0_0/0.4)] ring-2 ring-sheet"
                      style={{ background: 'conic-gradient(from 200deg, #8fb0ff, #c4a7ff, #9fe0bf, #efcf7a, #8fb0ff)' }}
                    >
                      <span className="[text-shadow:0_1px_2px_rgb(0_0_0/0.35)]">PK</span>
                    </span>
                  </Depth>

                  <Depth z={30} className="px-5 pt-4">
                    <motion.p custom={1} variants={rise} initial="hidden" animate={state} className="font-display text-xl font-bold leading-tight">
                      {profile.name}
                    </motion.p>
                    <motion.p custom={2} variants={rise} initial="hidden" animate={state} className="text-sm text-muted">
                      {profile.title}
                    </motion.p>
                    <motion.span
                      custom={3}
                      variants={rise}
                      initial="hidden"
                      animate={state}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#dff2e8] px-2.5 py-0.5 text-xs font-semibold text-[#13563b]"
                    >
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-[#1f7a55]" />
                      {about.specialty}
                    </motion.span>
                  </Depth>

                  {/* Footer strip: stack logos and a barcode */}
                  <Depth z={22} className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-dashed border-line px-5 py-3">
                    <ul aria-label="Core stack" className="flex -space-x-1.5">
                      {stack.map((t) => {
                        const logo = getSkillLogo(t)
                        return logo ? (
                          <li key={t} title={t} className="grid size-7 place-items-center rounded-full bg-sheet shadow-sm ring-1 ring-line">
                            <img src={logo} alt={t} loading="lazy" decoding="async" draggable={false} className="size-4 object-contain" />
                          </li>
                        ) : null
                      })}
                    </ul>
                    <span aria-hidden="true" className="flex h-7 items-stretch gap-[2px] opacity-80">
                      {bars.slice(0, 22).map((w, i) => (
                        <span key={i} className="bg-ink" style={{ width: w }} />
                      ))}
                    </span>
                  </Depth>

                  {/* A soft light sweep now and then */}
                  {!reduce && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.4rem]"
                      style={{ transform: 'translateZ(60px)', ...hide }}
                    >
                      <motion.span
                        className="absolute inset-y-0 -left-1/2 w-1/2 bg-[linear-gradient(105deg,transparent,rgb(255_255_255/0.45),transparent)] mix-blend-soft-light"
                        initial={{ x: '0%' }}
                        animate={ready ? { x: '420%' } : undefined}
                        transition={{ duration: 1.3, ease: 'easeInOut', delay: 2.2, repeat: Infinity, repeatDelay: 7 }}
                      />
                    </span>
                  )}
                </div>

                {/* ---------- Back ---------- */}
                <div
                  className={`${faceBase} bg-sheet text-ink shadow-[0_36px_64px_-28px_rgb(23_33_43/0.55)] ring-1 ring-line`}
                  style={{ transform: `translateZ(${-THICKNESS - 1}px) rotateY(180deg)`, ...hide }}
                  inert={!flipped}
                >
                  {/* Printed background: header band (matches the front) and a fine dot grid */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.4rem]" style={hide}>
                    <span className="absolute inset-x-0 top-0 h-[4.5rem] bg-[linear-gradient(135deg,#3157d5,#1f3a9c)]" />
                    <span
                      className="absolute inset-x-0 top-0 h-[4.5rem] opacity-20"
                      style={{ backgroundImage: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 9px)' }}
                    />
                    <span className="dot-grid absolute inset-x-0 bottom-0 top-[4.5rem] opacity-60" />
                  </span>
                  <Slot />

                  <Depth z={14} className="flex h-full flex-col px-5 pb-4">
                    {/* Band text */}
                    <div className="flex h-[4.5rem] items-end justify-between pb-2.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
                      <span>Engineer file</span>
                      <span className="text-white/60">No. 01</span>
                    </div>

                    <p className="mt-3 font-display text-lg font-semibold leading-tight">{profile.name}</p>
                    <p className="text-xs text-muted">
                      {profile.title} · <span className="font-semibold text-success">{about.specialty}</span>
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-snug text-ink/80">
                      I build secure, reliable backends: APIs, data and cloud, for real business products.
                    </p>

                    {/* What I work on */}
                    <ul className="mt-3 space-y-1.5">
                      {expertise.map(({ icon: Icon, title, tools }) => (
                        <li key={title} className="flex items-center gap-2.5 rounded-lg border border-line bg-paper/80 px-2.5 py-1.5">
                          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-soft text-folder-deep">
                            <Icon size={14} aria-hidden="true" />
                          </span>
                          <span className="min-w-0 leading-tight">
                            <span className="block text-xs font-semibold text-ink">{title}</span>
                            <span className="block truncate text-[0.7rem] text-muted">{tools}</span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Reach me */}
                    <div className="mt-auto flex items-center gap-1.5 pt-3">
                      {profiles.map((l) => (
                        <a
                          key={l.label}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${l.label} (opens in a new tab)`}
                          className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-sheet text-ink/80 transition-colors hover:border-ink/30 hover:text-ink"
                        >
                          <SocialGlyph icon={l.icon} size={15} />
                        </a>
                      ))}
                      <a href={mailHref} onClick={(e) => e.stopPropagation()} className="btn btn-primary min-h-9 flex-1 justify-center gap-1.5 px-2 text-xs">
                        <Mail size={13} aria-hidden="true" />
                        Email
                      </a>
                      <a
                        href={profile.resumeUrl}
                        download={profile.resumeFileName}
                        type="application/pdf"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Download resume"
                        className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-sheet text-ink/80 transition-colors hover:border-ink/30 hover:text-ink"
                      >
                        <Download size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </Depth>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        </motion.div>
      </motion.div>

      {/* Flip hint */}
      <motion.button
        type="button"
        onClick={flip}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 2.4, duration: 0.5 }}
        className="group relative mx-auto mt-8 flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        <RotateCw size={13} aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-180" />
        {flipped ? 'Flip to front' : 'Tap to flip · pull or double-tap to swing'}
      </motion.button>
    </div>
  )
}
