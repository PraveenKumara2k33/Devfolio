import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { SkillItem } from './skillDomains'

interface SkillMarqueeProps {
  skills: SkillItem[]
}

const COLS = 6 // desktop columns; used to make the entrance travel as a diagonal wave

/**
 * "All skills": a clean grid of technology tiles (the last row is centred), logo on top and name below.
 * Tiles appear in a diagonal wave as the grid scrolls into view; hovering one
 * lifts it with a soft glow and bounces its logo.
 */
export function SkillMarquee({ skills }: SkillMarqueeProps) {
  const reduce = useReducedMotion()

  const tile: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.92 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 22,
        // Row + column, so the wave sweeps from the top-left corner.
        delay: reduce ? 0 : (Math.floor(i / COLS) + (i % COLS)) * 0.045,
      },
    }),
  }

  return (
    <div className="mx-auto max-w-5xl">
      <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {skills.length} technologies I work with
      </p>
      <motion.ul
        aria-label={`${skills.length} technologies`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        className="flex flex-wrap justify-center gap-2.5 sm:gap-3"
      >
        {skills.map((skill, i) => (
          <motion.li
            key={skill.name}
            custom={i}
            variants={tile}
            className="group relative flex w-[calc((100%-1.25rem)/3)] flex-col sm:w-[calc((100%-2.25rem)/4)] md:w-[calc((100%-3.75rem)/6)] items-center gap-2.5 rounded-2xl border border-line bg-sheet px-2 pb-3.5 pt-4 text-center shadow-[0_1px_2px_rgb(23_33_43/0.05),0_8px_20px_-12px_rgb(23_33_43/0.3)] transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-folder/40 hover:shadow-[0_1px_2px_rgb(23_33_43/0.05),0_18px_30px_-14px_rgb(49_87_213/0.45)]"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-paper ring-1 ring-line transition-[transform,background-color] duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:bg-white sm:size-14">
              <img decoding="async" loading="lazy" src={skill.logo} alt="" className="size-7 object-contain sm:size-8" />
            </span>
            <span className="w-full truncate text-[0.8rem] font-semibold leading-tight text-ink sm:text-sm">{skill.name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
