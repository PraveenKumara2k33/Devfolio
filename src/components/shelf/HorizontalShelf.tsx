import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { scrollPageTo } from '../../lib/smoothScroll'

export interface ShelfItemContext {
  index: number
  /** 0 = parked on the shelf, 1 = centred. */
  focus: MotionValue<number>
  /** Signed distance from the centre: -1 far left, 0 centred, 1 far right. */
  offset: MotionValue<number>
  /** Horizontal travel of the track in px (negative as it moves left). */
  shift: MotionValue<number>
  /** Brings this item to the centre. */
  select: () => void
}

export interface ShelfRailContext {
  shift: MotionValue<number>
  vw: number
  centers: number[]
}

interface HorizontalShelfProps {
  keys: string[]
  renderItem: (ctx: ShelfItemContext) => ReactNode
  intro: (verb: 'Scroll' | 'Swipe') => ReactNode
  end: ReactNode
  toolbar?: ReactNode
  watermark: string
  /** Noun for the prev/next buttons, e.g. "project". */
  itemLabel: string
  /** Optional decoration drawn inside the moving track (e.g. a timeline rail). */
  rail?: (ctx: ShelfRailContext) => ReactNode
  /** Gap / alignment / vertical padding for the track. */
  trackClassName?: string
}

/**
 * Horizontal shelf. On desktop the block pins and vertical scrolling drives the
 * track sideways; on touch / reduced motion it is a native swipe row with snap
 * points. Each item gets live focus values to animate from.
 */
export function HorizontalShelf(props: HorizontalShelfProps) {
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return isDesktop && !reduce ? <PinnedShelf {...props} /> : <SwipeShelf {...props} still={!!reduce} />
}

const trackPad = 'pl-[max(1.25rem,calc((100vw-72rem)/2+2rem))]'

function PinnedShelf({ keys, renderItem, intro, end, toolbar, watermark, itemLabel, rail, trackClassName = '' }: HorizontalShelfProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const layout = useShelfLayout(viewportRef, trackRef, keys)
  const distance = Math.max(0, layout.scrollWidth - layout.vw)

  const distanceMV = useMotionValue(0)
  useEffect(() => distanceMV.set(distance), [distance, distanceMV])

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })
  const shift = useTransform([scrollYProgress, distanceMV], ([p, d]: number[]) => -p * d)
  const watermarkX = useTransform(shift, (s) => s * 0.3)
  const active = useActiveIndex(shift, layout)

  const goTo = (i: number) => {
    const outer = outerRef.current
    if (!outer || distance <= 0) return
    const c = layout.centers[Math.max(0, Math.min(keys.length - 1, i))]
    const target = Math.min(0, Math.max(-distance, layout.vw / 2 - c))
    const top = outer.getBoundingClientRect().top + window.scrollY
    scrollPageTo(top + (-target / distance) * (outer.offsetHeight - window.innerHeight))
  }

  return (
    // Scroll runway: one viewport plus the track's horizontal travel.
    <div ref={outerRef} className="relative left-1/2 w-screen -translate-x-1/2" style={{ height: `calc(100svh + ${distance * 1.15}px)` }}>
      <div ref={viewportRef} className="sticky top-0 flex h-svh flex-col overflow-hidden pb-6 pt-24">
        <motion.span
          aria-hidden="true"
          style={{ x: watermarkX }}
          className="pointer-events-none absolute bottom-10 left-[6vw] select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none tracking-tighter text-ink/[0.035]"
        >
          {watermark}
        </motion.span>

        {toolbar && <div className="relative mx-auto w-full max-w-6xl px-8">{toolbar}</div>}

        <div className="relative flex min-h-0 flex-1 items-center">
          <motion.div ref={trackRef} style={{ x: shift }} className={`relative flex w-max pr-[12vw] ${trackPad} ${trackClassName}`}>
            {rail?.({ shift, vw: layout.vw, centers: layout.centers })}
            {intro('Scroll')}
            {keys.map((key, i) => (
              <ShelfSlot key={key} index={i} center={layout.centers[i] ?? 0} vw={layout.vw} shift={shift} renderItem={renderItem} onSelect={() => goTo(i)} />
            ))}
            {end}
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-8">
          <ShelfProgress progress={scrollYProgress} active={active} total={keys.length} itemLabel={itemLabel} onStep={(d) => goTo(active + d)} />
        </div>
      </div>
    </div>
  )
}

