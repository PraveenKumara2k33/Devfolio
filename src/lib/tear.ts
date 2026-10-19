/**
 * Deterministic torn-paper edge generator.
 * Produces a main edge and a slightly higher "fiber" edge (the exposed white
 * core of torn paper) from the same seed, so every tear is stable between renders.
 */
export const TEAR_WIDTH = 1440
export const TEAR_HEIGHT = 48

function prng(seed: number) {
  let s = Math.max(1, Math.floor(seed)) % 2147483647
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function tearPaths(seed: number): { main: string; fiber: string } {
  const rand = prng(seed)
  const main: string[] = []
  const fiber: string[] = []
  const min = 12
  const range = TEAR_HEIGHT - 20

  let x = 0
  while (x < TEAR_WIDTH) {
    const y = min + rand() * range
    main.push(`${x.toFixed(1)},${y.toFixed(1)}`)
    fiber.push(`${x.toFixed(1)},${Math.max(1, y - 2 - rand() * 4).toFixed(1)}`)
    x += 10 + rand() * 34
  }
  const endY = min + rand() * range
  main.push(`${TEAR_WIDTH},${endY.toFixed(1)}`)
  fiber.push(`${TEAR_WIDTH},${Math.max(1, endY - 3).toFixed(1)}`)

  const close = `L${TEAR_WIDTH},${TEAR_HEIGHT} L0,${TEAR_HEIGHT} Z`
  return {
    main: `M${main.join(' L')} ${close}`,
    fiber: `M${fiber.join(' L')} ${close}`,
  }
}
