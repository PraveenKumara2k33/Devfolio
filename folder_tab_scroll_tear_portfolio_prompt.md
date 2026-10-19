# Master Prompt: Folder Tab + Scroll Tear Developer Portfolio

## Project Objective

Design and build a premium, production-ready personal developer portfolio by combining two visual concepts:

1. **Folder Tab Designer Portfolio** — a tactile, layered folder interface with labeled tabs for navigating portfolio sections.
2. **Scroll Tear Portfolio** — expressive paper-tear transitions, layered paper edges, and scroll-driven reveals between content sections.

The result must feel like a carefully art-directed designer portfolio while remaining credible, readable, fast, accessible, and professional for software engineering recruiters and hiring managers.

Build a complete responsive website using **React.js, TypeScript, Tailwind CSS, and Vite**. The portfolio should highlight the developer's profile, education, skills, projects, experience, and publications. Use realistic content placeholders only where personal information has not been supplied; keep all portfolio content easy to edit from a central data file.

---

## 1. Visual Direction and Brand

### Design concept

Create a digital portfolio that looks like a premium designer's working folder, sketchbook, and engineering field notebook brought together.

- A central folder/document surface with layered sheets and visible folder tabs.
- Each tab represents a main portfolio section.
- The active tab opens or reveals the corresponding content panel.
- Paper-tear edges separate major sections and create a tactile transition while scrolling.
- Combine editorial typography, clean grid layouts, technical diagrams, and restrained motion.
- Keep the visual identity distinctive without sacrificing professional credibility.

### Color system

Use a warm paper base with dark ink and a confident blue accent. Keep contrast high and avoid excessive gradients.

| Token | Suggested value | Usage |
|---|---|---|
| Paper | `#F7F4ED` | Main background |
| Sheet | `#FFFEFA` | Folder pages and cards |
| Ink | `#17212B` | Primary text |
| Muted ink | `#5C6670` | Supporting text |
| Folder blue | `#3157D5` | Active tabs, links, highlights |
| Soft blue | `#E6ECFF` | Selected states and subtle panels |
| Border | `#D9D5CB` | Dividers, card outlines |
| Success | `#247A58` | Available/verified status only |
| Dark surface | `#111820` | Optional code or terminal panels |

Define these as reusable CSS variables or Tailwind theme tokens. Use color intentionally; do not give every section a different accent color.

### Font family

Use a high-quality, readable font pairing:

- **Headings:** `Space Grotesk` or `Sora`
- **Body:** `Inter` or `DM Sans`
- **Code and technical labels:** `JetBrains Mono`

Load fonts with `next/font` only if the project uses Next.js; for Vite, use a reliable font stylesheet or self-hosted font files. Include sensible system fallbacks.

Typography rules:
- Large, editorial hero heading with controlled line length.
- Clear hierarchy for section headings, card titles, metadata, and body copy.
- Comfortable body line-height around `1.5–1.75`.
- Avoid tiny text, excessive uppercase labels, and overly decorative fonts.

---

## 2. Technology Stack

Use the following stack unless an existing repository requires compatible alternatives:

- React.js
- TypeScript with strict type checking
- Vite
- Tailwind CSS v4, configured through the official Vite plugin
- React Router for route handling if multiple routes are needed; a single-page portfolio may use section navigation
- Framer Motion (`motion`) for polished transitions and scroll reveals
- `@react-three/fiber` and `@react-three/drei` only if a meaningful 3D scene improves the experience
- Lucide React for consistent icons
- React Hook Form + Zod only if a real contact form is implemented
- Vitest + React Testing Library for component and interaction tests
- ESLint and Prettier for code quality

Do not install libraries simply to make the stack look impressive. Keep the dependency footprint reasonable.

---

## 3. Main Experience and Navigation

### Folder tab navigation

Create a visually convincing folder component with labeled tabs:

- About
- Education
- Skills
- Projects
- Experience
- Publications
- Contact

