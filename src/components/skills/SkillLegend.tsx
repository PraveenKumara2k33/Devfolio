import { domains, type DomainId } from './skillDomains'

interface SkillLegendProps {
  counts: Partial<Record<DomainId, number>>
  active: DomainId | null
  onChange: (domain: DomainId | null) => void
}

/** Colour key for the List and Solar views; picking a domain highlights its skills. */
export function SkillLegend({ counts, active, onChange }: SkillLegendProps) {
  const ids = (Object.keys(domains) as DomainId[]).filter((id) => counts[id])

  return (
    <div role="group" aria-label="Highlight a domain" className="flex flex-wrap justify-center gap-2">
      {ids.map((id) => {
        const { short, palette } = domains[id]
        const on = active === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? null : id)}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={
              on
                ? { background: palette.accent, borderColor: palette.accent, color: '#fff' }
                : { background: palette.tint, borderColor: 'transparent', color: palette.deep }
            }
          >
            <span className="size-2 rounded-full" style={{ background: on ? '#fff' : palette.accent }} />
            {short}
            <span className="font-mono text-[0.68rem] opacity-70">{counts[id]}</span>
          </button>
        )
      })}
    </div>
  )
}
