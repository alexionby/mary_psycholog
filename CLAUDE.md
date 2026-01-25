# CLAUDE.md - AI Assistant Guide for mary_psycholog

## Project Overview

This is a **multi-page static website** for Maria Glinskaya, a child and adolescent psychologist based in Warsaw, Poland. The site targets Russian-speaking families seeking psychological services both in-person and online.

**Domain**: maryglinskaya.com
**Platform**: Cloudflare Pages (static hosting)
**Language**: Russian (lang="ru")

## Tech Stack

- **HTML5** - Semantic markup, multi-page architecture (NOT a SPA)
- **CSS3** - Custom properties, Flexbox, CSS Grid
- **Vanilla JavaScript** - Component loading, mobile menu
- **Google Fonts** - Inter (body), Playfair Display (headings)
- **No build tools** - Pure static files, no bundlers or frameworks

## Architecture

**IMPORTANT**: This is a multi-page website, NOT a Single Page Application (SPA).

Each page is a separate HTML file with:
- Full HTML document structure
- Unique `<title>` and `<meta description>` for SEO
- Shared CSS/JS loaded from common files
- Header/Footer injected via JavaScript component loading

### Why Multi-Page?
- Each page targets different SEO keywords
- Google indexes each page separately
- Better SEO for service-specific queries
- No client-side routing (React Router, etc.)

## File Structure

```
mary_psycholog/
├── index.html                    # Homepage
├── o-sebe.html                   # About page
├── contacts.html                 # Contact page
├── sitemap.xml                   # SEO sitemap
├── robots.txt                    # Search engine directives
│
├── uslugi/                       # Services section
│   ├── index.html                # Services overview
│   ├── detskaya-terapiya.html    # Child therapy
│   ├── podrostkovaya-terapiya.html  # Teen therapy
│   ├── konsultacii-roditelej.html   # Parent consultations
│   ├── konsultacii-dlya-vzroslyh.html # Adult consultations
│   ├── onlajn-terapiya.html      # Online therapy
│   └── gruppovye-zanyatiya.html  # Group sessions
│
├── blog/                         # Blog articles
│   ├── index.html                # Blog listing
│   ├── kak-pomoch-rebenku-s-trevozhnostyu.html
│   └── adaptaciya-v-novoj-strane.html
│
├── components/                   # Reusable HTML components
│   ├── header.html               # Site header with navigation
│   ├── footer.html               # Site footer
│   └── services-grid.html        # Services card grid
│
├── css/
│   ├── style.css                 # Main styles (~1000 lines)
│   └── responsive.css            # Media queries, mobile styles
│
├── js/
│   └── main.js                   # Component loader, mobile menu
│
├── img/
│   ├── favicon.png               # Site favicon
│   ├── photos/                   # Professional photos
│   │   └── img_01.png - img_05_crop.png
│   └── icons/                    # Social/platform icons
│       ├── telegram.png
│       ├── instagram.png
│       ├── whatsapp.png
│       └── b17.png
│
└── specs/                        # Design & project specifications
    ├── tech_spec_psychologist.md # Full technical requirements
    ├── design_guide.md           # Visual design guidelines
    ├── about.md                  # Content for about page
    ├── contacts.md               # Contact information
    └── next_steps.md             # Planned features
```

## CSS Architecture

### CSS Custom Properties (Variables)

Located in `:root` of `css/style.css`:

```css
:root {
  /* Colors - Warm, professional palette */
  --color-bg: #faf7f2;           /* Main background (warm beige) */
  --color-bg-alt: #f0ebe3;       /* Alternate sections */
  --color-text: #1a1a1a;         /* Primary text */
  --color-text-muted: #6b6b6b;   /* Secondary text */
  --color-accent: #c4a77d;       /* Buttons, highlights (warm gold) */
  --color-accent-hover: #b8956d;
  --color-accent-light: #e5d4bc;
  --color-line: #e6dfd6;         /* Borders, dividers */

  /* Spacing - 8px base unit */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 48px;
  --space-xl: 80px;
  --space-xxl: 120px;

  /* Layout */
  --container: 1200px;           /* Max content width */
  --radius: 24px;                /* Card corners */
  --radius-lg: 32px;             /* Large elements */
  --shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}
```

### Responsive Breakpoints

