import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { GitHubIcon } from '../ui/BrandIcons'
import { getSkillLogo } from '../../lib/skillLogos'

interface CaseStudyDialogProps {
  project: Project | null
  onClose: () => void
}

/** Native <dialog> case study with interactive screenshot gallery and detailed dossier. */
export function CaseStudyDialog({ project, onClose }: CaseStudyDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      setActiveImage(project.image || (project.gallery && project.gallery[0]) || null)
      dialog.showModal?.()
    }
    if (!project && dialog.open) {
      dialog.close?.()
    }
  }, [project])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-labelledby="case-study-title"
      className="m-auto max-h-[92vh] w-[min(52rem,calc(100vw-2rem))] overflow-visible rounded-2xl bg-transparent p-0 backdrop:bg-night/65 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="relative max-h-[92vh] overflow-y-auto rounded-2xl rounded-tl-none border border-line bg-sheet shadow-2xl">
          {/* Header tab badge */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/95 px-6 py-3 backdrop-blur-md">
            <span className="folder-tab-shape -ml-2 -mt-3 inline-block bg-folder px-5 pb-1.5 pt-2 font-mono text-xs font-semibold text-white">
              PROJECT DOSSIER // {project.category}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid size-9 place-items-center rounded-lg border border-line bg-sheet text-ink/70 hover:bg-paper hover:text-ink"
              aria-label="Close case study"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>

          <div className="p-6 md:p-9">
            {/* Title & Metadata */}
            <div>
              <p className="eyebrow">{project.category}</p>
              <h3 id="case-study-title" className="mt-1 text-2xl font-bold sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-folder font-medium">
                {project.role} · {project.team}
              </p>
            </div>

            {/* Main Screenshot Preview */}
            {(activeImage || project.image) && (
              <div className="mt-6 overflow-hidden rounded-xl border border-line bg-paper shadow-xs">
                <div className="aspect-[16/9] w-full overflow-hidden bg-paper">
                  <img
                    src={activeImage || project.image}
                    alt={`${project.title} primary display`}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Gallery thumbnail strip if multiple screenshots exist */}
                {project.gallery && project.gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto border-t border-line bg-paper/60 p-3">
                    {project.gallery.map((img, i) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`relative aspect-[16/10] h-14 shrink-0 overflow-hidden rounded-lg border transition-all ${
                          activeImage === img
                            ? 'border-folder ring-2 ring-folder/25'
                            : 'border-line opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="h-full w-full object-cover" />
                        <span className="sr-only">View screenshot {i + 1}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Overview */}
            <h4 className="mt-8 font-display text-base font-semibold">System Overview</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{project.summary}</p>

            {/* Platform Modules for Revenue Maxima */}
            {project.modules && (
              <>
                <h4 className="mt-6 font-display text-base font-semibold">Ecosystem Products</h4>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {project.modules.map((m, i) => (
                    <li key={m} className="rounded-lg border border-line bg-paper p-2.5">
                      <p className="font-mono text-[0.62rem] text-muted">0{i + 1}</p>
                      <p className="mt-0.5 text-xs font-semibold text-ink">{m}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Key Features */}
            <h4 className="mt-6 font-display text-base font-semibold">Key Architecture Highlights</h4>
            <ul className="mt-3 grid gap-2.5 text-sm text-ink/85 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-folder" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Technologies with SVG logos */}
            <h4 className="mt-6 font-display text-base font-semibold">Technologies Utilized</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => {
                const logo = getSkillLogo(s)
                return (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1 font-mono text-xs font-medium text-ink"
                  >
                    {logo && <img src={logo} alt="" aria-hidden="true" className="size-3.5 object-contain" />}
                    <span>{s}</span>
                  </li>
                )
              })}
            </ul>

            {/* AI Roadmap (if any) */}
            {project.roadmap && (
              <div className="mt-8 rounded-xl border border-dashed border-folder/40 bg-soft/30 p-5">
                <h4 className="font-display text-sm font-semibold text-folder-deep">Planned AI Capabilities</h4>
                <p className="mt-1 text-xs text-muted">Intelligent automation roadmap for hospitality workflows.</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.roadmap.map((r) => (
                    <li key={r} className="rounded-md bg-sheet px-2.5 py-1 font-mono text-xs text-folder-deep shadow-2xs">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            {(project.repoUrl || project.liveUrl) && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <GitHubIcon size={16} /> Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    Live Demo <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
