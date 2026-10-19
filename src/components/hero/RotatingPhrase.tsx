import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

/**
 * Cycles through phrases with a vertical flip, keeping the underline swash.
 * Reduced motion shows only the first phrase.
 */
export function RotatingPhrase({ phrases, interval = 2600 }: { phrases: string[]; interval?: number }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce || phrases.length < 2) return
    const id = window.setInterval(() => setI((n) => (n + 1) % phrases.length), interval)
    return () => window.clearInterval(id)
  }, [reduce, phrases.length, interval])


  return (
    <span className="relative inline-grid whitespace-nowrap align-bottom text-ink">
      {/* Every phrase sits invisibly in the same cell, so the box is as wide as the widest one. */}
      {phrases.map((p) => (
        <span key={p} aria-hidden="true" className="invisible col-start-1 row-start-1">
          {p}
        </span>
      ))}
      <span className="sr-only">{phrases.join(', ')}</span>
      <span aria-hidden="true" className="relative col-start-1 row-start-1 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.span
            key={phrases[i]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {phrases[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <svg aria-hidden="true" viewBox="0 0 300 12" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2.5 w-full text-folder/60">
        <motion.path
          key={i}
          d="M2 9 C 60 3, 140 3, 298 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  )
}
