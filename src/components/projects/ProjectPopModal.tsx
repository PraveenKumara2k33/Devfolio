import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CheckCircle2, FileCode, FolderOpen, LayoutGrid, Rocket, X } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import type { ProjectFolder, ProjectFileItem } from '../../data/projectFolders'
import { getSkillLogo } from '../../lib/skillLogos'
import { getProjectMeta, springSnappy, springSoft } from './projectMeta'

interface ProjectPopModalProps {
  project: Project
  folder?: ProjectFolder
  onClose: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Case study viewer styled as an opened folder window: files on the left,
 * the selected file (or the project overview) on the right.
 * Mount it with a `key` per project; it animates in on mount and out before `onClose`.
 */
export function ProjectPopModal({ project, folder, onClose }: ProjectPopModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const reduce = useReducedMotion()
  const [closing, setClosing] = useState(false)
  const [activeFile, setActiveFile] = useState<ProjectFileItem | null>(null)
  const meta = getProjectMeta(project.id, project.title)

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

  const requestClose = () => setClosing(true)
  const files = folder?.files ?? []

  return (
    <dialog
      ref={ref}
      aria-labelledby="case-study-title"
      onCancel={(e) => {
        e.preventDefault()
        requestClose()
      }}
      onClose={onClose}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-transparent"
    >
      <motion.div
        aria-hidden="true"
        onClick={requestClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-night/65 backdrop-blur-md"
      />

      <div className="pointer-events-none relative flex h-full items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.94, rotateX: reduce ? 0 : 8 }}
          animate={
            closing
              ? { opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.96, rotateX: 0 }
              : { opacity: 1, y: 0, scale: 1, rotateX: 0 }
          }
          transition={closing ? { duration: 0.22, ease } : springSoft}
          onAnimationComplete={() => closing && onClose()}
          style={{ transformPerspective: 1200 }}
          className="pointer-events-auto flex max-h-[min(92dvh,52rem)] w-full md:h-[min(92dvh,46rem)] max-w-5xl flex-col overflow-hidden rounded-3xl border border-line bg-sheet shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]"
        >
          {/* Window header styled like the folder's index tab */}
          <div className="relative flex items-center gap-3 border-b border-line bg-paper px-4 py-3 sm:px-6">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: meta.accent }} />
            <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: meta.accent }}>
              <FolderOpen size={17} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[0.68rem] text-muted">
                {folder?.folderNumber ?? 'DIR'} / {meta.filename}
                {activeFile && <span className="text-ink"> / {activeFile.filename}</span>}
              </p>
              <h3 id="case-study-title" className="truncate text-lg font-semibold sm:text-xl">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={requestClose}
              className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-sheet text-ink/70 transition-[transform,color,border-color] duration-200 hover:rotate-90 hover:border-ink/30 hover:text-ink"
              aria-label="Close case study"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col md:grid md:grid-cols-[15.5rem_1fr]">
            {/* Explorer sidebar (horizontal strip on mobile) */}
            <nav
              aria-label="Case study files"
              className="scrollbar-none flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-paper/50 p-2 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r md:p-3"
            >
              <p className="hidden px-2 pb-1 pt-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted md:block">
                Files
              </p>
              <SidebarItem
                active={activeFile === null}
                onClick={() => setActiveFile(null)}
                icon={<LayoutGrid size={14} aria-hidden="true" />}
                label="Overview"
                sub="README.md"
                accent={meta.accent}
              />
              {files.map((file, i) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: reduce ? 0 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.035, duration: 0.3, ease }}
                  className="shrink-0"
                >
                  <SidebarItem
                    active={activeFile?.id === file.id}
                    onClick={() => setActiveFile(file)}
                    icon={<FileCode size={14} aria-hidden="true" />}
                    label={file.name}
                    sub={file.filename}
                    accent={meta.accent}
                  />
                </motion.div>
              ))}
            </nav>

            {/* Content pane */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeFile?.id ?? 'overview'}
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: 0.25, ease }}
                  className="space-y-7 p-5 sm:p-8"
                >
                  {activeFile ? (
                    <FileView file={activeFile} />
                  ) : (
                    <OverviewView project={project} folder={folder} onOpenFile={setActiveFile} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper/60 px-4 py-3 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary min-h-9 px-4 text-xs">
                  Launch live <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-9 px-4 text-xs">
                  Source code <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {!project.liveUrl && !project.repoUrl && (
                <span className="font-mono text-[0.7rem] text-muted">{project.role} · {project.team}</span>
              )}
            </div>
            <span className="hidden font-mono text-[0.7rem] text-muted sm:inline">
              <kbd className="rounded border border-line bg-sheet px-1">Esc</kbd> to close
            </span>
          </div>
        </motion.div>
      </div>
    </dialog>
  )
}

interface SidebarItemProps {
  active: boolean
  onClick: () => void
  icon: ReactNode
  label: string
  sub: string
  accent: string
}

