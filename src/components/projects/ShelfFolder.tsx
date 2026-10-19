import type { ReactNode } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight, FileCode2, FileImage, FileJson, Globe, Images } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { getSkillLogo } from '../../lib/skillLogos'
import { getProjectMeta } from './projectMeta'

interface ShelfFolderProps {
  project: Project
  index: number
  /** 0 = parked on the shelf, 1 = centred and fully open. */
  focus: MotionValue<number>
  onOpen: (project: Project) => void
  onFocusRequest: () => void
}

// Each file fans to its own angle and offset as the folder opens: [left, middle, front].
const fan = [
  { rotate: -9, x: -18, y: -30 },
  { rotate: 1.5, x: 0, y: -38 },
  { rotate: 10, x: 18, y: -26 },
]

/**
 * A project folder on the horizontal shelf. As it slides to the centre the
 * front flap tips forward and three files rise out of the pocket and fan out.
 */
export function ShelfFolder({ project, index, focus, onOpen, onFocusRequest }: ShelfFolderProps) {
  const meta = getProjectMeta(project.id, project.title)
  const num = String(index + 1).padStart(2, '0')

  const scale = useTransform(focus, [0, 1], [0.86, 1])
  const lift = useTransform(focus, [0, 1], [28, 0])
  const opacity = useTransform(focus, [0, 0.6, 1], [0.45, 0.9, 1])
  const flapTilt = useTransform(focus, [0, 1], [0, -20])
  const flapDrop = useTransform(focus, [0, 1], [0, 10])
  const shadow = useTransform(
    focus,
    [0, 1],
    ['0 10px 24px -16px rgb(17 24 32 / 0.35)', '0 40px 70px -30px rgb(17 24 32 / 0.6)'],
  )

  return (
    <motion.article
      aria-labelledby={`shelf-title-${project.id}`}
      // Keyboard focus and clicks pull the folder to the centre of the shelf.
      onFocusCapture={(e) => e.target.matches(':focus-visible') && onFocusRequest()}
      onClick={onFocusRequest}
      style={{ scale, y: lift, opacity }}
      className="relative h-[min(33rem,64svh)] w-[min(30rem,82vw)]"
    >
      <div className="relative h-full" style={{ perspective: '1200px' }}>
        {/* Back panel + index tab */}
        <motion.div
          className="absolute inset-x-0 bottom-0 top-[22%] rounded-[1.75rem]"
          style={{ background: `linear-gradient(180deg, ${meta.deep}, ${meta.accent} 140%)`, boxShadow: shadow }}
        >
          <div aria-hidden="true" className="paper-grain absolute inset-0 rounded-[1.75rem] opacity-50 mix-blend-overlay" />
          <div
            className="absolute -top-8 left-6 flex h-9 items-center gap-2 rounded-t-2xl px-4 font-mono text-[0.7rem] font-semibold tracking-wide text-white/90"
            style={{ background: meta.deep }}
          >
            <span className="text-white/55">DIR {num}</span>
            <span aria-hidden="true" className="text-white/35">/</span>
            {meta.short}
          </div>
        </motion.div>

        {/* Files rising from the pocket */}
        <div className="absolute inset-x-[8%] bottom-[8%] top-[27%]">
          <FileSheet focus={focus} spread={fan[0]} order={0}>
            <SheetHead icon={<FileImage size={12} />} name="preview.png" color={meta.accent} />
            <div className="mt-2 aspect-[16/10] overflow-hidden rounded-md border border-line bg-paper">
              {project.image ? (
                <img decoding="async" src={project.image} alt="" className="size-full object-cover object-top" loading="lazy" />
              ) : (
                <div className="dot-grid grid size-full grid-cols-2 content-center gap-1 p-2">
                  {(project.modules ?? []).slice(0, 6).map((m) => (
                    <span
                      key={m}
                      className="truncate rounded px-1.5 py-1 font-mono text-[0.55rem] font-semibold"
                      style={{ background: meta.tint, color: meta.deep }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FileSheet>

          <FileSheet focus={focus} spread={fan[1]} order={1}>
            <SheetHead icon={<FileCode2 size={12} />} name="modules/" color={meta.accent} />
            <ul className="mt-2 space-y-1">
              {(project.modules ?? project.features).slice(0, 5).map((m) => (
                <li key={m} className="flex items-center gap-1.5 truncate font-mono text-[0.62rem] text-ink/75">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-sm" style={{ background: meta.accent }} />
                  {m}
                </li>
              ))}
            </ul>
          </FileSheet>

          <FileSheet focus={focus} spread={fan[2]} order={2}>
            <SheetHead icon={<FileJson size={12} />} name="stack.json" color={meta.accent} />
            <div className="mt-2 flex flex-wrap gap-1">
              {project.stack.slice(0, 6).map((tech) => {
                const logo = getSkillLogo(tech)
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 rounded-md border border-line bg-sheet px-1.5 py-0.5 font-mono text-[0.58rem] text-ink/80"
                  >
                    {logo && <img decoding="async" src={logo} alt="" className="size-2.5 object-contain" loading="lazy" />}
                    {tech}
                  </span>
                )
              })}
            </div>
          </FileSheet>
        </div>

        {/* Front flap */}
        <motion.div
          style={{
            rotateX: flapTilt,
            y: flapDrop,
            transformOrigin: 'bottom center',
            background: `linear-gradient(150deg, ${meta.accent} 0%, ${meta.accent} 45%, ${meta.deep} 100%)`,
          }}
          className="absolute inset-x-0 bottom-0 z-10 flex h-[60%] flex-col justify-between overflow-hidden rounded-[1.75rem] p-5 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_-10px_24px_-16px_rgb(0_0_0/0.45)] sm:p-6"
        >
          <div aria-hidden="true" className="paper-grain pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay" />
          <div aria-hidden="true" className="absolute left-1/2 top-0 h-2.5 w-20 -translate-x-1/2 rounded-b-full bg-black/15" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -right-2 font-display text-[9rem] font-bold leading-none text-white/[0.08]"
          >
            {num}
          </span>

          <div className="relative flex items-center justify-between gap-3">
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-white/75">{project.category}</span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold">
              <span className="size-1.5 rounded-full bg-emerald-300" />
              {meta.status}
            </span>
          </div>

          <div className="relative">
            <h3 id={`shelf-title-${project.id}`} className="line-clamp-2 text-2xl font-semibold text-white sm:text-[1.7rem]">
              {project.title}
            </h3>
            <p className="mt-1 truncate text-sm text-white/75">
              {project.role} · {project.team}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="group/open inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold shadow-[0_10px_20px_-10px_rgb(0_0_0/0.5)] transition-transform duration-200 hover:-translate-y-0.5"
                style={{ color: meta.deep }}
              >
                Open case study
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/open:-translate-y-0.5 group-hover/open:translate-x-0.5"
                />
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/40 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <Globe size={14} aria-hidden="true" />
                  Live site
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {!project.liveUrl && project.gallery && project.gallery.length > 1 && (
                <span className="inline-flex items-center gap-1 font-mono text-xs text-white/75">
                  <Images size={13} aria-hidden="true" />
                  {project.gallery.length} screens
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}

interface FileSheetProps {
  focus: MotionValue<number>
  spread: { rotate: number; x: number; y: number }
  order: number
  children: ReactNode
}

function FileSheet({ focus, spread, order, children }: FileSheetProps) {
  // Staggered rise: later files start moving a little after earlier ones.
  const start = order * 0.12
  const rotate = useTransform(focus, [start, 1], [order - 1, spread.rotate])
  const x = useTransform(focus, [start, 1], ['0%', `${spread.x}%`])
  const y = useTransform(focus, [start, 1], ['0%', `${spread.y}%`])

  return (
    <motion.div
      aria-hidden="true"
      style={{ rotate, x, y, zIndex: order }}
      className="ruled absolute inset-x-[6%] inset-y-0 overflow-hidden rounded-xl border border-line bg-sheet p-3 shadow-[0_12px_24px_-14px_rgb(17_24_32/0.45)]"
    >
      {children}
    </motion.div>
  )
}

function SheetHead({ icon, name, color }: { icon: ReactNode; name: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line/70 pb-1.5 font-mono text-[0.62rem] font-semibold" style={{ color }}>
      {icon}
      {name}
    </div>
  )
}
