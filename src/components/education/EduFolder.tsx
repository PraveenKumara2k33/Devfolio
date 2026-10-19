import { motion, useReducedMotion } from 'motion/react'
import type { KeyboardEvent } from 'react'
import type { FolderPalette } from '../projects/projectMeta'

interface EduFolderProps {
  id: string
  index: number
  short: string
  year: string
  score?: string
  docs: number
  palette: FolderPalette
  active: boolean
  /** Staircase height: later qualifications stand taller. */
  heightClass: string
  onSelect: () => void
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void
}

/**
 * One qualification as a physical folder. The open folder lifts, its papers
 * rise out of the pocket and the front flap tips forward.
 */
export function EduFolder({ id, index, short, year, score, docs, palette, active, heightClass, onSelect, onKeyDown }: EduFolderProps) {
  const reduce = useReducedMotion()
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.button
      id={`edu-tab-${id}`}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls="edu-panel"
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      initial="rest"
      animate={active ? 'open' : 'rest'}
      whileHover={active || reduce ? undefined : 'peek'}
      variants={{ rest: { y: 0 }, peek: { y: -4 }, open: { y: reduce ? 0 : -10 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={`group relative w-full text-left ${heightClass}`}
      style={{ perspective: '900px' }}
    >
      {/* Back panel + tab */}
      <span
        className="absolute inset-x-0 bottom-0 top-[18%] rounded-2xl"
        style={{ background: `linear-gradient(180deg, ${palette.deep}, ${palette.accent} 150%)` }}
      >
        <span
          className="absolute -top-6 left-4 flex h-7 items-center gap-1.5 rounded-t-xl px-3 font-mono text-[0.65rem] font-semibold text-white/90"
          style={{ background: palette.deep }}
        >
          <span className="text-white/55">{num}</span>
          <span className="hidden sm:inline">{year}</span>
        </span>
      </span>

      {/* Papers inside */}
      {[0, 1].map((p) => (
        <motion.span
          key={p}
          aria-hidden="true"
          variants={{
            rest: { y: 0, rotate: p ? 2 : -2 },
            peek: { y: -10 - p * 4, rotate: p ? 3 : -3 },
            open: { y: reduce ? -8 : -26 - p * 8, rotate: p ? 5 : -5 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="ruled absolute inset-x-[10%] bottom-[12%] top-[24%] rounded-lg border border-line bg-sheet shadow-sm"
          style={{ zIndex: 1 + p }}
        />
      ))}

      {/* Front flap */}
      <motion.span
        variants={{ rest: { rotateX: 0 }, peek: { rotateX: -8 }, open: { rotateX: reduce ? 0 : -20 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="absolute inset-x-0 bottom-0 z-10 flex h-[62%] flex-col justify-between overflow-hidden rounded-2xl p-3 text-white sm:p-4"
        style={{
          transformOrigin: 'bottom center',
          background: `linear-gradient(150deg, ${palette.accent} 0%, ${palette.accent} 50%, ${palette.deep} 100%)`,
          boxShadow: active
            ? `0 18px 36px -16px ${palette.deep}, inset 0 1px 0 rgb(255 255 255 / 0.3)`
            : 'inset 0 1px 0 rgb(255 255 255 / 0.3), 0 10px 22px -16px rgb(17 24 32 / 0.5)',
        }}
      >
        <span aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" />
        <span aria-hidden="true" className="absolute left-1/2 top-0 h-2 w-12 -translate-x-1/2 rounded-b-full bg-black/15" />

        <span className="relative flex items-center justify-between gap-2 font-mono text-[0.6rem] uppercase tracking-wider text-white/75">
          <span className="sm:hidden">{year}</span>
          <span className="hidden sm:inline">{docs} documents</span>
          {score && <span className="hidden rounded-full bg-white/15 px-2 py-0.5 normal-case tracking-normal text-white sm:inline">{score}</span>}
        </span>
        <span className="relative font-display text-xl font-bold leading-none sm:text-3xl">{short}</span>
      </motion.span>

      {/* Open indicator */}
      {active && (
        <motion.span
          layoutId="edu-open-pointer"
          aria-hidden="true"
          className="absolute -bottom-5 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-sm"
          style={{ background: palette.accent }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
