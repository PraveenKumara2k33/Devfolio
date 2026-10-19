import { useEffect } from 'react'
import { navTabs } from '../data/portfolio'
import { startSmoothScroll } from '../lib/smoothScroll'
import { useActiveSection } from '../hooks/useActiveSection'
import { SkipToContent } from '../components/layout/SkipToContent'
import { LoadingScreen } from '../components/layout/LoadingScreen'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SiteFooter } from '../components/layout/SiteFooter'
import { HeroSection } from '../sections/HeroSection'
import { AboutSection } from '../sections/AboutSection'
import { ExperienceSection } from '../sections/ExperienceSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { SkillsSection } from '../sections/SkillsSection'
import { EducationSection } from '../sections/EducationSection'
import { PublicationsSection } from '../sections/PublicationsSection'
import { ContactSection } from '../sections/ContactSection'

const observedIds = ['home', ...navTabs.map((t) => t.id)] as const

export default function App() {
  const active = useActiveSection(observedIds)

  useEffect(() => startSmoothScroll(), [])

  return (
    <>
      <LoadingScreen />
      <SkipToContent />
      <SiteHeader active={active} />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <PublicationsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
