import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import { ArrowUpRight, BookOpenText, Calendar, FileText, Hash, Landmark, Maximize2, X } from 'lucide-react'
import type { Publication } from '../types/portfolio'
import { publications } from '../data/portfolio'
import { TornSection } from '../components/folder/TornSection'
import { SectionHeader } from '../components/folder/SectionHeader'
import { domains } from '../components/skills/skillDomains'
import { PaperStack } from '../components/publications/PaperStack'

const palette = domains.ai.palette
const ease = [0.22, 1, 0.36, 1] as const

export function PublicationsSection() {
  return (
    <TornSection id="publications" tone="paper" seed={89}>
      <SectionHeader
        id="publications"
        index="06"
        label="Publications"
        title="Research on the record."
        intro="Peer-reviewed paper published in IEEE conference proceedings on embedded IoT systems, crash detection and vehicle surveillance."
      />

      <div className="space-y-16">
        {publications.map((pub, i) => (
          <PaperFile key={pub.id} pub={pub} index={i} />
        ))}
      </div>
    </TornSection>
  )
}

function PaperFile({ pub, index }: { pub: Publication; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [zoom, setZoom] = useState(false)
  const docId = pub.url.match(/document\/(\d+)/)?.[1]

  const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  }

  const meta = [
    { icon: FileText, label: 'Type', value: pub.type },
    { icon: Landmark, label: 'Venue', value: pub.venue },
    { icon: Calendar, label: 'Year', value: pub.year },
    ...(docId ? [{ icon: Hash, label: 'IEEE Xplore ID', value: docId }] : []),
  ]

  return (
    <article ref={ref} aria-labelledby={`pub-${pub.id}`} className="relative">
      <div className="flex items-end gap-2 pl-5">
        <span className="folder-tab-shape inline-flex items-center gap-2 px-5 pb-1.5 pt-2 font-mono text-xs font-medium text-white" style={{ background: palette.accent }}>
          <span className="text-white/70">06.{index + 1}</span>
          <span aria-hidden="true">/</span>
          research_paper.pdf
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl rounded-tl-lg border border-line bg-sheet shadow-[var(--shadow-lift)]">
        <span aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full blur-3xl" style={{ background: `${palette.accent}1f` }} />

        <div className="relative grid items-center gap-12 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:p-12">
          <PaperStack pub={pub} palette={palette} />

          <motion.div variants={list} initial="hidden" animate={inView ? 'show' : 'hidden'} className="min-w-0">
            <motion.p variants={item} className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.68rem] font-semibold" style={{ background: palette.tint, color: palette.deep }}>
              <span className="size-1.5 rounded-full" style={{ background: palette.accent }} />
              Peer-reviewed · {pub.year}
            </motion.p>

            <motion.h3 variants={item} id={`pub-${pub.id}`} className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
              {pub.title}
            </motion.h3>

            <motion.dl variants={item} className="mt-6 grid grid-cols-2 gap-2">
              {meta.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-line bg-paper/60 px-3 py-2.5">
                  <dt className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-muted">
                    <Icon size={11} aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold leading-snug text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            <motion.div variants={item} className="mt-6">
              <h4 className="flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                <BookOpenText size={13} aria-hidden="true" />
                Abstract
              </h4>
              <p className="mt-2 border-l-2 pl-4 leading-relaxed text-ink/80" style={{ borderColor: palette.accent }}>
                {pub.summary}
              </p>
            </motion.div>

            <motion.ul variants={item} className="mt-5 flex flex-wrap gap-1.5" aria-label="Keywords">
              {pub.keywords.map((k) => (
                <li key={k} className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ background: palette.tint, color: palette.deep }}>
                  #{k}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={pub.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-12px_rgb(0_0_0/0.5)] transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: palette.accent }}
              >
                Read on IEEE Xplore
                <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              {pub.image && (
                <button
                  type="button"
                  onClick={() => setZoom(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-sheet px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
                >
                  <Maximize2 size={15} aria-hidden="true" />
                  View system figure
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {zoom && pub.image && <FigureLightbox src={pub.image} title={pub.title} onClose={() => setZoom(false)} />}
    </article>
  )
}

function FigureLightbox({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const reduce = useReducedMotion()
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (ref.current && !ref.current.open) ref.current.showModal?.()
  }, [])

  return (
    <dialog
      ref={ref}
      aria-label={`Figure: ${title}`}
      onCancel={(e) => {
        e.preventDefault()
        setClosing(true)
      }}
      onClose={onClose}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 backdrop:bg-transparent"
    >
      <motion.div
        aria-hidden="true"
        onClick={() => setClosing(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        className="absolute inset-0 bg-night/75 backdrop-blur-md"
      />
      <div className="pointer-events-none relative grid h-full place-items-center p-4">
        <motion.figure
          initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
          animate={closing ? { opacity: 0, scale: reduce ? 1 : 0.95 } : { opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          onAnimationComplete={() => closing && onClose()}
          className="pointer-events-auto relative max-w-4xl rounded-2xl bg-sheet p-3 shadow-2xl sm:p-4"
        >
          <button
            type="button"
            onClick={() => setClosing(true)}
            aria-label="Close figure"
            className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-full bg-ink text-white shadow-lg transition-transform hover:rotate-90"
          >
            <X size={16} aria-hidden="true" />
          </button>
          <img loading="lazy" decoding="async" src={src} alt={`System diagram for ${title}`} className="max-h-[78dvh] w-full rounded-lg object-contain" />
          <figcaption className="mt-2 text-center font-mono text-xs text-muted">Fig. 1 — system overview: sensors, ESP-32 controller and cloud link</figcaption>
        </motion.figure>
      </div>
    </dialog>
  )
}
