import { ArrowUpRight, FolderOpen } from 'lucide-react'
import type { ProjectFolder, ProjectFileItem } from '../../data/projectFolders'
import { Folder3D } from './Folder3D'
import { getSkillLogo } from '../../lib/skillLogos'

interface Folder3DCardProps {
  folder: ProjectFolder
  index: number
  onOpenModal: (folder: ProjectFolder, file?: ProjectFileItem) => void
}

export function Folder3DCard({ folder, index, onOpenModal }: Folder3DCardProps) {
  const totalFiles = folder.files.length

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-sheet p-6 shadow-[var(--shadow-sheet)] transition-[transform,box-shadow,border-color] duration-300 ease-(--ease-paper) hover:-translate-y-1.5 hover:border-folder/60 hover:shadow-[var(--shadow-lift)] sm:p-8"
      aria-labelledby={`folder-3d-${folder.id}-title`}
    >
      {/* Top Header Stamp */}
      <div className="flex items-center justify-between border-b border-line/70 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-soft text-folder shadow-2xs">
            <FolderOpen size={14} />
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-folder">
            ARCHIVE 0{index + 1} // {folder.category}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          <span>{totalFiles} Files Contained</span>
        </span>
      </div>

      {/* 3D Open Blue Folder Graphic (Matching User's Reference Image) */}
      <div className="my-6 py-2">
        <Folder3D
          folder={folder}
          onOpenFolder={() => onOpenModal(folder, folder.files[0])}
          onSelectFile={(file) => onOpenModal(folder, file)}
        />
      </div>

      {/* Title, Category & Summary */}
      <div className="flex flex-1 flex-col">
        <h3
          id={`folder-3d-${folder.id}-title`}
          onClick={() => onOpenModal(folder, folder.files[0])}
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-folder-deep cursor-pointer"
        >
          {folder.title}
        </h3>

        <p className="mt-1 font-mono text-xs text-muted">
          {folder.role} · {folder.team}
        </p>

        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/75 line-clamp-3">
          {folder.summary}
        </p>

        {/* Files Contained Inside Folder (Clickable File Chips) */}
        <div className="mt-5 border-t border-dashed border-line pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="eyebrow text-[11px]">Contained Project Files ({totalFiles}):</span>
            <span className="font-mono text-[10px] text-muted">click to pop modal</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {folder.files.slice(0, 6).map((file, fileIdx) => (
              <button
                key={file.id}
                type="button"
                onClick={() => onOpenModal(folder, file)}
                className="flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper/60 px-2.5 py-1.5 text-left text-xs text-ink/80 transition-all hover:border-folder/50 hover:bg-sheet hover:shadow-2xs"
              >
                <span className="font-mono text-[10px] text-folder font-semibold">
                  0{fileIdx + 1}
                </span>
                <span className="truncate font-medium">{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Technologies Stack Footer */}
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

        {/* Actions Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/80 pt-4">
          <button
            type="button"
            onClick={() => onOpenModal(folder, folder.files[0])}
            className="inline-flex items-center gap-2 rounded-xl bg-folder px-4 py-2 text-xs font-bold text-white shadow-xs transition-transform hover:-translate-y-0.5 hover:bg-folder-deep"
          >
            <span>Open Case Study Pop Modal</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </button>

          <span className="font-mono text-[11px] text-muted group-hover:text-folder transition-colors flex items-center gap-1">
            <span>Hover to preview files</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </article>
  )
}
