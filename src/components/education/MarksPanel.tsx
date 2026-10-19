import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Education } from '../../types/portfolio'
import type { FolderPalette } from '../projects/projectMeta'

interface MarksPanelProps {
  breakdown: NonNullable<Education['breakdown']>
  palette: FolderPalette
  run: boolean
  id: string
}

/**
 * Subject marks as meters out of 100. Several mark sheets (e.g. +2 and +1)
 * share the panel; switching re-flows the bars to the new values.
 */
export function MarksPanel({ breakdown, palette, run, id }: MarksPanelProps) {
  const reduce = useReducedMotion()
  const [sheet, setSheet] = useState(0)
  const rows = breakdown[sheet].rows
  const top = Math.max(...rows.map((r) => Number(r.value)))

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-muted">Subject marks</p>
        {breakdown.length > 1 && (
          <div role="group" aria-label="Mark sheet" className="inline-flex rounded-full p-0.5" style={{ background: palette.tint }}>
            {breakdown.map((b, i) => (
              <button
                key={b.title}
                type="button"
                aria-pressed={sheet === i}
                onClick={() => setSheet(i)}
                className="relative rounded-full px-3 py-1 font-mono text-[0.68rem] font-semibold transition-colors"
                style={{ color: sheet === i ? '#fff' : palette.deep }}
              >
                {sheet === i && (
                  <motion.span
                    layoutId={`marks-pill-${id}`}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: palette.accent }}
                  />
                )}
                <span className="relative">{b.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <ul className="space-y-2.5" aria-label={breakdown[sheet].title}>
        {rows.map((r, i) => {
          const v = Number(r.value)
          const isTop = v === top
          return (
            <li key={r.label} className="grid grid-cols-[minmax(0,8.5rem)_1fr_2rem] items-center gap-3 text-sm">
              <span className={`leading-tight ${isTop ? 'font-semibold text-ink' : 'text-ink/75'}`}>{r.label}</span>
              <span className="relative h-2 overflow-hidden rounded-full" style={{ background: palette.tint }}>
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: isTop ? palette.deep : palette.accent }}
                  initial={{ width: reduce ? `${v}%` : '0%' }}
                  animate={run ? { width: `${v}%` } : undefined}
                  transition={{ type: 'spring', stiffness: 110, damping: 20, delay: 0.1 + i * 0.06 }}
                />
              </span>
              <span className="text-right font-mono text-xs font-semibold" style={{ color: isTop ? palette.deep : undefined }}>
                {r.value}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
