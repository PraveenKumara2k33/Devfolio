/** Presentation metadata for project folders — short labels, status and folder palette. */
export interface FolderPalette {
  /** Front flap and accents. White text passes AA at display sizes. */
  accent: string
  /** Back panel and pressed states. */
  deep: string
  /** Light paper tint for tabs, chips and file sheets. */
  tint: string
}

export interface ProjectMeta extends FolderPalette {
  short: string
  filename: string
  status: string
}

const meta: Record<string, ProjectMeta> = {
  'revenue-maxima': {
    short: 'Revenue Maxima',
    filename: 'revenue-maxima.case',
    status: 'Live in production',
    accent: '#3157d5',
    deep: '#1f3a9c',
    tint: '#e6ecff',
  },
  restaurant: {
    short: 'Restaurant ERP',
    filename: 'restaurant-erp.case',
    status: 'Production ERP',
    accent: '#b9502a',
    deep: '#86381b',
    tint: '#fbe9df',
  },
  ecommerce: {
    short: 'Real-time Store',
    filename: 'realtime-store.case',
    status: 'Live WebSockets',
    accent: '#1f7a55',
    deep: '#13563b',
    tint: '#dff2e8',
  },
  'portfolio-main': {
    short: 'Portfolio v1',
    filename: 'portfolio-v1.case',
    status: 'Live on Netlify',
    accent: '#6a4bc9',
    deep: '#4b3199',
    tint: '#ece6fb',
  },
}

export function getProjectMeta(id: string, title: string): ProjectMeta {
  return (
    meta[id] ?? {
      short: title,
      filename: `${id}.case`,
      status: 'Shipped',
      accent: '#3157d5',
      deep: '#1f3a9c',
      tint: '#e6ecff',
    }
  )
}

export const springSoft = { type: 'spring', stiffness: 260, damping: 28 } as const
export const springSnappy = { type: 'spring', stiffness: 420, damping: 32 } as const
