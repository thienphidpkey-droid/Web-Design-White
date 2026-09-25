# FEN — Digital Work Portfolio (AI Context & Project Guide)

> This document serves as the authoritative context for AI coding assistants (Antigravity, Gemini, Claude, ChatGPT, Cursor, Copilot). It outlines the architecture, tech stack, design guidelines, data schemas, performance rules, and security policies for this repository.

---

## 🛠️ Project Overview & Tech Stack

- **Project Name:** FEN — Digital Work Portfolio
- **Owner / Identity:** FEN (Freelance Web Designer & Developer based in Vietnam)
- **Primary Domain:** `white-web-design.vercel.app` (Custom domain: `heonamedia.com` / `fen.studio`)
- **Core Framework:** React 18 (TypeScript) + Vite 5
- **Styling:** Vanilla CSS Custom Properties + CSS Modules + Tailwind CSS
- **Animation:** GSAP 3 (ScrollTrigger)
- **Typography:** Space Grotesk (sans-serif) + Space Mono (monospace)
- **Deployment & Hosting:** Vercel Static Single Page Application (SPA)

---

## 📁 Repository Structure

```
Web-Design-White/
├── App.tsx                      # Root layout, IntersectionObserver section tracker, modal state
├── index.html                   # Master HTML, SEO meta tags, Open Graph, Twitter Cards, 6 JSON-LD schemas
├── index.css                    # Design tokens (--bg, --purple, --surface, etc.), custom scrollbar, layout reset
├── data.ts                      # Central database for all 32 portfolio projects & categories
├── components/
│   ├── Sidebar.tsx              # Fixed left sidebar (01-05 nav, active dots, social links) + Mobile top nav
│   ├── Hero.tsx                 # Split hero, browser mockup preview, GSAP staggered text entrance
│   ├── FeaturedWork.tsx         # 5 selected project cards with hover zoom & border reveal
│   ├── ProjectArchive.tsx       # Coordinator component managing archive state & transition timers
│   ├── ProjectModal.tsx         # Full-screen project detail overlay (ESC key & backdrop close)
│   ├── About.tsx                # Split portrait image section, personality statement, stats grid
│   ├── Contact.tsx              # Minimal contact form with focus-activated purple underline
│   ├── Footer.tsx               # Minimal single-line footer
│   └── archive/                 # Modular archive sub-components
│       ├── ArchiveHeader.tsx        # Section header, project counts, desktop tabs & mobile dropdown
│       ├── ArchiveDesktopView.tsx   # 42/58 split view (list + sticky preview with actions)
│       └── ArchiveMobileView.tsx    # Responsive mobile layout (featured card + thumbnail list)
├── public/
│   ├── llms.txt                 # AI discovery summary (llmstxt.org standard)
│   ├── llms-full.txt            # Full plaintext AI document for one-shot retrieval
│   ├── sitemap.xml               # XML sitemap with image metadata
│   ├── robots.txt               # Configured for 13 AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, etc.)
│   ├── manifest.json            # PWA manifest
│   ├── favicon.svg              # Brand SVG favicon
│   └── *.webp                   # Optimized portfolio webp images (quality 82)
├── vercel.json                  # Security headers (CSP, HSTS, X-Frame-Options: DENY, Cache-Control rules)
├── convert-webp.mjs             # Image optimization script (Sharp)
└── package.json                 # Dependency configuration
```

---

## 🎨 Visual Identity & Design System

- **Aesthetic:** Dark luxury interface, editorial digital archive / contemporary art catalogue.
- **Color Tokens:**
  - Background: `#07070A` (`var(--bg)`)
  - Primary Accent: `#8B5CF6` (`var(--purple)`)
  - Surface: `#0D0D12` (`var(--surface)`)
  - Surface Alt: `#111117` (`var(--surface-2)`)
  - Border: `rgba(255, 255, 255, 0.06)` (`var(--border)`)
  - Border Hover: `rgba(139, 92, 246, 0.4)` (`var(--border-hover)`)
  - Text Primary: `#F2F2F4` (`var(--text)`)
  - Text Muted: `#5A5A6E` (`var(--muted)`)
- **Typography:**
  - Headlines: Uppercase, tight line-height, boldneo-grotesk (`Space Grotesk`)
  - Labels & Metadata: Monospace (`Space Mono`), uppercase, wide letter-spacing (`0.15em`–`0.25em`)

---

## 🔒 Security & Optimization Rules

1. **Content Security Policy (CSP):**
   - Configured in `vercel.json`.
   - Allows `worker-src blob:` and `child-src blob:` for WebGL/Three.js workers.
   - `unsafe-inline` and `unsafe-eval` are required for Vite inline bootstraps, GSAP inline transforms, and Three.js shader compilation.
2. **SEO & Structured Data:**
   - 6 JSON-LD schemas in `index.html` (`Person`, `WebSite`, `ProfessionalService`, `ItemList`, `BreadcrumbList`, `FAQPage`).
   - `og:image` and `twitter:image` use `og-image.webp` (1200x630px).
3. **Core Web Vitals & Image Loading:**
   - All portfolio images are formatted as `.webp`.
   - LCP image (`/project_heona.webp`) is preloaded in `<head>` and loaded eagerly with `fetchpriority="high"`.
   - All below-the-fold images use `loading="lazy"` and `decoding="async"`.
   - Width and height attributes are explicitly defined on all `<img>` elements to avoid layout shift (CLS).
4. **AI Crawlers & GEO:**
   - Allowed in `robots.txt` for 13 crawlers including `OAI-SearchBot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`.
   - `llms.txt` and `llms-full.txt` maintained in `public/`.

---

## 🤖 Guidelines for AI Developers

- Maintain the dark luxury editorial aesthetic — do NOT introduce generic light themes, glassmorphism, heavy gradients, or rounded SaaS cards.
- Keep components modular, lightweight, and type-safe.
- When adding or editing projects, update `data.ts` and maintain image paths as `.webp`.
- Always test builds using `npm run build` after structural changes.
