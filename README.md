# PraveenKumar A — Developer Portfolio

> This repository is the new portfolio (v2). The previous version, built with React and JavaScript, is live at [apraveenkumar.netlify.app](https://apraveenkumar.netlify.app/) and appears in the Projects section as *Portfolio Website v1*.

A personal portfolio for a full stack software engineer, designed as a set of folders and files. Each section opens like a document in a case file: projects are colour-coded folders on a sliding shelf, roles hang on a timeline rail, and education is a stack of certificates and mark sheets.

Built with **React 19, TypeScript, Vite, Tailwind CSS v4 and Motion**.

## Sections

| # | Section | What it shows |
|---|---|---|
| — | Loading screen | Section cards fan out of a folder, then the cover opens to the site. Plays once per browser session; any key or click skips it. |
| — | Hero | Name, rotating tagline, quick facts and a 3D photo folder that tilts with the pointer. |
| 01 | About | An open personnel file: ID card, interests note, memo, approach checklist and AI direction sheet. |
| 02 | Experience | Hanging files on a timeline rail, newest first. Scroll moves the rail sideways; each file opens into a full role write-up. |
| 03 | Projects | A horizontal shelf of project folders. Files fan out as a folder reaches the centre; each opens a case study with screenshots and modules. |
| 04 | Skills | Three views — Dossier (tabbed by domain), List (scrolling wall) and Solar (orbits) — plus stats and an AI × hospitality matrix. |
| 05 | Education | SSLC → HSC → B.Tech folders; opening one lays out its certificate, mark sheets and semester chart. |
| 06 | Publications | The IEEE paper as a stack of pages, with abstract, details and the system figure. |
| 07 | Contact | Open mail client, resume download and profile links. |

## Tech stack

| Area | Tools |
|---|---|
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Animation | Motion (Framer Motion), Lenis smooth scrolling |
| Icons | lucide-react, brand SVGs in `public/assets/skills` |
| Build | Vite 8 (Rolldown), React Compiler |
| Quality | ESLint (typescript-eslint, React hooks), Vitest, React Testing Library |

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript only |
| `npm run test` | Run the Vitest suite once |
| `npm run test:watch` | Run tests in watch mode |

## Editing content

Almost everything on the page comes from two data files, typed by [`src/types/portfolio.ts`](src/types/portfolio.ts):

- [`src/data/portfolio.ts`](src/data/portfolio.ts) — profile, about text, social links, skills, experience, projects, education and publications.
- [`src/data/projectFolders.ts`](src/data/projectFolders.ts) — the module "files" shown inside each project's case study.

Common changes:

- **Profile links** — edit `socialLinks`. A link with no `url` is hidden automatically. The footer shows only the icons listed in `footerIcons` in [`SiteFooter.tsx`](src/components/layout/SiteFooter.tsx).
- **Project links** — add `liveUrl` and/or `repoUrl` to a project; the *Live site* and *View source* buttons appear on their own.
- **Skill logos** — drop an SVG/WebP into `public/assets/skills/` and map the skill name to it in [`src/lib/skillLogos.ts`](src/lib/skillLogos.ts).
- **Section colours** — projects in [`projectMeta.ts`](src/components/projects/projectMeta.ts), roles in [`rolePalette.ts`](src/components/experience/rolePalette.ts), skill domains in [`skillDomains.ts`](src/components/skills/skillDomains.ts).
- **Resume and photo** — `public/img/PraveenKumar_A_Resume.pdf` and `public/img/Praveenkumar_2.webp`. Keep the file names (they are case-sensitive on the server) or update `profile.resumeUrl` / `profile.photoUrl`.
- **Section order** — reorder `navTabs` and the sections in [`src/app/App.tsx`](src/app/App.tsx).

### Images

Screenshots and photos are served as WebP. To add a new one, convert and resize it first, for example:

```bash
npx sharp-cli@5.1.0 -i input.png -o output.webp -f webp -q 78 resize 1600 --withoutEnlargement
```

## Project structure

```text
src/
├── app/App.tsx                 # page shell: loader, header, sections, footer
├── components/
│   ├── education/              # folder row, certificates, GPA chart, mark sheets
│   ├── experience/             # hanging files, timeline rail, role popup
│   ├── folder/                 # torn paper sections, section headers, tabs
│   ├── hero/                   # 3D folder stack, rotating phrase
│   ├── layout/                 # header, footer, loading screen, skip link
│   ├── projects/               # project shelf, folders, filters, case-study popup
│   ├── publications/           # paper stack
│   ├── shelf/                  # shared horizontal scroll-driven shelf
│   ├── skills/                 # dossier, marquee, solar system, stats, AI matrix
│   └── ui/                     # brand icons
├── data/                       # all site content
├── hooks/                      # active section, media queries
├── lib/                        # skill logos, smooth scroll, torn-edge generator
├── sections/                   # one file per page section
├── styles/index.css            # Tailwind v4 theme tokens and utilities
└── types/portfolio.ts          # content types
public/
├── assets/                     # project screenshots and skill/brand logos
├── img/                        # photo and resume
├── _headers                    # Netlify security and cache headers
├── _redirects                  # SPA fallback
└── boot.js                     # static first-frame loader script
tests/                          # Vitest specs
```

## What to commit and what to skip

| Path | Commit? | Why |
|---|---|---|
| `src/`, `public/`, `tests/` | Yes | The site's source, static files and tests. |
| `index.html`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js` | Yes | Build and tooling configuration. |
| `package.json`, `package-lock.json` | Yes | Dependencies; the lock file keeps installs identical everywhere. |
| `README.md` | Yes | This file. |
| `dist/` | **No** | Build output. `npm run build` recreates it, and Netlify builds it on every deploy. Committing it would only duplicate code and cause merge noise. |
| `node_modules/` | **No** | Installed packages, often hundreds of MB. `npm install` recreates it from the lock file. |
| `coverage/`, `*.tsbuildinfo` | **No** | Test and TypeScript caches. |
| `.env`, `.env.*` | **No** | Local settings that may hold secrets. The site doesn't need any today. |

All the "No" rows are already listed in [`.gitignore`](.gitignore), so `git add .` skips them automatically.

**Only deploying by hand?** Run `npm run build` and upload the contents of `dist/` — that folder alone is the complete site. Nothing else is needed on the server.

## Performance and accessibility

- Images are WebP, lazy-loaded below the first screen and decoded off the main thread; the hero photo is preloaded.
- Popups and the List/Solar skill views are code-split and download on first use. React, Motion and the icon set ship as separate long-cached chunks.
- Type and spacing scale up smoothly on screens wider than 1440px; layouts are tested from 320px phones to 2560px monitors.
- Every animation respects the system *reduce motion* setting.
- Keyboard support throughout: tab lists use arrow keys, popups close with Esc, and a skip link jumps to the content.

## Deployment

The site is static: `npm run build` outputs `dist/`.

**Netlify** (current host) — build command `npm run build`, publish directory `dist`. Everything Netlify needs is already in `public/`:

- `_redirects` — serves `index.html` for every route.
- `_headers` — content security policy, clickjacking and MIME-sniffing protection, HTTPS enforcement, and long-term caching for hashed JS/CSS.

After deploying, check the headers at [securityheaders.com](https://securityheaders.com). If a resource fails to load, the browser console will name what the content security policy blocked.

**Vercel / Cloudflare Pages** also work with the "Vite" preset and output `dist`; the `_headers` file would need to be translated to that host's format.

## Contact

There is no form backend: the contact section opens the visitor's mail client, and the resume downloads from `public/img`. Profile links (LinkedIn, GitHub, LeetCode, HackerRank, SkillRack, Instagram) are configured in `socialLinks`.
