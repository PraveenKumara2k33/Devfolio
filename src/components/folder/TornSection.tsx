import type { ReactNode } from 'react'
import { PaperTear } from './PaperTear'

export type SectionTone = 'paper' | 'sheet' | 'night'

const tones: Record<SectionTone, { className: string; fill: string }> = {
  paper: { className: 'bg-paper paper-grain', fill: '#F7F4ED' },
  sheet: { className: 'bg-sheet', fill: '#FFFEFA' },
  night: { className: 'bg-night text-white', fill: '#111820' },
}

interface TornSectionProps {
  id: string
  tone: SectionTone
  seed: number
  texture?: 'grid' | 'none'
  children: ReactNode
}

/** A page "sheet" in the folder: torn top edge + consistent spacing. */
export function TornSection({ id, tone, seed, texture = 'none', children }: TornSectionProps) {
  const t = tones[tone]
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative ${t.className}`}>
      <PaperTear fill={t.fill} seed={seed} />
      {texture === 'grid' && (
        <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
      )}
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">{children}</div>
    </section>
  )
}
