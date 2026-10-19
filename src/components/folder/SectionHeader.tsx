import type { ReactNode } from 'react'

interface SectionHeaderProps {
  id: string
  index: string
  label: string
  title: ReactNode
  intro?: ReactNode
  dark?: boolean
}

/** Section heading styled as an index tab sitting on the folder edge. */
export function SectionHeader({ id, index, label, title, intro, dark = false }: SectionHeaderProps) {
  return (
    <header className="mb-12 md:mb-16">
      <div className="flex items-end">
        <span
          className={`folder-tab-shape inline-flex items-center gap-2 px-5 pb-1.5 pt-2 font-mono text-xs font-medium ${
            dark ? 'bg-folder text-white' : 'bg-manila text-ink/80'
          }`}
        >
          <span className={dark ? 'text-white/70' : 'text-folder'}>{index}</span>
          <span aria-hidden="true">/</span>
          {label}
        </span>
      </div>
      <div className={`h-px ${dark ? 'bg-white/15' : 'bg-line'}`} />
      <h2
        id={`${id}-title`}
        className={`mt-7 max-w-3xl text-3xl font-semibold sm:text-4xl md:text-5xl ${dark ? 'text-white' : ''}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 max-w-2xl text-base md:text-lg ${dark ? 'text-white/70' : 'text-muted'}`}>{intro}</p>
      )}
    </header>
  )
}
