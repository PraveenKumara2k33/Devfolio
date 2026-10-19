import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { domains, type DomainId, type SkillItem } from './skillDomains'

interface SolarSystemProps {
  skills: SkillItem[]
  highlight: DomainId | null
}

// The stage is drawn at a fixed size and scaled to fit, so rings never clip on phones.
const STAGE = 720

/**
 * Concentric rotating orbits of skill "planets" around a glowing sun, each
 * ringed in its domain colour. A highlighted domain's planets grow and glow.
 */
export function SolarSystem({ skills, highlight }: SolarSystemProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const box = boxRef.current
    if (!box) return
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1.35, entry.contentRect.width / STAGE)))
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  const orbits = useMemo(() => {
    const sizes = [6, 9]
    const plan = [
      { duration: 30, reverse: false },
      { duration: 42, reverse: true },
      { duration: 56, reverse: false },
    ]
    let start = 0
    return plan
      .map((p, i) => {
        const items = i < sizes.length ? skills.slice(start, start + sizes[i]) : skills.slice(start)
        start += i < sizes.length ? sizes[i] : 0
        return { ...p, items, radius: 120 + i * 105 }
      })
      .filter((o) => o.items.length > 0)
  }, [skills])

  const active = highlight ? domains[highlight] : null

  return (
    <div ref={boxRef} className="relative mx-auto w-full max-w-180" style={{ height: STAGE * scale }}>
      <div
        className="solar-system-container absolute left-1/2 top-0 flex items-center justify-center"
        style={{ width: STAGE, height: STAGE, marginLeft: -STAGE / 2, transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-[12%] rounded-full bg-soft/70 blur-3xl" />

        {/* Sun: glow halo, rotating corona rays and a hot core */}
        <div aria-hidden="true" className="solar-halo absolute z-10 size-72 rounded-full" />
        <div className="solar-sun absolute z-20 grid size-30 place-items-center rounded-full">
          <div className="relative text-center leading-tight text-[#4a1d00]">
            <span className="block font-display text-3xl font-bold">
              {highlight ? skills.filter((s) => s.domain === highlight).length : skills.length}
            </span>
            <span className="block font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-[#4a1d00]/75">
              {active ? active.short : 'technologies'}
            </span>
          </div>
        </div>

        {orbits.map((orbit, oi) => {
          const spin: CSSProperties = {
            animationDuration: `${orbit.duration}s`,
            animationDirection: orbit.reverse ? 'reverse' : 'normal',
          }
          return (
            <div
              key={oi}
              className="orbit-ring absolute rounded-full border border-dashed border-ink/15"
              style={{ width: orbit.radius * 2, height: orbit.radius * 2, ...spin }}
            >
              {orbit.items.map((skill, i) => {
                const angle = (360 / orbit.items.length) * i
                const { palette } = domains[skill.domain]
                const hot = highlight === skill.domain
                return (
                  <div
                    key={skill.name}
                    className="planet absolute left-1/2 top-1/2 -ml-7 -mt-7 size-14"
                    style={{ transform: `rotate(${angle}deg) translate(${orbit.radius}px) rotate(-${angle}deg)` }}
                  >
                    {/* Counter-spins with the ring so the logo and its label stay upright */}
                    <div className="planet-body group relative size-full" style={spin}>
                      <div
                        className={`grid size-full cursor-default place-items-center rounded-full bg-sheet shadow-md transition-transform duration-300 group-hover:scale-125 ${
                          hot ? 'scale-[1.22]' : ''
                        }`}
                        style={{
                          boxShadow: hot
                            ? `0 0 0 3px ${palette.tint}, 0 0 0 5px ${palette.accent}, 0 0 26px 6px ${palette.accent}66`
                            : `0 0 0 3px ${palette.tint}, 0 0 0 4.5px ${palette.accent}, 0 8px 18px -8px rgb(17 24 32 / 0.4)`,
                        }}
                      >
                        <img decoding="async" src={skill.logo} alt={skill.name} className="size-7 object-contain" loading="lazy" />
                      </div>
                      <span
                        className="pointer-events-none absolute left-1/2 top-full z-30 mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[0.68rem] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                        style={{ background: palette.deep }}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
