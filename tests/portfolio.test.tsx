import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectsSection } from '../src/sections/ProjectsSection'
import { projects, socialLinks, publications, navTabs } from '../src/data/portfolio'
import App from '../src/app/App'

describe('ProjectsSection', () => {
  it('filters projects and reports the count', async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)

    expect(screen.getByText(`Showing ${projects.length} of ${projects.length}`)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^Real-time/ }))
    const expected = projects.filter((p) => p.filters.includes('Real-time')).length
    expect(await screen.findByText(`Showing ${expected} of ${projects.length}`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Real-time/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens a case study dialog', async () => {
    const user = userEvent.setup()
    render(<ProjectsSection />)
    await user.click(screen.getAllByRole('button', { name: /open case/i })[0])
    // The modal is code-split, so it appears once its chunk has loaded.
    const dialog = await screen.findByRole('dialog', { hidden: true }, { timeout: 5000 })
    expect(within(dialog).getByRole('heading', { name: projects[0].title, hidden: true })).toBeInTheDocument()
  })
})

describe('content integrity', () => {
  it('only uses absolute https URLs for external links', () => {
    const urls = [
      ...socialLinks.map((s) => s.url).filter(Boolean),
      ...publications.map((p) => p.url),
      ...projects.flatMap((p) => [p.repoUrl, p.liveUrl]).filter(Boolean),
    ] as string[]
    for (const url of urls) expect(url).toMatch(/^https:\/\//)
  })

  it('renders every nav section with a single h1', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
    for (const tab of navTabs) expect(container.querySelector(`section#${tab.id}`)).not.toBeNull()
  })

  it('hides social links that have no URL', () => {
    render(<App />)
    for (const s of socialLinks.filter((l) => !l.url)) {
      expect(screen.queryByRole('link', { name: new RegExp(s.label, 'i') })).toBeNull()
    }
  })
})
