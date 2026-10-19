import Lenis from 'lenis'

/**
 * Starts Lenis inertial scrolling for the page and returns a cleanup function.
 * Skipped entirely for users who prefer reduced motion — native scrolling stays.
 */
let instance: Lenis | null = null

/** Scrolls the page to `top`, through Lenis when it is running so the glide matches. */
export function scrollPageTo(top: number) {
  if (instance) instance.scrollTo(top)
  else window.scrollTo({ top, behavior: 'smooth' })
}

export function startSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // In-page #links glide too, clearing the sticky header (matches scroll-padding-top: 7rem).
    anchors: { offset: -112 },
    // Let modals and their inner scroll areas scroll natively.
    prevent: (node) => node.closest('dialog, [data-lenis-prevent]') !== null,
  })

  instance = lenis

  return () => {
    lenis.destroy()
    if (instance === lenis) instance = null
  }
}
