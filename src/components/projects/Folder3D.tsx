import { useState } from 'react'
import { motion } from 'motion/react'
import { FileCode } from 'lucide-react'
import type { ProjectFolder, ProjectFileItem } from '../../data/projectFolders'

interface Folder3DProps {
  folder: ProjectFolder
  onSelectFile?: (file: ProjectFileItem) => void
  onOpenFolder?: () => void
}

export function Folder3D({ folder, onSelectFile, onOpenFolder }: Folder3DProps) {
  const [isHovered, setIsHovered] = useState(false)

  const files = folder.files.slice(0, 3)
  const topFile = files[0]
  const secondFile = files[1]
  const thirdFile = files[2]

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenFolder}
      className="relative mx-auto h-52 w-full max-w-[280px] cursor-pointer select-none sm:h-56 sm:max-w-[310px]"
      style={{ perspective: '800px' }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${folder.title} folder`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenFolder?.()
        }
      }}
    >
      {/* 1. Back Folder Flap with Tab on Top-Left (Exact Image Reference) */}
      <div className="absolute inset-x-0 bottom-0 top-3 rounded-2xl bg-[#1e40af] shadow-md transition-colors">
        {/* Protruding Tab on Top Left */}
        <div className="absolute -top-3.5 left-4 flex h-5.5 w-24 items-center justify-center rounded-t-xl bg-[#2563eb] px-2 shadow-xs">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            {folder.folderNumber}
          </span>
        </div>
      </div>

      {/* 2. White Paper Document Files Tucked Inside Pocket */}
      <div className="absolute inset-x-3 bottom-3 top-4 overflow-visible">
        {/* Paper Sheet 3 (Back Sheet) */}
        {thirdFile && (
          <motion.div
            animate={{
              y: isHovered ? -26 : 0,
              rotateZ: isHovered ? -3 : 0,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute inset-x-5 top-0 h-36 rounded-xl border border-slate-300 bg-slate-200 shadow-2xs"
          />
        )}

        {/* Paper Sheet 2 (Middle Sheet) */}
        {secondFile && (
          <motion.div
            animate={{
              y: isHovered ? -16 : 4,
              rotateZ: isHovered ? 2 : 0,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute inset-x-3 top-1 h-36 rounded-xl border border-slate-200 bg-slate-100 shadow-xs"
          />
        )}

        {/* Paper Sheet 1 (Front Active Sheet) */}
        {topFile && (
          <motion.div
            animate={{
              y: isHovered ? -8 : 8,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={(e) => {
              e.stopPropagation()
              if (onSelectFile) onSelectFile(topFile)
              else onOpenFolder?.()
            }}
            className="absolute inset-x-1 top-2 flex h-36 flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <FileCode size={13} className="text-[#2563eb]" />
                <span className="truncate font-mono text-[10px] font-bold text-slate-800">
                  {topFile.filename}
                </span>
              </div>
              <span className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#2563eb]">
                FILE 01
              </span>
            </div>

            <div className="my-1">
              <h4 className="truncate font-display text-xs font-bold text-slate-900">
                {topFile.name}
              </h4>
              <p className="line-clamp-2 text-[10px] leading-relaxed text-slate-500">
                {topFile.spec}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
              <span className="font-mono text-[9px] text-slate-400">
                {folder.files.length} Files Inside
              </span>
              <span className="flex items-center gap-1 font-mono text-[9px] font-bold text-[#2563eb]">
                <span>Click to View</span>
                <span>→</span>
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* 3. Front Folder Cover Flap (Angled in 3D Perspective) */}
      <motion.div
        animate={{
          rotateX: isHovered ? 26 : 18,
          y: isHovered ? 4 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{ transformOrigin: 'bottom' }}
        className="absolute inset-x-0 bottom-0 flex h-38 flex-col justify-between rounded-2xl border-t border-white/35 bg-[#2563eb] p-4 text-white shadow-[0_15px_30px_rgba(37,99,235,0.35)] transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-100">
              {folder.category}
            </span>
          </div>
          <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[10px] font-bold">
            {folder.files.length} Files
          </span>
        </div>

        <div>
          <h3 className="line-clamp-1 font-display text-base font-bold text-white drop-shadow-xs sm:text-lg">
            {folder.title}
          </h3>
          <p className="font-mono text-[10px] text-blue-100/90">
            {folder.role} · {folder.team}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