Behavior:
- Tabs switch to the relevant section or scroll to its anchor.
- Clearly distinguish the active tab with color, elevation, border, and/or position.
- Keyboard users can navigate tabs and activate them.
- On mobile, tabs become a horizontally scrollable tab strip or compact menu.
- Never make users guess that a decorative object is interactive.
- Support direct links such as `/#projects` and preserve browser back/forward behavior where practical.
- Include a persistent, accessible “Skip to content” link.

The folder should feel tactile through subtle paper layers, soft shadows, slight rotation on decorative sheets, and visible folder edges. Keep the actual reading surface stable and easy to use.

### Scroll tear transitions

Use paper-tear-inspired transitions between major sections:

- CSS clip paths, SVG masks, or carefully authored SVG tear shapes.
- Reveal content with subtle opacity and vertical movement.
- Use irregular edges sparingly to create a handmade quality.
- Ensure text and controls never get clipped by decorative tear masks.
- Respect `prefers-reduced-motion`.
- On small screens or low-performance devices, use a lightweight static torn edge instead of expensive scroll-linked effects.

Do not simulate a literal torn-paper animation on every element. Use it as a consistent section transition motif.

---

## 4. Page Structure and Required Sections

### A. Hero / About

Create a strong first screen that quickly answers who the developer is, what they build, and what value they bring.

Include:
- Name and professional title.
- A concise, outcome-focused introduction.
- Primary CTA: **View Projects**.
- Secondary CTA: **Download Resume**.
- Contact or email link.
- GitHub and LinkedIn links.
- Optional location and current availability, only when supplied.
- Portrait, abstract profile illustration, or stylized developer workspace if a suitable asset exists.

Add a small “currently building” or “engineering focus” panel. Use a few restrained animated technical motifs such as floating code cards or a rotating wireframe object. Do not make the hero a generic template with a giant sphere and meaningless statistics.

Keep personal claims and metrics factual. Never invent years of experience, user counts, revenue, performance improvements, awards, or company results.

### B. Education

Display education as clean timeline cards or file sheets.

Each item may contain:
- Degree or qualification.
- Institution.
- Start and end dates.
- Location, if relevant.
- Grade/GPA only if supplied.
- Relevant coursework or notable academic work, if useful.

Make incomplete fields optional. Do not display empty labels.

### C. Skills

Organize skills by practical engineering categories rather than a random logo wall.

Suggested groups:
- Frontend: React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS.
- Backend: Python, FastAPI, REST APIs, authentication.
- Database: PostgreSQL, SQL, Redis, data modeling.
- Testing and quality: Pytest, Vitest, React Testing Library, linting, type checking.
- DevOps and cloud: Docker, GitHub Actions, Linux, AWS, Nginx.
- Engineering practices: system design, API design, debugging, accessibility, performance.

Only show technologies the developer actually knows. Represent proficiency honestly; avoid unsupported percentage bars. Use tags, grouped cards, or a compact skills matrix.

### D. Projects

Make projects the most substantial section. Use responsive project cards with a featured project layout.

Each project should support:
- Project name and short problem statement.
- The developer's role and contribution.
- Tech stack.
- Important engineering decisions.
- Challenges and how they were addressed.
- Verified outcomes or metrics, when available.
- GitHub link.
- Live demo link, if available.
- Screenshots, diagrams, or a short walkthrough where available.

Include filters such as All, Frontend, Backend, Full Stack, and DevOps only when project metadata supports them.

Use a larger featured card for the strongest project and smaller cards for supporting work. Add an optional case-study view with sections for problem, constraints, architecture, implementation, trade-offs, and results.

Do not fabricate repository URLs, deployment links, product screenshots, metrics, or client names. Use clearly labeled placeholders until the real data is supplied.

### E. Experience

Show professional experience in reverse chronological order.

Each role can include:
- Job title.
- Company.
- Employment dates.
- Work mode/location, if relevant.
- Product or team context.
- Three to four concise achievement-oriented bullets.
- Technologies used.

Prefer specific actions and outcomes over generic responsibilities. Separate verified metrics from qualitative contributions. Do not exaggerate ownership or claim team results as individual results.

### F. Publications

Use publication cards or a document-library layout.

