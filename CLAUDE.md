# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-page static website for Maria Glinskaya, a child/adolescent psychologist in Warsaw, Poland. Targets Russian-speaking families. All content is in Russian (lang="ru").

**Domain**: maryglinskaya.com
**Hosting**: Cloudflare Pages (auto-deploys from git)
**Stack**: HTML5, CSS3, vanilla JS — no frameworks, no SPA

## Professional Status (важно для контента и SEO)

Maria has a **master's degree in psychology from Belarus** and is training as a **Gestalt therapist**. However, **NAWA (Poland) recognized her diploma only as a basis for a Polish master's program** — effectively not as a full qualification. She is officially registered as a **COACH** in the business incubator **"Twój StartUp"** and cannot issue psychological assessments.

**Content rules:**
- On the site (Russian-language): можно описывать образование, компетенции, опыт — это факты
- **НЕ использовать**: "лицензированный психолог", "дипломированный психолог" или что-то подразумевающее польскую аккредитацию
- Google Business Profile: категория **"Counselor"** или **"Life coach"**, НЕ "Psychologist"
- Schema.org JSON-LD: учитывать при выборе `@type` и `jobTitle` — использовать "Consultant" / "Counselor", не "Licensed Psychologist"

## Build

```bash
npm run build    # or: node build.js
```

Compiles `src/` templates + `components/` → `dist/`. The build script:
1. Replaces `{{header}}`, `{{footer}}`, `{{services-grid}}` placeholders with component HTML
2. Combines `css/style.css` + `css/responsive.css` → `dist/css/style.min.css`
3. Inlines `css/critical.css` (contains `@font-face` declarations) into each page's `<head>`
4. Preloads self-hosted fonts from `fonts/` (Inter, Playfair Display woff2)
5. Minifies `js/main.js` → `dist/js/main.min.js` with `defer`
6. Injects GA4 tracking snippet (G-TGR6VF3MQN) before `</head>`
7. Copies static assets: `img/`, `fonts/`, `robots.txt`, `sitemap.xml`, `_redirects`

**Never edit files in `dist/`** — they are overwritten on every build.

There is no dev server, linter, or test suite. To preview, open `dist/` files in a browser after building.

## Architecture

Source pages in `src/` are full HTML documents with template placeholders. Each page has unique `<title>`, `<meta description>`, canonical URL, Open Graph tags, and Schema.org JSON-LD.

Components in `components/` are shared fragments (header, footer, services-grid) injected at build time — not loaded via JS fetch.

### Key directories

| Path | Purpose |
|------|---------|
| `src/` | Source HTML templates — **edit these** |
| `components/` | Shared HTML fragments (header, footer, services-grid) |
| `dist/` | Build output — deployed to Cloudflare, do not edit |
| `css/style.css` | Main styles (desktop-first) |
| `css/responsive.css` | Media query overrides (820px, 520px, 360px breakpoints) |
| `css/critical.css` | `@font-face` declarations, inlined by build |
| `fonts/` | Self-hosted woff2 files (Inter, Playfair Display) |
| `js/main.js` | Mobile menu, scroll animations |
| `_redirects` | Cloudflare redirects: old Russian URLs → new English URLs |
| `specs/` | Design specs and content references |

## Adding a New Page

1. Create HTML file in `src/` with full document structure. Use `{{header}}` and `{{footer}}` placeholders (not `<div id="...">`). Reference `style.css` + `responsive.css` — the build will replace them with the combined/minified version. Look at existing pages like `src/about.html` for the exact template.
2. Add entry to `sitemap.xml`
3. If the URL replaces an old Russian path, add a redirect to `_redirects`

## Adding a Blog Post

1. Create file in `src/blog/`
2. Follow structure of existing posts
3. Add link card in `src/blog/index.html`
4. Update `sitemap.xml`

## Design System

### Colors (CSS custom properties in `css/style.css`)
- `--color-bg: #faf7f2` — warm beige background
- `--color-accent: #c4a77d` — warm gold for CTAs
- `--color-text: #1a1a1a` — soft black (not pure black)
- Use existing variables; avoid harsh/cold colors

### Typography
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)
- Sizes use fluid `clamp()` scaling

### Layout classes
`.container`, `.section`, `.split` (2-col grid), `.card`, `.card-grid`, `.primary-button`, `.ghost-button`, `.circle-button`, `.eyebrow`, `.lead`, `.accordion`

## Conventions

- **Multi-page is intentional** — do not convert to SPA/React
- Use semantic HTML5 (`<main>`, `<section>`, `<article>`)
- Use CSS custom properties for all colors/spacing
- Use absolute asset paths (`/img/...`, `/css/...`)
- Keep pages under 500KB total weight
- Mobile-first priority (70%+ expected mobile traffic)
- All Russian text must be natural, not machine-translated
- Every page needs unique `<title>`, `<meta description>`, single `<h1>`, alt text on images

## SEO Target Keywords

- Homepage: "детский психолог варшава"
- Child therapy: "детский психолог", "психолог для детей"
- Teen therapy: "подростковый психолог варшава"
- Online: "психолог онлайн", "детский психолог онлайн"

## Deployment

Cloudflare Pages auto-deploys from git. Build command: `node build.js`, output dir: `dist`.
