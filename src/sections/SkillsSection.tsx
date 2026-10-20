import { useState, lazy, Suspense } from 'react'
import {
  Boxes,
  LayoutGrid,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { aiMatrix } from '../data/portfolio'
import { TornSection } from '../components/folder/TornSection'
import { SectionHeader } from '../components/folder/SectionHeader'
import { getSkillLogo } from '../lib/skillLogos'
import { SkillLegend } from '../components/skills/SkillLegend'
import { domains, type DomainId, type SkillItem } from '../components/skills/skillDomains'
import { SkillDossier } from '../components/skills/SkillDossier'
import { SkillStats, type Stat } from '../components/skills/SkillStats'
import { AiMatrix } from '../components/skills/AiMatrix'

// Loaded on first use, so it stays out of the initial bundle.
const SkillMarquee = lazy(() => import('../components/skills/SkillMarquee').then((m) => ({ default: m.SkillMarquee })))

// Skills shown in the List view, each filed under the domain it belongs to.
const featured: [name: string, domain: DomainId, label?: string][] = [
  ['React.js', 'frontend'],
  ['TypeScript', 'frontend'],
  ['JavaScript', 'frontend'],
  ['Redux Toolkit', 'frontend'],
  ['HTML5', 'frontend'],
  ['CSS3', 'frontend'],
  ['SCSS', 'frontend'],
  ['Tailwind CSS', 'frontend'],
  ['Bootstrap', 'frontend'],
  ['WordPress', 'frontend', 'CMS'],
  ['Python', 'backend'],
  ['FastAPI', 'backend'],
  ['JWT', 'backend', 'Auth'],
  ['Java', 'backend'],
  ['Spring Boot', 'backend'],
  ['Servlets', 'backend'],
  ['JSP', 'backend'],
  ['Node.js', 'backend'],
  ['PostgreSQL', 'database'],
  ['MySQL', 'database'],
  ['Oracle', 'database'],
  ['AWS', 'cloud'],
  ['Docker', 'cloud'],
  ['Git', 'cloud', 'Tooling'],
  ['GitHub', 'cloud', 'Tooling'],
  ['Postman', 'cloud', 'Tooling'],
  ['VS Code', 'cloud', 'Tooling'],
  ['DSA', 'architecture', 'Problem solving'],
]

const skillsList: SkillItem[] = featured.flatMap(([name, domain, label]) => {
  const logo = getSkillLogo(name)
  return logo ? [{ name, logo, domain, label: label ?? domains[domain].short }] : []
})

const domainCounts = skillsList.reduce<Partial<Record<DomainId, number>>>((acc, s) => {
  acc[s.domain] = (acc[s.domain] ?? 0) + 1
  return acc
}, {})

const stats: Stat[] = [
  { value: 15, suffix: '+', label: 'Technologies', note: `across ${Object.keys(domainCounts).length} domains` },
  { value: 2, suffix: '+', label: 'Years experience', note: 'internships to production SaaS' },
  { value: 6, suffix: '+', label: 'Projects built', note: 'personal and professional' },
  { value: 100, suffix: '%', label: 'Production ready', note: 'code written to ship' },
]

type ViewMode = 'list' | 'dossier'

const views: { id: ViewMode; label: string; icon: typeof Boxes }[] = [
  { id: 'dossier', label: 'Dossier', icon: Boxes },
  { id: 'list', label: 'List', icon: LayoutGrid },
]

export function SkillsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('dossier')

  const [highlight, setHighlight] = useState<DomainId | null>(null)

  return (
    <TornSection id="skills" tone="paper" seed={53}>
      <SectionHeader
        id="skills"
        index="04"
        label="Expertise"
        title="Skills & Technologies"
        intro="A comprehensive overview of the technologies, frameworks and tools I master to engineer scalable software solutions."
      />

      {/* View Mode Toggle Switch (from Portfolio-main) */}
      <div className="mb-12 flex justify-center">
        <div role="group" aria-label="Skills view" className="relative inline-flex items-center rounded-full border border-line bg-sheet p-1 shadow-sm">
          {views.map(({ id, label, icon: Icon }) => {
            const active = viewMode === id
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setViewMode(id)}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:px-5 ${
                  active ? 'text-white' : 'text-muted hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="skills-view-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <Icon size={14} aria-hidden="true" className="relative" />
                <span className="relative">{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {viewMode !== 'dossier' && (
          <motion.div
            key="legend"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-8">
              <SkillLegend counts={domainCounts} active={highlight} onChange={setHighlight} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interactive Skill View */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {viewMode === 'list' && (
            /* Skewed Seamless Scrolling Skills Section (iconic Portfolio-main signature) */
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Suspense fallback={<div className="h-[32rem]" />}>
                <SkillMarquee skills={skillsList} highlight={highlight} />
              </Suspense>
            </motion.div>
          )}

          {viewMode === 'dossier' && (
            /* Authentic 2.5D Dossier Folder Deck & Interactive File Inspection */
            <motion.div
              key="dossier-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <SkillDossier />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 space-y-10">
        <SkillStats stats={stats} />
        <AiMatrix rows={aiMatrix} />
      </div>
    </TornSection>
  )
}
