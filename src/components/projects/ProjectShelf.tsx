import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, MoveRight } from 'lucide-react'
import type { Project } from '../../types/portfolio'
import { HorizontalShelf } from '../shelf/HorizontalShelf'
import { ShelfFolder } from './ShelfFolder'

interface ProjectShelfProps {
  projects: Project[]
  toolbar: ReactNode
  onOpen: (project: Project) => void
}

/** Projects as colour-coded folders on a horizontal shelf; files fan out at the centre. */
export function ProjectShelf({ projects, toolbar, onOpen }: ProjectShelfProps) {
  return (
    <HorizontalShelf
      keys={projects.map((p) => p.id)}
      toolbar={toolbar}
      watermark="Projects archive"
      itemLabel="project"
      trackClassName="items-center gap-6 pt-12 sm:gap-10 lg:gap-14"
      intro={(verb) => <ShelfIntro count={projects.length} verb={verb} />}
      end={<ShelfEnd />}
      renderItem={({ index, focus, select }) => (
        <ShelfFolder project={projects[index]} index={index} focus={focus} onOpen={onOpen} onFocusRequest={select} />
      )}
    />
  )
}

function ShelfIntro({ count, verb }: { count: number; verb: string }) {
  return (
    <div className="w-[min(18rem,70vw)] shrink-0 snap-start">
      <p className="eyebrow">Archive · {count} folders</p>
      <p className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        Each folder holds one shipped project.
      </p>
      <p className="mt-3 text-sm text-muted">Files fan out as a folder reaches the centre. Open one for screenshots and the module breakdown.</p>
      <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold text-folder">
        {verb} to browse
        <motion.span aria-hidden="true" animate={{ x: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <MoveRight size={16} />
        </motion.span>
      </p>
    </div>
  )
}

function ShelfEnd() {
  return (
    <div className="flex w-[min(16rem,70vw)] shrink-0 snap-end flex-col items-start gap-3 border-l border-dashed border-line pl-8">
      <p className="eyebrow">End of archive</p>
      <p className="font-display text-2xl font-semibold leading-tight">Want the next folder to be yours?</p>
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
      >
        Get in touch
        <ArrowRight size={15} aria-hidden="true" />
      </a>
    </div>
  )
}
