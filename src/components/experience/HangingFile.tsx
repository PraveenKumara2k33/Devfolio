import { motion, useReducedMotion, useSpring, useTransform, useVelocity, type MotionValue } from 'motion/react'
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react'
import type { Role } from '../../types/portfolio'
import { skillLogos } from '../../lib/skillLogos'
import { CompanyMark } from './CompanyMark'
import { getRolePalette } from './rolePalette'

interface HangingFileProps {
  role: Role
  index: number
  year: string
  tags: string[]
  focus: MotionValue<number>
  offset: MotionValue<number>
  shift: MotionValue<number>
  onOpen: () => void
  onSelect: () => void
}

/**
 * A career chapter as a manila hanging file on the timeline rail. It swings as
 * the rail moves; at the centre it lifts, the front panel tips open and the
 * sheet inside rises to show what was shipped.
 */
export function HangingFile({ role, index, year, tags, focus, offset, shift, onOpen, onSelect }: HangingFileProps) {
  const reduce = useReducedMotion()
  const c = getRolePalette(role.id)

  // Pendulum: rail speed pushes the file, an under-damped spring lets it settle back.
  const velocity = useVelocity(shift)
  const push = useTransform(velocity, (v) => (reduce ? 0 : Math.max(-7, Math.min(7, v / 140))))
  const swing = useSpring(push, { stiffness: 90, damping: 7, mass: 0.8 })
  const lean = useTransform(offset, (o) => o * 2.5)
  const rotate = useTransform([swing, lean], ([s, l]: number[]) => s + l)

  // The centred file is pulled up off the rail; scale pivots at the hooks so the rest stay hung.
  const hang = useTransform(focus, [0, 1], [0, -18])
  const scale = useTransform(focus, [0, 1], [0.9, 1])
  const opacity = useTransform(focus, [0, 0.6, 1], [0.5, 0.88, 1])
  const sheetRise = useTransform(focus, [0, 1], ['0%', '-7%'])
  const flapTilt = useTransform(focus, [0, 1], [0, -16])
  const flapDrop = useTransform(focus, [0, 1], [0, 6])

  // Tabs alternate sides like a real drawer, keeping clear of the rail label above the centre.
  const tabLeft = index % 2 === 0 ? '7%' : '68%'

  return (
    <motion.article
      aria-labelledby={`hanging-${role.id}`}
      onFocusCapture={(e) => e.target.matches(':focus-visible') && onSelect()}
      onClick={onSelect}
      style={{ rotate, y: hang, scale, opacity, transformOrigin: '50% -1.5rem' }}
      className="relative mt-10 h-[34rem] w-[min(23rem,82vw)] lg:h-[min(32rem,64svh)]"
    >
      {/* Hooks onto the rail */}
      {['left-7', 'right-7'].map((side) => (
        <span
          key={side}
          aria-hidden="true"
          className={`absolute -top-[1.6rem] ${side} h-7 w-3.5 rounded-t-full border-[2.5px] border-b-0 border-ink/45`}
        />
      ))}

      {/* Index tab */}
      <div
        className="absolute -top-8 z-0 flex h-9 items-center gap-1.5 rounded-t-xl px-3.5 font-mono text-[0.7rem] font-bold text-white"
        style={{ left: tabLeft, background: c.deep }}
      >
        {role.current && <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />}
        {year}
      </div>

      {/* Back panel */}
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_24px_40px_-24px_rgb(17_24_32/0.6)]"
        style={{ background: `linear-gradient(180deg, ${c.deep}, ${c.accent} 140%)` }}
      >
        <div aria-hidden="true" className="paper-grain absolute inset-0 opacity-50 mix-blend-overlay" />
      </div>

      {/* Sheet inside */}
      <motion.div
        style={{ y: sheetRise }}
        className="ruled absolute inset-x-3.5 bottom-4 top-[6%] overflow-hidden rounded-xl border border-line bg-sheet p-4 shadow-[0_10px_20px_-14px_rgb(17_24_32/0.4)]"
      >
        <p className="font-mono text-[0.62rem] uppercase tracking-wider" style={{ color: c.accent }}>
          // summary
        </p>
        <p className="mt-1 line-clamp-3 text-[0.8rem] leading-relaxed text-ink/80">{role.summary}</p>
        <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-wider" style={{ color: c.accent }}>
          // shipped
        </p>
        <ol className="mt-1.5 space-y-1.5">
          {role.highlights.slice(0, 3).map((h, i) => (
            <li key={h} className="flex gap-2 text-[0.75rem] leading-snug text-ink/75">
              <span
                className="mt-px grid size-4 shrink-0 place-items-center rounded font-mono text-[0.58rem] font-bold"
                style={{ background: c.tint, color: c.deep }}
              >
                {i + 1}
              </span>
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Front panel */}
      <motion.div
        style={{
          rotateX: flapTilt,
          y: flapDrop,
          transformOrigin: 'bottom center',
          transformPerspective: 1100,
          background: `linear-gradient(150deg, ${c.accent} 0%, ${c.accent} 45%, ${c.deep} 100%)`,
        }}
        className="absolute inset-x-0 bottom-0 flex h-[60%] flex-col justify-between gap-3 overflow-hidden rounded-2xl p-4 text-white sm:p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_-10px_24px_-16px_rgb(0_0_0/0.45)]"
      >
        <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" />
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-2.5 w-16 -translate-x-1/2 rounded-b-full bg-black/15" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 -right-1 select-none font-display text-[6.5rem] font-bold leading-none text-white/[0.09]"
        >
          {year}
        </span>

        <div className="relative flex items-start gap-3">
          <CompanyMark role={role} size="sm" />
          <div className="min-w-0">
            <h3 id={`hanging-${role.id}`} className="text-base font-semibold leading-tight text-white sm:text-lg">
              {role.company}
            </h3>
            <p className="mt-0.5 text-[0.8rem] font-medium leading-snug text-white/80 sm:text-sm">
              {role.title}
            </p>
          </div>
        </div>

        {tags.length > 0 && (
          <ul className="relative flex flex-wrap gap-1.5" aria-label="Focus areas">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[0.7rem] font-medium text-white"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        <div className="relative space-y-2.5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] text-white/75">
            <span className="inline-flex items-center gap-1">
              <Calendar size={11} aria-hidden="true" />
              {role.current ? 'Present' : role.period}
            </span>
            {role.mode && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} aria-hidden="true" />
                {role.mode}
              </span>
            )}
          </p>

          <div className="flex items-end justify-between gap-3">
            <ul className="flex min-w-0 flex-wrap gap-1" aria-label="Stack">
              {role.stack.slice(0, 3).map((s) => (
                <li key={s} className="inline-flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 font-mono text-[0.6rem] text-ink/80">
                  {skillLogos[s] && <img decoding="async" src={skillLogos[s]} alt="" className="size-2.5 object-contain" loading="lazy" />}
                  {s}
                </li>
              ))}
              {role.stack.length > 3 && (
                <li className="rounded-md px-1 py-0.5 font-mono text-[0.6rem] text-white/65">+{role.stack.length - 3}</li>
              )}
            </ul>
            <button
              type="button"
              onClick={onOpen}
              className="group/open inline-flex shrink-0 items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold shadow-[0_10px_20px_-10px_rgb(0_0_0/0.5)] transition-transform duration-200 hover:-translate-y-0.5"
              style={{ color: c.deep }}
            >
              Open file
              <ArrowUpRight size={13} aria-hidden="true" className="transition-transform group-hover/open:-translate-y-px group-hover/open:translate-x-px" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