function SwipeShelf({ keys, renderItem, intro, end, toolbar, itemLabel, rail, trackClassName = '', still }: HorizontalShelfProps & { still: boolean }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const layout = useShelfLayout(scrollerRef, trackRef, keys)

  const { scrollX, scrollXProgress } = useScroll({ container: scrollerRef })
  const shift = useTransform(scrollX, (v) => -v)
  const active = useActiveIndex(shift, layout)

  const goTo = (i: number) => {
    const c = layout.centers[Math.max(0, Math.min(keys.length - 1, i))] ?? 0
    scrollerRef.current?.scrollTo({ left: c - layout.vw / 2, behavior: still ? 'auto' : 'smooth' })
  }

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      {toolbar && <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{toolbar}</div>}

      <div ref={scrollerRef} className="scrollbar-none snap-x snap-mandatory scroll-px-5 overflow-x-auto overscroll-x-contain sm:scroll-px-8">
        <div ref={trackRef} className={`relative flex w-max pb-6 pr-[max(1.25rem,calc((100vw-72rem)/2+2rem))] ${trackPad} ${trackClassName}`}>
          {rail?.({ shift, vw: layout.vw, centers: layout.centers })}
          {intro('Swipe')}
          {keys.map((key, i) => (
            <ShelfSlot
              key={key}
              index={i}
              center={layout.centers[i] ?? 0}
              vw={layout.vw}
              shift={shift}
              still={still}
              renderItem={renderItem}
              onSelect={() => goTo(i)}
            />
          ))}
          {end}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <ShelfProgress progress={scrollXProgress} active={active} total={keys.length} itemLabel={itemLabel} onStep={(d) => goTo(active + d)} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

interface ShelfLayout {
  vw: number
  scrollWidth: number
  centers: number[]
}

/** Measures the viewport and the centre of every item along the track. */
function useShelfLayout(viewportRef: RefObject<HTMLElement | null>, trackRef: RefObject<HTMLElement | null>, keys: string[]): ShelfLayout {
  const [layout, setLayout] = useState<ShelfLayout>({ vw: 0, scrollWidth: 0, centers: [] })
  const key = keys.join('|')

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    // ResizeObserver reports once on observe, so this also takes the first measurement.
    const ro = new ResizeObserver(() => {
      const items = Array.from(track.querySelectorAll<HTMLElement>(':scope > [data-shelf-item]'))
      setLayout({
        vw: viewport.clientWidth,
        scrollWidth: track.scrollWidth,
        centers: items.map((el) => el.offsetLeft + el.offsetWidth / 2),
      })
    })
    ro.observe(viewport)
    ro.observe(track)
    return () => ro.disconnect()
  }, [viewportRef, trackRef, key])

  return layout
}

function nearestIndex(shift: number, { vw, centers }: ShelfLayout) {
  let best = 0
  centers.forEach((c, i) => {
    if (Math.abs(c + shift - vw / 2) < Math.abs(centers[best] + shift - vw / 2)) best = i
  })
  return best
}

function useActiveIndex(shift: MotionValue<number>, layout: ShelfLayout) {
  const [active, setActive] = useState(0)
  useMotionValueEvent(shift, 'change', (s) => setActive(nearestIndex(s, layout)))
  return Math.min(active, Math.max(0, layout.centers.length - 1))
}

/** Signed position relative to the viewport centre, clamped to -1…1. */
function offsetAt(x: number, vw: number) {
  if (vw <= 0) return 0
  return Math.max(-1, Math.min(1, (x - vw / 2) / (vw * 0.4)))
}

interface ShelfSlotProps {
  index: number
  center: number
  vw: number
  shift: MotionValue<number>
  still?: boolean
  renderItem: (ctx: ShelfItemContext) => ReactNode
  onSelect: () => void
}

function ShelfSlot({ index, center, vw, shift, still = false, renderItem, onSelect }: ShelfSlotProps) {
  const centerMV = useMotionValue(center)
  const vwMV = useMotionValue(vw)
  useEffect(() => {
    centerMV.set(center)
    vwMV.set(vw)
  }, [center, vw, centerMV, vwMV])

  const liveOffset = useTransform([shift, centerMV, vwMV], ([s, c, w]: number[]) => offsetAt(c + s, w))
  // Smoothstep: eases in and out of the centre instead of a linear ramp.
  const liveFocus = useTransform(liveOffset, (o) => {
    const t = 1 - Math.abs(o)
    return t * t * (3 - 2 * t)
  })
  const one = useMotionValue(1)
  const zero = useMotionValue(0)

  return (
    <div data-shelf-item className="shrink-0 snap-center">
      {renderItem({
        index,
        focus: still ? one : liveFocus,
        offset: still ? zero : liveOffset,
        shift,
        select: onSelect,
      })}
    </div>
  )
}

interface ShelfProgressProps {
  progress: MotionValue<number>
  active: number
  total: number
  itemLabel: string
  onStep: (delta: number) => void
}

function ShelfProgress({ progress, active, total, itemLabel, onStep }: ShelfProgressProps) {
  const btn =
    'grid size-9 place-items-center rounded-full border border-line bg-sheet text-ink transition-colors hover:border-ink/30 disabled:opacity-40'
  return (
    <div className="mt-4 flex items-center gap-4">
      <span className="w-14 font-mono text-xs tabular-nums text-ink">
        {String(active + 1).padStart(2, '0')}
        <span className="text-muted"> / {String(total).padStart(2, '0')}</span>
      </span>
      <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-line">
        <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left rounded-full bg-folder" />
      </div>
      <div className="flex gap-1.5">
        <button type="button" onClick={() => onStep(-1)} disabled={active <= 0} aria-label={`Previous ${itemLabel}`} className={btn}>
          <ArrowLeft size={15} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onStep(1)} disabled={active >= total - 1} aria-label={`Next ${itemLabel}`} className={btn}>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
