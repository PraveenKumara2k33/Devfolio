import type { Role } from '../../types/portfolio'

const sizes = {
  sm: 'size-9 rounded-xl text-xs',
  lg: 'size-14 rounded-2xl text-base sm:size-16',
}

/** Company logo tile, falling back to initials when no logo is available. */
export function CompanyMark({ role, size = 'lg' }: { role: Role; size?: keyof typeof sizes }) {
  const initials = role.company
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden border border-line bg-sheet font-display font-bold text-folder shadow-2xs ${sizes[size]}`}
    >
      {role.logo ? (
        <img decoding="async" src={role.logo} alt="" aria-hidden="true" className="size-4/5 object-contain" loading="lazy" />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  )
}