Support:
- Article, technical blog, paper, presentation, or documentation.
- Title.
- Publisher or platform.
- Publication date.
- Short summary.
- Topics/tags.
- Read article or view PDF link.

If there are no publications yet, either omit the section or show a tasteful empty state with a link to the developer's technical writing platform. Do not invent publications.

### G. Contact

Create a simple, low-friction contact section:
- Email link.
- LinkedIn and GitHub.
- Optional contact form with client-side validation and clear success/error feedback.
- A direct alternative to the form in case submission fails.

A form must not pretend to send messages unless a backend or form service is connected. Keep secrets and API keys out of frontend code.

### H. Footer

Include:
- Name or personal wordmark.
- Compact section links.
- Social links.
- Current year generated dynamically.
- A concise closing line.

---

## 5. 3D and Motion Design

Use 3D only where it adds value.

### Preferred 3D idea

Build a lightweight **floating portfolio folder / layered paper stack** for the hero:
- A folder cover and several thin paper sheets.
- Small depth offsets and soft shadows.
- Subtle pointer-based tilt on desktop.
- Slow, restrained idle movement, if appropriate.
- A simplified CSS/SVG fallback for mobile and reduced-motion settings.

Alternative: a small rotating wireframe object, interactive skill constellation, or miniature project architecture scene.

### Motion principles

- Use Framer Motion for tab transitions, card entrances, and restrained hover feedback.
- Animate only `transform` and `opacity` where possible.
- Keep transitions short and purposeful.
- Avoid scroll-jacking, cursor-following gimmicks, constant bouncing, excessive parallax, and long intro animations.
- Do not block access to content while animations load.
- Use `prefers-reduced-motion` and avoid relying on motion to communicate state.

### Performance requirements

- Lazy-load 3D components and heavy media.
- Dynamically import the 3D scene.
- Provide a static fallback if WebGL is unavailable.
- Limit geometry, lights, shadows, and post-processing.
- Avoid making the entire page dependent on a canvas.
- Ensure the page remains usable if JavaScript animations fail.

---

## 6. Responsive Design

Use a mobile-first implementation with deliberate layouts at:

- Small mobile: approximately 320–374 px
- Standard mobile: 375–767 px
- Tablet: 768–1023 px
- Desktop: 1024–1439 px
- Wide desktop: 1440 px and above

Requirements:
- No horizontal page overflow.
- Folder tabs adapt to narrow screens.
- Hero layout stacks naturally on mobile.
- Project cards move from one column to two or three columns as space permits.
- Text remains readable and controls have comfortable touch targets.
- Navigation stays usable with touch, keyboard, and mouse.
- Decorative 3D and scroll effects degrade gracefully.
- Images use appropriate sizes and aspect ratios.
- Test at narrow widths, not just standard device presets.

Use Tailwind responsive utilities and shared layout components. Avoid arbitrary one-off breakpoints unless justified.

---

## 7. Accessibility and SEO

Accessibility:
- Use semantic landmarks and a logical heading hierarchy.
- Ensure full keyboard access and visible focus states.
- Give icon-only controls accessible names.
- Add meaningful alt text to informative images; use empty alt text for decoration.
- Maintain sufficient color contrast.
- Use correct tab semantics if implementing an actual ARIA tab interface; otherwise use navigation links.
- Respect reduced-motion preferences.
- Make dialogs, menus, and forms accessible.
- Do not communicate information through color alone.

SEO and sharing:
- Set a meaningful page title and meta description.
- Add Open Graph and social preview metadata.
- Use a proper favicon and consistent personal branding.
- Add canonical metadata only when a real canonical URL is known.
- Use descriptive link text and clean section IDs.
- Include structured data only when accurate and appropriate.

---

## 8. Code Architecture

Prefer reusable, maintainable components. Example structure:

