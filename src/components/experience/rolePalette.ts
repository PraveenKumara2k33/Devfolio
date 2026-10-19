import type { FolderPalette } from '../projects/projectMeta'

/**
 * Hanging-file colours, from the same family as the project folders: a
 * saturated front with white text, a deeper back panel and a light tint.
 */
const palettes: Record<string, FolderPalette> = {
  // Same blue as the Revenue Maxima project folder.
  'revenue-maxima': { accent: '#3157d5', deep: '#1f3a9c', tint: '#e6ecff' },
  aadasteck: { accent: '#1f7a55', deep: '#13563b', tint: '#dff2e8' },
  cognizant: { accent: '#6a4bc9', deep: '#4b3199', tint: '#ece6fb' },
  // Terracotta, matching the restaurant ERP work done there.
  senchola: { accent: '#b9502a', deep: '#86381b', tint: '#fbe9df' },
  internpe: { accent: '#1e6b80', deep: '#134a59', tint: '#dcf0f5' },
}

const fallback = palettes['revenue-maxima']

export const getRolePalette = (id: string): FolderPalette => palettes[id] ?? fallback