```css
/* Desktop: default styles */
/* Tablet: max-width 820px */
/* Mobile: max-width 520px */
/* Small mobile: max-width 360px */
```

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.container` | Max-width wrapper with horizontal padding |
| `.section` | Page section with vertical padding |
| `.fade-in` | Entrance animation |
| `.split` | Two-column grid layout |
| `.card` | Content card with hover effects |
| `.card-grid` | Auto-fit grid for cards |
| `.primary-button` | Filled accent-color button |
| `.ghost-button` | Outlined transparent button |
| `.circle-button` | Round CTA button |
| `.eyebrow` | Small uppercase label text |
| `.lead` | Large intro paragraph |
| `.accordion` | Expandable details/summary |

## JavaScript Architecture

### Component Loading System

`js/main.js` implements a simple component injection system:

```javascript
// Loads header, footer, and services grid via fetch()
// Replaces placeholder divs with actual HTML content

// Placeholders in HTML:
<div id="header-placeholder"></div>
<div id="footer-placeholder"></div>
<div id="services-grid-placeholder"></div>
```

### Mobile Menu

- Burger button triggers `body.menu-open` class
- Full-screen overlay menu appears
- Auto-closes when link is clicked

## Design Guidelines

### Visual Style
- **Minimalist and warm** - professional yet approachable
- **Generous whitespace** - breathable layouts
- **Soft corners** - 16-24px border-radius
- **Subtle shadows** - light box-shadows on cards
- **No harsh contrasts** - warm beige, not stark white

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body text**: Inter (sans-serif, readable)
- **Font sizes**: Fluid scaling with clamp()
- **Line height**: 1.6-1.7 for body text

### Color Usage
- Primary background: `#faf7f2` (warm beige)
- Text: `#1a1a1a` (soft black, not pure black)
- Accent: `#c4a77d` (warm gold for CTAs)
- Muted: `#6b6b6b` (secondary text)

### Imagery
- Professional, warm-toned photos
- Natural lighting, calm expressions
- Photos stored in `/img/photos/`

## Common Development Tasks

### Adding a New Page

1. Create HTML file with full document structure:
```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Page Title | Мария Глинская</title>
    <meta name="description" content="Unique description for SEO">
    <link rel="icon" type="image/png" href="/img/favicon.png">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/responsive.css">
  </head>
  <body>
    <div id="header-placeholder"></div>
    <main>
      <!-- Page content here -->
    </main>
    <div id="footer-placeholder"></div>
    <script src="/js/main.js"></script>
  </body>
</html>
```

2. Add page to `sitemap.xml`
3. Use appropriate CSS classes for layout

### Adding a New Blog Post

1. Create file in `/blog/` directory
2. Follow existing post structure
3. Add card link in `/blog/index.html`
4. Update `sitemap.xml`

### Modifying Navigation

Edit `components/header.html` - changes apply to all pages automatically.

### Adding New Styles

1. Add to `css/style.css` for desktop-first styles
2. Add responsive overrides to `css/responsive.css`

## SEO Requirements

### Every Page Must Have:
- Unique `<title>` (50-60 chars) with keywords
- Unique `<meta name="description">` (150-160 chars)
- Single `<h1>` tag with target keyword
- Proper heading hierarchy (H2, H3...)
- Alt text on all images

### Target Keywords:
- Homepage: "детский психолог варшава"
- Child therapy: "детский психолог", "психолог для детей"
- Teen therapy: "подростковый психолог варшава"
- Online: "психолог онлайн", "русскоязычный психолог"

## Important Conventions

### DO:
- Use semantic HTML5 elements (`<main>`, `<section>`, `<article>`)
- Maintain warm, professional tone in Russian content
- Use CSS custom properties for colors/spacing
- Keep pages lightweight and fast-loading
- Test on mobile devices (70%+ traffic expected)
- Use absolute paths for assets (`/img/...`, `/css/...`)

### DON'T:
- Convert to SPA/React - multi-page is intentional for SEO
- Use harsh colors or cold grays
- Add unnecessary JavaScript frameworks
- Create inline styles - use CSS classes
- Forget to update sitemap.xml when adding pages
- Use machine-translated Russian text

## Performance Targets

- PageSpeed Score: > 90 (mobile and desktop)
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Total page weight: < 500KB

## External Integrations

### Contact Methods:
- Telegram: linked from contacts page
- WhatsApp: deep link format `https://wa.me/...`
- Instagram: @mary_glinskaya
- B17.ru: Russian psychologist directory

### Analytics (planned):
- Google Analytics 4
- Yandex.Metrika

## Deployment

Site is hosted on Cloudflare Pages:
- Automatic deployment from git
- SSL/HTTPS enabled
- No build step required (static files)

## Reference Documentation

Detailed specifications are in `/specs/`:
- `tech_spec_psychologist.md` - Full technical requirements
- `design_guide.md` - Visual design system
- `about.md`, `contacts.md` - Content references
