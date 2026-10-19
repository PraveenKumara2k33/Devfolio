import { motion } from 'motion/react'
import type { ProjectFilter } from '../../types/portfolio'
import { springSnappy } from './projectMeta'

export type FilterValue = 'All' | ProjectFilter

interface ProjectFiltersProps {
  options: FilterValue[]
  value: FilterValue
  counts: Record<FilterValue, number>
  onChange: (value: FilterValue) => void
}

export function ProjectFilters({ options, value, counts, onChange }: ProjectFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects"
      className="inline-flex flex-wrap gap-1 rounded-2xl border border-line bg-sheet p-1 shadow-[var(--shadow-sheet)]"
    >
      {options.map((opt) => {
        const selected = opt === value
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(opt)}
            className={`relative inline-flex min-h-9 items-center gap-2 rounded-xl px-3.5 text-sm font-medium transition-colors duration-200 ${
              selected ? 'text-white' : 'text-ink/70 hover:text-ink'
            }`}
          >
            {selected && (
              <motion.span
                layoutId="project-filter-pill"
                transition={springSnappy}
                aria-hidden="true"
                className="absolute inset-0 rounded-xl bg-ink"
              />
            )}
            <span className="relative">{opt}</span>
            <span className={`relative font-mono text-[0.7rem] ${selected ? 'text-white/60' : 'text-muted'}`}>
              {counts[opt]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
