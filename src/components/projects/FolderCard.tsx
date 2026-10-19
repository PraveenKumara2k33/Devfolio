import { ArrowRight, ArrowUpRight, Folder, FolderOpen, Layers } from 'lucide-react'
import type { ProjectFolder } from '../../data/projectFolders'
import { getSkillLogo } from '../../lib/skillLogos'

interface FolderCardProps {
  folder: ProjectFolder
  index: number
  onOpenFolder: (folder: ProjectFolder) => void
  onOpenCaseStudy: (folder: ProjectFolder) => void
}

export function FolderCard({ folder, index, onOpenFolder, onOpenCaseStudy }: FolderCardProps) {
  const tag = folder.featured
    ? 'FEATURED'
    : folder.filters.includes('Real-time')
    ? 'REAL-TIME'
    : folder.filters.includes('Frontend')
    ? 'FRONTEND'
    : folder.filters[0]?.toUpperCase() || 'FULL STACK'

  const totalFiles = folder.files.length

  return (
    <article
      className="group relative flex h-full flex-col pt-7"
      aria-labelledby={`folder-${folder.id}-title`}
    >
      {/* Folder Tab on Top */}
      <div
        className="folder-tab-shape absolute left-0 top-0 flex h-7 items-center gap-2 px-4 font-mono text-[0.68rem] font-semibold bg-folder text-white shadow-xs transition-colors cursor-pointer"
        onClick={() => onOpenFolder(folder)}
      >
        <Folder size={12} aria-hidden="true" />
        <span>{folder.folderNumber}</span>
        <span className="rounded bg-white/20 px-1 text-[0.6rem] font-bold uppercase tracking-wider">
          {tag}
        </span>
        <span className="rounded-full bg-white/30 px-1.5 text-[0.6rem] font-mono">
          {totalFiles} Files
        </span>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl rounded-tl-none border border-folder/30 bg-sheet shadow-[var(--shadow-sheet)] transition-[transform,box-shadow,border-color] duration-300 ease-(--ease-paper) group-hover:-translate-y-1 group-hover:border-folder/60 group-hover:shadow-[var(--shadow-lift)]">
        {/* Folder Top Metadata Banner */}
        <div className="border-b border-line bg-paper/70 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-semibold text-folder">
              // directory archive 0{index + 1}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              {totalFiles} Files Contained
            </span>
          </div>

          <div className="mt-3">
            <p className="eyebrow">{folder.category}</p>
            <h3
              id={`folder-${folder.id}-title`}
              className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink group-hover:text-folder-deep transition-colors"
            >
              {folder.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              {folder.role} · {folder.team}
            </p>
          </div>
        </div>

        {/* Project Image Banner if available */}
        {folder.image && (
          <div
            className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden border-b border-line bg-paper cursor-pointer"
            onClick={() => onOpenFolder(folder)}
          >
            <img
              src={folder.image}
              alt={`${folder.title} preview`}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-md bg-ink/75 px-2.5 py-0.5 font-mono text-[0.68rem] text-white backdrop-blur-xs">
              <Layers size={12} aria-hidden="true" />
              <span>{folder.gallery ? `${folder.gallery.length} Screens` : 'Screenshot'}</span>
            </div>
            <div className="absolute bottom-3 right-4 flex items-center gap-1 rounded-md bg-folder px-2.5 py-0.5 font-mono text-[0.68rem] font-semibold text-white shadow-xs">
              <span>Inspect Directory</span>
              <ArrowRight size={11} />
            </div>
          </div>
        )}

        {/* Card Body & Summary */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-ink/80">{folder.summary}</p>

          {/* Contained Files Quick Preview Grid */}
          <div className="mt-5 border-t border-dashed border-line pt-4">
            <p className="eyebrow mb-2">Files inside folder ({totalFiles}):</p>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {folder.files.slice(0, 6).map((file, fileIdx) => (
                <div
                  key={file.id}
                  onClick={() => onOpenFolder(folder)}
                  className="flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper/50 px-2.5 py-1.5 text-xs text-ink/80 transition-all hover:border-folder/40 hover:bg-sheet cursor-pointer"
                >
                  <span className="font-mono text-[0.65rem] text-muted">0{fileIdx + 1}</span>
                  <span className="truncate font-medium">{file.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Stack Pills */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {folder.stack.slice(0, 6).map((tech) => {
              const logo = getSkillLogo(tech)
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-sheet px-2 py-0.5 text-xs font-medium text-ink/80 shadow-2xs"
                >
                  {logo && (
                    <img
                      src={logo}
                      alt=""
                      aria-hidden="true"
                      className="size-3.5 object-contain"
                      loading="lazy"
                    />
                  )}
                  <span>{tech}</span>
                </span>
              )
            })}
          </div>

          {/* Action Buttons: Open Folder & Open Case Study */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/80 pt-4">
            <button
              type="button"
              onClick={() => onOpenFolder(folder)}
              className="inline-flex items-center gap-2 rounded-xl bg-folder px-4 py-2 text-xs font-bold text-white shadow-xs transition-transform hover:-translate-y-0.5 hover:bg-folder-deep"
            >
              <FolderOpen size={14} aria-hidden="true" />
              <span>Open Folder ({totalFiles} Files)</span>
              <ArrowRight size={13} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onOpenCaseStudy(folder)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-sheet px-3.5 py-2 text-xs font-semibold text-ink/80 transition-colors hover:border-ink/40 hover:bg-paper hover:text-ink"
            >
              <span>Open Case Study</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
