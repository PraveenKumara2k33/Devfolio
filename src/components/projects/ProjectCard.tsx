import { ArrowUpRight, FolderOpen, Layers } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { getSkillLogo } from '../../lib/skillLogos'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

const statusBadges: Record<string, { eyebrow: string; status: string }> = {
  'revenue-maxima': { eyebrow: '// unified hospitality ecosystem', status: 'Live in Production' },
  'restaurant': { eyebrow: '// restaurant operations erp', status: 'Production Ready ERP' },
  'ecommerce': { eyebrow: '// real-time websocket storefront', status: 'Live WebSockets' },
  'portfolio-main': { eyebrow: '// kinetic design system', status: 'Interactive Kinetic UI' },
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const label = String(index + 1).padStart(2, '0')
  const tag = project.featured
    ? 'FEATURED'
    : project.filters.includes('Real-time')
    ? 'REAL-TIME'
    : project.filters.includes('Frontend')
    ? 'FRONTEND'
    : project.filters[0]?.toUpperCase() || 'FULL STACK'

  const meta = statusBadges[project.id] ?? {
    eyebrow: '// verified system',
    status: 'Verified Project',
  }

  const modules = project.modules ?? project.features

  return (
    <article
      className="group relative flex h-full flex-col pt-7 md:col-span-2"
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* File Tab - Uniform FEATURED Folder Tab Style for ALL files */}
      <span
        aria-hidden="true"
        className="folder-tab-shape absolute left-0 top-0 flex h-7 items-center gap-1.5 px-4 font-mono text-[0.68rem] font-semibold bg-folder text-white shadow-xs transition-colors"
      >
        <span>FILE {label}</span>
        <span className="rounded bg-white/20 px-1 text-[0.6rem] font-bold uppercase tracking-wider">
          {tag}
        </span>
      </span>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl rounded-tl-none border border-folder/30 bg-sheet shadow-[var(--shadow-sheet)] transition-[transform,box-shadow,border-color] duration-300 ease-(--ease-paper) group-hover:-translate-y-1 group-hover:border-folder/60 group-hover:shadow-[var(--shadow-lift)]">
        {/* Specialized Featured Schematic Header for ALL Projects */}
        <div className="border-b border-line bg-paper/70 p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-semibold text-folder">{meta.eyebrow}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              {meta.status}
            </span>
          </div>

          {/* Module Architecture Cards */}
          {modules && modules.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {modules.slice(0, 6).map((m, i) => (
                <div
                  key={m}
                  className="rounded-xl border border-line bg-sheet p-2.5 shadow-2xs transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <p className="font-mono text-[0.65rem] text-muted">MOD 0{i + 1}</p>
                  <p className="mt-0.5 text-xs font-semibold text-ink truncate">{m}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Image Banner if image exists */}
        {project.image && (
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden border-b border-line bg-paper">
            <img
              src={project.image}
              alt={`${project.title} screenshot preview`}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-md bg-ink/75 px-2.5 py-0.5 font-mono text-[0.68rem] text-white backdrop-blur-xs">
              <Layers size={12} aria-hidden="true" />
              <span>{project.gallery ? `${project.gallery.length} Screens` : 'Screenshot'}</span>
            </div>
          </div>
        )}

        {/* Card Body - Uniform Rich Featured Presentation */}
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="eyebrow">{project.category}</p>
            <span className="font-mono text-xs text-muted">{project.team}</span>
          </div>

          <h3
            id={`project-${project.id}-title`}
            className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-ink"
          >
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-folder font-semibold">{project.role}</p>

          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/80">{project.summary}</p>

          {/* Key bullets */}
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-ink/75">
            {project.features.slice(0, 4).map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-folder" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            {/* Tech stack badges with logos */}
            <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.stack.slice(0, 8).map((s) => {
                const logo = getSkillLogo(s)
                return (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-2.5 py-1 font-mono text-[0.74rem] text-ink/80 shadow-2xs transition-transform hover:scale-105"
                  >
                    {logo && <img src={logo} alt="" aria-hidden="true" className="size-3.5 object-contain" />}
                    <span>{s}</span>
                  </li>
                )
              })}
              {project.stack.length > 8 && (
                <li className="tag text-muted">+{project.stack.length - 8}</li>
              )}
            </ul>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-dashed border-line pt-5">
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="btn btn-primary min-h-10 px-4 text-xs font-semibold gap-2"
              >
                <FolderOpen size={15} aria-hidden="true" />
                Open case file
                <span className="sr-only">: {project.title}</span>
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink transition-colors"
                >
                  Live Demo <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
