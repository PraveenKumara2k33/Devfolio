/** "8.56 / 10" → { value: 8.56, max: 10 }; "74.5%" → { value: 74.5, max: 100, suffix: '%' }. */
export function parseScore(raw: string): { value: number; max: number; suffix: string } {
  const value = parseFloat(raw)
  const outOf = raw.match(/\/\s*([\d.]+)/)
  if (outOf) return { value, max: parseFloat(outOf[1]), suffix: '' }
  return { value, max: 100, suffix: raw.includes('%') ? '%' : '' }
}
