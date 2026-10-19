export type SectionId =
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'publications'
  | 'contact'

export interface NavTab {
  id: SectionId
  label: string
}

export type SocialIcon = 'github' | 'linkedin' | 'leetcode' | 'hackerrank' | 'skillrack' | 'instagram'

export interface SocialLink {
  label: string
  handle: string
  icon: SocialIcon
  /** Leave undefined until the real URL is known — the link is then hidden. */
  url?: string
}

export interface Profile {
  name: string
  firstName: string
  title: string
  company: string
  tagline: string
  intro: string
  about: string[]
  email: string
  resumeUrl: string
  /** Name the browser saves the resume under. */
  resumeFileName: string
  photoUrl: string
  availability?: string
  focus: string[]
  mindset: string[]
  interests: string[]
  aiDirection: string[]
  closingLine: string
}

export interface SkillGroup {
  id: string
  title: string
  icon: 'frontend' | 'backend' | 'database' | 'cloud' | 'ai' | 'architecture'
  primary: { label: string; items: string[] }[]
  capabilities: string[]
}

export interface ProductModule {
  id: string
  name: string
  points: string[]
  stack?: string[]
}

export interface Role {
  id: string
  company: string
  title: string
  period: string
  current?: boolean
  mode?: string
  logo?: string
  summary: string
  highlights: string[]
  stack: string[]
  modules?: ProductModule[]
  environment?: { label: string; items: string[] }[]
}

export type ProjectFilter = 'Full Stack' | 'Frontend' | 'Real-time' | 'AI'

export interface Project {
  id: string
  title: string
  category: string
  role: string
  team: string
  summary: string
  filters: ProjectFilter[]
  featured?: boolean
  image?: string
  gallery?: string[]
  features: string[]
  stack: string[]
  modules?: string[]
  roadmap?: string[]
  repoUrl?: string
  liveUrl?: string
}

export interface Education {
  id: string
  qualification: string
  institution: string
  period: string
  logo?: string
  score?: { label: string; value: string }
  subjects?: string[]
  notable?: string
  breakdown?: { title: string; rows: { label: string; value: string }[] }[]
  gpaTrend?: { label: string; value: number }[]
}

export interface Publication {
  id: string
  title: string
  venue: string
  year: string
  type: string
  url: string
  image?: string
  summary: string
  keywords: string[]
}
