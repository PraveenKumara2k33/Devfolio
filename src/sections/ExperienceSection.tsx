import { useState, lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { Download, MoveRight } from 'lucide-react'
import type { Role } from '../types/portfolio'
import { experience, profile } from '../data/portfolio'
import { TornSection } from '../components/folder/TornSection'
import { SectionHeader } from '../components/folder/SectionHeader'
import { HorizontalShelf } from '../components/shelf/HorizontalShelf'
import { HangingFile } from '../components/experience/HangingFile'
import { TimelineRail } from '../components/experience/TimelineRail'
import { getRolePalette } from '../components/experience/rolePalette'

// Loaded on first use, so it stays out of the initial bundle.
const ExperienceModal = lazy(() => import('../components/experience/ExperienceModal').then((m) => ({ default: m.ExperienceModal })))

const focusAreas: Record<string, string[]> = {
  'revenue-maxima': ['Multi-tenant SaaS', '8 unified modules', 'FastAPI + React', 'AWS + Docker'],
  aadasteck: ['Java + Spring Boot', 'React + Angular', 'Oracle DB', 'MVC'],
  cognizant: ['Spring Boot', 'Hibernate', 'MySQL', 'JUnit + Maven'],
  senchola: ['Restaurant ERP', 'AI chatbot', 'WordPress', 'PHP + REST'],
  internpe: ['DOM APIs', 'LocalStorage', '4 shipped builds', 'HTML + CSS'],
}

// The rail reads newest first: the current role, back to the first internship.
const timeline = experience
const yearOf = (role: Role) => (role.current ? 'Now' : (role.period.match(/\d{4}/)?.[0] ?? ''))
const years = timeline.map(yearOf)

export function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <TornSection id="experience" tone="paper" seed={23}>
      <SectionHeader
        id="experience"
        index="02"
        label="Experience"
        title="Career chapters & production software."
        intro="Every role hangs on one rail, newest first. Move along it to pull each file, then open it for the full breakdown."
      />

      <HorizontalShelf
        keys={timeline.map((r) => r.id)}
        watermark="Career timeline"
        itemLabel="role"
        trackClassName="items-start gap-8 pt-14 lg:gap-12"
        rail={(ctx) => <TimelineRail {...ctx} colors={timeline.map((r) => getRolePalette(r.id).accent)} labels={timeline.map((_, i) => `${String(i + 1).padStart(2, '0')} · ${years[i]}`)} />}
        intro={(verb) => <TimelineIntro verb={verb} />}
        end={<TimelineEnd />}
        renderItem={({ index, focus, offset, shift, select }) => (
          <HangingFile
            role={timeline[index]}
            index={index}
            year={years[index]}
            tags={focusAreas[timeline[index].id] ?? []}
            focus={focus}
            offset={offset}
            shift={shift}
            onSelect={select}
            onOpen={() => setOpenIndex(index)}
          />
        )}
      />

      {openIndex !== null && (
        <Suspense fallback={null}>
          <ExperienceModal roles={timeline} startIndex={openIndex} focusAreas={focusAreas} onClose={() => setOpenIndex(null)} />
        </Suspense>
      )}
    </TornSection>
  )
}

function TimelineIntro({ verb }: { verb: string }) {
  return (
    <div className="mt-24 w-[min(17rem,72vw)] shrink-0 snap-start">
      <p className="eyebrow">
        Career · {years[0].toLowerCase()} → {years[years.length - 1]}
      </p>
      <p className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {timeline.length} chapters, one rail.
      </p>
      <p className="mt-3 text-sm text-muted">From a multi-product hospitality platform in production back to the first front-end internship.</p>
      <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold text-folder">
        {verb} back through the timeline
        <motion.span aria-hidden="true" animate={{ x: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <MoveRight size={16} />
        </motion.span>
      </p>
    </div>
  )
}

function TimelineEnd() {
  return (
    <div className="mt-24 flex w-[min(16rem,70vw)] shrink-0 snap-end flex-col items-start gap-3 border-l border-dashed border-line pl-8">
      <p className="eyebrow">Where it started</p>
      <p className="font-display text-2xl font-semibold leading-tight">Want the full story on one page?</p>
      <a
        href={profile.resumeUrl}
        download={profile.resumeFileName}
        type="application/pdf"
        className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
      >
        <Download size={15} aria-hidden="true" />
        Download resume
      </a>
    </div>
  )
}
