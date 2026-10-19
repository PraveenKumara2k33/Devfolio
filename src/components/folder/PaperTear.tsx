import { useMemo, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TEAR_HEIGHT, TEAR_WIDTH, tearPaths } from '../../lib/tear'

interface PaperTearProps {
  /** Fill color of the section this tear belongs to. */
  fill: string
  seed: number
}

/**
 * Torn top edge for a section. Sits above the section (overlapping the previous one).
 * On desktop the edge "settles" into place as it scrolls in; on mobile or with
 * reduced motion it renders as a static edge.
 */
export function PaperTear({ fill, seed }: PaperTearProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const animated = !reduceMotion && isDesktop

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 40%'] })
  const mainY = useTransform(scrollYProgress, [0, 1], [16, 0])
  const fiberY = useTransform(scrollYProgress, [0, 1], [7, 0])

  const { main, fiber } = useMemo(() => tearPaths(seed), [seed])
  const svgProps = {
    viewBox: `0 0 ${TEAR_WIDTH} ${TEAR_HEIGHT}`,
    preserveAspectRatio: 'none',
    className: 'absolute inset-0 h-full w-full',
  } as const

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full z-10 -mb-px h-7 md:h-11"
    >
      <motion.svg
        {...svgProps}
        style={animated ? { y: fiberY } : undefined}
        className={`${svgProps.className} drop-shadow-[0_-3px_5px_rgba(23,33,43,0.10)]`}
      >
        <path d={fiber} fill="#ffffff" />
      </motion.svg>
      <motion.svg {...svgProps} style={animated ? { y: mainY } : undefined}>
        <path d={main} fill={fill} />
      </motion.svg>
    </div>
  )
}
