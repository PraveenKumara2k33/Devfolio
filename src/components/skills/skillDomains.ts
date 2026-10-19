import { Boxes, BrainCircuit, Cloud, Database, Layout, Server, type LucideIcon } from 'lucide-react'
import type { SkillGroup } from '../../types/portfolio'
import type { FolderPalette } from '../projects/projectMeta'

export type DomainId = SkillGroup['icon']

/** Skill domains, in the same colour family as the project folders and experience files. */
export const domains: Record<DomainId, { short: string; icon: LucideIcon; palette: FolderPalette }> = {
  frontend: { short: 'Frontend', icon: Layout, palette: { accent: '#3157d5', deep: '#1f3a9c', tint: '#e6ecff' } },
  backend: { short: 'Backend', icon: Server, palette: { accent: '#1f7a55', deep: '#13563b', tint: '#dff2e8' } },
  database: { short: 'Database', icon: Database, palette: { accent: '#8a5f0c', deep: '#664507', tint: '#f8edd2' } },
  cloud: { short: 'Cloud & DevOps', icon: Cloud, palette: { accent: '#1e6b80', deep: '#134a59', tint: '#dcf0f5' } },
  ai: { short: 'AI Apps', icon: BrainCircuit, palette: { accent: '#6a4bc9', deep: '#4b3199', tint: '#ece6fb' } },
  architecture: { short: 'Architecture', icon: Boxes, palette: { accent: '#b9502a', deep: '#86381b', tint: '#fbe9df' } },
}

export interface SkillItem {
  name: string
  logo: string
  domain: DomainId
  /** Sub-label shown under the name, e.g. "Frontend" or "Problem solving". */
  label: string
}
