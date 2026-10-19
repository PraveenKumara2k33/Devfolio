import type { CSSProperties } from 'react'
import { domains, type DomainId, type SkillItem } from './skillDomains'

interface SkillMarqueeProps {
  skills: SkillItem[]
  highlight: DomainId | null
}

/**
 * The signature skewed, endlessly scrolling skill wall. Each pill carries its
 * domain colour; a highlighted domain's pills light up in that colour.
 */
export function SkillMarquee({ skills, highlight }: SkillMarqueeProps) {
  // Two copies make the -50% loop seamless.
  const loop = [...skills, ...skills]

  return (
    <div className="skills-container w-full">
      <div className="skills-skew-wrapper mx-auto max-w-6xl">
        <div className="skills-scroll">
          <ul className="skills-grid animate-scroll-vertical" aria-label="Technologies">
            {loop.map((skill, i) => {
              const { palette } = domains[skill.domain]
              const hot = highlight === skill.domain
              return (
                <li
                  key={`${skill.name}-${i}`}
                  aria-hidden={i >= skills.length || undefined}
                  className={`skill-pill group ${hot ? 'is-hot' : ''}`}
                  style={{ '--pill-accent': palette.accent, '--pill-tint': palette.tint } as CSSProperties}
                >
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6"
                    style={{ background: palette.tint }}
                  >
                    <img decoding="async" src={skill.logo} alt="" className="skill-logo-img" loading="lazy" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[0.95rem] font-semibold text-ink">{skill.name}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.68rem]" style={{ color: palette.deep }}>
                      <span className="size-1.5 rounded-full" style={{ background: palette.accent }} />
                      {skill.label}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
