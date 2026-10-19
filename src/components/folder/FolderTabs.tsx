import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { NavTab, SectionId } from '../../types/portfolio'

interface FolderTabsProps {
  tabs: NavTab[]
  active: string | null
  onNavigate?: (id: SectionId) => void
  /** Unique key so multiple tab strips don't share one animated indicator. */
  layoutKey?: string
  className?: string
  isMobile?: boolean
}

/**
 * Primary navigation styled as refined folder tabs inside a clean segmented dock.
 * Active tab has an elevated paper layer and amber folder indicator strip.
 */
export function FolderTabs({
  tabs,
  active,
  onNavigate,
  layoutKey = 'main',
  className = '',
  isMobile = false,
}: FolderTabsProps) {
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLUListElement>(null)

  // Keep the active tab visible on narrow, horizontally scrolling strips.
  useEffect(() => {
    if (!active || !listRef.current) return
    const el = listRef.current.querySelector<HTMLElement>(`[data-tab="${active}"]`)
    const list = listRef.current
    if (el && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: el.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [active, reduce])

  return (
    <nav aria-label="Portfolio sections" className={`relative ${className}`}>
      <ul
        ref={listRef}
        className={`scrollbar-none flex items-center gap-1 overflow-x-auto ${
          isMobile
            ? 'flex-col items-stretch p-2 gap-1.5'
            : 'rounded-2xl border border-line/70 bg-sheet/85 p-1.5 shadow-2xs backdrop-blur-md'
        }`}
      >
        {tabs.map((tab, i) => {
          const isActive = active === tab.id
          return (
            <li key={tab.id} className={isMobile ? 'w-full' : 'shrink-0'}>
              <a
                href={`#${tab.id}`}
                data-tab={tab.id}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => onNavigate?.(tab.id)}
                className={`group relative flex items-center gap-2 text-xs font-medium transition-all duration-200 ${
                  isMobile
                    ? 'w-full justify-between rounded-xl px-4 py-3 text-sm'
                    : 'rounded-xl px-3.5 py-1.5 sm:text-xs md:text-sm'
                } ${
                  isActive
                    ? 'text-folder-deep font-semibold'
                    : 'text-muted hover:text-ink hover:bg-manila/50'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={`folder-tab-active-${layoutKey}`}
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                    className="absolute inset-0 -z-10 rounded-xl border border-line bg-paper shadow-2xs"
                  >
                    <span className="absolute inset-x-3.5 top-0 h-[2.5px] rounded-full bg-folder" />
                  </motion.span>
                )}

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] rounded px-1.5 py-0.5 transition-colors ${
                      isActive
                        ? 'bg-folder/15 text-folder-deep font-bold'
                        : 'bg-line/40 text-muted group-hover:bg-line/80 group-hover:text-ink'
                    }`}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <span className="tracking-tight">{tab.label}</span>
                </div>

                {isMobile && (
                  <span
                    className={`size-1.5 rounded-full transition-colors ${
                      isActive ? 'bg-folder' : 'bg-transparent'
                    }`}
                  />
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
