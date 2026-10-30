import { useSyncExternalStore } from 'react'

/**
 * Tracks whether the first-visit intro (LoadingScreen) has finished, so the
 * hero can hold its entrance until the loader moves out of the way instead of
 * animating unseen behind it.
 *
 * The same localStorage key is read by public/boot.js to skip the static boot screen.
 */
export const SEEN_KEY = 'devfolio:loaded'

export function introSeenBefore(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

let done = typeof window === 'undefined' ? true : introSeenBefore()
const listeners = new Set<() => void>()

/** Called by the loader as it starts to leave. */
export function markIntroDone() {
  try {
    localStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* storage blocked: the loader will simply show again next visit */
  }
  if (done) return
  done = true
  listeners.forEach((l) => l())
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

/** True once the intro is out of the way (or was never shown). */
export function useIntroDone(): boolean {
  return useSyncExternalStore(subscribe, () => done, () => true)
}
