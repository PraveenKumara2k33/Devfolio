import type { PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Paperclip } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ecosystem, profile } from '../../data/portfolio'
import { getSkillLogo } from '../../lib/skillLogos'

// Tech that floats around the folder, with its resting spot and bob delay.
const orbit = [
  { name: 'React', className: '-left-6 top-[18%]', delay: 0 },
  { name: 'FastAPI', className: '-right-5 top-[30%]', delay: 0.6 },
  { name: 'PostgreSQL', className: '-left-8 top-[55%]', delay: 1.2 },
  { name: 'Docker', className: '-right-7 top-[62%]', delay: 1.8 },
]

/**
 * Lightweight CSS-3D "portfolio folder" for the hero. No WebGL: layered DOM
 * sheets with depth offsets. Pointer tilt only on fine pointers without
 * reduced motion; otherwise it's a static, slightly rotated stack.
 */
export function FolderStack() {
  const reduce = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const interactive = finePointer && !reduce

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 140, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring)

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

  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-[25rem] [perspective:1400px]"
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={interactive ? { rotateX, rotateY } : { rotateX: 4, rotateY: -8 }}
      >
        {/* Folder back cover + tab */}
        <div
          className="absolute inset-x-0 bottom-0 top-8 rounded-2xl rounded-tl-none bg-folder shadow-[var(--shadow-lift)]"
          style={{ transform: 'translateZ(-50px)' }}
        >
          <div className="folder-tab-shape absolute -top-8 left-0 flex h-8 w-40 items-center bg-folder px-5 font-mono text-[0.7rem] font-medium text-white/85">
            PORTFOLIO / PK
          </div>
        </div>

        {/* Sheet 3 — terminal snippet */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.35 }}
          className="absolute left-[9%] right-[3%] top-[9%] h-[52%] rounded-xl bg-night p-4 font-mono text-[0.68rem] leading-relaxed text-white/80 shadow-[var(--shadow-sheet)]"
          style={{ z: -30, rotate: 5 }}
          aria-hidden="true"
        >
          <div className="mb-3 flex gap-1.5">
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/25" />
          </div>
          <p>
            <span className="text-[#8fb0ff]">@router</span>.post(<span className="text-[#9fe0bf]">"/bookings"</span>)
          </p>
          <p>
            <span className="text-[#8fb0ff]">async def</span> create_booking(
          </p>
          <p className="pl-4">payload: BookingIn,</p>
          <p className="pl-4">db: Session = Depends(get_db),</p>
          <p>) -&gt; BookingOut:</p>
          <p className="caret pl-4 text-white/50">...</p>
        </motion.div>

        {/* Sheet 2 — ruled index sheet */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.5 }}
          className="ruled absolute left-[4%] right-[10%] top-[6%] h-[60%] rounded-xl border border-line bg-sheet p-5 shadow-[var(--shadow-sheet)]"
          style={{ z: -12, rotate: -4 }}
          aria-hidden="true"
        >
          <p className="font-mono text-[0.65rem] text-folder">// platform modules</p>
          <ul className="mt-2 space-y-[0.32rem] text-[0.78rem] font-medium text-ink/75">
            {ecosystem.slice(0, 6).map((m) => (
              <li key={m}>— {m}</li>
            ))}
          </ul>
        </motion.div>

        {/* Sheet 1 — profile photo card */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.65 }}
          className="absolute left-[14%] right-[14%] top-[3%] rounded-xl border border-line bg-sheet p-3 shadow-[var(--shadow-lift)]"
          style={{ z: 18, rotate: 1.5 }}
        >
          <Paperclip
            aria-hidden="true"
            className="absolute -top-4 right-6 size-9 rotate-[18deg] text-muted"
            strokeWidth={1.6}
          />
          <div className="aspect-[4/4.3] overflow-hidden rounded-lg bg-paper">
            <img decoding="async"
              src={profile.photoUrl}
              alt={`Portrait of ${profile.name}`}
              width={400}
              height={430}
              fetchPriority="high"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Front pocket */}
        <div
          className="absolute inset-x-0 bottom-0 h-[34%] rounded-2xl border-t border-white/20 bg-gradient-to-b from-folder to-folder-deep p-5 text-white shadow-[0_-12px_24px_-16px_rgba(17,24,32,0.6)]"
          style={{ transform: 'translateZ(45px)' }}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[0.68rem] text-white/70">CASE FILE · ENGINEERING</p>
            {profile.availability && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 font-mono text-[0.6rem] font-semibold">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />
                {profile.availability}
              </span>
            )}
          </div>
          <p className="mt-1.5 font-display text-xl font-semibold leading-tight sm:text-2xl">{profile.name}</p>
          <p className="text-sm text-white/80">{profile.title}</p>
        </div>
      </motion.div>

      {/* Floating tech chips */}
      {orbit.map(({ name, className, delay }) => {
        const logo = getSkillLogo(name)
        return (
          <motion.span
            key={name}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 0.9 + delay * 0.25 },
              scale: { type: 'spring', stiffness: 260, damping: 16, delay: 0.9 + delay * 0.25 },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay },
            }}
            className={`absolute z-20 hidden items-center gap-1.5 rounded-full border border-line bg-sheet/95 py-1 pl-1 pr-2.5 font-mono text-[0.65rem] font-semibold text-ink shadow-[var(--shadow-sheet)] backdrop-blur sm:inline-flex ${className}`}
          >
            <span className="grid size-6 place-items-center rounded-full bg-paper">
              {logo && <img loading="lazy" decoding="async" src={logo} alt="" className="size-3.5 object-contain" />}
            </span>
            {name}
          </motion.span>
        )
      })}
    </div>
  )
}
