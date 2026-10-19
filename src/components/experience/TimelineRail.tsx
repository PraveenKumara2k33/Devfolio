import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import type { ShelfRailContext } from '../shelf/HorizontalShelf'

interface TimelineRailProps extends ShelfRailContext {
  labels: string[]
  colors: string[]
}

/**
 * The hanging-file rail, doubling as the career timeline. Its blue fill
 * follows the viewport centre, and each chapter's stop lights up once passed.
 */
export function TimelineRail({ shift, vw, centers, labels, colors }: TimelineRailProps) {
  const first = centers[0] ?? 0
  const last = centers[centers.length - 1] ?? 0

  const vwMV = useMotionValue(vw)
  const firstMV = useMotionValue(first)
  const lastMV = useMotionValue(last)
  useEffect(() => {
    vwMV.set(vw)
    firstMV.set(first)
    lastMV.set(last)
  }, [vw, first, last, vwMV, firstMV, lastMV])

  // Where the viewport centre sits along the track.
  const cursor = useTransform([shift, vwMV], ([s, w]: number[]) => w / 2 - s)
  const fill = useTransform([cursor, firstMV, lastMV], ([c, f, l]: number[]) =>
    l > f ? Math.max(0, Math.min(1, (c - f) / (l - f))) : 0,
  )

  if (centers.length === 0) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[4.35rem] z-0">
      {/* Rod */}
      <div className="h-1.5 rounded-full bg-gradient-to-b from-[#c9ccd1] to-[#9aa0a8] shadow-[0_2px_3px_rgb(17_24_32/0.2)]" />

      {/* Progress along the chapters */}
      <motion.div
        className="absolute top-0 h-1.5 origin-left rounded-full bg-folder"
        style={{ left: first, width: last - first, scaleX: fill }}
      />

      {centers.map((c, i) => (
        <RailStop key={labels[i] + i} x={c} cursor={cursor} label={labels[i]} color={colors[i]} />
      ))}
    </div>
  )
}

function RailStop({ x, cursor, label, color }: { x: number; cursor: MotionValue<number>; label: string; color: string }) {
  const xMV = useMotionValue(x)
  useEffect(() => xMV.set(x), [x, xMV])
  const lit = useTransform([cursor, xMV], ([c, p]: number[]): number => (c >= p - 4 ? 1 : 0))
  const dotScale = useTransform(lit, [0, 1], [1, 1.25])
  const labelOpacity = useTransform(lit, [0, 1], [0.45, 1])

  return (
    <div className="absolute top-0 -translate-x-1/2" style={{ left: x }}>
      <motion.span
        style={{ scale: dotScale, background: color }}
        className="absolute left-1/2 top-[3px] block size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sheet shadow-sm"
      />
      <motion.span
        style={{ opacity: labelOpacity }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.68rem] font-semibold tracking-wider text-ink"
      >
        {label}
      </motion.span>
    </div>
  )
}