```text
portfolio/
├── public/
│   ├── favicon.svg
│   ├── images/
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   └── SkipToContent.tsx
│   │   ├── folder/
│   │   │   ├── FolderShell.tsx
│   │   │   ├── FolderTabs.tsx
│   │   │   └── PaperTear.tsx
│   │   ├── motion/
│   │   │   └── Reveal.tsx
│   │   ├── three/
│   │   │   ├── FolderScene.tsx
│   │   │   └── SceneFallback.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectFilters.tsx
│   │   └── ui/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── PublicationsSection.tsx
│   │   └── ContactSection.tsx
│   ├── data/
│   │   └── portfolio.ts
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   │   └── index.css
│   ├── types/
│   └── main.tsx
├── tests/
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

Adapt this structure to the actual project instead of duplicating existing files or creating unnecessary abstractions.

### Content data model

Store profile, education, skills, projects, experience, publications, and social links in typed data objects under `src/data/portfolio.ts`. Render repeated items from data rather than hardcoding duplicate JSX. Make optional fields truly optional and validate external links.

Use small, focused components. Keep business/content data separate from visual components. Avoid giant components, duplicated styles, `any`, unexplained magic values, and unnecessary global state.

---

## 9. Quality, Testing, and Delivery

The final implementation must run, build, and be testable.

### Required scripts

Provide suitable package scripts, for example:

- `npm run dev` — local development
- `npm run build` — production build and TypeScript validation
- `npm run preview` — preview the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check
- `npm run test` — unit/component tests

Use scripts compatible with the actual package setup. Do not leave scripts pointing to missing tools.

### Testing checklist

- Folder tab navigation and active state.
- Section anchor navigation and browser behavior.
- Project filters and external links.
- Responsive layout at mobile, tablet, and desktop widths.
- Keyboard navigation and visible focus.
- Reduced-motion behavior.
- Contact form validation and truthful submission status.
- 3D fallback behavior.
- Missing optional content and broken-image fallbacks.
- Production build, lint, and typecheck.

### Performance and production readiness

- Avoid unnecessary re-renders and oversized bundles.
- Lazy-load noncritical images and heavy sections.
- Compress images and use modern formats where appropriate.
- Avoid layout shifts; reserve media dimensions.
- Check browser console errors and failed network requests.
- Include clear setup and deployment instructions in `README.md`.
- Keep environment variables out of version control.
- Do not include dummy backend integration or fake API success states.

---

## 10. Content and Personalization Rules

Use the actual profile information provided by the developer. If details are missing, create a single clearly marked editable placeholder rather than inventing facts.

Required editable content:
- Name and professional title
- Summary
- Education
- Skills
- Projects
- Experience
- Publications
- Email and social links
- Resume file path

Writing style:
- Concise, technically credible, and recruiter-friendly.
- Explain what was built, why it mattered, the developer's contribution, and the engineering trade-offs.
- Use metrics only when verified.
- Avoid clichés such as “passionate coder,” unsupported claims such as “expert in everything,” and generic filler paragraphs.

---

## 11. Acceptance Criteria

The work is complete only when:

- [ ] Folder tabs and paper-tear transitions work as a coherent design system.
- [ ] All required portfolio sections are present or intentionally omitted when no content exists.
- [ ] React and TypeScript are used cleanly.
- [ ] Tailwind CSS is configured correctly for the project's version.
- [ ] Responsive layouts work from narrow mobile to wide desktop.
- [ ] 3D is lightweight, optional, and has a fallback.
- [ ] Accessibility and reduced-motion requirements are implemented.
- [ ] SEO metadata and social links are configured.
- [ ] Portfolio content is centralized in typed data.
- [ ] `npm run build`, lint, typecheck, and tests pass, or any existing blocker is clearly reported.
- [ ] No fake metrics, fabricated projects, dead links, or misleading form success messages remain.
- [ ] The README explains setup, scripts, content editing, and deployment.

## Final Instruction to the AI Developer

First inspect the existing repository and identify its framework version, package manager, scripts, and current design conventions. Then implement the portfolio in the existing project where practical. Do not blindly overwrite working configuration or generate a mockup instead of a functional website.

Deliver a polished, complete, production-minded portfolio—not just a landing-page screenshot. Prioritize strong content hierarchy, useful project case studies, excellent responsive behavior, and a distinctive folder-and-torn-paper visual identity. Use 3D as a supporting detail, never as a substitute for clear communication.
