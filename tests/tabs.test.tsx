import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FolderTabs } from '../src/components/folder/FolderTabs'
import { ModuleTabs } from '../src/components/folder/ModuleTabs'
import { navTabs, experience } from '../src/data/portfolio'

describe('FolderTabs', () => {
  it('renders an anchor for every section', () => {
    render(<FolderTabs tabs={navTabs} active={null} />)
    const nav = screen.getByRole('navigation', { name: /portfolio sections/i })
    for (const tab of navTabs) {
      expect(within(nav).getByRole('link', { name: new RegExp(tab.label) })).toHaveAttribute('href', `#${tab.id}`)
    }
  })

  it('marks only the active tab with aria-current', () => {
    render(<FolderTabs tabs={navTabs} active="projects" />)
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('link', { name: /about/i })).not.toHaveAttribute('aria-current')
  })
})

describe('ModuleTabs', () => {
  const modules = experience[0].modules!

  it('switches panels with click and arrow keys', async () => {
    const user = userEvent.setup()
    render(<ModuleTabs modules={modules} />)

    const first = screen.getByRole('tab', { name: modules[0].name })
    expect(first).toHaveAttribute('aria-selected', 'true')

    await user.click(screen.getByRole('tab', { name: modules[2].name }))
    expect(screen.getByRole('tab', { name: modules[2].name })).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowRight}')
    const next = screen.getByRole('tab', { name: modules[3].name })
    expect(next).toHaveAttribute('aria-selected', 'true')
    expect(next).toHaveFocus()
  })
})