function SidebarItem({ active, onClick, icon, label, sub, accent }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`group relative flex w-max items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors md:w-full ${
        active ? 'text-ink' : 'text-ink/65 hover:text-ink'
      }`}
    >
      {active && (
        <motion.span
          layoutId="case-study-file-highlight"
          transition={springSnappy}
          aria-hidden="true"
          className="absolute inset-0 rounded-lg border border-line bg-sheet shadow-[var(--shadow-sheet)]"
        />
      )}
      <span
        className="relative grid size-7 shrink-0 place-items-center rounded-md transition-transform duration-200 group-hover:scale-110"
        style={{ background: active ? accent : `${accent}1a`, color: active ? '#fff' : accent }}
      >
        {icon}
      </span>
      <span className="relative min-w-0">
        <span className="block truncate text-xs font-semibold md:max-w-[10.5rem]">{label}</span>
        <span className="hidden truncate font-mono text-[0.62rem] text-muted md:block md:max-w-[10.5rem]">{sub}</span>
      </span>
    </button>
  )
}

function StackPills({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech, i) => {
        const logo = getSkillLogo(tech)
        return (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.03, ...springSnappy }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-sheet px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs"
          >
            {logo && <img decoding="async" src={logo} alt="" aria-hidden="true" className="size-4 object-contain" loading="lazy" />}
            {tech}
          </motion.span>
        )
      })}
    </div>
  )
}

function PointList({ points }: { points: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {points.map((pt, i) => (
        <motion.li
          key={pt}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 + i * 0.05, duration: 0.3, ease }}
          className="flex items-start gap-2.5 rounded-xl border border-line/70 bg-paper/50 p-3 text-sm leading-relaxed text-ink/85"
        >
          <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
          {pt}
        </motion.li>
      ))}
    </ul>
  )
}

function Preview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-paper">
      <AnimatePresence initial={false}>
        <motion.img
          key={src}
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </AnimatePresence>
    </div>
  )
}

function OverviewView({
  project,
  folder,
  onOpenFile,
}: {
  project: Project
  folder?: ProjectFolder
  onOpenFile: (file: ProjectFileItem) => void
}) {
  const gallery = project.gallery ?? (project.image ? [project.image] : [])
  const [shot, setShot] = useState(gallery[0] ?? null)

  return (
    <>
      <div>
        <div className="flex flex-wrap gap-2">
          <span className="tag-soft">{project.category}</span>
          <span className="tag">{project.role}</span>
          <span className="tag">{project.team}</span>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">{project.summary}</p>
      </div>

      {shot ? (
        <div className="space-y-2.5">
          <Preview src={shot} alt={`${project.title} screenshot`} />
          {gallery.length > 1 && (
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
              {gallery.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setShot(img)}
                  aria-label="Show screenshot"
                  aria-pressed={shot === img}
                  className={`relative aspect-[16/10] h-14 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 ${
                    shot === img ? 'border-folder ring-2 ring-folder/30' : 'border-line opacity-60 hover:opacity-100'
                  }`}
                >
                  <img decoding="async" src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        folder &&
        folder.files.length > 0 && (
          <div className="dot-grid grid grid-cols-2 gap-2 rounded-2xl border border-line bg-paper/60 p-3 sm:grid-cols-4">
            {folder.files.map((file, i) => (
              <motion.button
                key={file.id}
                type="button"
                onClick={() => onOpenFile(file)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04, ...springSnappy }}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-line bg-sheet p-3 text-left shadow-2xs"
              >
                <FileCode size={14} aria-hidden="true" className="text-folder" />
                <span className="mt-2 block truncate text-xs font-semibold text-ink">{file.name}</span>
                <span className="block truncate font-mono text-[0.6rem] text-muted">{file.filename}</span>
              </motion.button>
            ))}
          </div>
        )
      )}

      <section>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">Key capabilities</h4>
        <PointList points={project.features} />
      </section>

      {project.roadmap && project.roadmap.length > 0 && (
        <section>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
            <Rocket size={15} aria-hidden="true" className="text-folder" /> Roadmap
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.roadmap.map((r) => (
              <span key={r} className="tag-soft">
                {r}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">Technologies</h4>
        <StackPills stack={project.stack} />
      </section>
    </>
  )
}

function FileView({ file }: { file: ProjectFileItem }) {
  return (
    <>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag font-semibold text-folder-deep">{file.filename}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-0.5 font-mono text-[0.68rem] font-semibold text-success">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            {file.status}
          </span>
        </div>
        <h4 className="mt-3 text-2xl font-semibold">{file.name}</h4>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink/80">{file.spec}</p>
      </div>

      {file.image && <Preview src={file.image} alt={`${file.name} screenshot`} />}

      <section>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">Implementation</h4>
        <PointList points={file.points} />
      </section>

      <section>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">Stack</h4>
        <StackPills stack={file.stack} />
      </section>
    </>
  )
}
