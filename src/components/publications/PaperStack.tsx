import { useRef, type PointerEvent } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import type { Publication } from '../../types/portfolio'
import type { FolderPalette } from '../projects/projectMeta'

interface PaperStackProps {
  pub: Publication
  palette: FolderPalette
}

/**
 * The paper as a physical stack of pages: a title page on top, more pages
 * fanning out behind it on hover, tilting toward the pointer.
 */
export function PaperStack({ pub, palette }: PaperStackProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="mx-auto w-full max-w-sm" style={{ perspective: '1200px' }}>
      <motion.div
        initial={{ opacity: 0, x: reduce ? 0 : -60, rotate: reduce ? 0 : -8 }}
        animate={inView ? { opacity: 1, x: 0, rotate: 0 } : undefined}
        whileHover="fan"
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-[3/4]"
      >
        {/* Pages behind */}
        {[3, 2, 1].map((n) => (
          <motion.div
            key={n}
            aria-hidden="true"
            variants={{ fan: { rotate: n * 3.5, x: n * 10, y: -n * 3 } }}
            initial={{ rotate: n * 1.2, x: n * 4, y: n * 2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="ruled absolute inset-0 rounded-md border border-line bg-sheet shadow-md"
            style={{ transformOrigin: 'bottom left' }}
          />
        ))}

        {/* Title page */}
        <motion.div
          variants={{ fan: { rotate: -2, y: -6 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="absolute inset-0 flex flex-col overflow-hidden rounded-md border border-line bg-sheet shadow-[0_30px_60px_-30px_rgb(17_24_32/0.6)]"
          style={{ transformOrigin: 'bottom left' }}
        >
          <div className="flex items-center justify-between px-5 py-2.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-white" style={{ background: palette.accent }}>
            <span>IEEE · {pub.venue.replace(/^IEEE\s*/, '')}</span>
            <span>{pub.year}</span>
          </div>

          <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
            <p className="font-display text-base font-semibold leading-snug text-ink">{pub.title}</p>
            <div aria-hidden="true" className="mx-auto mt-3 h-px w-16" style={{ background: palette.accent }} />

            <p className="mt-3 font-mono text-[0.55rem] font-bold uppercase tracking-wider" style={{ color: palette.deep }}>
              Abstract
            </p>
            <p className="mt-1 line-clamp-4 text-[0.62rem] leading-relaxed text-ink/70">{pub.summary}</p>

            {pub.image && (
              <div className="mt-3 overflow-hidden rounded border border-line bg-paper p-1">
                <img decoding="async" src={pub.image} alt="" className="aspect-[16/9] w-full object-contain" loading="lazy" />
                <p className="mt-0.5 text-center font-mono text-[0.5rem] text-muted">Fig. 1 — system overview</p>
              </div>
            )}

            {/* Body text lines */}
            <div aria-hidden="true" className="mt-3 grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-1.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="h-1 rounded-full bg-ink/10" style={{ width: `${70 + ((i * 37) % 30)}%` }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stamp */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: reduce ? 1 : 2.2, rotate: -24 }}
          animate={inView ? { opacity: 0.9, scale: 1, rotate: -12 } : undefined}
          transition={{ type: 'spring', stiffness: 260, damping: 13, delay: 0.7 }}
          className="absolute -right-4 bottom-10 z-10 rounded-lg border-[3px] bg-sheet/70 px-3 py-1 font-mono text-sm font-bold uppercase tracking-[0.25em] backdrop-blur-sm"
          style={{ borderColor: palette.accent, color: palette.accent, translateZ: 40 }}
        >
          Published
        </motion.span>

        {/* Paper clip */}
        <svg aria-hidden="true" viewBox="0 0 24 48" className="absolute -top-5 left-1/2 z-10 h-14 w-6 text-ink/45" style={{ transform: 'translateZ(30px)' }}>
          <path d="M8 40V10a5 5 0 0 1 10 0v26a8 8 0 0 1-16 0V14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  )
}
