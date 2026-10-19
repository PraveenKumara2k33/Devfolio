import { useState, lazy, Suspense } from 'react'
import type { Project } from '../types/portfolio'
import { projects } from '../data/portfolio'
import { projectFolders } from '../data/projectFolders'
import { TornSection } from '../components/folder/TornSection'
import { SectionHeader } from '../components/folder/SectionHeader'
import { ProjectShelf } from '../components/projects/ProjectShelf'
import { ProjectFilters, type FilterValue } from '../components/projects/ProjectFilters'

// Loaded on first use, so it stays out of the initial bundle.
const ProjectPopModal = lazy(() => import('../components/projects/ProjectPopModal').then((m) => ({ default: m.ProjectPopModal })))

const filterOptions: FilterValue[] = ['All', 'Full Stack', 'Frontend', 'Real-time', 'AI']

const counts = filterOptions.reduce(
  (acc, f) => {
    acc[f] = f === 'All' ? projects.length : projects.filter((p) => p.filters.includes(f)).length
    return acc
  },
  {} as Record<FilterValue, number>,
)

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterValue>('All')
  const [openProject, setOpenProject] = useState<Project | null>(null)

  const visibleProjects = projects.filter((p) => (filter === 'All' ? true : p.filters.includes(filter)))
  const options = filterOptions.filter((f) => counts[f] > 0)

  const openFolder = openProject ? projectFolders.find((f) => f.id === openProject.id) : undefined

  return (
    <TornSection id="projects" tone="sheet" seed={37} texture="grid">
      <SectionHeader
        id="projects"
        index="03"
        label="Projects"
        title="Selected work, filed by what it took to build."
        intro="An archive of shipped work, one folder per project. Browse the shelf sideways and open any folder for its full case study."
      />

      <ProjectShelf
        projects={visibleProjects}
        onOpen={setOpenProject}
        toolbar={
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ProjectFilters options={options} value={filter} counts={counts} onChange={setFilter} />
            <p className="font-mono text-xs text-muted" aria-live="polite">
              Showing {visibleProjects.length} of {projects.length}
            </p>
          </div>
        }
      />

      {openProject && (
        <Suspense fallback={null}>
          <ProjectPopModal
            key={openProject.id}
            project={openProject}
            folder={openFolder}
            onClose={() => setOpenProject(null)}
          />
        </Suspense>
      )}
    </TornSection>
  )
}
