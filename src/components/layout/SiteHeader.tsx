import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Download, Menu, X, Mail } from 'lucide-react'
import { navTabs, profile } from '../../data/portfolio'
import { FolderTabs } from '../folder/FolderTabs'

export function SiteHeader({ active }: { active: string | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled ? 'border-line bg-paper/95 shadow-[0_8px_24px_-16px_rgb(17_24_32/0.35)]' : 'border-line/60 bg-paper/80 shadow-2xs'
      }`}
    >
      {/* Reading progress along the bottom edge */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gradient-to-r from-folder via-[#6a4bc9] to-[#1f7a55]"
      />
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 transition-[height] min-[380px]:gap-4 min-[380px]:px-4 duration-300 sm:px-8 ${
          scrolled ? 'h-16' : 'h-18 sm:h-20'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#home"
          className="flex min-w-0 items-center gap-2 group focus-visible:outline-hidden min-[380px]:gap-3"
          aria-label={`${profile.name} — back to top`}
          onClick={() => setIsOpen(false)}
        >
          <div className="relative size-10 overflow-hidden rounded-xl bg-ink p-1 shadow-2xs border border-line flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
            <img decoding="async"
              src="/assets/projects/portfolio_logo-128.webp"
              alt="PK Logo"
              className="size-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="whitespace-nowrap font-display text-[0.95rem] font-bold tracking-tight text-ink sm:text-lg">
              {profile.firstName}
              <span className="text-folder"> A.</span>
            </span>
            <span className="font-mono text-[10px] text-muted -mt-0.5 hidden sm:block">
              Full Stack Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <FolderTabs tabs={navTabs} active={active} />
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2 min-[380px]:gap-2.5">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            type="application/pdf"
            aria-label="Download resume"
            className="btn btn-ghost h-10 px-3 text-xs min-[400px]:px-4 sm:text-sm gap-2 rounded-xl border border-line bg-sheet hover:bg-manila/50 shadow-2xs font-semibold text-ink transition-all hover:border-folder/40"
          >
            <Download size={15} className="text-folder" aria-hidden="true" />
            <span className="hidden min-[400px]:inline">Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="grid size-10 place-items-center rounded-xl border border-line bg-sheet text-ink hover:bg-manila/50 shadow-2xs lg:hidden transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-18 z-40 bg-ink/20 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-paper px-4 py-5 shadow-xl lg:hidden"
            >
              <div className="mx-auto max-w-md space-y-4">
                <p className="px-2 font-mono text-[11px] font-medium uppercase tracking-wider text-muted">
                  Navigation
                </p>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                >
                  <FolderTabs
                    tabs={navTabs}
                    active={active}
                    layoutKey="mobile"
                    isMobile
                    onNavigate={() => setIsOpen(false)}
                  />
                </motion.div>

                <div className="pt-2 border-t border-line/60 flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-sheet py-2.5 text-xs font-semibold text-ink"
                    onClick={() => setIsOpen(false)}
                  >
                    <Mail size={14} className="text-folder" />
                    Get in touch
                  </a>
                  <a
                    href={profile.resumeUrl}
                    download={profile.resumeFileName}
                    type="application/pdf"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-folder py-2.5 text-xs font-semibold text-white shadow-2xs"
                    onClick={() => setIsOpen(false)}
                  >
                    <Download size={14} />
                    Download CV
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
