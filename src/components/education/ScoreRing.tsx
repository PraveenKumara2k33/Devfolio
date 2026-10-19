import { useEffect, useState } from 'react'
import { animate, motion, useReducedMotion } from 'motion/react'
import type { FolderPalette } from '../projects/projectMeta'

interface ScoreRingProps {
  value: number
  max: number
  suffix?: string
  label: string
  palette: FolderPalette
  run: boolean
  size?: number
}

/** Circular score dial: the arc draws in and the number counts up once `run` turns true. */
export function ScoreRing({ value, max, suffix = '', label, palette, run, size = 120 }: ScoreRingProps) {
  const reduce = useReducedMotion()
  const decimals = String(value).split('.')[1]?.length ?? 0
  const [shown, setShown] = useState(0)
  const stroke = size * 0.09
  const r = (size - stroke) / 2

  useEffect(() => {
    if (!run || reduce) return
    const c = animate(0, value, { duration: 1.3, ease: [0.22, 1, 0.36, 1], onUpdate: setShown })
    return () => c.stop()
  }, [run, reduce, value])

  const display = (reduce ? value : shown).toFixed(decimals)

  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={palette.tint} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={palette.accent}
          strokeWidth={stroke}
          strokeLinecap="round"
          initial={{ pathLength: reduce ? value / max : 0 }}
          animate={run ? { pathLength: value / max } : undefined}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute text-center leading-none">
        <span className="font-display font-bold tabular-nums" style={{ color: palette.deep, fontSize: size * 0.24 }}>
          {display}
          {suffix && <span style={{ fontSize: size * 0.13 }}>{suffix}</span>}
        </span>
        <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-wider text-muted">{label}</span>
      </div>
      <span className="sr-only">
        {label}: {value}
        {suffix} out of {max}
      </span>
    </div>
  )
}
