import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { FolderPalette } from '../projects/projectMeta'

interface GpaChartProps {
  data: { label: string; value: number }[]
  average: number
  palette: FolderPalette
  run: boolean
}

const MAX = 10
const grid = [6, 8, 10]
const pct = (v: number) => (v / MAX) * 100

/**
 * Semester GPA on a true 0–10 scale with the overall CGPA as a reference line.
 * Bars grow in sequence; hovering one lifts its value label.
 */
export function GpaChart({ data, average, palette, run }: GpaChartProps) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<number | null>(null)
  const best = Math.max(...data.map((d) => d.value))

  return (
    <figure>
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-muted">Semester-wise GPA</span>
        <span className="flex items-center gap-3 font-mono text-[0.65rem] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-sm" style={{ background: palette.accent }} />
            above CGPA
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0 w-4 border-t-2 border-dashed" style={{ borderColor: palette.deep }} />
            CGPA {average}
          </span>
        </span>
      </figcaption>

      <div className="relative mb-6 mt-8 h-56 pl-7 sm:h-64">
        {/* Grid */}
        {grid.map((g) => (
          <div key={g} aria-hidden="true" className="absolute inset-x-0 left-7 border-t border-line/70" style={{ bottom: `${(g / MAX) * 100}%` }}>
            <span className="absolute -left-7 -top-2 font-mono text-[0.6rem] text-muted">{g}</span>
          </div>
        ))}

        {/* CGPA reference */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 left-7 z-10 origin-left border-t-2 border-dashed"
          style={{ bottom: `${(average / MAX) * 100}%`, borderColor: palette.deep }}
          initial={{ scaleX: reduce ? 1 : 0 }}
          animate={run ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        <ol className="relative flex h-full items-end gap-1.5 sm:gap-3">
          {data.map((d, i) => {
            const above = d.value >= average
            const on = hover === i
            return (
              <li
                key={d.label}
                className="relative h-full flex-1 cursor-default"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {/* Height is fixed in style; only the grow (scaleY) animates, so the bar always renders. */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 rounded-t-lg"
                  style={{ height: `${pct(d.value)}%`, background: above ? palette.accent : palette.tint, transformOrigin: 'bottom' }}
                  initial={{ scaleY: reduce ? 1 : 0 }}
                  animate={{ scaleY: run || reduce ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 + i * 0.07 }}
                />
                <motion.span
                  className="absolute left-1/2 z-20 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-sheet/90 px-1 font-mono text-[0.68rem] font-semibold"
                  style={{ bottom: `${pct(d.value)}%`, color: above ? palette.deep : 'var(--color-muted)' }}
                  initial={{ opacity: reduce ? 1 : 0 }}
                  animate={{ opacity: run || reduce ? 1 : 0, y: on ? -4 : 0, scale: on ? 1.12 : 1 }}
                  transition={{ duration: 0.3, delay: on ? 0 : 0.5 + i * 0.07 }}
                >
                  {d.value.toFixed(1)}
                  {d.value === best && <span aria-label="best semester"> ★</span>}
                </motion.span>
                <span className="absolute inset-x-0 top-full mt-1.5 text-center font-mono text-[0.65rem] text-muted">
                  <span className="sr-only">Semester </span>
                  {d.label}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </figure>
  )
}
