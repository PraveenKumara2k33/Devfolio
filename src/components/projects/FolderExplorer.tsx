import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  FileCode,
  FileText,
  Folder,
  FolderOpen,
  Layers,
  Sparkles,
} from 'lucide-react'
import type { ProjectFileItem, ProjectFolder } from '../../data/projectFolders'
import { getSkillLogo } from '../../lib/skillLogos'

interface FolderExplorerProps {
  folder: ProjectFolder
  activeFileId: string
  onSelectFile: (file: ProjectFileItem) => void
  onSelectFolder: (folder: ProjectFolder) => void
  onBackToFolders: () => void
  onOpenCaseStudy: (folder: ProjectFolder) => void
  allFolders: ProjectFolder[]
}

const fileIcons: Record<string, typeof FileCode> = {
  tsx: FileCode,
  ts: Code2,
  py: FileText,
  php: Database,
  js: Code2,
  css: Layers,
}

export function FolderExplorer({
  folder,
  activeFileId,
  onSelectFile,
  onSelectFolder,
  onBackToFolders,
  onOpenCaseStudy,
  allFolders,
}: FolderExplorerProps) {
  const activeFileIndex = folder.files.findIndex((f) => f.id === activeFileId)
  const activeFile = folder.files[activeFileIndex >= 0 ? activeFileIndex : 0]
  const [selectedPreviewImg, setSelectedPreviewImg] = useState<string | null>(null)

  const currentPreview = selectedPreviewImg || activeFile?.image || folder.image

  const handlePrevFile = () => {
    const prevIdx = activeFileIndex > 0 ? activeFileIndex - 1 : folder.files.length - 1
    onSelectFile(folder.files[prevIdx])
    setSelectedPreviewImg(null)
  }

  const handleNextFile = () => {
    const nextIdx = activeFileIndex < folder.files.length - 1 ? activeFileIndex + 1 : 0
    onSelectFile(folder.files[nextIdx])
    setSelectedPreviewImg(null)
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Top Breadcrumb Navigation & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-sheet p-4 shadow-xs">
        {/* Breadcrumb Path */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted">
          <button
            type="button"
            onClick={onBackToFolders}
            className="inline-flex items-center gap-1 font-semibold text-folder hover:text-folder-deep hover:underline"
          >
            <Folder size={14} />
            <span>Projects</span>
          </button>
          <ChevronRight size={13} className="text-muted/60" />
          <span className="font-semibold text-ink">{folder.folderNumber}</span>
          <span className="text-muted/70">({folder.title})</span>
          {activeFile && (
            <>
              <ChevronRight size={13} className="text-muted/60" />
              <span className="rounded bg-paper px-2 py-0.5 font-medium text-folder-deep">
                {activeFile.filename}
              </span>
            </>
          )}
        </div>

        {/* Action Buttons: Back to Folders & Open Case Study */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToFolders}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper px-3 py-1.5 font-mono text-xs font-semibold text-ink/80 transition-colors hover:border-ink/30 hover:bg-sheet hover:text-ink"
          >
            <ArrowLeft size={13} />
            <span>All Folders</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenCaseStudy(folder)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-folder px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-xs transition-transform hover:-translate-y-0.5 hover:bg-folder-deep"
          >
            <span>Open Case Study</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Quick Folder Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="font-mono text-xs text-muted shrink-0 pl-1">SWITCH DIRECTORY:</span>
        <div className="flex flex-wrap gap-1.5">
          {allFolders.map((f) => {
            const isCurrent = f.id === folder.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  onSelectFolder(f)
                  onSelectFile(f.files[0])
                  setSelectedPreviewImg(null)
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-folder text-white shadow-xs'
                    : 'border border-line bg-sheet text-muted hover:border-folder/40 hover:text-ink'
                }`}
              >
                {isCurrent ? <FolderOpen size={13} /> : <Folder size={13} />}
                <span>{f.folderNumber}</span>
                <span className="hidden sm:inline font-sans truncate max-w-[120px]">{f.title}</span>
                <span
                  className={`rounded-full px-1 text-[10px] ${
                    isCurrent ? 'bg-white/25 text-white' : 'bg-paper text-muted'
                  }`}
                >
                  {f.files.length}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Folder Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-sheet p-6 shadow-[var(--shadow-sheet)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded bg-folder/15 px-2 py-0.5 font-mono text-xs font-bold text-folder-deep uppercase">
                {folder.folderNumber} // {folder.category}
              </span>
              <span className="text-xs font-mono text-muted">{folder.team}</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {folder.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{folder.summary}</p>
          </div>

          <div className="flex flex-col items-end gap-2 text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              <span>{folder.files.length} Files Ready</span>
            </span>
            <span className="font-mono text-xs text-muted">Role: {folder.role}</span>
          </div>
        </div>
      </div>

      {/* Main Master-Detail Layout: Files Grid on Left, Dedicated File Inspector on Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Contained Files List (5 cols on lg) */}
        <div className="flex flex-col space-y-3 lg:col-span-5 xl:col-span-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <FolderOpen size={16} className="text-folder" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                Files Inside Directory ({folder.files.length})
              </h3>
            </div>
            <span className="font-mono text-xs text-muted">click file to inspect</span>
          </div>

          <div className="space-y-2.5">
            {folder.files.map((file, idx) => {
              const isSelected = file.id === activeFile?.id
              const ext = file.filename.split('.').pop() || 'tsx'
              const IconComponent = fileIcons[ext] || FileCode

              return (
                <div
                  key={file.id}
                  onClick={() => {
                    onSelectFile(file)
                    setSelectedPreviewImg(null)
                  }}
                  className={`group relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? 'border-folder bg-sheet ring-2 ring-folder/25 shadow-md -translate-y-0.5'
                      : 'border-line bg-paper/60 hover:border-folder/40 hover:bg-sheet hover:shadow-xs'
                  }`}
                >
                  {/* File Index & Icon */}
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-folder text-white shadow-xs'
                        : 'bg-sheet text-muted group-hover:text-folder'
                    }`}
                  >
                    <IconComponent size={18} />
                  </div>

                  {/* File Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[10px] font-semibold text-muted">
                        FILE 0{idx + 1}
                      </span>
                      <span className="rounded bg-paper px-1.5 py-0.5 font-mono text-[9px] text-muted">
                        {file.status}
                      </span>
                    </div>

                    <h4 className="mt-0.5 truncate font-display text-sm font-bold text-ink group-hover:text-folder-deep">
                      {file.name}
                    </h4>

                    <p className="font-mono text-[11px] text-folder truncate">
                      {file.filename}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink/70">
                      {file.spec}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="shrink-0 self-center">
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${
                        isSelected
                          ? 'text-folder translate-x-1'
                          : 'text-muted/40 group-hover:text-folder group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Dedicated File Details View / Panel (7 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <AnimatePresence mode="wait">
            {activeFile && (
              <motion.div
                key={activeFile.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-2xl border border-line bg-sheet shadow-[var(--shadow-sheet)]"
              >
                {/* File Header Panel */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/60 p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-muted">
                      <span className="font-bold text-folder">
                        FILE 0{activeFileIndex + 1} OF 0{folder.files.length}
                      </span>
                      <span>//</span>
                      <span className="rounded bg-paper px-2 py-0.5 text-ink/80 font-semibold">
                        {activeFile.filename}
                      </span>
                    </div>

                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                      {activeFile.name}
                    </h3>
                  </div>

                  {/* Prev / Next File Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevFile}
                      aria-label="Previous file"
                      className="inline-flex items-center gap-1 rounded-xl border border-line bg-sheet px-3 py-1.5 font-mono text-xs font-semibold text-ink/80 transition-colors hover:border-ink/30 hover:bg-paper hover:text-ink"
                    >
                      <ArrowLeft size={13} />
                      <span className="hidden sm:inline">Prev File</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextFile}
                      aria-label="Next file"
                      className="inline-flex items-center gap-1 rounded-xl border border-line bg-sheet px-3 py-1.5 font-mono text-xs font-semibold text-ink/80 transition-colors hover:border-ink/30 hover:bg-paper hover:text-ink"
                    >
                      <span className="hidden sm:inline">Next File</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Status Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-soft/30 p-3.5 border border-line/60">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-xs font-bold text-ink">
                        MODULE STATUS: {activeFile.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-muted">
                      DIRECTORY // {folder.folderNumber}
                    </span>
                  </div>

                  {/* Interactive Screenshot Preview if applicable */}
                  {currentPreview && (
                    <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-xs">
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper">
                        <img
                          src={currentPreview}
                          alt={`${activeFile.name} display`}
                          className="h-full w-full object-contain object-center"
                        />
                        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-md bg-ink/75 px-2.5 py-0.5 font-mono text-[0.68rem] text-white backdrop-blur-xs">
                          <Layers size={12} aria-hidden="true" />
                          <span>Interactive Preview · {activeFile.name}</span>
                        </div>
                      </div>

                      {/* Screenshot Thumbnails Strip */}
                      {folder.gallery && folder.gallery.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto border-t border-line bg-paper/60 p-3">
                          {folder.gallery.map((img) => (
                            <button
                              key={img}
                              type="button"
                              onClick={() => setSelectedPreviewImg(img)}
                              className={`relative aspect-[16/10] h-14 shrink-0 overflow-hidden rounded-lg border transition-all ${
                                currentPreview === img
                                  ? 'border-folder ring-2 ring-folder/30'
                                  : 'border-line opacity-65 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={img}
                                alt="thumbnail"
                                className="h-full w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Specification Overview */}
                  <div>
                    <h4 className="eyebrow mb-2">Technical Specification</h4>
                    <p className="text-sm leading-relaxed text-ink/85">{activeFile.spec}</p>
                  </div>

                  {/* Engineered Capabilities & Architectural Points */}
                  <div className="border-t border-line/70 pt-5">
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <h4 className="eyebrow font-bold">Engineered Points & Implementation</h4>
                    </div>

                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {activeFile.points.map((pt) => (
                        <div
                          key={pt}
                          className="flex items-start gap-2.5 rounded-xl border border-line/60 bg-paper/40 p-3 text-xs leading-relaxed text-ink/85"
                        >
                          <span className="mt-0.5 text-folder font-bold">›</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Used in this File */}
                  <div className="border-t border-line/70 pt-5">
                    <h4 className="eyebrow mb-3">Technologies in this File</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeFile.stack.map((tech) => {
                        const logo = getSkillLogo(tech)
                        return (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-sheet px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs"
                          >
                            {logo && (
                              <img
                                src={logo}
                                alt=""
                                aria-hidden="true"
                                className="size-4 object-contain"
                                loading="lazy"
                              />
                            )}
                            <span>{tech}</span>
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/80 pt-6">
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(folder)}
                      className="inline-flex items-center gap-2 rounded-xl bg-folder px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-transform hover:-translate-y-0.5 hover:bg-folder-deep"
                    >
                      <Sparkles size={14} />
                      <span>Open Full Case Study Dialog</span>
                      <ArrowUpRight size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={onBackToFolders}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted hover:text-ink hover:underline"
                    >
                      <span>← Back to all folders directory</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
