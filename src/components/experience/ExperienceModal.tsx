import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { X } from 'lucide-react'
import type { Role } from '../../types/portfolio'
import { ExperienceDossier } from './ExperienceDossier'

interface ExperienceModalProps {
  roles: Role[]
  startIndex: number
  focusAreas: Record<string, string[]>
  onClose: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

const pageTurn: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 48, rotateY: d * -6 }),
  center: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.42, ease } },
  exit: (d: number) => ({ opacity: 0, x: d * -48, rotateY: d * 6, transition: { duration: 0.26, ease } }),
}

const fade: Variants = { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }

/**
 * The full career file in a dialog. Previous / next page-turn through the
 * chapters in timeline order. Mount it per open; it animates out before `onClose`.
 */
export function ExperienceModal({ roles, startIndex, focusAreas, onClose }: ExperienceModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [closing, setClosing] = useState(false)
  const [[index, direction], setPage] = useState<[number, number]>([startIndex, 0])
  const role = roles[index]

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal?.()
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [])

  const go = (next: number) => {
    if (next < 0 || next >= roles.length) return
    setPage([next, next > index ? 1 : -1])
    scrollRef.current?.scrollTo({ top: 0 })
  }

  return (
    <dialog
      ref={ref}
      aria-label={`${role.company} — ${role.title}`}
      onCancel={(e) => {
        e.preventDefault()
        setClosing(true)
      }}
      onClose={onClose}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-transparent"
    >
      <motion.div
        aria-hidden="true"
        onClick={() => setClosing(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-night/65 backdrop-blur-md"
      />

      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, y: reduce ? 0 : 60 }}
        animate={closing ? { opacity: 0, y: reduce ? 0 : 30 } : { opacity: 1, y: 0 }}
        transition={closing ? { duration: 0.22, ease } : { type: 'spring', stiffness: 240, damping: 28 }}
        onAnimationComplete={() => closing && onClose()}
        onClick={(e) => e.target === e.currentTarget && setClosing(true)}
        className="relative h-full overflow-y-auto px-3 py-6 sm:px-6 sm:py-12"
      >
        <div className="relative mx-auto max-w-4xl" style={{ perspective: '1600px' }}>
          <button
            type="button"
            onClick={() => setClosing(true)}
            aria-label="Close file"
            className="absolute right-2 top-0 z-10 grid size-9 place-items-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur transition-transform duration-200 hover:rotate-90"
          >
            <X size={17} aria-hidden="true" />
          </button>

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={role.id}
              custom={direction}
              variants={reduce ? fade : pageTurn}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformOrigin: direction >= 0 ? 'left center' : 'right center' }}
            >
              <ExperienceDossier
                role={role}
                index={index}
                total={roles.length}
                focus={focusAreas[role.id] ?? []}
                prev={roles[index - 1]}
                next={roles[index + 1]}
                onPrev={() => go(index - 1)}
                onNext={() => go(index + 1)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </dialog>
  )
}
