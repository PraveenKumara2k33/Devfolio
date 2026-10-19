import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ProductModule } from '../../types/portfolio'

/**
 * A genuine ARIA tablist styled as small file tabs. Used to browse the
 * Revenue Maxima product modules inside the Experience section.
 */
export function ModuleTabs({ modules }: { modules: ProductModule[] }) {
  const [activeId, setActiveId] = useState(modules[0]?.id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const baseId = useId()
  const reduce = useReducedMotion()
  const active = modules.find((m) => m.id === activeId) ?? modules[0]

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const idx = modules.findIndex((m) => m.id === activeId)
    const targets: Record<string, number> = {
      ArrowRight: (idx + 1) % modules.length,
      ArrowLeft: (idx - 1 + modules.length) % modules.length,
      Home: 0,
      End: modules.length - 1,
    }
    const next = targets[e.key]
    if (next === undefined) return
    e.preventDefault()
    const id = modules[next].id
    setActiveId(id)
    tabRefs.current[id]?.focus()
  }

  if (!active) return null

  return (
    <div>
      <div
        role="tablist"
        aria-label="Revenue Maxima products"
        onKeyDown={onKeyDown}
        className="scrollbar-none -mb-px flex gap-1 overflow-x-auto"
      >
        {modules.map((m) => {
          const selected = m.id === active.id
          return (
            <button
              key={m.id}
              ref={(el) => {
                tabRefs.current[m.id] = el
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${m.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(m.id)}
              className={`folder-tab-shape relative shrink-0 px-3.5 pb-2 pt-2.5 text-[0.8rem] font-medium transition-colors duration-200 ${
                selected ? 'z-10 text-folder-deep' : 'bg-ink/[0.05] text-muted hover:bg-ink/[0.08] hover:text-ink'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-module-tab`}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  aria-hidden="true"
                  className="absolute inset-0 border-x border-t border-line bg-sheet"
                >
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-folder" />
                </motion.span>
              )}
              <span className="relative">{m.name}</span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="min-h-[13rem] rounded-b-xl rounded-tr-xl border border-line bg-sheet p-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: reduce ? 0 : 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="font-display text-base font-semibold">{active.name}</h4>
            <ul className="mt-3 grid gap-2 text-sm text-ink/80 sm:grid-cols-2">
              {active.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                  className="flex gap-2"
                >
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-folder" />
                  {p}
                </motion.li>
              ))}
            </ul>
            {active.stack && (
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                {active.stack.map((s) => (
                  <li key={s} className="tag-soft">
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
